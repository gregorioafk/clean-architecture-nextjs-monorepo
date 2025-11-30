export default function AnalyticsLoading() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="flex justify-between">
        <div className="h-4 bg-gray-700 rounded w-20"></div>
        <div className="h-4 bg-gray-700 rounded w-16"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-4 bg-gray-700 rounded w-24"></div>
        <div className="h-4 bg-gray-700 rounded w-16"></div>
      </div>
      <div className="flex justify-between">
        <div className="h-4 bg-gray-700 rounded w-20"></div>
        <div className="h-4 bg-gray-700 rounded w-12"></div>
      </div>
      <p className="text-xs text-gray-500 pt-2">⏳ Cargando analytics...</p>
    </div>
  );
}
