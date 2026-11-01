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
  const cleanPath = path.replace(/^\/+/, "").replace(/^storage\//, "");
  const baseUrl = import.meta.env.VITE_URL_IMG || "http://localhost:8000/storage/";
  return baseUrl.endsWith("/") ? baseUrl + cleanPath : `${baseUrl}/${cleanPath}`;
};

export { getImageUrl };
