/**
 * LECCIÓN 15: PATRONES AVANZADOS ADICIONALES
 *
 * Context, State Management, Caching Strategies, y más.
 */

import Link from 'next/link';

export default function AdvancedPatternsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">15. Patrones Avanzados II</h1>

      {/* Provider Pattern */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-green-400 mb-4">🎭 Provider Pattern</h2>
        <p className="text-gray-300 mb-4">
          Cómo usar Context correctamente en App Router.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// providers/ThemeProvider.tsx
'use client';
import { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('theme') as Theme;
    if (saved) setTheme(saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};`}
        </pre>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// app/layout.tsx
import { ThemeProvider } from '@/providers/ThemeProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider>
          {children}  {/* Server Components funcionan aquí */}
        </ThemeProvider>
      </body>
    </html>
  );
}

// components/ThemeToggle.tsx
'use client';
import { useTheme } from '@/providers/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}`}
        </pre>
      </section>

      {/* Cache Strategies */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">💾 Estrategias de Cache</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// 1. Cache por tiempo (revalidación periódica)
async function getProducts() {
  const res = await fetch('https://api.com/products', {
    next: { revalidate: 3600 }, // Revalidar cada hora
  });
  return res.json();
}

// 2. Cache con tags (revalidación bajo demanda)
async function getProduct(id: string) {
  const res = await fetch(\`https://api.com/products/\${id}\`, {
    next: { tags: [\`product-\${id}\`, 'products'] },
  });
  return res.json();
}

// Revalidar tag específico
import { revalidateTag } from 'next/cache';

export async function updateProduct(id: string, data: any) {
  await db.products.update(id, data);
  revalidateTag(\`product-\${id}\`);  // Solo este producto
  // O revalidateTag('products');  // Todos los productos
}

// 3. Sin cache (siempre fresco)
async function getUserSession() {
  const res = await fetch('https://api.com/session', {
    cache: 'no-store',
  });
  return res.json();
}

// 4. Cache con force-cache (por defecto en Next.js)
async function getStaticContent() {
  const res = await fetch('https://api.com/content', {
    cache: 'force-cache',  // Default
  });
  return res.json();
}`}
        </pre>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// unstable_cache para funciones que no usan fetch
import { unstable_cache } from 'next/cache';

const getCachedUser = unstable_cache(
  async (id: string) => {
    return db.users.findUnique({ where: { id } });
  },
  ['user-cache'],  // Cache key
  {
    revalidate: 3600,
    tags: ['users'],
  }
);

// Uso
const user = await getCachedUser('123');`}
        </pre>
      </section>

      {/* Route Handlers Patterns */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-purple-400 mb-4">🛤️ Route Handlers Avanzados</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';

// GET con paginación y filtros
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const category = searchParams.get('category');

  const products = await db.products.findMany({
    where: category ? { category } : undefined,
    skip: (page - 1) * limit,
    take: limit,
  });

  const total = await db.products.count({
    where: category ? { category } : undefined,
  });

  return NextResponse.json({
    data: products,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}

// POST con validación
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validación con Zod
    const validated = productSchema.parse(body);

    const product = await db.products.create({
      data: validated,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { errors: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}`}
        </pre>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// Streaming Response
export async function GET() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 10; i++) {
        controller.enqueue(
          encoder.encode(\`data: \${JSON.stringify({ count: i })}\\n\\n\`)
        );
        await new Promise(r => setTimeout(r, 1000));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}

// Consumir en cliente
const eventSource = new EventSource('/api/stream');
eventSource.onmessage = (e) => {
  console.log(JSON.parse(e.data));
};`}
        </pre>
      </section>

      {/* Parallel Data Fetching */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-orange-400 mb-4">⚡ Parallel Data Fetching</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// ❌ MAL: Secuencial (waterfall)
async function Page() {
  const user = await getUser();      // 500ms
  const posts = await getPosts();    // 500ms
  const comments = await getComments(); // 500ms
  // Total: ~1500ms
}

// ✅ BIEN: Paralelo
async function Page() {
  const [user, posts, comments] = await Promise.all([
    getUser(),
    getPosts(),
    getComments(),
  ]);
  // Total: ~500ms (el más lento)
}

// ✅ MEJOR: Streaming con Suspense
import { Suspense } from 'react';

async function Page() {
  const userPromise = getUser(); // No await

  return (
    <div>
      <Suspense fallback={<UserSkeleton />}>
        <UserSection userPromise={userPromise} />
      </Suspense>

      <Suspense fallback={<PostsSkeleton />}>
        <PostsSection /> {/* Fetch dentro del componente */}
      </Suspense>

      <Suspense fallback={<CommentsSkeleton />}>
        <CommentsSection />
      </Suspense>
    </div>
  );
}

// UserSection.tsx
async function UserSection({ userPromise }) {
  const user = await userPromise;
  return <div>{user.name}</div>;
}`}
        </pre>
      </section>

      {/* Search Pattern */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">🔍 Patrón de Búsqueda</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// components/Search.tsx
'use client';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Debounce para evitar muchas requests
  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);

    // Reset a página 1 al buscar
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }

    replace(\`\${pathname}?\${params.toString()}\`);
  }, 300);

  return (
    <input
      type="search"
      placeholder={placeholder}
      defaultValue={searchParams.get('query')?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
      className="w-full p-2 border rounded"
    />
  );
}

// page.tsx (Server Component)
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; page?: string }>;
}) {
  const { query = '', page = '1' } = await searchParams;

  const products = await searchProducts(query, parseInt(page));

  return (
    <div>
      <Search placeholder="Buscar productos..." />
      <ProductList products={products} />
      <Pagination currentPage={parseInt(page)} />
    </div>
  );
}`}
        </pre>
      </section>

      {/* Authentication Pattern */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-pink-400 mb-4">🔐 Patrón de Autenticación</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// lib/auth.ts
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;

  if (!token) return null;

  try {
    const session = await verifyToken(token);
    return session;
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) redirect('/login');
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.role !== 'admin') redirect('/unauthorized');
  return session;
}

// Uso en page.tsx
export default async function AdminPage() {
  const session = await requireAdmin();  // Redirige si no es admin

  return <div>Hola, {session.user.name}</div>;
}

// Uso en layout.tsx para proteger grupo de rutas
export default async function AdminLayout({ children }) {
  await requireAdmin();
  return children;
}`}
        </pre>
      </section>

      {/* Data Mutations Pattern */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-lime-400 mb-4">🔄 Mutaciones de Datos</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// actions/product.ts
'use server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createProduct(formData: FormData) {
  const name = formData.get('name') as string;
  const price = parseFloat(formData.get('price') as string);

  // Validación
  if (!name || isNaN(price)) {
    return { error: 'Invalid data' };
  }

  // Crear en DB
  const product = await db.products.create({
    data: { name, price },
  });

  // Opciones de revalidación:

  // 1. Revalidar path específico
  revalidatePath('/products');

  // 2. Revalidar tag de cache
  revalidateTag('products');

  // 3. Redirect (también revalida)
  redirect(\`/products/\${product.id}\`);
}

export async function deleteProduct(id: string) {
  await db.products.delete({ where: { id } });

  revalidatePath('/products');
  return { success: true };
}

// Uso con bind para pasar parámetros
export async function updateProduct(id: string, formData: FormData) {
  // ...
}

// En componente:
<form action={updateProduct.bind(null, product.id)}>
  ...
</form>`}
        </pre>
      </section>

      {/* Testing Patterns */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">🧪 Patrones de Testing</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// __tests__/page.test.tsx
import { render, screen } from '@testing-library/react';
import Page from '@/app/products/page';

// Mock de fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([{ id: 1, name: 'Product' }]),
  })
);

describe('ProductsPage', () => {
  it('renders products', async () => {
    const PageComponent = await Page({ searchParams: {} });
    render(PageComponent);

    expect(screen.getByText('Product')).toBeInTheDocument();
  });
});

// Testing Server Actions
import { createProduct } from '@/actions/product';

describe('createProduct', () => {
  it('creates a product', async () => {
    const formData = new FormData();
    formData.append('name', 'Test Product');
    formData.append('price', '99.99');

    const result = await createProduct(formData);

    expect(result).not.toHaveProperty('error');
  });
});

// E2E con Playwright
import { test, expect } from '@playwright/test';

test('can search products', async ({ page }) => {
  await page.goto('/products');
  await page.fill('input[type="search"]', 'laptop');
  await page.waitForURL('/products?query=laptop&page=1');

  await expect(page.getByText('Laptop Pro')).toBeVisible();
});`}
        </pre>
      </section>

      <div className="mt-8 flex justify-between">
        <Link href="/learn/11-patterns" className="text-gray-400 hover:text-white">
          ← Patrones Avanzados
        </Link>
        <Link href="/learn" className="text-blue-400 hover:underline">
          Volver al Índice →
        </Link>
      </div>
    </div>
  );
}
