# Guía Completa de Next.js 15 (App Router)

Esta guía cubre todos los conceptos de Next.js desde básico hasta experto, con ejemplos implementados en el proyecto.

## Índice

1. [Nivel 1: Básico](#nivel-1-básico)
2. [Nivel 2: Intermedio](#nivel-2-intermedio)
3. [Nivel 3: Avanzado](#nivel-3-avanzado)
4. [Nivel 4: Experto](#nivel-4-experto)
5. [Referencia Rápida](#referencia-rápida)

---

## Nivel 1: Básico

### 1.1 Archivos Especiales

Next.js usa convención sobre configuración. Estos archivos tienen significado especial:

| Archivo | Propósito |
|---------|-----------|
| `page.tsx` | Define una ruta (obligatorio para que sea accesible) |
| `layout.tsx` | UI compartida entre rutas (persiste entre navegaciones) |
| `loading.tsx` | UI de carga automática (usa Suspense internamente) |
| `error.tsx` | Error boundary (debe ser 'use client') |
| `not-found.tsx` | UI para 404 |
| `template.tsx` | Similar a layout pero re-monta en cada navegación |
| `default.tsx` | Fallback para Parallel Routes |

**Ver ejemplo:** `app/learn/01-basics/page.tsx`

### 1.2 Server Components vs Client Components

```tsx
// Server Component (default) - se ejecuta en el servidor
export default async function Page() {
  const data = await db.query();  // Acceso directo a DB
  return <div>{data}</div>;
}

// Client Component - se ejecuta en el navegador
'use client';
export default function Counter() {
  const [count, setCount] = useState(0);  // Interactividad
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**Regla:** Usa Server Components por defecto. Solo usa Client cuando necesites:
- `useState`, `useEffect`, `useContext`
- Event listeners (`onClick`, `onChange`)
- APIs del navegador (`window`, `localStorage`)

**Ver ejemplo:** `app/learn/01-basics/server-client/`

### 1.3 Navegación

```tsx
// Link - navegación declarativa (prefetch automático)
import Link from 'next/link';
<Link href="/products">Productos</Link>

// useRouter - navegación programática
'use client';
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/products');
router.replace('/home');
router.back();

// usePathname - ruta actual
const pathname = usePathname();  // '/products'

// useSearchParams - query params
const searchParams = useSearchParams();
searchParams.get('page');  // '1'
```

**Ver ejemplo:** `app/learn/01-basics/navigation/`

### 1.4 Rutas Dinámicas

```
app/products/[id]/page.tsx      → /products/123
app/blog/[...slug]/page.tsx     → /blog/2024/01/post (array)
app/shop/[[...path]]/page.tsx   → /shop o /shop/a/b (opcional)
```

```tsx
// Acceder a parámetros
export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return <div>Producto {id}</div>;
}
```

**Ver ejemplo:** `app/learn/01-basics/dynamic-routes/`

---

## Nivel 2: Intermedio

### 2.1 Layouts y Route Groups

```
app/
├── (marketing)/         ← Route Group (no afecta URL)
│   ├── layout.tsx       ← Layout solo para marketing
│   ├── about/page.tsx   → /about
│   └── blog/page.tsx    → /blog
├── (shop)/
│   ├── layout.tsx       ← Layout solo para shop
│   └── products/page.tsx → /products
└── layout.tsx           ← Root layout
```

**Ver ejemplo:** `app/learn/02-routing/`

### 2.2 Data Fetching

```tsx
// En Server Components - fetch directo
async function Page() {
  // Cache permanente (default)
  const data = await fetch('https://api.com/data');

  // Revalidar cada hora
  const data = await fetch('https://api.com/data', {
    next: { revalidate: 3600 }
  });

  // Sin cache (siempre fresco)
  const data = await fetch('https://api.com/data', {
    cache: 'no-store'
  });

  // Con tags para invalidación manual
  const data = await fetch('https://api.com/data', {
    next: { tags: ['products'] }
  });
}

// Invalidar cache manualmente
import { revalidateTag, revalidatePath } from 'next/cache';
revalidateTag('products');
revalidatePath('/products');
```

**Ver ejemplo:** `app/learn/03-data-fetching/page.tsx`

### 2.3 Server Actions

```tsx
// Definir acción
'use server';

export async function createProduct(formData: FormData) {
  const name = formData.get('name');
  await db.products.create({ data: { name } });
  revalidatePath('/products');
  redirect('/products');
}

// Usar en formulario
<form action={createProduct}>
  <input name="name" />
  <button type="submit">Crear</button>
</form>

// Con useFormStatus para loading
'use client';
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending}>{pending ? 'Guardando...' : 'Guardar'}</button>;
}
```

**Ver ejemplo:** `app/learn/04-server-actions/`

---

## Nivel 3: Avanzado

### 3.1 Streaming con Suspense

```tsx
import { Suspense } from 'react';

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>  {/* Se muestra inmediatamente */}

      <Suspense fallback={<Skeleton />}>
        <SlowComponent />  {/* Se carga después */}
      </Suspense>
    </div>
  );
}

async function SlowComponent() {
  const data = await slowFetch();  // 3 segundos
  return <div>{data}</div>;
}
```

**Ver ejemplo:** `app/learn/06-streaming/page.tsx`

### 3.2 Parallel Routes

```
app/dashboard/
├── @analytics/page.tsx  ← Slot "analytics"
├── @team/page.tsx       ← Slot "team"
├── layout.tsx           ← Recibe {children, analytics, team}
└── page.tsx             ← children
```

```tsx
// layout.tsx
export default function Layout({
  children,
  analytics,
  team,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
}) {
  return (
    <div>
      {children}
      <div className="grid grid-cols-2">
        {analytics}
        {team}
      </div>
    </div>
  );
}
```

**Ver ejemplo:** `app/learn/07-parallel-routes/`

### 3.3 Intercepting Routes

```
app/
├── @modal/
│   ├── (.)photos/[id]/page.tsx  ← Intercepta /photos/[id] como modal
│   └── default.tsx              ← Cuando no hay modal
├── photos/[id]/page.tsx         ← Página completa (hard navigation)
└── layout.tsx                   ← Muestra children + modal
```

Convenciones:
- `(.)` - Mismo nivel
- `(..)` - Un nivel arriba
- `(...)` - Desde root

**Ver ejemplo:** `app/learn/08-intercepting-routes/page.tsx`

### 3.4 Middleware

```tsx
// middleware.ts (raíz del proyecto)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Proteger rutas
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('token');
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico).*)'],
};
```

**Ver ejemplo:** `middleware.ts` y `app/learn/10-middleware-auth/page.tsx`

---

## Nivel 4: Experto

### 4.1 Optimización de Imágenes

```tsx
import Image from 'next/image';

// Local (width/height inferidos)
<Image src={localImage} alt="Local" placeholder="blur" />

// Remota (width/height requeridos)
<Image src="https://..." alt="Remote" width={800} height={600} priority />

// Responsive (fill)
<Image src="/hero.jpg" alt="Hero" fill style={{ objectFit: 'cover' }} />
```

### 4.2 Metadata y SEO

```tsx
// Estática
export const metadata: Metadata = {
  title: 'Mi App',
  description: 'Descripción',
  openGraph: { images: ['/og.jpg'] },
};

// Dinámica
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProduct(params.id);
  return { title: product.name };
}
```

### 4.3 OG Images Dinámicas

```tsx
// app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title');

  return new ImageResponse(
    <div style={{ /* styles */ }}>{title}</div>,
    { width: 1200, height: 630 }
  );
}
```

**Ver ejemplo:** `app/learn/09-optimization/page.tsx`

### 4.4 Patrones Avanzados

- **Composición:** Pasar Server Components como children a Client Components
- **Infinite Scroll:** IntersectionObserver + estado paginado
- **Optimistic Updates:** useOptimistic de React 19
- **Polling:** useEffect + setInterval o Server Actions con revalidate

**Ver ejemplos:** `app/learn/11-patterns/` y `app/learn/12-advanced-patterns/`

---

## Referencia Rápida

### Imports Comunes

```tsx
// Navegación
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { redirect, notFound } from 'next/navigation';

// Data & Cache
import { revalidatePath, revalidateTag } from 'next/cache';
import { unstable_cache } from 'next/cache';

// Headers & Cookies
import { headers, cookies } from 'next/headers';

// Metadata
import { Metadata } from 'next';
import { ImageResponse } from 'next/og';

// Componentes
import Image from 'next/image';
import Script from 'next/script';

// Dynamic
import dynamic from 'next/dynamic';
```

### Configuración next.config.js

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: 'example.com' }],
  },
  experimental: {
    serverActions: { bodySizeLimit: '2mb' },
  },
};

module.exports = nextConfig;
```

### Estructura del Proyecto

```
app/
├── (routes)/
│   ├── page.tsx
│   ├── layout.tsx
│   └── [dynamic]/
├── api/
│   └── route.ts
├── globals.css
└── layout.tsx

components/
hooks/
lib/
public/
```

---

## Cómo Usar Esta Guía

1. **Navega a** `http://localhost:3000/learn` para ver el índice interactivo
2. **Cada lección** tiene código comentado en español
3. **Los ejemplos son funcionales** - prueba la interactividad
4. **El código fuente** está en `app/learn/`

Para ejecutar:
```bash
npm run dev
# Abre http://localhost:3000/learn
```
