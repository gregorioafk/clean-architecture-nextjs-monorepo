/**
 * LECCIÓN 03: NAVEGACIÓN EN NEXT.JS
 *
 * Diferentes formas de navegar entre páginas:
 * - Link component (declarativo)
 * - useRouter (programático)
 * - redirect (server-side)
 */

import Link from 'next/link';
import { NavigationDemo } from './NavigationDemo';

export default function NavigationPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">03. Navegación</h1>

      {/* Link Component */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-green-400 mb-4">🔗 Link Component</h2>
        <p className="text-gray-300 mb-4">
          La forma principal de navegar. Prefetch automático, sin recarga de página.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`import Link from 'next/link';

// Navegación básica
<Link href="/about">About</Link>

// Con query params
<Link href="/products?category=electronics">
  Electronics
</Link>

// Con objeto href
<Link
  href={{
    pathname: '/products/[id]',
    query: { id: '123' },
  }}
>
  Product 123
</Link>

// Reemplazar historial (no agrega al back)
<Link href="/login" replace>
  Login
</Link>

// Scroll al top desactivado
<Link href="/long-page" scroll={false}>
  No scroll
</Link>

// Prefetch desactivado
<Link href="/heavy-page" prefetch={false}>
  Heavy Page
</Link>`}
        </pre>

        <div className="flex gap-4 flex-wrap">
          <Link
            href="/learn/01-basics/navigation?demo=link"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Demo Link
          </Link>
          <Link
            href="/learn/01-basics/dynamic-routes/123"
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Ir a ruta dinámica /123
          </Link>
        </div>
      </section>

      {/* useRouter */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">🎮 useRouter (Client)</h2>
        <p className="text-gray-300 mb-4">
          Navegación programática desde Client Components.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`'use client';
import { useRouter } from 'next/navigation';

function MyComponent() {
  const router = useRouter();

  // Navegar a una ruta
  router.push('/dashboard');

  // Reemplazar (sin agregar al historial)
  router.replace('/login');

  // Volver atrás
  router.back();

  // Avanzar
  router.forward();

  // Refrescar la página (re-fetch de Server Components)
  router.refresh();

  // Prefetch manual
  router.prefetch('/heavy-page');
}`}
        </pre>

        <NavigationDemo />
      </section>

      {/* usePathname y useSearchParams */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-purple-400 mb-4">📍 usePathname & useSearchParams</h2>
        <p className="text-gray-300 mb-4">
          Leer la URL actual desde Client Components.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`'use client';
import { usePathname, useSearchParams } from 'next/navigation';

function CurrentUrl() {
  // Obtiene: /products/123
  const pathname = usePathname();

  // Obtiene: ?category=electronics&sort=price
  const searchParams = useSearchParams();
  const category = searchParams.get('category'); // 'electronics'
  const sort = searchParams.get('sort'); // 'price'

  // Crear nueva URL con params modificados
  const params = new URLSearchParams(searchParams);
  params.set('page', '2');
  const newUrl = \`\${pathname}?\${params.toString()}\`;

  return <Link href={newUrl}>Página 2</Link>;
}`}
        </pre>
      </section>

      {/* redirect (Server) */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-orange-400 mb-4">↪️ redirect (Server)</h2>
        <p className="text-gray-300 mb-4">
          Redirección desde Server Components, Server Actions o Route Handlers.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// En Server Component
import { redirect } from 'next/navigation';

async function ProtectedPage() {
  const session = await getSession();

  if (!session) {
    redirect('/login'); // Redirige antes de renderizar
  }

  return <Dashboard />;
}

// En Server Action
'use server';
import { redirect } from 'next/navigation';

async function createPost(formData: FormData) {
  const post = await db.post.create({ ... });
  redirect(\`/posts/\${post.id}\`); // Redirige después de crear
}

// redirect() lanza un error especial NEXT_REDIRECT
// que Next.js captura para hacer la redirección.
// No usar dentro de try/catch.`}
        </pre>
      </section>

      {/* permanentRedirect */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-red-400 mb-4">🔀 permanentRedirect</h2>
        <p className="text-gray-300 mb-4">
          Redirección 308 (permanente) para SEO.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`import { permanentRedirect } from 'next/navigation';

// Útil cuando una URL cambió permanentemente
async function OldProductPage({ params }) {
  // El producto se movió a una nueva URL
  permanentRedirect(\`/products/\${params.id}\`);
}

// Diferencias:
// redirect()          → 307 (temporal)
// permanentRedirect() → 308 (permanente, cacheable)`}
        </pre>
      </section>

      {/* Resumen */}
      <section className="bg-gray-800 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">📋 Resumen</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-2 text-gray-400">Método</th>
                <th className="text-left py-2 text-gray-400">Dónde</th>
                <th className="text-left py-2 text-gray-400">Uso</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              <tr className="border-b border-gray-700">
                <td className="py-2 text-green-400">&lt;Link&gt;</td>
                <td>Ambos</td>
                <td>Navegación declarativa</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 text-blue-400">useRouter()</td>
                <td>Client</td>
                <td>Navegación programática</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 text-purple-400">usePathname()</td>
                <td>Client</td>
                <td>Leer path actual</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 text-purple-400">useSearchParams()</td>
                <td>Client</td>
                <td>Leer query params</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-2 text-orange-400">redirect()</td>
                <td>Server</td>
                <td>Redirección temporal</td>
              </tr>
              <tr>
                <td className="py-2 text-red-400">permanentRedirect()</td>
                <td>Server</td>
                <td>Redirección permanente</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-8 flex justify-between">
        <Link href="/learn/01-basics/server-client" className="text-gray-400 hover:text-white">
          ← Server vs Client
        </Link>
        <Link href="/learn/01-basics/dynamic-routes" className="text-blue-400 hover:underline">
          Siguiente: Rutas Dinámicas →
        </Link>
      </div>
    </div>
  );
}
