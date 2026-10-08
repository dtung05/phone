const getImageUrl = (path) => {
  if (!path) return "https://placehold.co/80x80?text=No+Image";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("blob:") ||
    path.startsWith("data:")
  ) {
    return path;
  }
  return import.meta.env.VITE_URL_IMG + `${path.replace(/^\/+/, "")}`;
};

export { getImageUrl };
