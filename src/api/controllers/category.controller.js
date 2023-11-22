const { StatusCodes } = require("http-status-codes");
const Category = require("../model/category.model");

const allCategories = async (req, res) => {
  try {
    const allCategories = await Category.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "category",
          as: "products",
      //     let: { userGroupId: '$access' },
			// pipeline: [
			// 	{
			// 		$lookup: {
			// 			from: 'access_targets',
			// 			localField: 'userGroupId.accessTargetId',
			// 			foreignField: '_id',
			// 			as: 'access_targets_out',
			// 		},
			// 	},
			// ],
			// as: 'user_groups',
        },
      },
    ]);

    return res.status(StatusCodes.OK).json({
      message: "Fetch all Category",
      data: allCategories,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    let categoryExist = await Category.findOne({ name: name });
    if (categoryExist) {
      throw new Error("Category with same name already exists.");
    }

    let category = new Category({ name });
    category = await category.save();

    return res.status(StatusCodes.CREATED).json({
      message: "Category created successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const updateData = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updateData,
      {
        new: true,
      }
    );
    if (!updatedCategory) {
      throw new Error("Category not found.");
    }

    return res.status(StatusCodes.OK).json({
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await Category.findByIdAndDelete(id);
    return res.status(StatusCodes.OK).json({
      message: "Category deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

module.exports = {
  allCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
