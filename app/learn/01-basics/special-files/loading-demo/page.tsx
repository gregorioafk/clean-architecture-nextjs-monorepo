/**
 * DEMO: loading.tsx
 *
 * Esta página simula una carga lenta para demostrar loading.tsx
 */

import Link from 'next/link';

async function slowData() {
  await new Promise((r) => setTimeout(r, 2000));
  return {
    message: '¡Datos cargados!',
    timestamp: new Date().toISOString().slice(11, 19),
  };
}

export default async function LoadingDemoPage() {
  const data = await slowData();

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Demo: loading.tsx</h1>

      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-green-400 mb-4">✅ Página Cargada</h2>
        <p className="text-gray-300 mb-2">{data.message}</p>
        <p className="text-gray-500 text-sm">Timestamp: {data.timestamp}</p>
      </section>

      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-yellow-400 mb-2">¿Qué pasó?</h2>
        <p className="text-gray-300 text-sm">
          Mientras esta página tardaba 2 segundos en cargar, viste el contenido de{' '}
          <code className="bg-gray-700 px-1 rounded">loading.tsx</code>.
          Next.js automáticamente envuelve la página con Suspense.
        </p>
      </div>

      <div className="flex gap-4">
        <Link href="/learn/01-basics/special-files" className="text-gray-400 hover:text-white">
          ← Volver
        </Link>
        <Link href="/learn/01-basics/special-files/loading-demo" className="text-blue-400 hover:underline">
          Recargar demo
        </Link>
      </div>
    </div>
  );
}
