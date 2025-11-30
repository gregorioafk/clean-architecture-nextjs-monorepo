/**
 * DEMO: PÁGINA DENTRO DE UN LAYOUT
 */

export default function LayoutsOverviewPage() {
  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-4">Layouts Overview</h1>

      <div className="bg-gray-800 p-4 rounded-lg">
        <p className="text-gray-300 mb-4">
          Esta página está envuelta por el layout de esta carpeta.
        </p>

        <ul className="list-disc list-inside text-gray-400 space-y-2">
          <li>El sidebar de la izquierda viene del <code>layout.tsx</code></li>
          <li>Este contenido viene del <code>page.tsx</code></li>
          <li>Navega a Profile o Settings para ver cómo el layout persiste</li>
        </ul>
      </div>

      <div className="mt-6 p-4 bg-green-900/30 border border-green-600 rounded">
        <p className="text-green-400 font-medium">✅ El layout NO se re-renderiza</p>
        <p className="text-gray-300 text-sm mt-1">
          Cuando navegas entre páginas dentro de este layout, el sidebar
          mantiene su estado y no se vuelve a montar.
        </p>
      </div>
    </div>
  );
}
