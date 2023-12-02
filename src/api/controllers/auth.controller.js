const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const User = require("../model/user.model");
const Verification = require("../model/verification.model");
const { sendMail } = require("../../helpers/mail.helper");
const { generateOTP } = require("../../helpers/util.helper");
const moment = require("moment");
const bcrypt = require("bcrypt");

const logIn = async (req, res) => {
  try {
    const { email, password, isAdmin } = req.body;

    let user = await User.findOne({ email: email }).select("+hash_password");
    if (!user) {
      throw new Error("User Not found.");
    }
    if (!user.verified) {
      throw new Error("User Not verified.");
    }
    if (!user.comparePassword(password)) {
      throw new Error("Invalid Password!");
    }
    user.is_admin = isAdmin;

    user = await user.save();
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "60000",
    });

    res.status(StatusCodes.OK).json({
      message: `Welcome, ${user.full_name}`,
      data: {
        user,
        token: token,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, userName, email, password, contactNumber } =
      req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already registered");
    }
    let user = new User({
      first_name: firstName,
      last_name: lastName,
      user_name: userName,
      email,
      contact_number: contactNumber,
      hash_password: User.hashPassword(password),
    });
    user = await user.save();

    const OTP = generateOTP();
    await sendMail({
      email: email,
      subject: "Email Verification",
      root: "../../email-template/verification.hbs",
      templateData: { name: firstName + " " + lastName, otp: OTP },
    });

    let verification = new Verification({
      user_id: user.id,
      otp: OTP,
    });
    await verification.save();

    return res.status(StatusCodes.CREATED).json({
      message: "Registration Successful",
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { userId, otp } = req.body;

    const verificationData = await Verification.findOne({
      user_id: userId,
    });
    if (!verificationData) {
      throw new Error(
        "Account Record doesn't exist, or has been verify already. Please signup or login."
      );
    }
    if (otp !== verificationData.otp) {
      throw new Error("invalid code passed. Check your inbox.");
    }

    const currantDate = moment(Date.now());
    const createdDate = moment(verificationData.createdAt).add(3, "m");
    if (createdDate.isBefore(currantDate)) {
      throw new Error("Code has expired. Please Request Again.");
    }

    await User.updateOne({ _id: userId }, { verified: true });
    await Verification.deleteMany({ user_id: userId });

    return res.status(StatusCodes.OK).json({
      message: "User email verified Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User Not found.");
    }

    await Verification.deleteMany({ user_id: user._id });

    const OTP = generateOTP();
    await sendMail({
      email: email,
      subject: "Email Verification",
      root: "../../email-template/verification.hbs",
      templateData: { name: user.first_name + " " + user.last_name, otp: OTP },
    });

    let verification = new Verification({
      user_id: user.id,
      otp: OTP,
    });
    await verification.save();

    return res.status(StatusCodes.OK).json({
      message: "OTP send successfully on your registered email.",
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;

    const user = await User.findOne({ _id: userId }).select("+hash_password");
    if (!user) {
      throw new Error("User Not found.");
    }
    if (!user.comparePassword(oldPassword)) {
      throw new Error("Incorrect old password.");
    }

    user.hash_password = User.hashPassword(newPassword);
    await user.save();

    return res.status(StatusCodes.OK).json({
      message: "Password updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User Not found.");
    }
    user.hash_password = User.hashPassword(newPassword);
    await user.save();

    return res.status(StatusCodes.OK).json({
      message: "Password updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

module.exports = {
  logIn,
  register,
  verifyOTP,
  resendOTP,
  changePassword,
  forgotPassword,
};
