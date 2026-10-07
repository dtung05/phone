import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getImageUrl } from "../../../utils/image";
import { formatPrice } from "../../../utils/price";
import {
  Smartphone,
  BatteryCharging,
  Headphones,
  Laptop,
  Watch,
  Cable,
  Tag,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Eye,
  EyeOff,
  User,
  ShoppingBag,
  RotateCcw,
  ShieldCheck,
  Truck,
  PhoneCall,
  Flame,
  Layers,
} from "lucide-react";

const getCategoryIcon = (name = "") => {
  const lower = name.toLowerCase();
  if (lower.includes("điện thoại") || lower.includes("phone"))
    return Smartphone;
  if (
    lower.includes("sạc") ||
    lower.includes("pin") ||
    lower.includes("cáp") ||
    lower.includes("battery")
  )
    return BatteryCharging;
  if (
    lower.includes("tai nghe") ||
    lower.includes("âm thanh") ||
    lower.includes("audio")
  )
    return Headphones;
  if (lower.includes("laptop") || lower.includes("máy tính")) return Laptop;
  if (lower.includes("đồng hồ") || lower.includes("watch")) return Watch;
  if (lower.includes("phụ kiện")) return Cable;
  return Tag;
};

export default function HomeHero({
  banners = [],
  categories = [],
  brands = [],
  featuredProducts = [],
  onSelectCategory,
  selectedCategory,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const profile = useSelector((state) => state.profile);

  const activeBanners = banners.filter((b) => String(b.is_active) === "1");

  useEffect(() => {
    if (activeBanners.length <= 1 || isHovered) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeBanners.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [activeBanners.length, isHovered]);

  const handlePrev = () => {
    if (activeBanners.length <= 1) return;
    setCurrentSlide(
      (prev) => (prev - 1 + activeBanners.length) % activeBanners.length,
    );
  };

  const handleNext = () => {
    if (activeBanners.length <= 1) return;
    setCurrentSlide((prev) => (prev + 1) % activeBanners.length);
  };

  const currentBanner = activeBanners[currentSlide] || activeBanners[0];

  const highlightTabs =
    brands.length > 0
      ? brands.map((b) => ({
          id: `brand-${b.id}`,
          title: b.name.toUpperCase(),
          subtitle: `${b.products_count ?? 0} sản phẩm`,
          link: `/brands/${b.id}/products`,
        }))
      : categories.map((c) => ({
          id: `cat-${c.id}`,
          title: c.name.toUpperCase(),
          subtitle: `${c.products_count ?? 0} sản phẩm`,
          catId: c.id,
        }));

  const userPhone = profile?.phone || "";
  const maskedPhone = userPhone
    ? showPhone
      ? userPhone
      : userPhone.replace(/(\d{3})\d{4}(\d{3})/, "$1*****$2")
    : profile?.email || "Chưa cập nhật";

  return (
    <section className="w-full max-w-[1440px] mx-auto px-3 sm:px-4 lg:px-6 pt-3 pb-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        <div className="hidden lg:flex lg:col-span-3 xl:col-span-3 flex-col bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-3 justify-between">
          <div>
            <div className="flex items-center gap-2 pb-2.5 mb-2 border-b border-gray-100 text-[#006b5a]">
              <Layers size={17} className="text-[#009b7a]" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-gray-800">
                DANH MỤC SẢN PHẨM
              </h2>
            </div>

            <nav className="flex flex-col gap-1">
              <button
                onClick={() => onSelectCategory && onSelectCategory(null)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group cursor-pointer text-left ${
                  selectedCategory === null
                    ? "bg-[#d9f7eb] text-[#006b5a] font-bold"
                    : "text-gray-700 hover:bg-[#eefbf6] hover:text-[#009b7a]"
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-[#009b7a] group-hover:scale-105 transition-transform shrink-0">
                    <Sparkles size={16} />
                  </span>
                  <span className="truncate">Tất cả sản phẩm</span>
                </div>
                <ChevronRight
                  size={14}
                  className="text-gray-400 group-hover:text-[#009b7a] group-hover:translate-x-0.5 transition-all shrink-0"
                />
              </button>

              {categories.map((cat) => {
                const Icon = getCategoryIcon(cat.name);
                const isSelected = selectedCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => onSelectCategory && onSelectCategory(cat.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group cursor-pointer text-left ${
                      isSelected
                        ? "bg-[#d9f7eb] text-[#006b5a] font-bold"
                        : "text-gray-700 hover:bg-[#eefbf6] hover:text-[#009b7a]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-[#009b7a] group-hover:scale-105 transition-transform shrink-0">
                        <Icon size={16} />
                      </span>
                      <span className="truncate">{cat.name}</span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0 ml-1">
                      {cat.products_count !== undefined && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-gray-100 text-gray-500 group-hover:bg-[#d9f7eb] group-hover:text-[#006b5a]">
                          {cat.products_count}
                        </span>
                      )}
                      <ChevronRight
                        size={14}
                        className="text-gray-400 group-hover:text-[#009b7a] group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="mt-3 pt-2.5 border-t border-gray-100">
            <Link
              to="/products/sale"
              className="flex items-center justify-between p-2 rounded-xl bg-[#eefbf6] hover:bg-[#d9f7eb] text-[#006b5a] transition-colors group text-xs font-bold"
            >
              <div className="flex items-center gap-2 truncate">
                <Flame
                  size={15}
                  className="text-[#009b7a] fill-[#009b7a] shrink-0"
                />
                <span className="truncate">Sản phẩm khuyến mãi</span>
              </div>
              <ChevronRight
                size={14}
                className="group-hover:translate-x-0.5 transition-transform shrink-0"
              />
            </Link>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-6 xl:col-span-6 flex flex-col gap-2.5 min-w-0">
          {highlightTabs.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200/80 p-1 flex items-center gap-1.5 overflow-x-auto scrollbar-hide shadow-2xs">
              <Link
                to="/products/sale"
                className="flex-1 min-w-[120px] py-1 px-2 rounded-lg text-center bg-[#eefbf6] border border-[#a7ebd4] text-[#006b5a] transition-all hover:bg-[#d9f7eb]"
              >
                <div className="text-[11px] font-bold uppercase tracking-tight truncate flex items-center justify-center gap-1">
                  <Flame size={12} className="fill-[#009b7a] text-[#009b7a]" />
                  <span>SĂN SALE HOT</span>
                </div>
                <div className="text-[10px] text-gray-500 font-normal truncate">
                  Ưu đãi mỗi ngày
                </div>
              </Link>

              {highlightTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.link) {
                      window.location.href = tab.link;
                    } else if (tab.catId && onSelectCategory) {
                      onSelectCategory(tab.catId);
                    }
                  }}
                  className="flex-1 min-w-[110px] py-1 px-2 rounded-lg text-center hover:bg-[#eefbf6] text-gray-700 font-medium transition-all cursor-pointer"
                >
                  <div className="text-[11px] font-bold uppercase tracking-tight truncate text-gray-800">
                    {tab.title}
                  </div>
                  <div className="text-[10px] text-gray-500 font-normal truncate">
                    {tab.subtitle}
                  </div>
                </button>
              ))}
            </div>
          )}

          <div
            className="relative overflow-hidden rounded-2xl bg-gray-900 text-white shadow-2xs aspect-[16/9] sm:aspect-[21/10] md:aspect-[16/8] flex flex-col justify-between group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {currentBanner ? (
              <>
                <Link
                  to={currentBanner.link || "/products"}
                  className="absolute inset-0 block"
                >
                  <img
                    src={getImageUrl(
                      currentBanner.imager || currentBanner.image,
                    )}
                    alt={currentBanner.title || "Khuyến mãi"}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/1200x600/1e293b/ffffff?text=DiDong.Com";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                </Link>

                <div className="relative z-10 p-4 sm:p-5 flex flex-col justify-end h-full pointer-events-none">
                  <div className="max-w-xl">
                    <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#009b7a] text-white text-[10px] font-bold uppercase tracking-wider mb-1.5 shadow-xs">
                      KHUYẾN MÃI NỔI BẬT
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight drop-shadow-md truncate">
                      {currentBanner.title}
                    </h3>
                  </div>
                </div>

                {activeBanners.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-[#009b7a] text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer opacity-80 hover:opacity-100 shadow-md"
                      aria-label="Previous Banner"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-[#009b7a] text-white flex items-center justify-center backdrop-blur-sm transition-all cursor-pointer opacity-80 hover:opacity-100 shadow-md"
                      aria-label="Next Banner"
                    >
                      <ChevronRight size={18} />
                    </button>

                    <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                      {activeBanners.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentSlide(idx)}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            currentSlide === idx
                              ? "w-6 bg-[#009b7a]"
                              : "w-1.5 bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-r from-[#009b7a] to-[#006b5a] text-white p-6 text-center">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">
                    DIDONG.COM - CÔNG NGHỆ CHÍNH HÃNG
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 mt-1">
                    Điện thoại thông minh, phụ kiện cao cấp với mức giá ưu đãi
                    nhất
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
            {featuredProducts && featuredProducts.length >= 3 ? (
              featuredProducts.slice(0, 3).map((item) => (
                <Link
                  key={item.id}
                  to={`/products/${item.slug}`}
                  className="bg-white rounded-xl border border-gray-200/80 p-2 shadow-2xs hover:shadow-xs hover:border-[#009b7a]/40 transition-all flex flex-col justify-between text-center group"
                >
                  <div className="font-semibold text-[11px] text-gray-800 group-hover:text-[#009b7a] transition-colors truncate">
                    {item.product_name}
                  </div>
                  <div className="text-[10px] text-[#006b5a] font-bold mt-0.5 truncate">
                    {item.min_price
                      ? formatPrice(item.min_price)
                      : "Liên hệ giá tốt"}
                  </div>
                  <div className="mt-1 text-[9.5px] font-medium text-gray-600 bg-gray-100 group-hover:bg-[#d9f7eb] group-hover:text-[#006b5a] py-0.5 px-1.5 rounded-md mx-auto truncate max-w-full">
                    Xem chi tiết
                  </div>
                </Link>
              ))
            ) : (
              <>
                <Link
                  to="/products/sale"
                  className="bg-white rounded-xl border border-gray-200/80 p-2 shadow-2xs hover:shadow-xs hover:border-[#009b7a]/40 transition-all flex flex-col justify-between text-center group"
                >
                  <div className="font-semibold text-[11px] text-gray-800 group-hover:text-[#009b7a] truncate">
                    Săn Sale Giảm Giá
                  </div>
                  <div className="text-[10px] text-[#006b5a] font-bold truncate">
                    Ưu đãi hàng ngày
                  </div>
                  <div className="mt-1 text-[9.5px] font-medium text-gray-600 bg-gray-100 group-hover:bg-[#d9f7eb] group-hover:text-[#006b5a] py-0.5 px-2 rounded-md mx-auto">
                    Khám phá
                  </div>
                </Link>

                {brands.slice(0, 2).map((brand) => (
                  <Link
                    key={brand.id}
                    to={`/brands/${brand.id}/products`}
                    className="bg-white rounded-xl border border-gray-200/80 p-2 shadow-2xs hover:shadow-xs hover:border-[#009b7a]/40 transition-all flex flex-col justify-between text-center group"
                  >
                    <div className="font-semibold text-[11px] text-gray-800 group-hover:text-[#009b7a] truncate">
                      {brand.name}
                    </div>
                    <div className="text-[10px] text-gray-500 truncate">
                      {brand.products_count
                        ? `${brand.products_count} sản phẩm`
                        : "Chính hãng"}
                    </div>
                    <div className="mt-1 text-[9.5px] font-medium text-gray-600 bg-gray-100 group-hover:bg-[#d9f7eb] group-hover:text-[#006b5a] py-0.5 px-2 rounded-md mx-auto">
                      Xem danh mục
                    </div>
                  </Link>
                ))}
              </>
            )}
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-3 xl:col-span-3 flex-col gap-2.5">
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-3.5">
            {profile ? (
              <>
                <div className="flex items-center justify-between pb-2.5 border-b border-gray-100">
                  <div className="flex items-center gap-2.5 truncate">
                    <div className="w-10 h-10 rounded-full bg-[#009b7a] text-white font-bold text-sm flex items-center justify-center shadow-xs shrink-0">
                      {profile.name
                        ? profile.name.charAt(0).toUpperCase()
                        : "U"}
                    </div>
                    <div className="truncate">
                      <h4 className="text-xs font-bold text-gray-900 truncate">
                        {profile.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                        <span className="truncate">{maskedPhone}</span>
                        {profile.phone && (
                          <button
                            type="button"
                            onClick={() => setShowPhone(!showPhone)}
                            className="text-gray-400 hover:text-gray-600 cursor-pointer shrink-0"
                            title={
                              showPhone
                                ? "Ẩn số điện thoại"
                                : "Hiện số điện thoại"
                            }
                          >
                            {showPhone ? (
                              <EyeOff size={13} />
                            ) : (
                              <Eye size={13} />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#d9f7eb] text-[#006b5a] uppercase tracking-wider shrink-0">
                    {profile.role?.name || "MEMBER"}
                  </span>
                </div>

                <Link
                  to="/profile"
                  className="mt-2.5 flex items-center justify-between px-3 py-2 rounded-xl bg-[#eefbf6] hover:bg-[#d9f7eb] text-[#006b5a] transition-colors group"
                >
                  <span className="text-xs font-semibold">
                    Xem thông tin & đơn hàng
                  </span>
                  <ChevronRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 pb-2.5 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-[#d9f7eb] text-[#009b7a] flex items-center justify-center shrink-0">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-900">
                      Tài khoản khách hàng
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      Đăng nhập để nhận ưu đãi tích điểm
                    </p>
                  </div>
                </div>

                <div className="mt-2.5 flex items-center gap-2">
                  <Link
                    to="/login"
                    className="flex-1 text-center py-1.5 px-3 rounded-xl bg-[#009b7a] hover:bg-[#008366] text-white text-xs font-bold transition-all shadow-2xs"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/register"
                    className="flex-1 text-center py-1.5 px-3 rounded-xl border border-gray-200 hover:border-[#009b7a] hover:text-[#009b7a] text-gray-700 text-xs font-semibold transition-all"
                  >
                    Đăng ký
                  </Link>
                </div>
              </>
            )}
          </div>

          <div className="flex-1 bg-white rounded-2xl border border-gray-200/80 shadow-2xs p-3.5 flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Tiện ích mua sắm
                </div>
                <div className="space-y-1.5 text-xs">
                  <Link
                    to="/orders"
                    className="flex items-center gap-2 text-gray-700 hover:text-[#009b7a] transition-colors py-0.5"
                  >
                    <RotateCcw size={14} className="text-[#009b7a]" />
                    <span>Tra cứu lịch sử đơn hàng</span>
                  </Link>
                  <Link
                    to="/carts"
                    className="flex items-center gap-2 text-gray-700 hover:text-[#009b7a] transition-colors py-0.5"
                  >
                    <ShoppingBag size={14} className="text-[#009b7a]" />
                    <span>Kiểm tra giỏ hàng của bạn</span>
                  </Link>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                  Chính sách bán hàng
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-gray-700">
                    <ShieldCheck
                      size={14}
                      className="text-[#009b7a] shrink-0"
                    />
                    <span>Sản phẩm chính hãng 100%</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Truck size={14} className="text-[#009b7a] shrink-0" />
                    <span>Miễn phí vận chuyển toàn quốc</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <PhoneCall size={14} className="text-[#009b7a] shrink-0" />
                    <span>
                      Hotline tư vấn:{" "}
                      <strong className="text-gray-900">086.252.7719</strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-gray-100">
              <Link
                to="/products/sale"
                className="w-full block text-center py-2 px-3 rounded-xl bg-[#009b7a] hover:bg-[#008366] text-white text-xs font-bold uppercase tracking-wider shadow-2xs transition-colors"
              >
                XEM TẤT CẢ KHUYẾN MÃI
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
