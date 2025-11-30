/**
 * Página de Configuración del Dashboard
 */

import Link from 'next/link';

export default function SettingsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">⚙️ Configuración</h2>

      <div className="space-y-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold text-white mb-3">Notificaciones</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3 text-gray-300">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              Email de resumen diario
            </label>
            <label className="flex items-center gap-3 text-gray-300">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              Alertas de stock bajo
            </label>
            <label className="flex items-center gap-3 text-gray-300">
              <input type="checkbox" className="w-4 h-4" />
              Notificaciones push
            </label>
          </div>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h3 className="font-semibold text-white mb-3">Apariencia</h3>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-gray-700 rounded text-white">Oscuro</button>
            <button className="px-4 py-2 bg-gray-600 rounded text-gray-400">Claro</button>
          </div>
        </div>
      </div>

      <div className="bg-yellow-600/20 border border-yellow-600 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-yellow-400 mb-2">🎯 Caso de Uso Real</h3>
        <p className="text-gray-300 text-sm mb-3">
          En un dashboard real, <code className="bg-gray-800 px-1 rounded">template.tsx</code> sería ideal para:
        </p>
        <ul className="text-gray-400 text-sm space-y-1">
          <li>• <strong className="text-white">Analytics:</strong> Trackear cada navegación del usuario</li>
          <li>• <strong className="text-white">Tiempo en página:</strong> Medir engagement por sección</li>
          <li>• <strong className="text-white">Animaciones:</strong> Fade-in al entrar a cada página</li>
          <li>• <strong className="text-white">Scroll reset:</strong> Volver arriba en cada navegación</li>
          <li>• <strong className="text-white">Focus management:</strong> Mover foco para accesibilidad</li>
        </ul>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-cyan-400 mb-2">📝 Código del Template</h3>
        <pre className="bg-gray-900 p-3 rounded text-xs overflow-x-auto text-gray-300">
{`// template.tsx
'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Template({ children }) {
  const pathname = usePathname();

  useEffect(() => {
    // Se ejecuta en CADA navegación
    const startTime = Date.now();
    trackPageView(pathname);

    return () => {
      // Cleanup al salir de la página
      const timeSpent = Date.now() - startTime;
      trackTimeOnPage(pathname, timeSpent);
    };
  }, [pathname]);

  return children;
}`}
        </pre>
      </div>

      <div className="flex gap-3">
        <Link
          href="/learn/01-basics/special-files/template-demo/products"
          className="text-gray-400 hover:text-white"
        >
          ← Productos
        </Link>
        <Link
          href="/learn/01-basics/special-files/template-demo"
          className="text-blue-400 hover:underline"
        >
          Dashboard →
        </Link>
      </div>
    </div>
  );
}
