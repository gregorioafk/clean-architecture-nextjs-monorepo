/**
 * LECCIÓN 01: ARCHIVOS ESPECIALES DE NEXT.JS
 *
 * Next.js usa convenciones de archivos para crear rutas y comportamientos.
 * Esta página explica cada archivo especial.
 */

import Link from 'next/link';

export default function BasicsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">01. Archivos Especiales</h1>

      <div className="space-y-6">
        {/* page.tsx */}
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-green-400 mb-2">📄 page.tsx</h2>
          <p className="text-gray-300 mb-4">
            Define una ruta accesible. Sin page.tsx, la carpeta no es una ruta.
          </p>
          <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// app/about/page.tsx → Ruta: /about
export default function AboutPage() {
  return <h1>About</h1>;
}`}
          </pre>
        </section>

        {/* layout.tsx */}
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-blue-400 mb-2">🏗️ layout.tsx</h2>
          <p className="text-gray-300 mb-4">
            UI compartida entre páginas. NO se re-renderiza al navegar.
            Mantiene estado entre navegaciones.
          </p>
          <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// app/dashboard/layout.tsx
export default function DashboardLayout({
  children, // La página actual
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Sidebar />  {/* Siempre visible */}
      {children}   {/* Cambia según la ruta */}
    </div>
  );
}`}
          </pre>
        </section>

        {/* loading.tsx */}
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">⏳ loading.tsx</h2>
          <p className="text-gray-300 mb-4">
            UI de carga automática mientras la página carga.
            Usa React Suspense internamente.
          </p>
          <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-700 rounded w-1/4 mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-3/4"></div>
    </div>
  );
}`}
          </pre>
          <Link
            href="/learn/01-basics/special-files/loading-demo"
            className="inline-block mt-3 text-yellow-400 hover:underline"
          >
            → Ver demo de loading.tsx
          </Link>
        </section>

        {/* error.tsx */}
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-red-400 mb-2">❌ error.tsx</h2>
          <p className="text-gray-300 mb-4">
            Maneja errores en runtime. DEBE ser Client Component.
            Tiene acceso a <code>reset()</code> para reintentar.
          </p>
          <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// app/dashboard/error.tsx
'use client'; // ¡Obligatorio!

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <h2>Algo salió mal: {error.message}</h2>
      <button onClick={() => reset()}>
        Intentar de nuevo
      </button>
    </div>
  );
}`}
          </pre>
          <Link
            href="/learn/01-basics/special-files/error-demo"
            className="inline-block mt-3 text-red-400 hover:underline"
          >
            → Ver demo de error.tsx
          </Link>
        </section>

        {/* not-found.tsx */}
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-purple-400 mb-2">🔍 not-found.tsx</h2>
          <p className="text-gray-300 mb-4">
            Página 404 personalizada. Se activa con <code>notFound()</code> o rutas inexistentes.
          </p>
          <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// app/not-found.tsx (global)
// o app/products/not-found.tsx (específico)

import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Página no encontrada</h2>
      <Link href="/">Volver al inicio</Link>
    </div>
  );
}

// En un Server Component:
import { notFound } from 'next/navigation';

async function getProduct(id: string) {
  const product = await db.find(id);
  if (!product) notFound(); // Activa not-found.tsx
  return product;
}`}
          </pre>
        </section>

        {/* template.tsx */}
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-cyan-400 mb-2">🔄 template.tsx</h2>
          <p className="text-gray-300 mb-4">
            Similar a layout, pero SE RE-RENDERIZA en cada navegación.
            Útil para animaciones de entrada/salida y analytics.
          </p>
          <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// app/dashboard/template.tsx
'use client';

import { motion } from 'framer-motion';

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

// DIFERENCIA:
// layout.tsx  → NO se re-renderiza (mantiene estado)
// template.tsx → SÍ se re-renderiza (nuevo estado cada vez)`}
          </pre>
          <Link
            href="/learn/01-basics/special-files/template-demo"
            className="inline-block mt-3 text-cyan-400 hover:underline"
          >
            → Ver demo de template.tsx (Dashboard con Analytics)
          </Link>
        </section>

        {/* Jerarquía */}
        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-2">📐 Jerarquía de Renderizado</h2>
          <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`<Layout>           {/* layout.tsx */}
  <Template>       {/* template.tsx */}
    <ErrorBoundary>  {/* error.tsx */}
      <Suspense fallback={<Loading />}>  {/* loading.tsx */}
        <Page />     {/* page.tsx */}
      </Suspense>
    </ErrorBoundary>
  </Template>
</Layout>`}
          </pre>
        </section>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href="/learn" className="text-gray-400 hover:text-white">
          ← Volver al índice
        </Link>
        <Link href="/learn/01-basics/server-client" className="text-blue-400 hover:underline">
          Siguiente: Server vs Client →
        </Link>
      </div>
    </div>
  );
}
