const productService = require("../product/product.service");
const projectService = require("../project/project.service");
const categoryService = require("../category/category.service");
const brandService = require("../brand/brand.service");
const { mediaService } = require("../media/media.service");
const contactService = require("../contact/contact.service");
const tagService = require("../tag/tag.service");
const blogService = require("../blog/blog.service");

const dashboardService = {
  async getDashboardData(status) {
    const { totalProducts, mostVisitedProducts } =
      await productService.getDashboardData();

    const { totalProjects, mostVisitedProjects } =
      await projectService.getDashboardData();

    const { totalCategory } = await categoryService.getDashboardData();

    const { totalBrands } = await brandService.getDashboardData();

    const { totalMedia } = await mediaService.getDashboardData();

    const { totalContacts } = await contactService.getDashboardData();

    const { totalTags } = await tagService.getDashboardData();

    const { totalBlogs, mostVisitedBlogs } =
      await blogService.getDashboardData();

    return {
      totalProducts,
      mostVisitedProducts,
      totalProjects,
      mostVisitedProjects,
      totalCategory,
      totalBrands,
      totalMedia,
      totalContacts,
      totalTags,
      totalBlogs,
      mostVisitedBlogs,
    };
  },
};

module.exports = dashboardService;
