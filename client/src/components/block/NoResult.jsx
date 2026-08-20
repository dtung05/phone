

const NoResult = ({ title }) => {
  return (
    <div className="my-12 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 py-16 px-4 text-center">
      <div className="mb-4 rounded-full bg-gray-100 p-4 text-gray-400">
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <p className="text-lg font-semibold text-gray-800">{title}</p>
      <p className="mt-1 max-w-sm text-sm text-gray-500">
        Hãy thử kiểm tra lại lỗi chính tả hoặc tìm kiếm với từ khóa khác tổng
        quát hơn.
      </p>
    </div>
  );
};

export default NoResult;
