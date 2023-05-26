const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  assignTo: { type: String },
});

const userModel = new model("User", userSchema);
module.exports = userModel;
