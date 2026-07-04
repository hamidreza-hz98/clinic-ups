// Register Models:
require("./modules/media/media.model");
require("./modules/seo/seo.model");
require("./modules/brand/brand.model");
require("./modules/tag/tag.model");
require("./modules/category/category.model");
require("./modules/product/product.model");
require("./modules/project/project.model");
require("./modules/blog/blog.model");
require("./modules/admin/admin.model");
require("./modules/contact/contact.model");
require("./modules/settings/settings.model");


const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    process.exit(1);
  }
}

module.exports = connectDB;
