export default function ProductSpecification({ specifications }) {
  return (
    <div className="mt-10 bg-white rounded-2xl shadow-sm border p-6">
      <h2 className="text-2xl font-bold mb-6">Thông số kỹ thuật</h2>

      <div className="space-y-3">
        {Object.entries(specifications).map(([key, value]) => (
          <div
            key={key}
            className="flex justify-between items-center border-b last:border-0 pb-3"
          >
            <span className="text-gray-500">{key}</span>

            <span className="font-medium text-right">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
