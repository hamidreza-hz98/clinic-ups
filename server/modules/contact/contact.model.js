const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },

  mobile: { type: String, required: true },

  message: { type: String, required: true },
});

contactSchema.plugin(timestamp);

module.exports = mongoose.model("Contact", contactSchema);