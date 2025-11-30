/**
 * LECCIÓN 11: INTERCEPTING ROUTES
 *
 * Permite mostrar una ruta en el contexto de otra (ej: modales).
 */

import Link from 'next/link';

const photos = [
  { id: '1', title: 'Montaña', color: 'bg-blue-600' },
  { id: '2', title: 'Playa', color: 'bg-yellow-600' },
  { id: '3', title: 'Bosque', color: 'bg-green-600' },
  { id: '4', title: 'Ciudad', color: 'bg-purple-600' },
];

export default function InterceptingRoutesPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">11. Intercepting Routes</h1>

      {/* Explicación */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-green-400 mb-4">🔀 ¿Qué son?</h2>
        <p className="text-gray-300 mb-4">
          Intercepting Routes permiten mostrar una ruta diferente manteniendo
          el contexto actual. Perfecto para modales que son compartibles por URL.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// Estructura para modal de fotos:
app/
├── @modal/
│   ├── (.)photos/[id]/page.tsx  ← Intercepta /photos/[id]
│   └── default.tsx              ← Cuando no hay modal
├── photos/
│   ├── page.tsx                 ← Lista de fotos
│   └── [id]/page.tsx            ← Página completa de foto
├── layout.tsx                   ← Muestra children + modal
└── page.tsx

// Convenciones:
// (.)   → Intercepta mismo nivel
// (..)  → Intercepta un nivel arriba
// (..)(..) → Dos niveles arriba
// (...) → Intercepta desde root`}
        </pre>
      </section>

      {/* Cómo funciona */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">⚙️ Cómo Funciona</h2>

        <div className="space-y-4">
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-yellow-400 font-medium mb-2">Soft Navigation (Link)</h3>
            <p className="text-gray-300 text-sm">
              Al hacer click en un Link, Next.js intercepta la navegación y
              muestra el contenido de <code>@modal/(.)photos/[id]</code> como modal,
              mientras mantiene la página actual visible detrás.
            </p>
          </div>

          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-green-400 font-medium mb-2">Hard Navigation (URL directa)</h3>
            <p className="text-gray-300 text-sm">
              Si el usuario navega directamente a <code>/photos/123</code> (o refresca),
              se muestra la página completa <code>photos/[id]/page.tsx</code>.
            </p>
          </div>
        </div>
      </section>

      {/* Demo visual */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-purple-400 mb-4">🖼️ Demo: Galería de Fotos</h2>
        <p className="text-gray-300 mb-4">
          Click en una foto para ver el modal. Nota cómo la URL cambia pero
          la galería sigue visible detrás.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <Link
              key={photo.id}
              href={`/learn/08-intercepting-routes/photos/${photo.id}`}
              className={`${photo.color} aspect-square rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity`}
            >
              <span className="text-white font-medium">{photo.title}</span>
            </Link>
          ))}
        </div>

        <p className="text-gray-500 text-sm mt-4">
          💡 En una implementación completa, el click abriría un modal.
          Para ver la página completa, visita directamente{' '}
          <Link href="/learn/08-intercepting-routes/photos/1" className="text-blue-400 hover:underline">
            /photos/1
          </Link>
        </p>
      </section>

      {/* Código del modal */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-orange-400 mb-4">📝 Implementación</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// layout.tsx - Renderiza children + modal slot
export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}  {/* Se muestra sobre el contenido */}
    </>
  );
}

// @modal/(.)photos/[id]/page.tsx - El modal
export default function PhotoModal({ params }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2>Foto {params.id}</h2>
        <Link href="/gallery">Cerrar</Link>
      </div>
    </div>
  );
}

// @modal/default.tsx - Cuando no hay modal
export default function Default() {
  return null;  // No renderiza nada
}

// photos/[id]/page.tsx - Página completa (hard navigation)
export default function PhotoPage({ params }) {
  return (
    <div>
      <h1>Foto {params.id}</h1>
      <img src={\`/photos/\${params.id}.jpg\`} />
    </div>
  );
}`}
        </pre>
      </section>

      {/* Casos de uso */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">🎯 Casos de Uso</h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-white font-medium mb-2">📷 Galería de fotos</h3>
            <p className="text-gray-400 text-sm">
              Modal para ver foto grande, URL compartible.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-white font-medium mb-2">🛒 Quick view de producto</h3>
            <p className="text-gray-400 text-sm">
              Preview sin salir de la lista de productos.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-white font-medium mb-2">🔐 Login modal</h3>
            <p className="text-gray-400 text-sm">
              Modal de login que mantiene el contexto.
            </p>
          </div>
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-white font-medium mb-2">📝 Editar inline</h3>
            <p className="text-gray-400 text-sm">
              Formulario de edición en modal.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8 flex justify-between">
        <Link href="/learn/07-parallel-routes" className="text-gray-400 hover:text-white">
          ← Parallel Routes
        </Link>
        <Link href="/learn/10-middleware-auth" className="text-blue-400 hover:underline">
          Siguiente: Middleware →
        </Link>
      </div>
    </div>
  );
}
