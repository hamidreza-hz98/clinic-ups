const createOrderCode = () => `ORD-${Math.floor(Math.random() * 10000)}`;

const slugify = (text) =>
  text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\p{L}\p{N}_-]+/gu, "") // Keep letters (including Persian), numbers, _ and -
    .replace(/-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start
    .replace(/-+$/, "");

function removeEmptyObjects(obj) {
  if (!obj || typeof obj !== "object") return obj;

  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      removeEmptyObjects(obj[key]);
      if (Object.keys(obj[key]).length === 0) {
        delete obj[key];
      }
    }
  });

  return obj;
}

module.exports = {
  slugify,
  createOrderCode,
  removeEmptyObjects,
};
