import { useState, useEffect } from "react";
import { ArrowUp, Headphones, PhoneCall, X } from "lucide-react";

export default function FloatingActions() {
  const [showContactModal, setShowContactModal] = useState(false);

  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-2.5">
      <button
        onClick={() => setShowContactModal(!showContactModal)}
        className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#009b7a] hover:bg-[#008366] text-white text-xs font-semibold shadow-md transition-all transform hover:-translate-y-0.5 cursor-pointer"
        title="Liên hệ tư vấn"
      >
        <span>Liên hệ</span>
        <Headphones size={15} />
      </button>

      {showContactModal && (
        <div className="absolute bottom-24 right-0 w-64 bg-white rounded-2xl border border-gray-200 shadow-xl p-4 animate-in fade-in slide-in-from-bottom-2 text-gray-800">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h4 className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
              <Headphones size={15} className="text-[#009b7a]" />
              <span>Hỗ trợ trực tuyến</span>
            </h4>
            <button
              onClick={() => setShowContactModal(false)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={15} />
            </button>
          </div>

          <div className="space-y-2 mt-3 text-xs">
            <a
              href="tel:19002091"
              className="flex items-center gap-2 p-2 rounded-xl bg-[#eefbf6] hover:bg-[#d9f7eb] text-[#006b5a] font-semibold transition-colors"
            >
              <PhoneCall size={15} className="text-[#009b7a]" />
              <div>
                <p className="text-[11px] text-gray-500 font-normal">
                  Hotline miễn phí
                </p>
                <p className="font-bold">0862527719 (8h - 21h)</p>
              </div>
            </a>

            <div className="p-2 rounded-xl bg-gray-50 text-[11px] text-gray-600">
              💬 Hỗ trợ tư vấn sản phẩm và giải đáp thắc mắc.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
