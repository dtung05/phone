const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price || 0);
const readNumberToVietnameseWords = (number) => {
  if (!number || isNaN(number) || number === 0) return "Không đồng";
  const digits = [
    "không",
    "một",
    "hai",
    "ba",
    "bốn",
    "năm",
    "sáu",
    "bảy",
    "tám",
    "chín",
  ];
  const units = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];
  let num = Math.floor(Math.abs(number));
  let str = "";
  let unitIndex = 0;
  while (num > 0) {
    const block = num % 1000;
    if (block > 0) {
      const h = Math.floor(block / 100);
      const t = Math.floor((block % 100) / 10);
      const o = block % 10;
      let blockStr = "";

      if (h > 0 || num >= 1000) {
        blockStr += digits[h] + " trăm ";
      }

      if (t > 1) {
        blockStr += digits[t] + " mươi ";
        if (o === 1) blockStr += "mốt ";
        else if (o === 5) blockStr += "lăm ";
        else if (o > 0) blockStr += digits[o] + " ";
      } else if (t === 1) {
        blockStr += "mười ";
        if (o === 5) blockStr += "lăm ";
        else if (o > 0) blockStr += digits[o] + " ";
      } else if (t === 0 && o > 0) {
        if (h > 0 || num >= 1000) blockStr += "lẻ ";
        blockStr += digits[o] + " ";
      }

      str = blockStr + units[unitIndex] + " " + str;
    }
    unitIndex++;
    num = Math.floor(num / 1000);
  }

  str = str.trim();
  return str.charAt(0).toUpperCase() + str.slice(1) + " đồng";
};
export default formatPrice;
export { formatPrice, readNumberToVietnameseWords };
