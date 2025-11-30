/**
 * DEMO: LAYOUT ANIDADO
 *
 * Este layout envuelve todas las páginas en /learn/02-routing/layouts/*
 * Incluye una sidebar que persiste entre navegaciones.
 */

import Link from 'next/link';

export default function LayoutsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-60px)]">
      {/* Sidebar - Persiste entre navegaciones */}
      <aside className="w-64 bg-gray-800 border-r border-gray-700 p-4">
        <h3 className="font-semibold text-white mb-4">📂 Layouts Demo</h3>
        <nav className="space-y-2">
          <Link
            href="/learn/02-routing/layouts"
            className="block px-3 py-2 rounded hover:bg-gray-700 text-gray-300 hover:text-white"
          >
            Overview
          </Link>
          <Link
            href="/learn/02-routing/layouts/profile"
            className="block px-3 py-2 rounded hover:bg-gray-700 text-gray-300 hover:text-white"
          >
            Profile
          </Link>
          <Link
            href="/learn/02-routing/layouts/settings"
            className="block px-3 py-2 rounded hover:bg-gray-700 text-gray-300 hover:text-white"
          >
            Settings
          </Link>
        </nav>

        <div className="mt-8 p-3 bg-gray-900 rounded text-xs text-gray-400">
          <p>💡 Este sidebar es un layout.</p>
          <p className="mt-1">Nota cómo persiste al navegar entre páginas.</p>
        </div>
      </aside>

      {/* Contenido - Cambia según la ruta */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
