const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");
const SeoSchema = require("../seo/seo.model");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },

  slug: { type: String, unique: true },

  excerpt: { type: String, default: null },

  brands: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
  ],

  productMainImage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "File",
    required: true,
  },

  media: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Media",
      default: [],
    },
  ],

  datasheet: [
    {
      key: { type: String, required: true },

      value: { type: String, required: true },
    },
  ],

  specifications: {
    type: String,
    default: "",
  },

  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  ],

  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],

  price: {
    fa: { type: String, default: null },
    ar: { type: String, default: null },
    en: { type: String, default: null },
  },

  description: {
    fa: { type: String, default: null },
    ar: { type: String, default: null },
    en: { type: String, default: null },
  },

  relatedProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
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

productSchema.plugin(timestamp);

function generateSpecifications(datasheet) {
  if (!Array.isArray(datasheet)) return "";

  const values = datasheet
    .map((item) => item?.value?.en?.toLowerCase().trim())
    .filter(Boolean);

  return values.join("|");
}

productSchema.pre("save", function (next) {
  this.specifications = generateSpecifications(this.datasheet);
  next();
});

productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.datasheet) {
    update.specifications = generateSpecifications(update.datasheet);
    this.setUpdate(update);
  }

  next();
});

productSchema.pre("findByIdAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.datasheet) {
    update.specifications = generateSpecifications(update.datasheet);
    this.setUpdate(update);
  }

  next();
});

module.exports =
  mongoose.models.Product || mongoose.model("Product", productSchema);
