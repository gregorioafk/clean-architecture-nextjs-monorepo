import Link from 'next/link';

export const metadata = {
  title: 'Caching en Next.js',
};

export default function CachingPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/learn"
          className="text-blue-400 hover:underline text-sm"
        >
          ← Volver al índice
        </Link>
        <h1 className="text-4xl font-bold text-white mt-4">
          05 - Caching en Next.js
        </h1>
        <p className="text-gray-400 mt-2">
          Next.js tiene múltiples capas de cache para optimizar rendimiento
        </p>
      </div>

      {/* Tipos de Cache */}
      <section className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          4 Capas de Cache
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Request Memoization */}
          <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4">
            <h3 className="text-blue-400 font-semibold mb-2">
              1. Request Memoization
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              Deduplica fetch requests idénticos en un mismo render
            </p>
            <pre className="bg-gray-800 p-3 rounded text-xs overflow-x-auto">
              <code className="text-green-400">{`// Estos 2 fetches solo hacen 1 request
async function Component1() {
  const data = await fetch('/api/user');
}

async function Component2() {
  const data = await fetch('/api/user'); // Reutiliza!
}`}</code>
            </pre>
          </div>

          {/* Data Cache */}
          <div className="bg-green-900/20 border border-green-600 rounded-lg p-4">
            <h3 className="text-green-400 font-semibold mb-2">
              2. Data Cache
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              Persiste datos entre requests y deployments
            </p>
            <pre className="bg-gray-800 p-3 rounded text-xs overflow-x-auto">
              <code className="text-green-400">{`// Cache por defecto (force-cache)
fetch('/api/data');

// Revalidar cada 60 segundos
fetch('/api/data', {
  next: { revalidate: 60 }
});

// Sin cache
fetch('/api/data', {
  cache: 'no-store'
});`}</code>
            </pre>
          </div>

          {/* Full Route Cache */}
          <div className="bg-purple-900/20 border border-purple-600 rounded-lg p-4">
            <h3 className="text-purple-400 font-semibold mb-2">
              3. Full Route Cache
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              Cachea HTML y RSC Payload en build time
            </p>
            <pre className="bg-gray-800 p-3 rounded text-xs overflow-x-auto">
              <code className="text-green-400">{`// Rutas estáticas = cacheadas
// app/about/page.tsx (sin datos dinámicos)

// Rutas dinámicas = NO cacheadas
// app/dashboard/page.tsx
export const dynamic = 'force-dynamic';

// O usar cookies/headers
import { cookies } from 'next/headers';`}</code>
            </pre>
          </div>

          {/* Router Cache */}
          <div className="bg-orange-900/20 border border-orange-600 rounded-lg p-4">
            <h3 className="text-orange-400 font-semibold mb-2">
              4. Router Cache (Client)
            </h3>
            <p className="text-gray-300 text-sm mb-3">
              Cache en memoria del navegador para navegación
            </p>
            <pre className="bg-gray-800 p-3 rounded text-xs overflow-x-auto">
              <code className="text-green-400">{`// Automático con <Link>
<Link href="/dashboard">Dashboard</Link>

// Prefetch manual
import { useRouter } from 'next/navigation';
const router = useRouter();
router.prefetch('/dashboard');`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Revalidación */}
      <section className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          Estrategias de Revalidación
        </h2>

        <div className="space-y-4">
          {/* Time-based */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-yellow-400 font-semibold mb-2">
              Time-based Revalidation
            </h3>
            <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto">
              <code className="text-green-400">{`// En fetch
fetch('/api/posts', { next: { revalidate: 3600 } }); // 1 hora

// En página completa
export const revalidate = 3600; // Revalida toda la página cada hora`}</code>
            </pre>
          </div>

          {/* On-demand */}
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-yellow-400 font-semibold mb-2">
              On-demand Revalidation
            </h3>
            <pre className="bg-gray-900 p-3 rounded text-sm overflow-x-auto">
              <code className="text-green-400">{`// Por path
import { revalidatePath } from 'next/cache';
revalidatePath('/blog'); // Revalida /blog

// Por tag
import { revalidateTag } from 'next/cache';

// Al hacer fetch, agregar tag
fetch('/api/posts', { next: { tags: ['posts'] } });

// Luego revalidar por tag
revalidateTag('posts'); // Revalida todos los fetch con ese tag`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Ejemplo práctico */}
      <section className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-2xl font-bold text-white mb-4">
          Ejemplo: Blog con Revalidación
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-gray-300 font-semibold mb-2">
              📄 app/blog/page.tsx
            </h3>
            <pre className="bg-gray-800 p-3 rounded text-xs overflow-x-auto">
              <code className="text-green-400">{`// Lista de posts - revalida cada hora
async function getPosts() {
  const res = await fetch(
    'https://api.example.com/posts',
    { next: { revalidate: 3600, tags: ['posts'] } }
  );
  return res.json();
}

export default async function BlogPage() {
  const posts = await getPosts();
  return <PostList posts={posts} />;
}`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-gray-300 font-semibold mb-2">
              ⚡ app/api/revalidate/route.ts
            </h3>
            <pre className="bg-gray-800 p-3 rounded text-xs overflow-x-auto">
              <code className="text-green-400">{`// Webhook para CMS
import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ error: 'Invalid' }, { status: 401 });
  }

  revalidateTag('posts');
  return Response.json({ revalidated: true });
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-600 rounded-xl p-6">
        <h2 className="text-xl font-bold text-yellow-400 mb-4">
          Tips de Caching
        </h2>
        <ul className="space-y-2 text-gray-300">
          <li>
            <span className="text-yellow-400">→</span> Usa <code className="bg-gray-800 px-1 rounded">revalidateTag</code> para invalidar datos relacionados
          </li>
          <li>
            <span className="text-yellow-400">→</span> En desarrollo (<code className="bg-gray-800 px-1 rounded">npm run dev</code>) el cache está deshabilitado
          </li>
          <li>
            <span className="text-yellow-400">→</span> <code className="bg-gray-800 px-1 rounded">cookies()</code> o <code className="bg-gray-800 px-1 rounded">headers()</code> hacen la ruta dinámica automáticamente
          </li>
          <li>
            <span className="text-yellow-400">→</span> Server Actions revalidan automáticamente con <code className="bg-gray-800 px-1 rounded">revalidatePath</code>
          </li>
        </ul>
      </section>

      {/* Navegación */}
      <div className="flex justify-between pt-4 border-t border-gray-800">
        <Link
          href="/learn/04-server-actions"
          className="text-blue-400 hover:underline"
        >
          ← Server Actions
        </Link>
        <Link
          href="/learn/06-streaming"
          className="text-blue-400 hover:underline"
        >
          Streaming →
        </Link>
      </div>
    </div>
  );
}
