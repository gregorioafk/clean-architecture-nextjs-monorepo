/**
 * LECCIÓN 05: ROUTING AVANZADO
 *
 * - Layouts anidados
 * - Route Groups (paréntesis)
 * - Layouts paralelos
 */

import Link from 'next/link';

export default function RoutingPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">05. Routing Avanzado</h1>

      {/* Layouts Anidados */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-green-400 mb-4">🏗️ Layouts Anidados</h2>
        <p className="text-gray-300 mb-4">
          Los layouts se anidan automáticamente. Cada carpeta puede tener su propio layout.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// Estructura:
app/
├── layout.tsx          ← Root Layout (HTML, body)
├── page.tsx            ← /
└── dashboard/
    ├── layout.tsx      ← Dashboard Layout (sidebar)
    ├── page.tsx        ← /dashboard
    └── settings/
        ├── layout.tsx  ← Settings Layout (tabs)
        └── page.tsx    ← /dashboard/settings

// Resultado en /dashboard/settings:
<RootLayout>            {/* HTML, body, providers */}
  <DashboardLayout>     {/* Sidebar */}
    <SettingsLayout>    {/* Tabs */}
      <SettingsPage />  {/* Contenido */}
    </SettingsLayout>
  </DashboardLayout>
</RootLayout>`}
        </pre>

        <Link
          href="/learn/02-routing/layouts"
          className="inline-block bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
        >
          Ver Demo de Layouts →
        </Link>
      </section>

      {/* Route Groups */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">📁 Route Groups (paréntesis)</h2>
        <p className="text-gray-300 mb-4">
          Organiza rutas sin afectar la URL. Útil para diferentes layouts.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// Estructura:
app/
├── (marketing)/           ← NO aparece en URL
│   ├── layout.tsx         ← Layout para marketing
│   ├── page.tsx           ← / (home)
│   ├── about/page.tsx     ← /about
│   └── contact/page.tsx   ← /contact
│
├── (shop)/                ← NO aparece en URL
│   ├── layout.tsx         ← Layout para tienda
│   ├── products/page.tsx  ← /products
│   └── cart/page.tsx      ← /cart
│
└── (auth)/                ← NO aparece en URL
    ├── layout.tsx         ← Layout minimalista
    ├── login/page.tsx     ← /login
    └── register/page.tsx  ← /register

// Beneficios:
// 1. Diferentes layouts para diferentes secciones
// 2. Organización lógica del código
// 3. URLs limpias (sin el grupo en la ruta)`}
        </pre>

        <Link
          href="/learn/02-routing/route-groups"
          className="inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Ver Demo de Route Groups →
        </Link>
      </section>

      {/* Múltiples Root Layouts */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-purple-400 mb-4">🔀 Múltiples Root Layouts</h2>
        <p className="text-gray-300 mb-4">
          Con Route Groups puedes tener diferentes HTML/body para diferentes secciones.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// Estructura:
app/
├── (marketing)/
│   ├── layout.tsx    ← Tiene <html><body>
│   └── page.tsx
│
└── (dashboard)/
    ├── layout.tsx    ← Tiene <html><body> diferente
    └── page.tsx

// (marketing)/layout.tsx
export default function MarketingLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-white">
        <MarketingNav />
        {children}
        <Footer />
      </body>
    </html>
  );
}

// (dashboard)/layout.tsx
export default function DashboardLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-gray-900">
        <Sidebar />
        {children}
      </body>
    </html>
  );
}

// ⚠️ IMPORTANTE: Si usas múltiples root layouts,
// NO puedes tener un layout.tsx en app/`}
        </pre>
      </section>

      {/* Private Folders */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-orange-400 mb-4">🔒 Private Folders (_underscore)</h2>
        <p className="text-gray-300 mb-4">
          Carpetas que empiezan con _ no son rutas. Útil para organizar código.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// Estructura:
app/
├── _components/       ← NO es una ruta
│   ├── Button.tsx
│   └── Card.tsx
├── _lib/              ← NO es una ruta
│   └── utils.ts
├── dashboard/
│   ├── _components/   ← Componentes locales
│   │   └── Chart.tsx
│   └── page.tsx
└── page.tsx

// Uso:
// /_components → 404
// /_lib → 404
// /dashboard/_components → 404

// Son solo para organización interna`}
        </pre>
      </section>

      {/* Colocation */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">📦 Colocation</h2>
        <p className="text-gray-300 mb-4">
          Puedes colocar archivos junto a las rutas. Solo page.tsx crea rutas.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// Estructura válida:
app/
└── dashboard/
    ├── page.tsx           ← /dashboard (RUTA)
    ├── DashboardChart.tsx ← Componente local (NO ruta)
    ├── useDashboard.ts    ← Hook local (NO ruta)
    ├── dashboard.test.ts  ← Test (NO ruta)
    └── styles.module.css  ← Estilos (NO ruta)

// Solo estos archivos crean comportamiento:
// page.tsx     → Define la ruta
// layout.tsx   → Layout
// loading.tsx  → Estado de carga
// error.tsx    → Manejo de errores
// not-found.tsx→ 404
// template.tsx → Re-render en navegación
// route.ts     → API Route`}
        </pre>
      </section>

      <div className="mt-8 flex justify-between">
        <Link href="/learn/01-basics/dynamic-routes" className="text-gray-400 hover:text-white">
          ← Rutas Dinámicas
        </Link>
        <Link href="/learn/03-data-fetching" className="text-blue-400 hover:underline">
          Siguiente: Data Fetching →
        </Link>
      </div>
    </div>
  );
}
