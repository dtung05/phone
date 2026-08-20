const Error = ({
  title = "Hệ thống gặp sự cố",
  content = " Vui lòng thử lại sau hoặc kiểm tra kết nối mạng.",
}) => {
  return (
    <div className="mx-auto my-12 max-w-md rounded-2xl  p-6 text-center backdrop-blur-sm">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-500">
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <p className="font-semibold text-red-600"> {title}</p>
      <p className="mt-1 text-xs text-red-400">{content}</p>
    </div>
  );
};

export default Error;
