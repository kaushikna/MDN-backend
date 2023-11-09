const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const schema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      require: true,
      trim: true,
    },
    last_name: {
      type: String,
      require: true,
      trim: true,
    },
    user_name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hash_password: {
      type: String,
      require: true,
      select: false,
    },
    contact_number: {
      type: String,
      require: true,
      min: 10,
    },
    token: {
      type: String,
      createdAt: Date.now(),
      expiresAt: Date.now() + 600000,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    is_admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toJSON: {virtuals: true}, toObject: {virtuals: true} }
);

schema.virtual("full_name").get(function () {
  return `${this.first_name} ${this.last_name}`;
});
schema.statics.hashPassword = function (password) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
};

schema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.hash_password);
};

module.exports = mongoose.model("User", schema);
