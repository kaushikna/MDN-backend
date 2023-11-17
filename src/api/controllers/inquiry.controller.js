const { StatusCodes } = require("http-status-codes");
const Inquiry = require("../model/inquiry.model");
const { sendMail } = require("../../helpers/mail.helper");

const createInquiry = async (req, res) => {
  try {
    const { fullName, email, contactNumber, comment } = req.body;

    let inquiry = new Inquiry({
      full_name: fullName,
      email,
      comment,
      contact_number: contactNumber,
    });
    inquiry = await inquiry.save();

    await sendMail(
      {
        email: email,
        subject: "Inquiry created",
        root: "../../email-template/inquiry.hbs",
        templateData: { name: fullName, inquiry: comment },
      },
      true
    );

    return res.status(StatusCodes.CREATED).json({
      message: "Inquiry created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const allInquiries = async (req, res) => {
  try {
    const allInquiries = await Inquiry.find();
    return res.status(StatusCodes.OK).json({
      message: "Fetch all inquiry",
      data: allInquiries,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const inquiryReplay = async (req, res) => {
  try {
    const { inquiryId, replay } = req.body;

    let inquiry = await Inquiry.findOne({ _id: inquiryId });
    if (!inquiry) {
      throw new Error("Inquiry not found.");
    }

    if (inquiry.status === "COMPLETED") {
      throw new Error(
        "Account record has been verify already. Please signup or login."
      );
    }

    inquiry["status"] = "COMPLETED";
    inquiry["replay"] = replay;

    inquiry = await inquiry.save();

    await sendMail({
      email: inquiry.email,
      subject: "Inquiry replay",
      root: "../../email-template/inquiry.replay.hbs",
      templateData: {
        name: inquiry.full_name,
        inquiry: inquiry.comment,
        replay: replay,
      },
    });

    return res.status(StatusCodes.CREATED).json({
      message: "Inquiry verify successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

module.exports = {
  allInquiries,
  createInquiry,
  inquiryReplay,
};
