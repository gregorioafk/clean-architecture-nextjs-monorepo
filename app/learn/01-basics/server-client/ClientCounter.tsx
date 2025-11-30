/**
 * EJEMPLO: CLIENT COMPONENT
 *
 * Este componente necesita 'use client' porque:
 * - Usa useState (estado)
 * - Usa onClick (evento)
 */
'use client';

import { useState } from 'react';

export function ClientCounter() {
  // useState SOLO funciona en Client Components
  const [count, setCount] = useState(0);

  // Los event handlers SOLO funcionan en Client Components
  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleClick}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-medium transition-colors"
      >
        Incrementar
      </button>
      <span className="text-2xl font-bold">{count}</span>
    </div>
  );
}
