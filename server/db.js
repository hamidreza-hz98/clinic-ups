// Register Models:
require("./modules/brand/brand.model").default;
require("./modules/tag/tag.model").default;
require("./modules/media/media.model").default;
require("./modules/seo/seo.model").default;
require("./modules/category/category.model").default;
require("./modules/product/product.model").default;
require("./modules/project/project.model").default;
require("./modules/blog/blog.model").default;
require("./modules/admin/admin.model").default;
require("./modules/contact/contact.model").default;
require("./modules/settings/settings.model").default;


const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    process.exit(1);
  }
}

module.exports = connectDB;
