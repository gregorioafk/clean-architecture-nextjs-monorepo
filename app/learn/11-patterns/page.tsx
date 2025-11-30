/**
 * LECCIÓN 14: PATRONES AVANZADOS
 *
 * Composición, Modales, Infinite Scroll, Polling, y más.
 */

import Link from 'next/link';

export default function PatternsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">14. Patrones Avanzados</h1>

      {/* Composition Pattern */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-green-400 mb-4">🧩 Patrón de Composición</h2>
        <p className="text-gray-300 mb-4">
          Combina Server y Client Components eficientemente pasando Server Components como children.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// ❌ MAL: Todo el árbol se convierte en Client Component
'use client';
import ServerData from './ServerData';  // ¡Error! No puedes importar Server en Client

// ✅ BIEN: Composición con children
// ClientWrapper.tsx
'use client';
export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div onClick={() => setIsOpen(!isOpen)}>
      {children}  {/* Server Component renderizado aquí */}
    </div>
  );
}

// page.tsx (Server Component)
import { ClientWrapper } from './ClientWrapper';
import { ServerData } from './ServerData';

export default function Page() {
  return (
    <ClientWrapper>
      <ServerData />  {/* Se renderiza en servidor */}
    </ClientWrapper>
  );
}`}
        </pre>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// Patrón: Render Props con Server Components
// DataProvider.tsx (Server)
async function DataProvider({
  children,
}: {
  children: (data: Data) => React.ReactNode;
}) {
  const data = await fetchData();
  return children(data);
}

// page.tsx
export default function Page() {
  return (
    <DataProvider>
      {(data) => <ClientChart data={data} />}
    </DataProvider>
  );
}`}
        </pre>
      </section>

      {/* Modal Pattern */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">🪟 Patrón de Modal con URL</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// Estructura de archivos para modal con URL compartible
app/
├── products/
│   └── page.tsx           // Lista de productos
├── @modal/
│   ├── (.)products/[id]/
│   │   └── page.tsx       // Modal de producto
│   └── default.tsx        // Null cuando no hay modal
└── layout.tsx             // Renderiza children + @modal

// layout.tsx
export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}

// @modal/(.)products/[id]/page.tsx
'use client';
import { useRouter } from 'next/navigation';

export default function ProductModal({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => router.back()}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Producto {params.id}</h2>
        <button onClick={() => router.back()}>Cerrar</button>
      </div>
    </div>
  );
}`}
        </pre>
      </section>

      {/* Infinite Scroll */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-purple-400 mb-4">♾️ Infinite Scroll</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// hooks/useInfiniteScroll.ts
'use client';
import { useState, useEffect, useCallback, useRef } from 'react';

export function useInfiniteScroll<T>(
  fetchFn: (page: number) => Promise<T[]>,
  initialData: T[] = []
) {
  const [data, setData] = useState<T[]>(initialData);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver>();

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const newData = await fetchFn(page + 1);

    if (newData.length === 0) {
      setHasMore(false);
    } else {
      setData(prev => [...prev, ...newData]);
      setPage(prev => prev + 1);
    }
    setLoading(false);
  }, [page, loading, hasMore, fetchFn]);

  const lastElementRef = useCallback((node: HTMLElement | null) => {
    if (loading) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });

    if (node) {
      observerRef.current.observe(node);
    }
  }, [loading, hasMore, loadMore]);

  return { data, loading, hasMore, lastElementRef };
}`}
        </pre>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// components/InfiniteList.tsx
'use client';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

async function fetchItems(page: number) {
  const res = await fetch(\`/api/items?page=\${page}\`);
  return res.json();
}

export function InfiniteList({ initialItems }) {
  const { data, loading, lastElementRef } = useInfiniteScroll(
    fetchItems,
    initialItems
  );

  return (
    <div>
      {data.map((item, index) => (
        <div
          key={item.id}
          ref={index === data.length - 1 ? lastElementRef : null}
        >
          {item.name}
        </div>
      ))}
      {loading && <p>Cargando más...</p>}
    </div>
  );
}

// page.tsx (Server Component)
export default async function Page() {
  const initialItems = await fetchItems(1);
  return <InfiniteList initialItems={initialItems} />;
}`}
        </pre>
      </section>

      {/* Polling Pattern */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-orange-400 mb-4">🔄 Polling / Real-time Updates</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// hooks/usePolling.ts
'use client';
import { useState, useEffect, useCallback } from 'react';

export function usePolling<T>(
  fetchFn: () => Promise<T>,
  interval: number = 5000,
  enabled: boolean = true
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const poll = useCallback(async () => {
    try {
      const result = await fetchFn();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err as Error);
    }
  }, [fetchFn]);

  useEffect(() => {
    if (!enabled) return;

    poll(); // Fetch inicial

    const id = setInterval(poll, interval);
    return () => clearInterval(id);
  }, [poll, interval, enabled]);

  return { data, error, refetch: poll };
}

// Uso
function Dashboard() {
  const { data } = usePolling(() => fetch('/api/stats').then(r => r.json()), 10000);
  return <div>Visitors: {data?.visitors}</div>;
}`}
        </pre>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// Server Actions para refetch (alternativa más eficiente)
// actions.ts
'use server';
import { revalidatePath } from 'next/cache';

export async function refreshData() {
  revalidatePath('/dashboard');
}

// page.tsx
import { refreshData } from './actions';

export default async function Dashboard() {
  const data = await fetch('/api/stats', { next: { tags: ['stats'] } });

  return (
    <div>
      <p>Visitors: {data.visitors}</p>
      <form action={refreshData}>
        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
}`}
        </pre>
      </section>

      {/* Optimistic Updates */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">⚡ Optimistic Updates</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// hooks/useOptimistic.ts (React 19+ / Next.js 15+)
'use client';
import { useOptimistic, useTransition } from 'react';

type Todo = { id: number; text: string; completed: boolean };

export function TodoList({ todos }: { todos: Todo[] }) {
  const [isPending, startTransition] = useTransition();

  // useOptimistic para actualización inmediata
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo: Todo) => [...state, newTodo]
  );

  async function handleAdd(formData: FormData) {
    const text = formData.get('text') as string;
    const tempTodo = { id: Date.now(), text, completed: false };

    startTransition(async () => {
      // Actualiza inmediatamente (optimistic)
      addOptimisticTodo(tempTodo);

      // Envía al servidor
      await createTodo(text);
    });
  }

  return (
    <form action={handleAdd}>
      <input name="text" required />
      <button disabled={isPending}>
        {isPending ? 'Guardando...' : 'Añadir'}
      </button>

      <ul>
        {optimisticTodos.map(todo => (
          <li key={todo.id} style={{ opacity: todo.id > 1000 ? 0.5 : 1 }}>
            {todo.text}
          </li>
        ))}
      </ul>
    </form>
  );
}`}
        </pre>
      </section>

      {/* Error Boundary Pattern */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-red-400 mb-4">🛡️ Error Boundaries Granulares</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// Estructura para error boundaries específicos
app/
├── dashboard/
│   ├── layout.tsx
│   ├── error.tsx        // Error boundary para todo dashboard
│   ├── page.tsx
│   ├── analytics/
│   │   ├── error.tsx    // Error boundary solo para analytics
│   │   └── page.tsx
│   └── settings/
│       ├── error.tsx    // Error boundary solo para settings
│       └── page.tsx

// dashboard/analytics/error.tsx
'use client';

export default function AnalyticsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="bg-red-900/20 p-4 rounded">
      <h2>Analytics falló</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Reintentar</button>
    </div>
  );
}

// El resto del dashboard sigue funcionando mientras
// solo analytics muestra el error`}
        </pre>
      </section>

      {/* Conditional Rendering Pattern */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">🔀 Renderizado Condicional por Rol</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// components/RoleGate.tsx
import { getServerSession } from 'next-auth';

type Role = 'admin' | 'user' | 'guest';

async function RoleGate({
  children,
  allowedRoles,
  fallback = null,
}: {
  children: React.ReactNode;
  allowedRoles: Role[];
  fallback?: React.ReactNode;
}) {
  const session = await getServerSession();
  const userRole = session?.user?.role || 'guest';

  if (!allowedRoles.includes(userRole)) {
    return fallback;
  }

  return <>{children}</>;
}

// Uso en page.tsx
export default function AdminPage() {
  return (
    <div>
      <h1>Dashboard</h1>

      <RoleGate allowedRoles={['admin', 'user']}>
        <UserStats />
      </RoleGate>

      <RoleGate
        allowedRoles={['admin']}
        fallback={<p>No tienes permiso para ver esto</p>}
      >
        <AdminPanel />
      </RoleGate>
    </div>
  );
}`}
        </pre>
      </section>

      {/* Prefetching Pattern */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-lime-400 mb-4">🚀 Prefetching Inteligente</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// Next.js prefetch automáticamente Links en viewport
import Link from 'next/link';

// Prefetch automático (default)
<Link href="/products">Productos</Link>

// Desactivar prefetch
<Link href="/products" prefetch={false}>Productos</Link>

// Prefetch manual con router
'use client';
import { useRouter } from 'next/navigation';

function SearchResults({ results }) {
  const router = useRouter();

  return results.map(item => (
    <div
      key={item.id}
      onMouseEnter={() => router.prefetch(\`/products/\${item.id}\`)}
    >
      <Link href={\`/products/\${item.id}\`}>{item.name}</Link>
    </div>
  ));
}

// Prefetch de datos con loading
// products/[id]/loading.tsx
export default function Loading() {
  return <ProductSkeleton />;
}

// Mientras carga el producto, muestra skeleton
// El prefetch carga el JS/CSS, loading.tsx muestra skeleton
// Resultado: transición instantánea percibida`}
        </pre>
      </section>

      {/* Form Patterns */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-pink-400 mb-4">📝 Patrones de Formularios</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// Patrón: Multi-step form con estado en URL
'use client';
import { useSearchParams, useRouter } from 'next/navigation';

export function MultiStepForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = parseInt(searchParams.get('step') || '1');

  const goToStep = (newStep: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('step', String(newStep));
    router.push(\`?\${params.toString()}\`);
  };

  return (
    <div>
      {step === 1 && <Step1 onNext={() => goToStep(2)} />}
      {step === 2 && <Step2 onNext={() => goToStep(3)} onBack={() => goToStep(1)} />}
      {step === 3 && <Step3 onBack={() => goToStep(2)} />}
    </div>
  );
}

// Patrón: Form con Server Action + Validación
'use server';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function signUp(prevState: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Procesar signup...
  return { success: true };
}`}
        </pre>
      </section>

      <div className="mt-8 flex justify-between">
        <Link href="/learn/09-optimization" className="text-gray-400 hover:text-white">
          ← Optimización
        </Link>
        <Link href="/learn/12-advanced-patterns" className="text-blue-400 hover:underline">
          Siguiente: Más Patrones →
        </Link>
      </div>
    </div>
  );
}
