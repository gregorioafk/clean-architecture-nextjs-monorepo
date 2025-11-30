'use client';

/**
 * DEMO: error.tsx
 *
 * Esta página demuestra cómo funciona error.tsx
 */

import { useState } from 'react';
import Link from 'next/link';

export default function ErrorDemoPage() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('¡Este es un error de ejemplo!');
  }

  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Demo: error.tsx</h1>

      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-red-400 mb-4">💥 Provocar un Error</h2>
        <p className="text-gray-300 mb-4">
          Haz click en el botón para lanzar un error y ver cómo{' '}
          <code className="bg-gray-700 px-1 rounded">error.tsx</code> lo maneja.
        </p>

        <button
          onClick={() => setShouldError(true)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded font-medium transition-colors"
        >
          Lanzar Error
        </button>
      </section>

      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-lg font-semibold text-yellow-400 mb-2">¿Cómo funciona?</h2>
        <p className="text-gray-300 text-sm">
          <code className="bg-gray-700 px-1 rounded">error.tsx</code> actúa como un Error Boundary.
          Cuando ocurre un error, muestra una UI alternativa sin romper toda la aplicación.
        </p>
      </div>

      <Link href="/learn/01-basics/special-files" className="text-gray-400 hover:text-white">
        ← Volver
      </Link>
    </div>
  );
}
