/**
 * LECCIÓN 09: STREAMING Y SUSPENSE
 *
 * Cómo cargar contenido progresivamente sin bloquear la página.
 */

import Link from 'next/link';
import { Suspense } from 'react';

// Componentes que simulan carga lenta
async function SlowStats() {
  await new Promise((r) => setTimeout(r, 2000));
  return (
    <div className="bg-blue-900/30 border border-blue-600 p-4 rounded">
      <h3 className="font-medium text-blue-400">📊 Estadísticas</h3>
      <p className="text-gray-300 mt-2">Usuarios: 1,234 | Ventas: $45,678</p>
      <p className="text-gray-500 text-xs mt-1">Cargado después de 2 segundos</p>
    </div>
  );
}

async function SlowRecommendations() {
  await new Promise((r) => setTimeout(r, 3000));
  return (
    <div className="bg-purple-900/30 border border-purple-600 p-4 rounded">
      <h3 className="font-medium text-purple-400">💡 Recomendaciones</h3>
      <ul className="text-gray-300 mt-2 space-y-1">
        <li>• Producto A - $99</li>
        <li>• Producto B - $149</li>
        <li>• Producto C - $199</li>
      </ul>
      <p className="text-gray-500 text-xs mt-1">Cargado después de 3 segundos</p>
    </div>
  );
}

async function SlowReviews() {
  await new Promise((r) => setTimeout(r, 4000));
  return (
    <div className="bg-green-900/30 border border-green-600 p-4 rounded">
      <h3 className="font-medium text-green-400">⭐ Reviews</h3>
      <div className="text-gray-300 mt-2 space-y-2">
        <p>&quot;Excelente producto!&quot; - Usuario1</p>
        <p>&quot;Muy recomendado&quot; - Usuario2</p>
      </div>
      <p className="text-gray-500 text-xs mt-1">Cargado después de 4 segundos</p>
    </div>
  );
}

// Skeleton de carga
function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-gray-700 rounded ${className}`}>
      <div className="h-4 bg-gray-600 rounded w-1/4 mb-4"></div>
      <div className="h-3 bg-gray-600 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-600 rounded w-1/2"></div>
    </div>
  );
}

export default function StreamingPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">09. Streaming y Suspense</h1>

      {/* Explicación */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-green-400 mb-4">🌊 ¿Qué es Streaming?</h2>
        <p className="text-gray-300 mb-4">
          Streaming permite enviar partes de la página al cliente progresivamente,
          en lugar de esperar a que todo esté listo.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// Sin streaming (todo o nada):
// Usuario espera 4 segundos viendo página en blanco

// Con streaming:
// 1. HTML inicial se envía inmediatamente
// 2. Cada sección se envía cuando está lista
// 3. Usuario ve contenido progresivamente

import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>  {/* Inmediato */}

      <Suspense fallback={<Skeleton />}>
        <SlowStats />     {/* Se muestra cuando está listo */}
      </Suspense>

      <Suspense fallback={<Skeleton />}>
        <SlowReviews />   {/* Independiente de Stats */}
      </Suspense>
    </div>
  );
}`}
        </pre>
      </section>

      {/* Demo en vivo */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">🎮 Demo en Vivo</h2>
        <p className="text-gray-300 mb-4">
          Observa cómo cada sección aparece independientemente:
        </p>

        <div className="space-y-4">
          {/* Esta sección es inmediata */}
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="font-medium text-white">📌 Contenido Estático</h3>
            <p className="text-gray-400 mt-1">
              Esto se muestra inmediatamente (no está en Suspense)
            </p>
          </div>

          {/* Stats - 2 segundos */}
          <Suspense fallback={<Skeleton className="p-4" />}>
            <SlowStats />
          </Suspense>

          {/* Recommendations - 3 segundos */}
          <Suspense fallback={<Skeleton className="p-4" />}>
            <SlowRecommendations />
          </Suspense>

          {/* Reviews - 4 segundos */}
          <Suspense fallback={<Skeleton className="p-4" />}>
            <SlowReviews />
          </Suspense>
        </div>
      </section>

      {/* loading.tsx */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-purple-400 mb-4">📁 loading.tsx</h2>
        <p className="text-gray-300 mb-4">
          Next.js convierte automáticamente <code>loading.tsx</code> en un Suspense boundary.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// Estructura:
app/
└── dashboard/
    ├── loading.tsx   ← Se muestra mientras page.tsx carga
    └── page.tsx      ← Componente async

// loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
    </div>
  );
}

// Internamente, Next.js hace esto:
<Suspense fallback={<Loading />}>
  <Page />
</Suspense>`}
        </pre>
      </section>

      {/* Nested Suspense */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-orange-400 mb-4">🪆 Suspense Anidado</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// Puedes anidar Suspense para control granular
export default function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Sección con múltiples componentes async */}
      <Suspense fallback={<BigSkeleton />}>
        <DashboardHeader />

        {/* Suspense interno - se resuelve independientemente */}
        <Suspense fallback={<ChartSkeleton />}>
          <Chart />
        </Suspense>

        <Suspense fallback={<TableSkeleton />}>
          <DataTable />
        </Suspense>
      </Suspense>
    </div>
  );
}

// El Suspense externo muestra BigSkeleton
// hasta que DashboardHeader esté listo.
// Luego los Suspense internos se resuelven
// independientemente.`}
        </pre>
      </section>

      {/* Sequential vs Parallel */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">⚡ Sequential vs Parallel Streaming</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-yellow-400 font-medium mb-2">Sequential (Waterfall)</h3>
            <pre className="text-xs overflow-x-auto">
{`// Si un componente depende de otro
async function Parent() {
  const user = await getUser();

  return (
    <Suspense fallback={...}>
      {/* Espera a Parent */}
      <Child userId={user.id} />
    </Suspense>
  );
}

// Total: getUser + getChildData`}
            </pre>
          </div>

          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-green-400 font-medium mb-2">Parallel (Independiente)</h3>
            <pre className="text-xs overflow-x-auto">
{`// Suspense boundaries separados
function Page() {
  return (
    <>
      <Suspense fallback={...}>
        <UserCard />
      </Suspense>

      <Suspense fallback={...}>
        <Products />
      </Suspense>
    </>
  );
}

// Total: max(getUser, getProducts)`}
            </pre>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="bg-yellow-900/30 border border-yellow-600 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-yellow-400 mb-2">💡 Best Practices</h2>
        <ul className="text-gray-300 space-y-2">
          <li>✅ Usa Suspense para contenido que tarda en cargar</li>
          <li>✅ Muestra skeletons que coincidan con el contenido final</li>
          <li>✅ Agrupa componentes relacionados en el mismo Suspense</li>
          <li>✅ Usa loading.tsx para páginas enteras</li>
          <li>❌ No uses Suspense para contenido instantáneo</li>
          <li>❌ No anides demasiados Suspense (confunde al usuario)</li>
        </ul>
      </section>

      <div className="mt-8 flex justify-between">
        <Link href="/learn/04-server-actions" className="text-gray-400 hover:text-white">
          ← Server Actions
        </Link>
        <Link href="/learn/07-parallel-routes" className="text-blue-400 hover:underline">
          Siguiente: Parallel Routes →
        </Link>
      </div>
    </div>
  );
}
