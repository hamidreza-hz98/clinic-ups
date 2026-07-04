const Product = require("./product.model").default;
const throwError = require("../../middlewares/throw-error");
const { buildMongoFindQuery, buildMongoSort } = require("@/server/lib/filter");
const { generateProductSchema } = require("@/server/lib/seo");



const productService = {
  async create(data) {
    const existing = await Product.exists({ slug: data.slug });

    if (existing) {
      throwError("محصولی با این نامک قبلا ثبت شده است", 409);
    }

    const product = new Product(data);

    return await product.save();
  },

  async update(data, _id) {
    const existing = await Product.exists({ _id });

    if (!existing) {
      throwError("محصول مورد نظر یافت نشد", 404);
    }

    const updated = await Product.findByIdAndUpdate(_id, data, { new: true });

    return updated;
  },

  async getAll({
    search = "",
    sort = [{ field: "createdAt", order: "desc" }],
    page = 1,
    page_size = 10,
    filters = {},
  }) {
    const query = buildMongoFindQuery(filters, search, [
      "name",
      "excerpt",
      "description",
    ]);
    const sortOption = buildMongoSort(sort);
    const skip = (page - 1) * page_size;

      const [products, total] = await Promise.all([
        Product.find(query)
          .sort(sortOption)
          .skip(skip)
          .limit(page_size)
          .select(
            "name media excerpt createdAt updatedAt visits brand category slug excerpt"
          )
          .populate("media brand category")
          .lean(),
        Product.countDocuments(query),
      ]);

    return {
      products,
      total,
    };
  },

  async getDetails(filter) {
  if (!filter || Object.keys(filter).length === 0) {
    throwError(
      "فیلتر مورد نیاز برای دریافت جزئیات محصول ارسال نشده است",
      400
    );
  }

  // Increment visits manually
  const product = await Product.findOneAndUpdate(
    filter,
    { $inc: { visits: 1 } },
    { new: true }
  )
    .populate("category media tags brand")
    .populate({ path: "seo.ogImage" })
    .populate({ path: "seo.twitterImage" })
    .populate({
      path: "relatedProducts",
      populate: { path: "media" },
    })

  if (!product) {
    throwError("محصول مورد نظر یافت نشد", 404);
  }

  return product;
},


  async delete(_id) {
    const existing = await Product.exists({ _id });

    if (!existing) {
      throwError("محصول مورد نظر یافت نشد", 404);
    }

    const product = await Product.findByIdAndDelete(_id);

    return product;
  },

  async getSeoData(filter) {
    const product = await Product.findOne(filter)
      .select("seo price discount brand slug stock categories")
      .populate("seo.ogImage seo.twitterImage brand categories");

    if (!product) {
      throwError("محصولی با این شناسه یافت نشد.", 404);
    }

    const schema = generateProductSchema(product);

    return { seo: product.seo, schema };
  },

  async getProductsForSitemap() {
    const products = await Product.find().select("slug updatedAt").lean();

    return products.map((p) => ({
      url: `${process.env.BASE_URL}/products/${p.slug}`,
      lastmod: p.updatedAt.toISOString(),
    }));
  },

  async getDashboardData() {
    const totalProducts = await Product.countDocuments();

    const mostVisitedProducts = await Product.find()
      .select("name slug excerpt media visits")
      .populate("media")
      .sort({ visits: -1 })
      .limit(10);

    return { totalProducts, mostVisitedProducts };
  },
};

module.exports = productService;
