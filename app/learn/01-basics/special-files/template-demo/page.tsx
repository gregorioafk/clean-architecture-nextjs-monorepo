/**
 * DEMO: template.tsx
 *
 * Página principal del dashboard que demuestra template.tsx
 */

import Link from 'next/link';

export default function TemplateDemoPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📊 Dashboard Principal</h2>

      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-green-400 mb-2">Bienvenido al Dashboard</h3>
        <p className="text-gray-300 mb-4">
          Este es un ejemplo de cómo <code className="bg-gray-700 px-1 rounded">template.tsx</code>{' '}
          se re-ejecuta en cada navegación, a diferencia de <code className="bg-gray-700 px-1 rounded">layout.tsx</code>.
        </p>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-blue-600/20 border border-blue-600 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-blue-400">1,234</p>
            <p className="text-sm text-gray-400">Visitantes</p>
          </div>
          <div className="bg-green-600/20 border border-green-600 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-green-400">$5,678</p>
            <p className="text-sm text-gray-400">Ventas</p>
          </div>
          <div className="bg-purple-600/20 border border-purple-600 p-4 rounded-lg text-center">
            <p className="text-3xl font-bold text-purple-400">89%</p>
            <p className="text-sm text-gray-400">Satisfacción</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-yellow-400 mb-2">🧪 Prueba la diferencia</h3>
        <p className="text-gray-300 text-sm mb-4">
          Navega entre las secciones y observa el panel lateral. Verás que:
        </p>
        <ul className="text-gray-400 text-sm space-y-2 mb-4">
          <li>• El <strong className="text-white">timestamp del Template</strong> cambia en cada navegación</li>
          <li>• El <strong className="text-white">timestamp del Layout</strong> permanece igual</li>
          <li>• El <strong className="text-white">contador de visitas</strong> se incrementa</li>
          <li>• El <strong className="text-white">tiempo en página</strong> se registra al salir</li>
        </ul>

        <div className="flex gap-3">
          <Link
            href="/learn/01-basics/special-files/template-demo/users"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
          >
            Ir a Usuarios →
          </Link>
          <Link
            href="/learn/01-basics/special-files/template-demo/products"
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors"
          >
            Ir a Productos →
          </Link>
        </div>
      </div>
    </div>
  );
}
