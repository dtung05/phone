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
// lấy ra thời gian trong ngày
const getPresetRange = (preset) => {
  const today = new Date();
  const formatDate = (d) => d.toISOString().split("T")[0];
  if (preset === "today") {
    const dStr = formatDate(today);
    return { start: dStr, end: dStr };
  }
  if (preset === "7days") {
    const past = new Date();
    past.setDate(today.getDate() - 6);
    return { start: formatDate(past), end: formatDate(today) };
  }
  if (preset === "30days") {
    const past = new Date();
    past.setDate(today.getDate() - 29);
    return { start: formatDate(past), end: formatDate(today) };
  }
  if (preset === "this_month") {
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    return { start: formatDate(firstDay), end: formatDate(today) };
  }
  return { start: "", end: "" };
};
export { formatDate, isExpired,getPresetRange };
