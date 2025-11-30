/**
 * DEMO: Server Action con estado de carga
 */
'use client';

import { useFormStatus } from 'react-dom';
import { slowAction } from './actions';

// Botón que muestra estado de carga
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`px-4 py-2 rounded font-medium transition-colors ${
        pending
          ? 'bg-gray-600 cursor-not-allowed'
          : 'bg-purple-600 hover:bg-purple-700'
      }`}
    >
      {pending ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Enviando...
        </span>
      ) : (
        'Enviar con loading'
      )}
    </button>
  );
}

export function ServerActionForm() {
  return (
    <div className="bg-gray-900 p-4 rounded">
      <p className="text-gray-400 text-sm mb-2">
        Demo con useFormStatus (tarda 2 segundos):
      </p>
      <form action={slowAction} className="flex gap-3">
        <input
          name="data"
          placeholder="Escribe algo..."
          className="flex-1 px-3 py-2 bg-gray-800 rounded text-white"
          required
        />
        <SubmitButton />
      </form>
    </div>
  );
}
