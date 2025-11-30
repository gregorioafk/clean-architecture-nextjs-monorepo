/**
 * DEMO INTERACTIVO: Server vs Client Components
 *
 * Esta página muestra un ejemplo real de una tienda
 * combinando Server y Client Components.
 */

import Link from 'next/link';
import { ProductList } from './ProductList';
import { CartProvider } from './CartContext';
import { CartSummary } from './CartSummary';
import { SearchFilter } from './SearchFilter';

// Simulamos datos del servidor (en real sería de BD)
async function getProducts() {
  // Simular delay de red
  await new Promise((r) => setTimeout(r, 500));

  return [
    { id: 1, name: 'MacBook Pro', price: 1999, category: 'laptops', stock: 5 },
    { id: 2, name: 'iPhone 15', price: 999, category: 'phones', stock: 12 },
    { id: 3, name: 'iPad Air', price: 599, category: 'tablets', stock: 8 },
    { id: 4, name: 'AirPods Pro', price: 249, category: 'accessories', stock: 25 },
    { id: 5, name: 'Apple Watch', price: 399, category: 'watches', stock: 15 },
    { id: 6, name: 'Magic Keyboard', price: 99, category: 'accessories', stock: 30 },
  ];
}

// Esto se ejecuta EN EL SERVIDOR
async function getServerInfo() {
  return {
    serverTime: new Date().toISOString().slice(11, 19),
    nodeVersion: process.version,
    environment: process.env.NODE_ENV,
  };
}

export default async function InteractiveDemoPage() {
  // Fetch de datos en el servidor (sin useEffect!)
  const products = await getProducts();
  const serverInfo = await getServerInfo();

  return (
    <div className="p-8 max-w-6xl mx-auto text-white">
      <div className="mb-6">
        <Link href="/learn/01-basics/server-client" className="text-gray-400 hover:text-white text-sm">
          ← Volver a Server vs Client
        </Link>
        <h1 className="text-3xl font-bold mt-2">Demo: Tienda con Server + Client Components</h1>
        <p className="text-gray-400 mt-1">
          Un ejemplo real combinando ambos tipos de componentes
        </p>
      </div>

      {/* Info del Servidor */}
      <div className="bg-green-900/30 border border-green-600 rounded-lg p-4 mb-6">
        <h2 className="text-green-400 font-semibold mb-2">🖥️ Información del Servidor</h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Hora del servidor:</p>
            <p className="text-white font-mono">{serverInfo.serverTime}</p>
          </div>
          <div>
            <p className="text-gray-400">Node.js:</p>
            <p className="text-white font-mono">{serverInfo.nodeVersion}</p>
          </div>
          <div>
            <p className="text-gray-400">Entorno:</p>
            <p className="text-white font-mono">{serverInfo.environment}</p>
          </div>
        </div>
        <p className="text-green-400/70 text-xs mt-2">
          ✅ Esta información viene del servidor (process.env, process.version) - imposible en cliente
        </p>
      </div>

      {/* Tienda */}
      <CartProvider>
        <div className="grid grid-cols-4 gap-6">
          {/* Sidebar - Filtros (Client) */}
          <aside className="col-span-1">
            <div className="bg-gray-800 rounded-lg p-4 sticky top-20">
              <h3 className="font-semibold text-white mb-4">🔍 Filtros</h3>
              <SearchFilter />

              <div className="mt-6 pt-4 border-t border-gray-700">
                <h3 className="font-semibold text-white mb-3">🛒 Carrito</h3>
                <CartSummary />
              </div>
            </div>
          </aside>

          {/* Productos (Server + Client) */}
          <main className="col-span-3">
            <ProductList products={products} />
          </main>
        </div>
      </CartProvider>

      {/* Explicación */}
      <div className="mt-8 bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-yellow-400 mb-4">🧠 ¿Qué está pasando aquí?</h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-green-400 font-medium mb-2">Server Components (verde)</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• <code className="bg-gray-700 px-1 rounded">page.tsx</code> - Fetch de productos</li>
              <li>• <code className="bg-gray-700 px-1 rounded">ProductList</code> - Renderiza la lista</li>
              <li>• Información del servidor (node version, etc)</li>
              <li>• No envían JavaScript al cliente</li>
            </ul>
          </div>

          <div>
            <h3 className="text-blue-400 font-medium mb-2">Client Components (azul)</h3>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>• <code className="bg-gray-700 px-1 rounded">SearchFilter</code> - Input interactivo</li>
              <li>• <code className="bg-gray-700 px-1 rounded">CartSummary</code> - Estado del carrito</li>
              <li>• <code className="bg-gray-700 px-1 rounded">AddToCartButton</code> - Botón onClick</li>
              <li>• <code className="bg-gray-700 px-1 rounded">CartProvider</code> - Context para estado global</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-900 rounded">
          <h4 className="text-cyan-400 font-medium mb-2">🔑 Patrón clave: Composición</h4>
          <pre className="text-xs text-gray-300 overflow-x-auto">
{`// page.tsx (Server Component)
export default async function Page() {
  const products = await getProducts(); // ✅ Fetch en servidor

  return (
    <CartProvider>          {/* Client - provee contexto */}
      <SearchFilter />      {/* Client - input interactivo */}
      <ProductList          {/* Server - renderiza lista */}
        products={products} {/* Datos pasan como props */}
      />
    </CartProvider>
  );
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
