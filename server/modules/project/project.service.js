const Project = require("./project.model").default;
const throwError = require("../../middlewares/throw-error");
const { buildMongoFindQuery, buildMongoSort } = require("@/server/lib/filter");

const projectService = {
  async create(data) {
    const existing = await Project.exists({ slug: data.slug });

    if (existing) {
      throwError("پروژه با این نامک قبلا ثبت شده است", 409);
    }

    const project = new Project(data);

    return await project.save();
  },

  async update(data, _id) {
    const existing = await Project.exists({ _id });

    if (!existing) {
      throwError("پروژه مورد نظر یافت نشد", 404);
    }

    const updated = await Project.findByIdAndUpdate(_id, data, { new: true });

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

    const [projects, total] = await Promise.all([
      Project.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(page_size)
        .select(
          "name media excerpt slug brands categories customer location deliveryDate isSelected createdAt updatedAt visits",
        )
        .populate("media brands categories")
        .lean(),
      Project.countDocuments(query),
    ]);

    return {
      projects,
      total,
    };
  },

  async getDetails(filter) {
    if (!filter || Object.keys(filter).length === 0) {
      throwError(
        "فیلتر مورد نیاز برای دریافت جزئیات پروژه ارسال نشده است",
        400,
      );
    }

    const project = await Project.findOneAndUpdate(
      filter,
      { $inc: { visits: 1 } },
      { new: true },
    )
      .populate("categories brands media tags")
      .populate({ path: "seo.ogImage" })
      .populate({ path: "seo.twitterImage" })
      .populate({
        path: "relatedProjects",
        populate: { path: "media" },
      })
      .populate({
        path: "relatedProducts",
        populate: { path: "media" },
      });

    if (!project) {
      throwError("پروژه مورد نظر یافت نشد", 404);
    }

    return project;
  },

  async delete(_id) {
    const existing = await Project.exists({ _id });

    if (!existing) {
      throwError("پروژه مورد نظر یافت نشد", 404);
    }

    const project = await Project.findByIdAndDelete(_id);

    return project;
  },

  async getDashboardData() {
    const totalProjects = await Project.countDocuments();

    const mostVisitedProjects = await Project.find()
      .select("name media excerpt slug createdAt updatedAt visits")
      .populate("media")
      .sort({ visits: -1 })
      .limit(10);

    return { totalProjects, mostVisitedProjects };
  },
};

module.exports = projectService;
