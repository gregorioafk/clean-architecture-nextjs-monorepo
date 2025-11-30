'use client';

/**
 * ERROR.TSX
 *
 * Error Boundary automático para esta ruta.
 * DEBE ser un Client Component ('use client').
 */

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">Demo: error.tsx</h1>

      <section className="bg-red-900/30 border border-red-700 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-red-400 mb-4">❌ ¡Ocurrió un Error!</h2>
        <p className="text-gray-300 mb-2">
          <strong>Mensaje:</strong> {error.message}
        </p>
        {error.digest && (
          <p className="text-gray-500 text-sm mb-4">
            Digest: {error.digest}
          </p>
        )}

        <button
          onClick={reset}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium transition-colors"
        >
          Intentar de nuevo
        </button>
      </section>

      <div className="bg-gray-800 p-4 rounded-lg">
        <p className="text-gray-400 text-sm">
          Este es el contenido de <code className="bg-gray-700 px-1 rounded">error.tsx</code>.
          La función <code className="bg-gray-700 px-1 rounded">reset()</code> intenta re-renderizar el componente.
        </p>
      </div>
    </div>
  );
}
