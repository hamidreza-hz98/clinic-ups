const Blog = require("./blog.model").default;
const throwError = require("../../middlewares/throw-error");
const { buildMongoFindQuery, buildMongoSort } = require("@/server/lib/filter");

const blogService = {
  async create(data) {
    const existing = await Blog.exists({ slug: data.slug });

    if (existing) {
      throwError("بلاگی با این نامک قبلا ثبت شده است", 409);
    }

    const blog = new Blog(data);

    return await blog.save();
  },

  async update(data, _id) {
    const existing = await Blog.exists({ _id });

    if (!existing) {
      throwError("بلاگ مورد نظر یافت نشد", 404);
    }

    const updated = await Blog.findByIdAndUpdate(_id, data, { new: true });

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
      "title",
      "slug",
      "content",
    ]);
    const sortOption = buildMongoSort(sort);
    const skip = (page - 1) * page_size;

    const [blogs, total] = await Promise.all([
      Blog.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(page_size)
        .select("title categories thumbnail slug createdAt updatedAt visits")
        .populate("thumbnail categories")
        .lean(),
      Blog.countDocuments(query),
    ]);

    return {
      blogs,
      total,
    };
  },

  async getDetails(filter) {
    if (!filter || Object.keys(filter).length === 0) {
      throwError("فیلتر مورد نیاز برای دریافت جزئیات بلاگ ارسال نشده است", 400);
    }

    // Increment visits manually
    const blog = await Blog.findOneAndUpdate(
      filter,
      { $inc: { visits: 1 } },
      { new: true },
    )
      .populate("categories thumbnail tags relatedBlogs relatedProducts")
      .populate({ path: "seo.ogImage" })
      .populate({ path: "seo.twitterImage" })
      .populate({
        path: "relatedProducts",
        populate: { path: "media" },
      });

    if (!blog) {
      throwError("بلاگ مورد نظر یافت نشد", 404);
    }

    return blog;
  },

  async delete(_id) {
    const existing = await Blog.exists({ _id });

    if (!existing) {
      throwError("بلاگ مورد نظر یافت نشد", 404);
    }

    const blog = await Blog.findByIdAndDelete(_id);

    return blog;
  },

  async getDashboardData() {
    const totalBlogs = await Blog.countDocuments();

    const mostVisitedBlogs = await Blog.find()
      .select("title thumbnail slug createdAt updatedAt visits")
      .populate("thumbnail")
      .sort({ visits: -1 })
      .limit(10);

    return { totalBlogs, mostVisitedBlogs };
  },
};

module.exports = blogService;
