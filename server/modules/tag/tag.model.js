import mongoose from "mongoose";
const timestamp = require("mongoose-timestamp");

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  // slug: { type: String },
})

tagSchema.plugin(timestamp);


module.exports = mongoose.models.Tag || mongoose.model("Tag", tagSchema);