const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const SeoSchema = require("../seo/seo.model");

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },

  excerpt: { type: String, default: null },

  isSelected: { type: Boolean, default: false },

  slug: { type: String, required: true, unique: true },

  brands: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
    },
  ],

  media: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      default: [],
    },
  ],

  deliveryDate: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  customer: { type: String, default: null },

  location: { type: String, default: null },

  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],

  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],

  description: { type: String, default: null },

  relatedProjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: []
    },
  ],

  relatedProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      default: []
    },
  ],

  visits: {
    type: Number,
    default: 0,
  },

  seo: {
    type: SeoSchema,
    default: () => ({}),
  },
});
projectSchema.plugin(timestamp);

export default mongoose.models.Project || mongoose.model("Project", projectSchema);
