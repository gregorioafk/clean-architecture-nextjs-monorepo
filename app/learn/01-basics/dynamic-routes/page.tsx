/**
 * LECCIÓN 04: RUTAS DINÁMICAS
 *
 * Cómo crear rutas con parámetros variables:
 * - [id] → Parámetro simple
 * - [...slug] → Catch-all (captura múltiples segmentos)
 * - [[...slug]] → Optional catch-all
 */

import Link from 'next/link';

export default function DynamicRoutesPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">04. Rutas Dinámicas</h1>

      {/* Parámetro Simple [id] */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-green-400 mb-4">📁 [id] - Parámetro Simple</h2>
        <p className="text-gray-300 mb-4">
          Captura un único segmento de la URL.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// Estructura de archivos:
app/
└── products/
    └── [id]/
        └── page.tsx

// app/products/[id]/page.tsx
export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <h1>Producto: {id}</h1>;
}

// URLs que matchean:
// /products/1     → params.id = "1"
// /products/abc   → params.id = "abc"
// /products/123   → params.id = "123"

// URLs que NO matchean:
// /products       → necesita page.tsx en /products/
// /products/1/2   → demasiados segmentos`}
        </pre>

        <div className="flex gap-3 flex-wrap">
          <Link href="/learn/01-basics/dynamic-routes/1" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
            /dynamic-routes/1
          </Link>
          <Link href="/learn/01-basics/dynamic-routes/abc" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
            /dynamic-routes/abc
          </Link>
          <Link href="/learn/01-basics/dynamic-routes/producto-123" className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded">
            /dynamic-routes/producto-123
          </Link>
        </div>
      </section>

      {/* Catch-all [...slug] */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">📁 [...slug] - Catch-all</h2>
        <p className="text-gray-300 mb-4">
          Captura TODOS los segmentos restantes como un array.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// Estructura:
app/
└── docs/
    └── [...slug]/
        └── page.tsx

// app/docs/[...slug]/page.tsx
export default async function DocsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  return (
    <div>
      <h1>Docs</h1>
      <p>Ruta: {slug.join(' / ')}</p>
    </div>
  );
}

// URLs que matchean:
// /docs/intro           → slug = ["intro"]
// /docs/guide/start     → slug = ["guide", "start"]
// /docs/a/b/c/d         → slug = ["a", "b", "c", "d"]

// URLs que NO matchean:
// /docs                 → ¡Error! Necesita al menos un segmento`}
        </pre>

        <div className="flex gap-3 flex-wrap">
          <Link href="/learn/01-basics/dynamic-routes/docs/intro" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
            /docs/intro
          </Link>
          <Link href="/learn/01-basics/dynamic-routes/docs/guide/getting-started" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
            /docs/guide/getting-started
          </Link>
        </div>
      </section>

      {/* Optional Catch-all [[...slug]] */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-purple-400 mb-4">📁 [[...slug]] - Optional Catch-all</h2>
        <p className="text-gray-300 mb-4">
          Como catch-all, pero también matchea la ruta raíz (sin segmentos).
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// Estructura:
app/
└── shop/
    └── [[...categories]]/
        └── page.tsx

// app/shop/[[...categories]]/page.tsx
export default async function ShopPage({
  params,
}: {
  params: Promise<{ categories?: string[] }>;
}) {
  const { categories } = await params;

  if (!categories) {
    return <h1>Todos los productos</h1>;
  }

  return (
    <div>
      <h1>Categorías: {categories.join(' > ')}</h1>
    </div>
  );
}

// URLs que matchean:
// /shop                     → categories = undefined
// /shop/electronics         → categories = ["electronics"]
// /shop/electronics/phones  → categories = ["electronics", "phones"]

// La diferencia con [...slug]:
// [...slug]   → /shop da error (requiere segmento)
// [[...slug]] → /shop funciona (segmentos opcionales)`}
        </pre>
      </section>

      {/* Múltiples parámetros */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-orange-400 mb-4">📁 Múltiples Parámetros</h2>
        <p className="text-gray-300 mb-4">
          Puedes combinar varios parámetros en una ruta.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// Estructura:
app/
└── blog/
    └── [year]/
        └── [month]/
            └── [slug]/
                └── page.tsx

// app/blog/[year]/[month]/[slug]/page.tsx
export default async function BlogPost({
  params,
}: {
  params: Promise<{
    year: string;
    month: string;
    slug: string;
  }>;
}) {
  const { year, month, slug } = await params;

  return (
    <article>
      <h1>{slug}</h1>
      <p>Publicado: {month}/{year}</p>
    </article>
  );
}

// /blog/2024/01/hello-world
// → year="2024", month="01", slug="hello-world"`}
        </pre>
      </section>

      {/* generateStaticParams */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">⚡ generateStaticParams</h2>
        <p className="text-gray-300 mb-4">
          Pre-genera páginas estáticas para rutas dinámicas en build time.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// app/products/[id]/page.tsx

// Esta función se ejecuta en BUILD TIME
export async function generateStaticParams() {
  // Obtener todos los IDs de productos
  const products = await fetch('https://api.example.com/products')
    .then(res => res.json());

  // Retornar array de parámetros
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

// Ejemplo de retorno:
// [
//   { id: '1' },
//   { id: '2' },
//   { id: '3' },
// ]

// Esto genera en build:
// /products/1 (estático)
// /products/2 (estático)
// /products/3 (estático)

// Configurar comportamiento para IDs no generados:
export const dynamicParams = true;  // Genera bajo demanda (default)
export const dynamicParams = false; // Retorna 404`}
        </pre>
      </section>

      {/* Tabla resumen */}
      <section className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">📋 Resumen</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Patrón</th>
                <th className="text-left py-2 text-gray-400">Ejemplo URL</th>
                <th className="text-left py-2 text-gray-400">params</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-2 text-green-400">[id]</td>
                <td>/products/123</td>
                <td><code>{`{ id: '123' }`}</code></td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 text-blue-400">[...slug]</td>
                <td>/docs/a/b/c</td>
                <td><code>{`{ slug: ['a','b','c'] }`}</code></td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 text-purple-400">[[...slug]]</td>
                <td>/shop</td>
                <td><code>{`{ slug: undefined }`}</code></td>
              </tr>
              <tr>
                <td className="py-2 text-purple-400">[[...slug]]</td>
                <td>/shop/a/b</td>
                <td><code>{`{ slug: ['a','b'] }`}</code></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-8 flex justify-between">
        <Link href="/learn/01-basics/navigation" className="text-gray-400 hover:text-white">
          ← Navegación
        </Link>
        <Link href="/learn/02-routing" className="text-blue-400 hover:underline">
          Siguiente: Routing Avanzado →
        </Link>
      </div>
    </div>
  );
}
