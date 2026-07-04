import mongoose from "mongoose";
const { Schema } = mongoose;
const timestamp = require("mongoose-timestamp");

const TagSchema = new Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String },
});

TagSchema.plugin(timestamp);

export default mongoose.models.Tag || mongoose.model("Tag", TagSchema);
