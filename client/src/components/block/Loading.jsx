export default function Loading({ text = "Đang tải..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>

      <p className="text-sm text-gray-500">{text}</p>
    </div>
  );
}
