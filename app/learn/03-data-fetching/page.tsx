/**
 * LECCIÓN 06: DATA FETCHING
 *
 * Todas las formas de obtener datos en Next.js App Router:
 * - fetch en Server Components
 * - Opciones de cache
 * - Parallel vs Sequential fetching
 */

import Link from 'next/link';

// Funciones de ejemplo para simular fetch
async function getProducts() {
  // Simular delay de red
  await new Promise((r) => setTimeout(r, 500));
  return [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 29 },
    { id: 3, name: 'Keyboard', price: 79 },
  ];
}

async function getStats() {
  await new Promise((r) => setTimeout(r, 300));
  return { totalProducts: 156, totalOrders: 1234 };
}

export default async function DataFetchingPage() {
  // Parallel fetching - ambas se ejecutan al mismo tiempo
  const [products, stats] = await Promise.all([getProducts(), getStats()]);

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">06. Data Fetching</h1>

      {/* Fetch básico */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-green-400 mb-4">🔄 Fetch en Server Components</h2>
        <p className="text-gray-300 mb-4">
          Los Server Components pueden usar async/await directamente.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// ✅ Esto es válido en Server Components
export default async function Page() {
  // fetch nativo extendido por Next.js
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();

  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}

// También puedes usar cualquier ORM
import { db } from '@/lib/db';

export default async function Page() {
  const products = await db.product.findMany();
  return <ProductList products={products} />;
}`}
        </pre>

        {/* Demo de datos obtenidos */}
        <div className="bg-gray-900 p-4 rounded">
          <p className="text-gray-400 text-sm mb-2">Datos obtenidos del servidor:</p>
          <div className="grid grid-cols-3 gap-4">
            {products.map((p) => (
              <div key={p.id} className="bg-gray-800 p-3 rounded">
                <p className="font-medium">{p.name}</p>
                <p className="text-green-400">${p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opciones de Cache */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">💾 Opciones de Cache</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// 1. Sin cache (siempre fresco)
const data = await fetch(url, { cache: 'no-store' });

// 2. Con cache (Next.js 14 default, opt-in en Next.js 15)
const data = await fetch(url, { cache: 'force-cache' });

// 3. Revalidación por tiempo (ISR)
const data = await fetch(url, {
  next: { revalidate: 60 } // Revalida cada 60 segundos
});

// 4. Con tags para invalidación manual
const data = await fetch(url, {
  next: { tags: ['products'] }
});

// Luego puedes invalidar con:
import { revalidateTag } from 'next/cache';
revalidateTag('products');`}
        </pre>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Opción</th>
                <th className="text-left py-2 text-gray-400">Comportamiento</th>
                <th className="text-left py-2 text-gray-400">Uso</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-2 text-red-400">no-store</td>
                <td>Nunca cachea</td>
                <td>Datos en tiempo real</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 text-green-400">force-cache</td>
                <td>Cachea indefinidamente</td>
                <td>Datos estáticos</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 text-yellow-400">revalidate: N</td>
                <td>Cachea por N segundos</td>
                <td>ISR (datos semi-frescos)</td>
              </tr>
              <tr>
                <td className="py-2 text-purple-400">tags: [...]</td>
                <td>Invalidación manual</td>
                <td>Control granular</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Parallel vs Sequential */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-purple-400 mb-4">⚡ Parallel vs Sequential</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Sequential */}
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-red-400 font-medium mb-2">❌ Sequential (Lento)</h3>
            <pre className="text-xs overflow-x-auto">
{`// ❌ MAL: Espera a que termine una
// antes de empezar la otra
async function Page() {
  const products = await getProducts();
  // Espera...
  const stats = await getStats();
  // Espera...

  return <div>...</div>;
}

// Tiempo total: 500ms + 300ms = 800ms`}
            </pre>
          </div>

          {/* Parallel */}
          <div className="bg-gray-900 p-4 rounded">
            <h3 className="text-green-400 font-medium mb-2">✅ Parallel (Rápido)</h3>
            <pre className="text-xs overflow-x-auto">
{`// ✅ BIEN: Ambas se ejecutan
// al mismo tiempo
async function Page() {
  const [products, stats] = await Promise.all([
    getProducts(),
    getStats(),
  ]);

  return <div>...</div>;
}

// Tiempo total: max(500ms, 300ms) = 500ms`}
            </pre>
          </div>
        </div>

        <div className="mt-4 bg-gray-900 p-4 rounded">
          <p className="text-gray-400 text-sm">
            Stats obtenidos en paralelo:
          </p>
          <p className="text-white">
            Total productos: <span className="text-green-400">{stats.totalProducts}</span> |
            Total órdenes: <span className="text-blue-400">{stats.totalOrders}</span>
          </p>
        </div>
      </section>

      {/* Route Segment Config */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-orange-400 mb-4">⚙️ Route Segment Config</h2>
        <p className="text-gray-300 mb-4">
          Configura el comportamiento de cache a nivel de ruta.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// app/products/page.tsx

// Forzar dinámico (nunca cachea la página)
export const dynamic = 'force-dynamic';

// Forzar estático (cachea la página)
export const dynamic = 'force-static';

// Revalidar toda la página cada 60 segundos
export const revalidate = 60;

// Configurar comportamiento de fetch por defecto
export const fetchCache = 'force-cache';

// Opciones:
// dynamic: 'auto' | 'force-dynamic' | 'force-static' | 'error'
// revalidate: number | false
// fetchCache: 'auto' | 'force-cache' | 'force-no-store' | ...`}
        </pre>
      </section>

      {/* Loading States */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">⏳ Estados de Carga</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// Opción 1: loading.tsx (toda la página)
// app/products/loading.tsx
export default function Loading() {
  return <Skeleton />;
}

// Opción 2: Suspense (granular)
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Products</h1>
      <Suspense fallback={<Skeleton />}>
        <ProductList />  {/* Componente async */}
      </Suspense>
    </div>
  );
}

// ProductList puede ser async
async function ProductList() {
  const products = await getProducts(); // Tarda 2 segundos
  return <ul>...</ul>;
}`}
        </pre>
      </section>

      <div className="mt-8 flex justify-between">
        <Link href="/learn/02-routing" className="text-gray-400 hover:text-white">
          ← Routing Avanzado
        </Link>
        <Link href="/learn/04-server-actions" className="text-blue-400 hover:underline">
          Siguiente: Server Actions →
        </Link>
      </div>
    </div>
  );
}
