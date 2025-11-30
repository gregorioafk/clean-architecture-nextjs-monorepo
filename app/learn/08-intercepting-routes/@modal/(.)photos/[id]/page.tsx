'use client';

/**
 * MODAL INTERCEPTADO
 *
 * Este componente se muestra cuando navegas con Link desde la galería.
 * Intercepta la ruta /photos/[id] y la muestra como modal.
 */

import { useRouter } from 'next/navigation';

const photoData: Record<string, { title: string; color: string }> = {
  '1': { title: 'Montaña', color: 'bg-blue-600' },
  '2': { title: 'Playa', color: 'bg-yellow-600' },
  '3': { title: 'Bosque', color: 'bg-green-600' },
  '4': { title: 'Ciudad', color: 'bg-purple-600' },
};

export default function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  // Unwrap params (Next.js 15+)
  const { id } = require('react').use(params);
  const photo = photoData[id] || { title: 'Desconocida', color: 'bg-gray-600' };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      onClick={() => router.back()}
    >
      <div
        className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`${photo.color} aspect-video rounded-lg flex items-center justify-center mb-4`}
        >
          <span className="text-white text-4xl font-bold">{photo.title}</span>
        </div>

        <h2 className="text-xl font-bold text-white mb-2">
          Foto: {photo.title}
        </h2>

        <p className="text-gray-400 text-sm mb-4">
          ID: {id} — Esta es la vista modal (interceptada).
          La URL cambió pero la galería sigue visible detrás.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => router.back()}
            className="flex-1 bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Cerrar
          </button>
          <button
            onClick={() => router.push(`/learn/08-intercepting-routes/photos/${id}`)}
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500"
          >
            Ver página completa
          </button>
        </div>
      </div>
    </div>
  );
}
