const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  
  excerpt: { type: String, required: true },
  
  value: { type: String, required: true },

  slug: { type: String, required: true, unique: true },

  icon: { type: mongoose.Schema.Types.ObjectId, ref: "Media", default: null },
});
categorySchema.plugin(timestamp);

export default mongoose.models.Category || mongoose.model("Category", categorySchema);
