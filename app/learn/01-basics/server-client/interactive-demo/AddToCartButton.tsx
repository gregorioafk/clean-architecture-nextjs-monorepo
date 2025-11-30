'use client';

/**
 * ADD TO CART BUTTON - Client Component
 *
 * Botón para agregar productos al carrito.
 * DEBE ser 'use client' porque:
 * - Usa useCart (custom hook)
 * - Usa onClick event handler
 * - Usa useState para feedback visual
 */

import { useState } from 'react';
import { useCart } from './CartContext';

type Product = {
  id: number;
  name: string;
  price: number;
};

export function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={added}
      className={`px-4 py-2 rounded text-sm font-medium transition-all ${
        added
          ? 'bg-green-600 text-white'
          : 'bg-blue-600 hover:bg-blue-700 text-white'
      }`}
    >
      {added ? '✓ Agregado' : 'Agregar'}
    </button>
  );
}
