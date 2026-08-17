import React from "react";

const OrderStatusTabs = ({ statusTab, status, setStatus, setPage }) => {
  return (
    <div className="bg-white border-b border-gray-200 mb-4 sticky top-0 z-10 shadow-sm">
      <div className="flex overflow-x-auto no-scrollbar">
        {statusTab.map((tab) => {
          const isActive = status === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => {
                setStatus(tab.value);
                setPage(1);
              }}
              className={`flex-1 min-w-[110px] py-3.5 px-4 text-sm font-semibold transition-all whitespace-nowrap border-b-2 text-center ${
                isActive
                  ? "border-[#0f925f] text-[#0f925f] bg-emerald-50/30"
                  : "border-transparent text-gray-600 hover:text-gray-900"
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
