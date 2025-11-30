/**
 * LOADING.TSX
 *
 * Este archivo se muestra automáticamente mientras page.tsx carga.
 * Next.js envuelve la página con React Suspense internamente.
 */

export default function Loading() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Demo: loading.tsx</h1>

      <section className="bg-gray-800 p-6 rounded-lg mb-6 animate-pulse">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">⏳ Cargando...</h2>
        <div className="space-y-3">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-700 rounded w-1/2"></div>
        </div>
      </section>

      <div className="bg-gray-800 p-4 rounded-lg">
        <p className="text-gray-400 text-sm">
          Este es el contenido de <code className="bg-gray-700 px-1 rounded">loading.tsx</code>.
          Se muestra mientras la página real se carga.
        </p>
      </div>
    </div>
  );
}
