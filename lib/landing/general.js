export const setImagePath = (path) => {
  if (!path) return "/images/static/electricity.webp";
  if (/^https?:\/\//.test(path) || path.startsWith("/")) return path;
  return `/${path.replace(/^public[\\/]+/, "").replace(/\\/g, "/")}`;
};
