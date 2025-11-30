/**
 * LECCIÓN 02: SERVER COMPONENTS vs CLIENT COMPONENTS
 *
 * La diferencia más importante en Next.js App Router.
 * Por defecto, todos los componentes son Server Components.
 */

import Link from 'next/link';
import { ClientCounter } from './ClientCounter';
import { ServerData } from './ServerData';

export default function ServerClientPage() {
  // Esto se ejecuta EN EL SERVIDOR
  const serverTime = new Date().toISOString().slice(11, 19);  // "04:58:26";

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">02. Server vs Client Components</h1>

      {/* Comparación */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Server Components */}
        <section className="bg-gray-800 p-6 rounded-lg border-2 border-green-500">
          <h2 className="text-xl font-semibold text-green-400 mb-4">🖥️ Server Component</h2>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>✅ Por defecto (no necesita directiva)</li>
            <li>✅ Puede usar <code>async/await</code></li>
            <li>✅ Acceso a BD, filesystem, secrets</li>
            <li>✅ No envía JS al cliente (más rápido)</li>
            <li>❌ No puede usar useState, useEffect</li>
            <li>❌ No puede usar event handlers (onClick)</li>
            <li>❌ No puede usar APIs del browser</li>
          </ul>
          <pre className="bg-gray-900 p-3 rounded text-xs mt-4 overflow-x-auto">
{`// Por defecto es Server Component
async function ProductList() {
  // Esto corre en el servidor
  const products = await db.query('SELECT * FROM products');

  // Puedes usar secrets
  const apiKey = process.env.API_SECRET;

  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}`}
          </pre>
        </section>

        {/* Client Components */}
        <section className="bg-gray-800 p-6 rounded-lg border-2 border-blue-500">
          <h2 className="text-xl font-semibold text-blue-400 mb-4">🌐 Client Component</h2>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>⚠️ Necesita <code>&apos;use client&apos;</code> al inicio</li>
            <li>✅ Puede usar useState, useEffect</li>
            <li>✅ Puede usar event handlers</li>
            <li>✅ Acceso a APIs del browser</li>
            <li>❌ No puede ser async</li>
            <li>❌ Envía JS al cliente (bundle más grande)</li>
            <li>❌ No acceso directo a BD/secrets</li>
          </ul>
          <pre className="bg-gray-900 p-3 rounded text-xs mt-4 overflow-x-auto">
{`'use client'; // ← OBLIGATORIO

import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicks: {count}
    </button>
  );
}`}
          </pre>
        </section>
      </div>

      {/* Demo en vivo */}
      <section className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">🎮 Demo en Vivo</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Server Component Demo */}
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-green-400 font-medium mb-2">Server Component</h3>
            <p className="text-gray-400 text-sm mb-2">
              Renderizado en servidor a las: <span className="text-white">{serverTime}</span>
            </p>
            <p className="text-gray-400 text-sm">
              (Refresca la página para ver nueva hora)
            </p>
            <ServerData />
          </div>

          {/* Client Component Demo */}
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-blue-400 font-medium mb-2">Client Component</h3>
            <p className="text-gray-400 text-sm mb-2">
              Interactivo en el browser:
            </p>
            <ClientCounter />
          </div>
        </div>
      </section>

      {/* Patrón de Composición */}
      <section className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">🧩 Patrón de Composición</h2>
        <p className="text-gray-300 mb-4">
          Puedes combinar Server y Client Components. El truco es pasar
          Server Components como <code>children</code> a Client Components.
        </p>
        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// ✅ CORRECTO: Server Component como children
// ServerParent.tsx (Server Component)
import ClientWrapper from './ClientWrapper';
import ServerChild from './ServerChild';

export default async function ServerParent() {
  const data = await fetchData(); // Server-side

  return (
    <ClientWrapper>
      {/* ServerChild se renderiza en servidor */}
      {/* pero se pasa como children al cliente */}
      <ServerChild data={data} />
    </ClientWrapper>
  );
}

// ClientWrapper.tsx
'use client';
export default function ClientWrapper({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)}>Toggle</button>
      {open && children}
    </div>
  );
}`}
        </pre>
      </section>

      {/* Cuándo usar cada uno */}
      <section className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">🤔 ¿Cuándo usar cada uno?</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Necesitas...</th>
                <th className="text-left py-2 text-green-400">Server</th>
                <th className="text-left py-2 text-blue-400">Client</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-2">Fetch data</td>
                <td className="py-2">✅</td>
                <td className="py-2">⚠️ (con useEffect)</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Acceso a BD directa</td>
                <td className="py-2">✅</td>
                <td className="py-2">❌</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Secrets/API keys</td>
                <td className="py-2">✅</td>
                <td className="py-2">❌</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">useState / useEffect</td>
                <td className="py-2">❌</td>
                <td className="py-2">✅</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">onClick / onChange</td>
                <td className="py-2">❌</td>
                <td className="py-2">✅</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2">Browser APIs (localStorage)</td>
                <td className="py-2">❌</td>
                <td className="py-2">✅</td>
              </tr>
              <tr>
                <td className="py-2">Menor bundle size</td>
                <td className="py-2">✅</td>
                <td className="py-2">❌</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Regla de oro */}
      <section className="bg-yellow-900/30 border border-yellow-600 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-yellow-400 mb-2">💡 Regla de Oro</h2>
        <p className="text-gray-300">
          <strong>Usa Server Components por defecto.</strong> Solo agrega{' '}
          <code className="bg-gray-800 px-1 rounded">&apos;use client&apos;</code> cuando
          necesites interactividad (estado, eventos, browser APIs).
          Mantén los Client Components lo más pequeños posible.
        </p>
      </section>

      {/* Demo Interactivo */}
      <section className="bg-gradient-to-r from-blue-900/30 to-green-900/30 border border-blue-600 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">🛒 Demo Interactivo: Tienda</h2>
        <p className="text-gray-300 mb-4">
          Un ejemplo completo de una tienda que combina Server y Client Components.
          Incluye carrito, filtros, y productos con interactividad.
        </p>
        <Link
          href="/learn/01-basics/server-client/interactive-demo"
          className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Ver Demo Interactivo →
        </Link>
      </section>

      <div className="mt-8 flex justify-between">
        <Link href="/learn/01-basics" className="text-gray-400 hover:text-white">
          ← Archivos Especiales
        </Link>
        <Link href="/learn/01-basics/navigation" className="text-blue-400 hover:underline">
          Siguiente: Navegación →
        </Link>
      </div>
    </div>
  );
}
