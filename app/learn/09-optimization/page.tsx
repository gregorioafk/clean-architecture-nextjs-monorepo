/**
 * LECCIÓN 13: OPTIMIZACIÓN EN NEXT.JS
 *
 * Images, Fonts, Metadata, Bundle Size, y más.
 */

import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';

// Metadata estática para esta página
export const metadata: Metadata = {
  title: 'Optimización en Next.js',
  description: 'Aprende a optimizar imágenes, fuentes y rendimiento',
};

export default function OptimizationPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">13. Optimización</h1>

      {/* Image Optimization */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-green-400 mb-4">🖼️ Optimización de Imágenes</h2>
        <p className="text-gray-300 mb-4">
          El componente <code>next/image</code> optimiza automáticamente las imágenes.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`import Image from 'next/image';

// 1. Imagen local (automáticamente optimizada)
import profilePic from './profile.jpg';

export default function Page() {
  return (
    <>
      {/* Imagen local - width/height inferidos */}
      <Image
        src={profilePic}
        alt="Profile"
        placeholder="blur"  // Blur mientras carga
      />

      {/* Imagen remota - width/height requeridos */}
      <Image
        src="https://example.com/image.jpg"
        alt="Remote image"
        width={800}
        height={600}
        priority  // Precarga (LCP images)
      />

      {/* Imagen responsive */}
      <Image
        src="/hero.jpg"
        alt="Hero"
        fill  // Llena el contenedor padre
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: 'cover' }}
      />
    </>
  );
}`}
        </pre>

        <div className="bg-gray-900 p-4 rounded">
          <h3 className="text-yellow-400 font-medium mb-2">Configurar dominios remotos</h3>
          <pre className="text-sm overflow-x-auto">
{`// next.config.js
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
      },
    ],
    // Formatos de imagen
    formats: ['image/avif', 'image/webp'],
    // Tamaños de device
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};`}
          </pre>
        </div>
      </section>

      {/* Font Optimization */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">🔤 Optimización de Fuentes</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google';

// Google Fonts - descargadas en build time (no requests externos)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={\`\${inter.variable} \${robotoMono.variable}\`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

// En CSS/Tailwind:
// font-family: var(--font-inter);
// font-family: var(--font-roboto-mono);`}
        </pre>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// Fuentes locales
import localFont from 'next/font/local';

const myFont = localFont({
  src: [
    {
      path: './fonts/MyFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/MyFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-my-font',
});`}
        </pre>
      </section>

      {/* Metadata */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-purple-400 mb-4">📋 Metadata y SEO</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// Metadata estática
export const metadata: Metadata = {
  title: 'Mi App',
  description: 'Descripción de mi app',
  keywords: ['nextjs', 'react', 'typescript'],

  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    title: 'Mi App',
    description: 'Descripción para redes sociales',
    url: 'https://miapp.com',
    siteName: 'Mi App',
    images: [
      {
        url: 'https://miapp.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Mi App Preview',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Mi App',
    description: 'Descripción para Twitter',
    images: ['https://miapp.com/twitter-image.jpg'],
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Alternates
  alternates: {
    canonical: 'https://miapp.com',
    languages: {
      'en-US': 'https://miapp.com/en',
      'es-ES': 'https://miapp.com/es',
    },
  },
};`}
        </pre>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// Metadata dinámica (para páginas con params)
import { Metadata } from 'next';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = await getProduct(id);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  // ...
}`}
        </pre>
      </section>

      {/* OG Images */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-orange-400 mb-4">🎨 Imágenes OG Dinámicas</h2>
        <p className="text-gray-300 mb-4">
          Next.js puede generar imágenes Open Graph dinámicamente con React.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// app/api/og/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Mi App';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a2e',
          padding: 50,
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 30,
            color: '#888',
            marginTop: 20,
          }}
        >
          miapp.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}

// Uso: /api/og?title=Mi%20Título`}
        </pre>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// app/blog/[slug]/opengraph-image.tsx
// Genera OG image automáticamente para cada post
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Blog post image';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return new ImageResponse(
    (
      <div style={{ /* ... */ }}>
        <h1>{post.title}</h1>
      </div>
    ),
    size
  );
}`}
        </pre>
      </section>

      {/* Script Optimization */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">📜 Optimización de Scripts</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`import Script from 'next/script';

export default function Page() {
  return (
    <>
      {/* beforeInteractive - Carga antes de cualquier código Next.js */}
      <Script
        src="https://polyfill.io/v3/polyfill.min.js"
        strategy="beforeInteractive"
      />

      {/* afterInteractive (default) - Carga después del hydration */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_ID"
        strategy="afterInteractive"
      />

      {/* lazyOnload - Carga durante idle time */}
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
      />

      {/* worker - Carga en web worker (experimental) */}
      <Script
        src="https://heavy-script.js"
        strategy="worker"
      />

      {/* Inline script con onLoad */}
      <Script id="inline-script" strategy="afterInteractive">
        {\`console.log('Script loaded!')\`}
      </Script>

      {/* Con callbacks */}
      <Script
        src="/analytics.js"
        onLoad={() => console.log('Loaded')}
        onError={() => console.log('Error')}
        onReady={() => console.log('Ready')}
      />
    </>
  );
}`}
        </pre>
      </section>

      {/* Bundle Analysis */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-pink-400 mb-4">📦 Análisis del Bundle</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// Instalar: npm install @next/bundle-analyzer

// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // tu config normal
});

// Ejecutar: ANALYZE=true npm run build`}
        </pre>

        <div className="bg-gray-900 p-4 rounded">
          <h3 className="text-yellow-400 font-medium mb-2">Tips para reducir bundle size</h3>
          <ul className="text-gray-300 text-sm space-y-2">
            <li>• <code>dynamic()</code> para componentes grandes</li>
            <li>• <code>next/dynamic</code> con <code>ssr: false</code> para libs client-only</li>
            <li>• Imports específicos: <code>import debounce from lodash/debounce</code></li>
            <li>• Revisar dependencias con <code>npm ls</code></li>
            <li>• Usar <code>modularizeImports</code> en next.config.js</li>
          </ul>
        </div>
      </section>

      {/* Lazy Loading */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-lime-400 mb-4">⚡ Lazy Loading</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`import dynamic from 'next/dynamic';

// 1. Componente pesado con loading placeholder
const HeavyChart = dynamic(() => import('@/components/Chart'), {
  loading: () => <div className="animate-pulse h-64 bg-gray-800" />,
});

// 2. Componente solo cliente (no SSR)
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,  // No renderiza en servidor
  loading: () => <p>Cargando mapa...</p>,
});

// 3. Named exports
const Modal = dynamic(
  () => import('@/components/Modal').then((mod) => mod.Modal)
);

// 4. Lazy loading de librerías
export async function handleClick() {
  const { format } = await import('date-fns');
  const formatted = format(new Date(), 'PP');
  console.log(formatted);
}

// 5. React.lazy + Suspense (alternativa)
import { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
}`}
        </pre>
      </section>

      <div className="mt-8 flex justify-between">
        <Link href="/learn/10-middleware-auth" className="text-gray-400 hover:text-white">
          ← Middleware & Auth
        </Link>
        <Link href="/learn/11-patterns" className="text-blue-400 hover:underline">
          Siguiente: Patrones Avanzados →
        </Link>
      </div>
    </div>
  );
}
