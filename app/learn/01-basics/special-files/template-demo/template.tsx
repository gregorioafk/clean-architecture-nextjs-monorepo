'use client';

/**
 * TEMPLATE.TSX - SE RE-MONTA en cada navegación
 *
 * A diferencia de layout.tsx, template.tsx:
 * - Se re-renderiza completamente en cada navegación
 * - El estado se reinicia
 * - Los efectos se vuelven a ejecutar
 * - Perfecto para: animaciones de entrada, analytics, reset de scroll
 */

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visitCount, setVisitCount] = useState(0);
  const [timeOnPage, setTimeOnPage] = useState(0);
  const [lastPaths, setLastPaths] = useState<string[]>([]);

  // Este timestamp cambia en CADA navegación porque template se re-monta
  const templateCreatedAt = new Date().toISOString().slice(11, 19);

  useEffect(() => {
    // Incrementar contador de visitas
    const stored = parseInt(localStorage.getItem('template-demo-visits') || '0');
    const newCount = stored + 1;
    localStorage.setItem('template-demo-visits', String(newCount));
    setVisitCount(newCount);

    // Guardar historial de paths
    const paths = JSON.parse(localStorage.getItem('template-demo-paths') || '[]');
    const updatedPaths = [...paths.slice(-4), pathname];
    localStorage.setItem('template-demo-paths', JSON.stringify(updatedPaths));
    setLastPaths(updatedPaths);

    // Iniciar timer
    const startTime = Date.now();
    const interval = setInterval(() => {
      setTimeOnPage(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    // Log para consola
    console.log(`[Template] 📊 Navegación a: ${pathname}`);
    console.log(`[Template] 👁️ Visita #${newCount}`);

    return () => {
      clearInterval(interval);
      const timeSpent = Math.floor((Date.now() - startTime) / 1000);
      console.log(`[Template] ⏱️ Tiempo en ${pathname}: ${timeSpent}s`);
    };
  }, [pathname]);

  return (
    <div>
      {/* Panel de Analytics - Se actualiza en cada navegación */}
      <div className="bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-orange-400">📈 Analytics (template.tsx)</h3>
          <span className="text-xs bg-orange-600 px-2 py-1 rounded">SE RE-MONTA</span>
        </div>

        <div className="grid grid-cols-4 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-white">{visitCount}</p>
            <p className="text-xs text-gray-400">Navegaciones</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white">{timeOnPage}s</p>
            <p className="text-xs text-gray-400">En esta página</p>
          </div>
          <div>
            <p className="text-sm font-mono text-orange-400">{templateCreatedAt}</p>
            <p className="text-xs text-gray-400">Template creado</p>
          </div>
          <div>
            <p className="text-sm font-mono text-white truncate">{pathname.split('/').pop()}</p>
            <p className="text-xs text-gray-400">Sección actual</p>
          </div>
        </div>

        {lastPaths.length > 1 && (
          <div className="mt-3 pt-3 border-t border-orange-600/30">
            <p className="text-xs text-gray-400 mb-1">Historial de navegación:</p>
            <div className="flex gap-1 flex-wrap">
              {lastPaths.map((path, i) => (
                <span
                  key={i}
                  className={`text-xs px-2 py-0.5 rounded ${
                    i === lastPaths.length - 1
                      ? 'bg-orange-600 text-white'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {path.split('/').pop() || 'home'}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contenido de la página */}
      {children}

      {/* Explicación */}
      <div className="mt-6 bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold text-cyan-400 mb-2">🔍 ¿Qué está pasando?</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="bg-gray-900 p-3 rounded">
            <p className="text-green-400 font-medium mb-1">layout.tsx (Sidebar)</p>
            <ul className="text-gray-400 space-y-1">
              <li>• Se renderiza UNA vez</li>
              <li>• Mantiene su estado</li>
              <li>• El timestamp NO cambia</li>
              <li>• Ideal para: navegación, headers</li>
            </ul>
          </div>
          <div className="bg-gray-900 p-3 rounded">
            <p className="text-orange-400 font-medium mb-1">template.tsx (Analytics)</p>
            <ul className="text-gray-400 space-y-1">
              <li>• Se RE-MONTA en cada navegación</li>
              <li>• Estado se reinicia</li>
              <li>• useEffect se ejecuta de nuevo</li>
              <li>• Ideal para: analytics, animaciones</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
