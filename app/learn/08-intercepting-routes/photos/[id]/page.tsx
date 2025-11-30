/**
 * PÁGINA COMPLETA DE FOTO
 *
 * Esta página se muestra cuando:
 * 1. El usuario navega directamente a la URL
 * 2. El usuario refresca la página
 * 3. El usuario hace click en "Ver página completa" desde el modal
 */

import Link from 'next/link';

const photoData: Record<string, { title: string; color: string; description: string }> = {
  '1': {
    title: 'Montaña',
    color: 'bg-blue-600',
    description: 'Majestuosas cumbres nevadas que tocan el cielo.',
  },
  '2': {
    title: 'Playa',
    color: 'bg-yellow-600',
    description: 'Arenas doradas bañadas por aguas cristalinas.',
  },
  '3': {
    title: 'Bosque',
    color: 'bg-green-600',
    description: 'Un manto verde de vida y tranquilidad.',
  },
  '4': {
    title: 'Ciudad',
    color: 'bg-purple-600',
    description: 'El pulso vibrante de la vida urbana.',
  },
};

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const photo = photoData[id] || {
    title: 'Desconocida',
    color: 'bg-gray-600',
    description: 'Foto no encontrada.',
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/learn/08-intercepting-routes"
          className="text-blue-400 hover:underline mb-6 inline-block"
        >
          ← Volver a la galería
        </Link>

        <div
          className={`${photo.color} aspect-video rounded-lg flex items-center justify-center mb-6`}
        >
          <span className="text-white text-6xl font-bold">{photo.title}</span>
        </div>

        <h1 className="text-3xl font-bold mb-4">{photo.title}</h1>

        <p className="text-gray-300 text-lg mb-6">{photo.description}</p>

        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-yellow-400 mb-2">
            ℹ️ Página Completa (Hard Navigation)
          </h2>
          <p className="text-gray-400 text-sm">
            Esta es la página completa de la foto. Se muestra cuando:
          </p>
          <ul className="text-gray-400 text-sm mt-2 space-y-1">
            <li>• Navegas directamente a la URL</li>
            <li>• Refrescas la página</li>
            <li>• Compartes el link con alguien</li>
          </ul>
          <p className="text-gray-400 text-sm mt-4">
            En contraste, el <strong>modal</strong> se muestra cuando haces click
            en una foto desde la galería (soft navigation).
          </p>
        </div>

        <div className="mt-6 flex gap-4">
          {Object.keys(photoData).map((photoId) => (
            <Link
              key={photoId}
              href={`/learn/08-intercepting-routes/photos/${photoId}`}
              className={`w-12 h-12 rounded ${photoData[photoId].color} flex items-center justify-center text-white font-bold ${
                photoId === id ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-100'
              }`}
            >
              {photoId}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
