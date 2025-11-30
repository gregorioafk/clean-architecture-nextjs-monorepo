'use client';

/**
 * CART SUMMARY - Client Component
 *
 * Muestra el resumen del carrito.
 * DEBE ser 'use client' porque:
 * - Usa useCart (custom hook con useContext)
 * - Usa onClick para eliminar items
 */

import { useCart } from './CartContext';

export function CartSummary() {
  const { items, removeItem, clearCart, total, itemCount } = useCart();

  return (
    <div className="space-y-3">
      {/* Badge indicando que es Client Component */}
      <div className="flex items-center gap-2">
        <span className="text-xs bg-blue-600 px-2 py-0.5 rounded">CLIENT</span>
        <span className="text-xs text-gray-500">useContext</span>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-500 text-sm">Carrito vacío</p>
      ) : (
        <>
          {/* Lista de items */}
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-700 p-2 rounded text-sm"
              >
                <div>
                  <p className="text-white">{item.name}</p>
                  <p className="text-gray-400 text-xs">
                    ${item.price} x {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-400 hover:text-red-300 text-xs"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t border-gray-600 pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Items:</span>
              <span className="text-white">{itemCount}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span className="text-gray-400">Total:</span>
              <span className="text-green-400">${total.toLocaleString()}</span>
            </div>
          </div>

          {/* Botón limpiar */}
          <button
            onClick={clearCart}
            className="w-full py-2 bg-red-600/20 text-red-400 rounded text-sm hover:bg-red-600/30 transition-colors"
          >
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
}
