const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const SeoSchema = require("../seo/seo.model");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },

  slug: { type: String, required: true },
  
  excerpt: { type: String, required: true },
  
  author: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },

  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],

  thumbnail: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Media", required: true },
  ],

  relatedBlogs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blog" }],

  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],

  relatedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

  isSelected: { type: Boolean, default: false },

  readTime: { type: String, default: null },

  content: { type: String, required: true },

  visits: {
    type: Number,
    default: 0,
  },

  seo: {
    type: SeoSchema,
    default: () => ({}),
  },
});
blogSchema.plugin(timestamp);

export default mongoose.models.Blog || mongoose.model("Blog", blogSchema);