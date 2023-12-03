const { StatusCodes } = require("http-status-codes");
const User = require("../model/user.model");

const allUsers = async (req, res) => {
  try {
    const allUser = await User.find();
    return res.status(StatusCodes.OK).json({
      message: "Fetch all users",
      data: allUser,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!updatedUser) {
      throw new Error("User Not found.");
    }

    return res.status(StatusCodes.OK).json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);
    return res.status(StatusCodes.OK).json({
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};



module.exports = {
  allUsers,
  updateUser,
  deleteUser,
};
