/**
 * Este es el "children" del layout de parallel routes.
 */

export default function ParallelRoutesPage() {
  return (
    <div className="text-gray-300">
      <p>
        Este es el contenido principal (<code>page.tsx</code>).
        Los slots <code>@analytics</code> y <code>@team</code> se
        renderizan en paralelo abajo.
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Cada slot tiene su propio loading.tsx independiente.
      </p>
    </div>
  );
}
