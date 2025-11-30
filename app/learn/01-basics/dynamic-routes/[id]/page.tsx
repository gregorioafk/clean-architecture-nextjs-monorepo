/**
 * EJEMPLO: RUTA DINÁMICA [id]
 *
 * Esta página se renderiza para cualquier URL que matchee:
 * /learn/01-basics/dynamic-routes/[algo]
 *
 * El valor de [algo] se recibe en params.id
 */

import Link from 'next/link';

// En Next.js 15, params es una Promise
export default async function DynamicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await para obtener el valor
  const { id } = await params;

  // Simular obtener datos basados en el ID
  const data = {
    id,
    title: `Elemento ${id}`,
    description: `Esta es la página del elemento con ID: ${id}`,
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <div className="mb-6">
        <Link
          href="/learn/01-basics/dynamic-routes"
          className="text-gray-400 hover:text-white"
        >
          ← Volver a Rutas Dinámicas
        </Link>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

        <div className="space-y-4">
          <div className="bg-gray-900 p-4 rounded">
            <p className="text-gray-400 text-sm">ID recibido en params:</p>
            <p className="text-green-400 text-2xl font-mono">{data.id}</p>
          </div>

          <p className="text-gray-300">{data.description}</p>

          <div className="text-sm text-gray-500">
            Renderizado: {data.createdAt}
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-900 rounded">
          <p className="text-gray-400 text-sm mb-2">Código de esta página:</p>
          <pre className="text-xs overflow-x-auto">
{`// app/learn/01-basics/dynamic-routes/[id]/page.tsx

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <h1>ID: {id}</h1>;
}`}
          </pre>
        </div>
      </div>

      <div className="mt-6 flex gap-3 flex-wrap">
        <Link
          href="/learn/01-basics/dynamic-routes/otro-id"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Ir a /otro-id
        </Link>
        <Link
          href="/learn/01-basics/dynamic-routes/12345"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Ir a /12345
        </Link>
      </div>
    </div>
  );
}
