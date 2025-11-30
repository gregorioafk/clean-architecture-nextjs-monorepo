/**
 * ARQUITECTURAS DE ESCALABILIDAD EN NEXT.JS
 *
 * Guía para elegir la arquitectura correcta según el tamaño y complejidad
 * de tu proyecto. Desde MVP hasta aplicaciones enterprise.
 */

import Link from 'next/link';

const architectures = [
  {
    level: 1,
    name: 'Solo Server Components',
    complexity: '⭐',
    when: 'MVP, landing pages, blogs',
    color: 'green',
    pros: [
      'Configuración mínima',
      'Rápido de desarrollar',
      'Excelente SEO por defecto',
      'Sin complejidad adicional',
    ],
    cons: [
      'Difícil de escalar',
      'Lógica mezclada con UI',
      'No reutilizable fuera de Next.js',
    ],
    structure: `app/
├── page.tsx          # Fetch directo en componente
├── products/
│   └── page.tsx      # async function + await db.query()
└── layout.tsx`,
    code: `// app/products/page.tsx
export default async function ProductsPage() {
  // Fetch directo en el componente
  const products = await db.product.findMany();

  return (
    <ul>
      {products.map(p => <li key={p.id}>{p.name}</li>)}
    </ul>
  );
}`,
  },
  {
    level: 2,
    name: 'Híbrida (API Selectiva)',
    complexity: '⭐⭐',
    when: 'App web + algunos endpoints externos',
    color: 'blue',
    pros: [
      'API disponible para clientes externos',
      'Server Components para renders',
      'Flexibilidad moderada',
    ],
    cons: [
      'Duplicación de lógica posible',
      'Sin separación clara de capas',
      'Puede volverse desordenado',
    ],
    structure: `app/
├── page.tsx
├── products/
│   └── page.tsx      # Usa fetch interno o directo
├── api/
│   └── products/
│       └── route.ts  # Para clientes externos
└── lib/
    └── db.ts         # Lógica compartida`,
    code: `// app/api/products/route.ts
import { db } from '@/lib/db';

export async function GET() {
  const products = await db.product.findMany();
  return Response.json(products);
}

// app/products/page.tsx
export default async function Page() {
  // Opción A: Directo (más eficiente)
  const products = await db.product.findMany();

  // Opción B: Via API (si necesitas consistencia)
  // const res = await fetch('/api/products');

  return <ProductList products={products} />;
}`,
  },
  {
    level: 3,
    name: 'Clean Architecture',
    complexity: '⭐⭐⭐',
    when: 'App mediana con lógica de negocio compleja',
    color: 'purple',
    pros: [
      'Lógica centralizada en Use Cases',
      'Testeable por capas',
      'Independiente del framework',
      'Fácil de mantener a largo plazo',
    ],
    cons: [
      'Más archivos y carpetas',
      'Curva de aprendizaje inicial',
      'Puede ser overkill para apps simples',
    ],
    structure: `backend/
├── domain/           # Entidades e interfaces
│   ├── entities/
│   └── repositories/
├── application/      # Use Cases (lógica)
│   └── use-cases/
├── adapters/         # Controllers
│   └── controllers/
└── external/         # DB, APIs externas
    └── database/

app/
├── page.tsx          # Llama Use Cases directo
└── api/              # Llama Use Cases via Controller`,
    code: `// 1. Server Component - Directo al Use Case
// app/products/page.tsx
import { GetAllProducts } from '@/backend/application/use-cases';
import { productRepository } from '@/backend/infrastructure/dependencies';

export default async function Page() {
  const products = await GetAllProducts(productRepository)();
  return <ProductList products={products} />;
}

// 2. API Route - Via Controller (misma lógica)
// app/api/products/route.ts
import { productController } from '@/backend/infrastructure/dependencies';

export async function GET() {
  return productController.getAll();
}`,
  },
  {
    level: 4,
    name: 'Monorepo Separado',
    complexity: '⭐⭐⭐⭐',
    when: 'Múltiples apps (web, móvil, admin, etc)',
    color: 'orange',
    pros: [
      'Código compartido entre apps',
      'Equipos independientes',
      'Deploys separados',
      'Máxima escalabilidad',
    ],
    cons: [
      'Configuración compleja',
      'Requiere tooling (Turborepo, Nx)',
      'Overhead de mantenimiento',
    ],
    structure: `monorepo/
├── apps/
│   ├── web/          # Next.js frontend
│   ├── admin/        # Next.js admin panel
│   ├── mobile/       # React Native
│   └── api/          # API standalone (opcional)
├── packages/
│   ├── core/         # Domain + Use Cases
│   ├── ui/           # Componentes compartidos
│   └── config/       # ESLint, TS config
└── turbo.json`,
    code: `// packages/core/use-cases/GetProducts.ts
export const GetProducts = (repo: ProductRepository) =>
  async () => repo.findAll();

// apps/web/app/products/page.tsx
import { GetProducts } from '@repo/core/use-cases';
import { productRepo } from '@/lib/repositories';

export default async function Page() {
  const products = await GetProducts(productRepo)();
  return <ProductList products={products} />;
}

// apps/mobile/screens/Products.tsx
import { GetProducts } from '@repo/core/use-cases';
// Mismo use case, diferente UI`,
  },
];

export default function ArquitecturasPage() {
  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">
          Arquitecturas de Escalabilidad
        </h1>
        <p className="text-gray-400 mb-8">
          Desde MVP hasta enterprise: cómo escalar tu aplicación Next.js
        </p>

        {/* Tabla Comparativa */}
        <section className="bg-gray-900 rounded-xl p-6 mb-8 overflow-x-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Comparación Rápida</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 text-gray-400">Arquitectura</th>
                <th className="text-left py-3 text-gray-400">Complejidad</th>
                <th className="text-left py-3 text-gray-400">Cuándo usar</th>
              </tr>
            </thead>
            <tbody>
              {architectures.map((arch) => (
                <tr key={arch.level} className="border-b border-gray-800">
                  <td className="py-3 text-white font-medium">{arch.name}</td>
                  <td className="py-3">{arch.complexity}</td>
                  <td className="py-3 text-gray-400">{arch.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Server Components vs Server Actions vs API Routes */}
        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            ¿Server Components, Server Actions o API Routes?
          </h2>
          <p className="text-gray-300 mb-6">
            <strong className="text-yellow-400">No es mala práctica usar API Routes</strong>,
            pero Next.js ofrece tres opciones según el contexto:
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-green-900/20 border border-green-600 rounded-lg p-4">
              <h3 className="text-green-400 font-semibold mb-3">
                Server Components
              </h3>
              <p className="text-xs text-gray-400 mb-2">📖 Leer datos</p>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>✅ Fetch de datos (SSR/RSC)</li>
                <li>✅ Render inicial de página</li>
                <li>✅ No hay clientes externos</li>
                <li>✅ Máximo rendimiento</li>
              </ul>
            </div>

            <div className="bg-purple-900/20 border border-purple-600 rounded-lg p-4">
              <h3 className="text-purple-400 font-semibold mb-3">
                Server Actions
              </h3>
              <p className="text-xs text-gray-400 mb-2">✏️ Escribir datos</p>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>✅ Mutations (crear, actualizar, borrar)</li>
                <li>✅ Forms con validación</li>
                <li>✅ Progressive enhancement</li>
                <li>✅ Revalidación automática</li>
              </ul>
            </div>

            <div className="bg-blue-900/20 border border-blue-600 rounded-lg p-4">
              <h3 className="text-blue-400 font-semibold mb-3">
                API Routes
              </h3>
              <p className="text-xs text-gray-400 mb-2">🌐 Externos</p>
              <ul className="text-gray-300 text-sm space-y-2">
                <li>✅ Clientes externos (móvil, otras apps)</li>
                <li>✅ Webhooks de servicios</li>
                <li>✅ API pública/documentada</li>
                <li>✅ Integraciones third-party</li>
              </ul>
            </div>
          </div>

          {/* Diagrama */}
          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
{`┌─────────────────────────────────────────────────────────────┐
│                       CONSUMERS                              │
├───────────────────┬───────────────────┬─────────────────────┤
│  Server Component │    API Route      │    Mobile App       │
│     (SSR/RSC)     │   /api/products   │   (React Native)    │
└─────────┬─────────┴─────────┬─────────┴──────────┬──────────┘
          │                   │                    │
          └───────────────────┼────────────────────┘
                              ▼
                ┌───────────────────────────┐
                │        USE CASES          │  ← Única fuente
                │    (Application Layer)    │     de verdad
                └─────────────┬─────────────┘
                              ▼
                ┌───────────────────────────┐
                │          DOMAIN           │
                └───────────────────────────┘`}
            </pre>
          </div>
        </section>

        {/* Cards de Arquitecturas */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white">
            Detalle por Arquitectura
          </h2>

          {architectures.map((arch) => (
            <div
              key={arch.level}
              className={`bg-gray-900 rounded-xl border-l-4 ${
                arch.color === 'green' ? 'border-green-500' :
                arch.color === 'blue' ? 'border-blue-500' :
                arch.color === 'purple' ? 'border-purple-500' :
                'border-orange-500'
              }`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-bold ${
                      arch.color === 'green' ? 'text-green-400' :
                      arch.color === 'blue' ? 'text-blue-400' :
                      arch.color === 'purple' ? 'text-purple-400' :
                      'text-orange-400'
                    }`}>
                      {arch.level}.
                    </span>
                    <h3 className="text-xl font-bold text-white">{arch.name}</h3>
                  </div>
                  <span className="text-lg">{arch.complexity}</span>
                </div>

                <p className="text-gray-400 mb-4">{arch.when}</p>

                {/* Pros y Cons */}
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h4 className="text-green-400 font-medium mb-2">Ventajas</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {arch.pros.map((pro, i) => (
                        <li key={i}>✅ {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-red-400 font-medium mb-2">Desventajas</h4>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {arch.cons.map((con, i) => (
                        <li key={i}>⚠️ {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Estructura */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-cyan-400 font-medium mb-2">Estructura</h4>
                    <pre className="bg-gray-800 p-3 rounded text-xs text-gray-300 overflow-x-auto">
                      {arch.structure}
                    </pre>
                  </div>
                  <div>
                    <h4 className="text-yellow-400 font-medium mb-2">Código</h4>
                    <pre className="bg-gray-800 p-3 rounded text-xs text-gray-300 overflow-x-auto max-h-48">
                      {arch.code}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Cuándo Migrar */}
        <section className="bg-yellow-900/20 border border-yellow-600 rounded-xl p-6 mt-8">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            ¿Cuándo migrar al siguiente nivel?
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="bg-gray-900 p-4 rounded">
              <p className="text-white font-medium mb-2">1 → 2: Híbrida</p>
              <p className="text-gray-400">
                Cuando necesitas exponer endpoints para una app móvil o terceros.
              </p>
            </div>
            <div className="bg-gray-900 p-4 rounded">
              <p className="text-white font-medium mb-2">2 → 3: Clean Architecture</p>
              <p className="text-gray-400">
                Cuando la lógica de negocio crece y necesitas testearla aisladamente.
              </p>
            </div>
            <div className="bg-gray-900 p-4 rounded">
              <p className="text-white font-medium mb-2">3 → 4: Monorepo</p>
              <p className="text-gray-400">
                Cuando tienes múltiples aplicaciones que comparten lógica.
              </p>
            </div>
            <div className="bg-gray-900 p-4 rounded">
              <p className="text-white font-medium mb-2">Regla general</p>
              <p className="text-gray-400">
                No sobre-arquitecturices. Empieza simple y evoluciona según necesites.
              </p>
            </div>
          </div>
        </section>

        {/* Links */}
        <div className="mt-8 flex gap-4">
          <Link href="/clean-architecture" className="text-blue-400 hover:underline">
            Ver Clean Architecture →
          </Link>
          <Link href="/learn" className="text-purple-400 hover:underline">
            Ver guía de Next.js →
          </Link>
        </div>
      </div>
    </div>
  );
}
