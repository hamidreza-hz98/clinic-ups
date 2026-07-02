const mongoose = require("mongoose");
const timestamp = require("mongoose-timestamp");

const brandsSchema = new mongoose.Schema({
  name: {type: String, required: true },

  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  key: { type: String, required: true },
  brandLogo: { type: mongoose.Schema.Types.ObjectId, ref: "Media", required: true },
});

brandsSchema.plugin(timestamp);

module.exports = mongoose.models.Brand || mongoose.model("Brand", brandsSchema);

