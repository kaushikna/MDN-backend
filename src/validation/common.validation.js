const { validationResult } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const validate = (validations) => {
  return async (req, res, next) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.errors.length) break;
    }

    const errors = validationResult(req);
    if (errors.array().length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: errors.array()[0].msg });
    }

    next();
  };
};

const joyValidate = (validator) => {
  return async function (req, res, next) {
    const { error } = validator.validate(req.body);
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    } else {
      return next();
    }
  };
};

module.exports = {
  validate,
  joyValidate,
};
