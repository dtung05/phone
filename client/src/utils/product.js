
export const normalizeSpecifications = (specs) => {
  if (!specs) return {};
  if (typeof specs === "object" && !Array.isArray(specs)) return specs;

  if (typeof specs === "string") {
    try {
      const parsed = JSON.parse(specs);
      if (typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
      if (Array.isArray(parsed)) specs = parsed;
    } catch {
      return {};
    }
  }

  if (Array.isArray(specs)) {
    return Object.fromEntries(
      specs.map((item, idx) => {
        if (typeof item === "string" && item.includes(":")) {
          const [key, ...value] = item.split(":");
          return [key.trim(), value.join(":").trim()];
        }
        return [`Thông số ${idx + 1}`, String(item)];
      })
    );
  }

  return {};
};

// chuyển hóa json, mảng
export const normalizeImages = (images) => {
  if (!images) return [];
  if (Array.isArray(images)) return images;

  if (typeof images === "string") {
    try {
      const parsed = JSON.parse(images);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  return [];
};

// nạp dữ liệu vào default form 
export const mapProductFormUpdate = (product) => {
  return {
    name: product.product_name || "",
    category_id: product.category_id ? String(product.category_id) : "",
    brand_id: product.brand_id ? String(product.brand_id) : "",
    review_video: product.review_video || "",
    discount_percentage:
      product.discount_perventage ?? product.discount_percentage ?? 0,
    is_sale: String(product.is_sale) === "1",
    specifications: JSON.stringify(
      normalizeSpecifications(product.specifications),
      null,
      2
    ),
    variants:
      product.product_variants && product.product_variants.length > 0
        ? product.product_variants.map((v) => {
            let attrStr = "{}";
            if (typeof v.attributes === "object" && v.attributes !== null) {
              attrStr = JSON.stringify(v.attributes);
            } else if (typeof v.attributes === "string") {
              try {
                attrStr = JSON.stringify(JSON.parse(v.attributes));
              } catch (e) {
                attrStr = v.attributes;
              }
            }
            return {
              id: v.id,
              selling_price: v.selling_price || "",
              attributes_json: attrStr,
            };
          })
        : [
            {
              selling_price: "",
              attributes_json: '{"storage": "128GB", "color": "Đen"}',
            },
          ],
  };
};
