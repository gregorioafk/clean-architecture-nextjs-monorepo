/**
 * PÁGINA PRINCIPAL DE APRENDIZAJE - NEXT.JS COMPLETO
 *
 * Esta es la página índice que lista todos los conceptos de Next.js
 * organizados por nivel de dificultad.
 */

import Link from 'next/link';

const lessons = [
  {
    level: 'Nivel 1: Básico',
    color: 'bg-green-500',
    topics: [
      { href: '/learn/01-basics', title: '01. Archivos Especiales', desc: 'page, layout, loading, error, not-found' },
      { href: '/learn/01-basics/server-client', title: '02. Server vs Client', desc: 'Cuándo usar cada tipo de componente' },
      { href: '/learn/01-basics/navigation', title: '03. Navegación', desc: 'Link, useRouter, usePathname' },
      { href: '/learn/01-basics/dynamic-routes', title: '04. Rutas Dinámicas', desc: '[id], [...slug], [[...slug]]' },
    ],
  },
  {
    level: 'Nivel 2: Intermedio',
    color: 'bg-blue-500',
    topics: [
      { href: '/learn/02-routing', title: '05. Routing Avanzado', desc: 'Layouts anidados y Route Groups' },
      { href: '/learn/03-data-fetching', title: '06. Data Fetching', desc: 'fetch, cache, revalidate' },
      { href: '/learn/04-server-actions', title: '07. Server Actions', desc: 'Formularios y mutations' },
      { href: '/learn/05-caching', title: '08. Caching', desc: 'Estrategias de caché' },
    ],
  },
  {
    level: 'Nivel 3: Avanzado',
    color: 'bg-purple-500',
    topics: [
      { href: '/learn/06-streaming', title: '09. Streaming', desc: 'Suspense y carga progresiva' },
      { href: '/learn/07-parallel-routes', title: '10. Parallel Routes', desc: 'Múltiples páginas simultáneas' },
      { href: '/learn/08-intercepting-routes', title: '11. Intercepting Routes', desc: 'Modales y overlays' },
      { href: '/learn/10-middleware-auth', title: '12. Middleware', desc: 'Auth y protección de rutas' },
    ],
  },
  {
    level: 'Nivel 4: Experto',
    color: 'bg-orange-500',
    topics: [
      { href: '/learn/09-optimization', title: '13. Optimización', desc: 'Images, Fonts, Metadata' },
      { href: '/learn/11-patterns', title: '14. Patrones Avanzados', desc: 'Composición, Infinite Scroll' },
      { href: '/learn/12-advanced-patterns', title: '15. Patrones Avanzados II', desc: 'Cache, Auth, Testing' },
    ],
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">📚 Guía Completa de Next.js</h1>
        <p className="text-gray-400 mb-8">
          Aprende todos los conceptos desde básico hasta experto con ejemplos prácticos.
        </p>

        {lessons.map((section) => (
          <div key={section.level} className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${section.color}`}></span>
              {section.level}
            </h2>
            <div className="grid gap-3">
              {section.topics.map((topic) => (
                <Link
                  key={topic.href}
                  href={topic.href}
                  className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700"
                >
                  <h3 className="font-medium text-white">{topic.title}</h3>
                  <p className="text-sm text-gray-400">{topic.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-8 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="font-medium mb-2">💡 Cómo usar esta guía</h3>
          <ul className="text-sm text-gray-400 space-y-1">
            <li>• Cada lección tiene código comentado en español</li>
            <li>• Los ejemplos son funcionales e interactivos</li>
            <li>• Navega secuencialmente o salta a lo que necesites</li>
            <li>• El código fuente está en <code className="bg-gray-700 px-1 rounded">app/learn/</code></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
