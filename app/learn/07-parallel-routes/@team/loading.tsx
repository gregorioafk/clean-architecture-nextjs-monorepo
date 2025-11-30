export default function TeamLoading() {
  return (
    <div className="animate-pulse space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
          <div>
            <div className="h-4 bg-gray-700 rounded w-24 mb-1"></div>
            <div className="h-3 bg-gray-700 rounded w-16"></div>
          </div>
        </div>
      ))}
      <p className="text-xs text-gray-500 pt-2">⏳ Cargando equipo...</p>
    </div>
  );
}
