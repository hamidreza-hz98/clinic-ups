const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const contactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },

  mobile: { type: String, required: true },

  message: { type: String, required: true },
});

contactSchema.plugin(timestamp);

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);