'use client';

/**
 * SEARCH FILTER - Client Component
 *
 * Input de búsqueda interactivo.
 * DEBE ser 'use client' porque:
 * - Usa useState para el valor del input
 * - Usa onChange event handler
 */

import { useState } from 'react';

export function SearchFilter() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  return (
    <div className="space-y-4">
      {/* Badge indicando que es Client Component */}
      <div className="flex items-center gap-2">
        <span className="text-xs bg-blue-600 px-2 py-0.5 rounded">CLIENT</span>
        <span className="text-xs text-gray-500">useState + onChange</span>
      </div>

      {/* Input de búsqueda */}
      <div>
        <label className="text-sm text-gray-400 block mb-1">Buscar:</label>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Escribe para buscar..."
          className="w-full px-3 py-2 bg-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {search && (
          <p className="text-xs text-blue-400 mt-1">
            Buscando: &quot;{search}&quot;
          </p>
        )}
      </div>

      {/* Select de categoría */}
      <div>
        <label className="text-sm text-gray-400 block mb-1">Categoría:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 bg-gray-700 rounded text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Todas</option>
          <option value="laptops">Laptops</option>
          <option value="phones">Teléfonos</option>
          <option value="tablets">Tablets</option>
          <option value="accessories">Accesorios</option>
          <option value="watches">Relojes</option>
        </select>
      </div>

      {/* Info */}
      <div className="text-xs text-gray-500 p-2 bg-gray-900 rounded">
        💡 Este filtro usa <code>useState</code> y <code>onChange</code>, por eso necesita{' '}
        <code>&apos;use client&apos;</code>
      </div>
    </div>
  );
}
