/**
 * PRODUCT LIST - Server Component
 *
 * Renderiza la lista de productos.
 * NO tiene 'use client' porque:
 * - No usa hooks (useState, useEffect)
 * - No usa event handlers directamente
 * - Solo renderiza datos que recibe como props
 *
 * Los botones interactivos son Client Components separados.
 */

import { AddToCartButton } from './AddToCartButton';

type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  stock: number;
};

export function ProductList({ products }: { products: Product[] }) {
  return (
    <div>
      {/* Badge indicando que es Server Component */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xs bg-green-600 px-2 py-0.5 rounded">SERVER</span>
        <span className="text-xs text-gray-500">Renderizado en servidor, no envía JS</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-lg p-4 border border-gray-700"
          >
            {/* Contenido estático - Server */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-white">{product.name}</h3>
                <p className="text-sm text-gray-400 capitalize">{product.category}</p>
              </div>
              <span className="text-xs bg-gray-700 px-2 py-1 rounded">
                Stock: {product.stock}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-xl font-bold text-green-400">
                ${product.price.toLocaleString()}
              </p>

              {/* Botón interactivo - Client Component */}
              <AddToCartButton product={product} />
            </div>
          </div>
        ))}
      </div>

      {/* Explicación */}
      <div className="mt-4 p-3 bg-gray-900 rounded text-xs text-gray-400">
        <p>
          <span className="text-green-400">✅ ProductList</span> es un Server Component.
          Renderiza la estructura HTML en el servidor.
        </p>
        <p className="mt-1">
          <span className="text-blue-400">🔵 AddToCartButton</span> es un Client Component
          dentro de ProductList. Solo los botones envían JS al cliente.
        </p>
      </div>
    </div>
  );
}
