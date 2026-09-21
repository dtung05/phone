const formatDate = (created) => {
  return new Date(created).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
// Check ngày hết hạn
const isExpired = (endDate) => {
  if (!endDate) return false;
  const end = new Date(endDate);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return end < now;
};
export { formatDate, isExpired };
