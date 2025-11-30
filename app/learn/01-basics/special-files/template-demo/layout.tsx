/**
 * LAYOUT.TSX - NO se re-monta entre navegaciones
 *
 * Este layout persiste su estado entre navegaciones.
 * El timestamp solo se genera UNA VEZ cuando se carga inicialmente.
 */

import Link from 'next/link';

// Este timestamp se genera en el servidor y NO cambia entre navegaciones
const layoutCreatedAt = new Date().toISOString().slice(11, 19);  // "04:58:26";

export default function TemplateDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <div className="mb-6">
        <Link href="/learn/01-basics/special-files" className="text-gray-400 hover:text-white text-sm">
          ← Volver a Archivos Especiales
        </Link>
        <h1 className="text-3xl font-bold mt-2">Demo: template.tsx vs layout.tsx</h1>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Sidebar - Parte del Layout (persiste) */}
        <aside className="col-span-1">
          <div className="bg-gray-800 rounded-lg p-4 sticky top-20">
            <h3 className="font-semibold text-white mb-4">📁 Navegación</h3>

            <nav className="space-y-2 mb-6">
              <Link
                href="/learn/01-basics/special-files/template-demo"
                className="block px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/learn/01-basics/special-files/template-demo/users"
                className="block px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                Usuarios
              </Link>
              <Link
                href="/learn/01-basics/special-files/template-demo/products"
                className="block px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                Productos
              </Link>
              <Link
                href="/learn/01-basics/special-files/template-demo/settings"
                className="block px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
              >
                Configuración
              </Link>
            </nav>

            {/* Este timestamp NO cambia entre navegaciones */}
            <div className="border-t border-gray-700 pt-4">
              <p className="text-xs text-gray-500 mb-1">Layout creado:</p>
              <p className="text-sm text-green-400 font-mono">{layoutCreatedAt}</p>
              <p className="text-xs text-gray-600 mt-1">
                (No cambia al navegar)
              </p>
            </div>
          </div>
        </aside>

        {/* Contenido principal - Envuelto por template.tsx */}
        <main className="col-span-3">
          {children}
        </main>
      </div>
    </div>
  );
}
