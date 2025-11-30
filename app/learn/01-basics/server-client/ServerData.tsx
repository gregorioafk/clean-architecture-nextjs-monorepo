/**
 * EJEMPLO: SERVER COMPONENT
 *
 * Este componente NO tiene 'use client', por lo tanto:
 * - Se ejecuta en el servidor
 * - Puede ser async
 * - Puede acceder a datos directamente
 * - NO envía JavaScript al cliente
 */

// Simulamos un delay para mostrar que es async
async function getData() {
  // En un caso real, esto sería una llamada a BD o API
  await new Promise((resolve) => setTimeout(resolve, 100));

  return {
    totalProducts: 156,
    lastUpdate: new Date().toISOString(),
  };
}

export async function ServerData() {
  // Esto se ejecuta EN EL SERVIDOR
  const data = await getData();

  return (
    <div className="mt-4 p-3 bg-gray-800 rounded text-sm">
      <p className="text-gray-400">
        Datos del servidor:
      </p>
      <p className="text-green-400">
        Total productos: {data.totalProducts}
      </p>
      <p className="text-gray-500 text-xs mt-1">
        Última actualización: {data.lastUpdate}
      </p>
    </div>
  );
}
