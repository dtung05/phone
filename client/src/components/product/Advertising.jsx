import React, { useState, useEffect, useRef } from "react";

const Advertising = ({ banners = [] }) => {
  const [currentMainSlide, setCurrentMainSlide] = useState(0);
  const [currentLeftSlide, setCurrentLeftSlide] = useState(0);
  const [isMainHovered, setIsMainHovered] = useState(false);
  const minContainerRef = useRef(null);

  const activeBanners = banners.filter(
    (item) => String(item.is_active) === "1",
  );

  const leftBanners = activeBanners.filter((item) => item.position === "left");
  const mainBanners = activeBanners.filter((item) => item.position === "main");
  const minBanners = activeBanners.filter(
    (item) =>
      item.position === "min" ||
      (item.position !== "left" && item.position !== "main"),
  );

  useEffect(() => {
    if (mainBanners.length <= 1 || isMainHovered) return;
    const interval = setInterval(() => {
      setCurrentMainSlide((prev) => (prev + 1) % mainBanners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [mainBanners.length, isMainHovered]);

  useEffect(() => {
    if (leftBanners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentLeftSlide((prev) => (prev + 1) % leftBanners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [leftBanners.length]);

  useEffect(() => {
    const container = minContainerRef.current;
    if (!container || minBanners.length === 0) return;

    const scrollInterval = setInterval(() => {
      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 5
      ) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: 200, behavior: "smooth" });
      }
    }, 3500);

    return () => clearInterval(scrollInterval);
  }, [minBanners.length]);

  const handleMainPrev = () => {
    setCurrentMainSlide(
      (prev) => (prev - 1 + mainBanners.length) % mainBanners.length,
    );
  };

  const handleMainNext = () => {
    setCurrentMainSlide((prev) => (prev + 1) % mainBanners.length);
  };

  if (!activeBanners.length) return null;

  return (
    <div className="max-w-7xl mx-auto p-4 flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {leftBanners.length > 0 && (
          <div className="md:col-span-1 relative overflow-hidden rounded-xl shadow bg-gray-900 aspect-[3/4] md:aspect-auto h-full">
            <div
              className="flex flex-col h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateY(-${currentLeftSlide * 100}%)` }}
            >
              {leftBanners.map((banner) => (
                <a
                  key={banner.id}
                  href={banner.link}
                  className="min-w-full h-full min-h-full relative block flex-shrink-0"
                >
                  <img
                    src={banner.imager}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <p className="text-xs md:text-sm font-semibold text-white truncate">
                      {banner.title}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {leftBanners.length > 1 && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-10">
                {leftBanners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentLeftSlide(idx)}
                    className={`w-1.5 rounded-full transition-all duration-300 ${
                      currentLeftSlide === idx
                        ? "h-4 bg-white"
                        : "h-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {mainBanners.length > 0 && (
          <div
            className={`${
              leftBanners.length > 0 ? "md:col-span-3" : "md:col-span-4"
            } relative overflow-hidden rounded-xl shadow-lg bg-gray-900 aspect-[21/9] group`}
            onMouseEnter={() => setIsMainHovered(true)}
            onMouseLeave={() => setIsMainHovered(false)}
          >
            <div
              className="flex h-full transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentMainSlide * 100}%)` }}
            >
              {mainBanners.map((banner) => (
                <a
                  key={banner.id}
                  href={banner.link}
                  className="min-w-full h-full relative block flex-shrink-0"
                >
                  <img
                    src={banner.imager}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 md:p-6 text-white">
                    <span className="w-max px-2 py-0.5 bg-red-600 text-[10px] md:text-xs font-bold rounded mb-1">
                      HOT
                    </span>
                    <h3 className="text-base md:text-xl font-bold truncate">
                      {banner.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>

            {mainBanners.length > 1 && (
              <>
                <button
                  onClick={handleMainPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label="Previous Slide"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <button
                  onClick={handleMainNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  aria-label="Next Slide"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {mainBanners.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentMainSlide(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentMainSlide === idx
                          ? "w-5 bg-white"
                          : "w-1.5 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {minBanners.length > 0 && (
        <div className="relative">
          <div
            ref={minContainerRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth py-1"
          >
            {minBanners.map((banner) => (
              <a
                key={banner.id}
                href={banner.link}
                className="relative flex-shrink-0 w-36 sm:w-44 md:w-52 h-16 md:h-20 rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all group bg-gray-50"
              >
                <img
                  src={banner.imager}
                  alt={banner.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />
                <div className="absolute inset-x-0 bottom-0 bg-black/60 p-1 text-center">
                  <p className="text-[11px] font-medium text-white truncate">
                    {banner.title}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Advertising;
