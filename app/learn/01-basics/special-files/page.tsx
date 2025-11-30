/**
 * LECCIÓN: Archivos Especiales en Next.js
 */

import Link from 'next/link';

export default function SpecialFilesPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Archivos Especiales</h1>

      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-green-400 mb-4">📁 Convención sobre Configuración</h2>
        <p className="text-gray-300 mb-4">
          Next.js usa nombres de archivo especiales para definir comportamientos automáticos.
        </p>

        <div className="space-y-4">
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-yellow-400 font-medium">page.tsx</h3>
            <p className="text-gray-400 text-sm">Define una ruta accesible. Sin este archivo, la carpeta no es una ruta.</p>
          </div>

          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-yellow-400 font-medium">layout.tsx</h3>
            <p className="text-gray-400 text-sm">UI compartida que envuelve páginas. Persiste entre navegaciones.</p>
          </div>

          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-yellow-400 font-medium">loading.tsx</h3>
            <p className="text-gray-400 text-sm">UI de carga automática mientras se carga la página.</p>
            <Link href="/learn/01-basics/special-files/loading-demo" className="text-blue-400 text-sm hover:underline">
              → Ver demo
            </Link>
          </div>

          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-yellow-400 font-medium">error.tsx</h3>
            <p className="text-gray-400 text-sm">Error boundary para manejar errores en la ruta.</p>
            <Link href="/learn/01-basics/special-files/error-demo" className="text-blue-400 text-sm hover:underline">
              → Ver demo
            </Link>
          </div>

          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-yellow-400 font-medium">not-found.tsx</h3>
            <p className="text-gray-400 text-sm">UI personalizada para errores 404.</p>
          </div>

          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-yellow-400 font-medium">template.tsx</h3>
            <p className="text-gray-400 text-sm">Similar a layout pero se re-monta en cada navegación. Ideal para analytics.</p>
            <Link href="/learn/01-basics/special-files/template-demo" className="text-blue-400 text-sm hover:underline">
              → Ver demo (Dashboard con Analytics)
            </Link>
          </div>
        </div>
      </section>

      <div className="flex gap-4">
        <Link href="/learn/01-basics" className="text-gray-400 hover:text-white">
          ← Volver
        </Link>
      </div>
    </div>
  );
}
