/**
 * LECCIÓN 10: PARALLEL ROUTES
 *
 * Este layout recibe múltiples "slots" que se renderizan simultáneamente.
 * Los slots se definen con carpetas @nombre.
 */

import Link from 'next/link';

export default function ParallelRoutesLayout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-2">10. Parallel Routes</h1>
      <p className="text-gray-400 mb-6">
        Múltiples páginas renderizadas simultáneamente en el mismo layout.
      </p>

      {/* Explicación */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <pre className="text-sm overflow-x-auto text-gray-300">
{`// Estructura de carpetas:
app/learn/07-parallel-routes/
├── @analytics/        ← Slot "analytics"
│   ├── page.tsx
│   └── loading.tsx
├── @team/             ← Slot "team"
│   ├── page.tsx
│   └── loading.tsx
├── layout.tsx         ← Recibe { children, analytics, team }
└── page.tsx           ← El "children" normal`}
        </pre>
      </div>

      {/* Contenido principal (children) */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-green-400 mb-2">📄 children (page.tsx)</h2>
        {children}
      </div>

      {/* Grid con los slots paralelos */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Slot Analytics */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-400 mb-2">📊 @analytics slot</h2>
          {analytics}
        </div>

        {/* Slot Team */}
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-purple-400 mb-2">👥 @team slot</h2>
          {team}
        </div>
      </div>

      <div className="mt-8 flex justify-between">
        <Link href="/learn/06-streaming" className="text-gray-400 hover:text-white">
          ← Streaming
        </Link>
        <Link href="/learn/08-intercepting-routes" className="text-blue-400 hover:underline">
          Siguiente: Intercepting Routes →
        </Link>
      </div>
    </div>
  );
}
