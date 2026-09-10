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
  return `http://127.0.0.1:8000/storage/${path.replace(/^\/+/, "")}`;
};

export { getImageUrl };
