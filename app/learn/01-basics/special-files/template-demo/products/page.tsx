/**
 * Página de Productos del Dashboard
 */

import Link from 'next/link';

const products = [
  { id: 1, name: 'Laptop Pro', price: 1299, stock: 45 },
  { id: 2, name: 'Mouse Wireless', price: 49, stock: 120 },
  { id: 3, name: 'Teclado Mecánico', price: 149, stock: 78 },
  { id: 4, name: 'Monitor 4K', price: 599, stock: 23 },
];

export default function ProductsPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">📦 Productos</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {products.map((product) => (
          <div key={product.id} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-semibold text-white mb-2">{product.name}</h3>
            <div className="flex justify-between text-sm">
              <span className="text-green-400">${product.price}</span>
              <span className="text-gray-400">{product.stock} en stock</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-purple-400 mb-2">💡 Observa el Template</h3>
        <p className="text-gray-300 text-sm">
          Al navegar aquí desde otra sección, el panel de Analytics (arriba) se actualizó:
          el contador de navegaciones aumentó, el timer se reinició, y el historial muestra tu recorrido.
        </p>
      </div>

      <div className="flex gap-3">
        <Link
          href="/learn/01-basics/special-files/template-demo/users"
          className="text-gray-400 hover:text-white"
        >
          ← Usuarios
        </Link>
        <Link
          href="/learn/01-basics/special-files/template-demo/settings"
          className="text-blue-400 hover:underline"
        >
          Configuración →
        </Link>
      </div>
    </div>
  );
}
