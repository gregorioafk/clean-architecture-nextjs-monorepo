/**
 * Página de Usuarios del Dashboard
 */

import Link from 'next/link';

const users = [
  { id: 1, name: 'Ana García', email: 'ana@example.com', role: 'Admin' },
  { id: 2, name: 'Carlos López', email: 'carlos@example.com', role: 'Editor' },
  { id: 3, name: 'María Torres', email: 'maria@example.com', role: 'Viewer' },
  { id: 4, name: 'Pedro Ruiz', email: 'pedro@example.com', role: 'Editor' },
];

export default function UsersPage() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">👥 Usuarios</h2>

      <div className="bg-gray-800 rounded-lg overflow-hidden mb-6">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-left px-4 py-3 text-sm text-gray-300">Nombre</th>
              <th className="text-left px-4 py-3 text-sm text-gray-300">Email</th>
              <th className="text-left px-4 py-3 text-sm text-gray-300">Rol</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-700">
                <td className="px-4 py-3 text-white">{user.name}</td>
                <td className="px-4 py-3 text-gray-400">{user.email}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs ${
                    user.role === 'Admin' ? 'bg-red-600' :
                    user.role === 'Editor' ? 'bg-blue-600' : 'bg-gray-600'
                  }`}>
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-3">
        <Link
          href="/learn/01-basics/special-files/template-demo"
          className="text-gray-400 hover:text-white"
        >
          ← Dashboard
        </Link>
        <Link
          href="/learn/01-basics/special-files/template-demo/products"
          className="text-blue-400 hover:underline"
        >
          Productos →
        </Link>
      </div>
    </div>
  );
}
