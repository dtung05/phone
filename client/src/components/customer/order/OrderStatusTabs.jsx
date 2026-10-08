import React from "react";

const OrderStatusTabs = ({ statusTab, status, setStatus, setPage }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-1.5 shadow-2xs mb-4">
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar scroll-smooth">
        {statusTab.map((tab) => {
          const isActive = status === tab.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => {
                setStatus(tab.value);
                setPage(1);
              }}
              className={`flex-1 min-w-[95px] py-2 px-3 text-xs sm:text-sm font-semibold rounded-xl transition-all whitespace-nowrap text-center cursor-pointer ${
                isActive
                  ? "bg-[#009b7a] text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/70"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStatusTabs;
