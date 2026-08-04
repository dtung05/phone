import { useEffect, useState } from "react";

export default function ProductImages({ thumbnail, images = [] }) {
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
    if (thumbnail) {
      setCurrentImage(thumbnail);
    }
  }, [thumbnail]);
  return (
    <div className="w-80">
      <div className="border rounded-lg overflow-hidden">
        <img src={currentImage} alt="" className="w-full h-auto object-cover" />
      </div>
      <div className="grid grid-cols-4 gap-2 mt-3">
        {[thumbnail, ...images].map((item, index) => (
          <img
            key={index}
            src={item}
            alt=""
            onClick={() => setCurrentImage(item)}
            className={`cursor-pointer border rounded-md p-1 transition
              ${
                currentImage === item
                  ? "border-blue-500"
                  : "border-gray-300 hover:border-blue-400"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
