/**
 * LECCIÓN 07: SERVER ACTIONS
 *
 * Funciones que se ejecutan en el servidor, llamadas desde el cliente.
 * Perfectas para formularios y mutaciones.
 */

import Link from 'next/link';
import { ServerActionForm } from './ServerActionForm';
import { revalidatePath } from 'next/cache';

// Server Action definida en el mismo archivo
async function addMessage(formData: FormData) {
  'use server';

  const message = formData.get('message') as string;

  // Simular guardar en BD
  console.log('Mensaje recibido en servidor:', message);

  // Revalidar la página para mostrar nuevos datos
  revalidatePath('/learn/04-server-actions');

  return { success: true, message };
}

export default function ServerActionsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto text-white">
      <h1 className="text-3xl font-bold mb-6">07. Server Actions</h1>

      {/* Introducción */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-green-400 mb-4">🚀 ¿Qué son?</h2>
        <p className="text-gray-300 mb-4">
          Server Actions son funciones async que se ejecutan en el servidor.
          Pueden llamarse desde formularios o event handlers.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// Dos formas de definirlas:

// 1. En un archivo separado (recomendado)
// app/actions.ts
'use server';  // ← Marca TODO el archivo

export async function createUser(formData: FormData) {
  const name = formData.get('name');
  await db.user.create({ data: { name } });
  revalidatePath('/users');
}

// 2. Inline en Server Component
export default function Page() {
  async function handleSubmit(formData: FormData) {
    'use server';  // ← Marca solo esta función
    // ...
  }

  return <form action={handleSubmit}>...</form>;
}`}
        </pre>
      </section>

      {/* Formulario con Server Action */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-400 mb-4">📝 Formulario Básico</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// El action del form puede ser una Server Action
<form action={createUser}>
  <input name="name" />
  <button type="submit">Crear</button>
</form>

// Next.js automáticamente:
// 1. Serializa el FormData
// 2. Envía al servidor
// 3. Ejecuta la función
// 4. Refresca los Server Components`}
        </pre>

        <div className="bg-gray-900 p-4 rounded">
          <p className="text-gray-400 text-sm mb-2">Demo en vivo:</p>
          <form action={addMessage} className="flex gap-3">
            <input
              name="message"
              placeholder="Escribe un mensaje..."
              className="flex-1 px-3 py-2 bg-gray-800 rounded text-white"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Enviar
            </button>
          </form>
          <p className="text-gray-500 text-xs mt-2">
            (Revisa la consola del servidor para ver el mensaje)
          </p>
        </div>
      </section>

      {/* Con Client Component */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-purple-400 mb-4">🔄 Con Estado de Carga</h2>
        <p className="text-gray-300 mb-4">
          Usa <code>useFormStatus</code> o <code>useActionState</code> para mostrar estados.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto mb-4">
{`// SubmitButton.tsx
'use client';
import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Enviando...' : 'Enviar'}
    </button>
  );
}

// Uso:
<form action={createUser}>
  <input name="name" />
  <SubmitButton />  {/* Muestra "Enviando..." durante submit */}
</form>`}
        </pre>

        <ServerActionForm />
      </section>

      {/* useActionState */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-orange-400 mb-4">📊 useActionState</h2>
        <p className="text-gray-300 mb-4">
          Hook para manejar estado de Server Actions con resultados.
        </p>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// actions.ts
'use server';

type State = {
  message: string;
  errors?: { name?: string[] };
};

export async function createUser(
  prevState: State,
  formData: FormData
): Promise<State> {
  const name = formData.get('name') as string;

  // Validación
  if (name.length < 3) {
    return {
      message: 'Error',
      errors: { name: ['Mínimo 3 caracteres'] },
    };
  }

  // Crear usuario
  await db.user.create({ data: { name } });

  return { message: 'Usuario creado!' };
}

// Component.tsx
'use client';
import { useActionState } from 'react';
import { createUser } from './actions';

export function CreateUserForm() {
  const [state, formAction, pending] = useActionState(
    createUser,
    { message: '' }
  );

  return (
    <form action={formAction}>
      <input name="name" />
      {state.errors?.name && (
        <p className="text-red-500">{state.errors.name[0]}</p>
      )}
      <button disabled={pending}>
        {pending ? 'Creando...' : 'Crear'}
      </button>
      {state.message && <p>{state.message}</p>}
    </form>
  );
}`}
        </pre>
      </section>

      {/* Llamar desde evento */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-cyan-400 mb-4">🖱️ Desde Event Handlers</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`// actions.ts
'use server';

export async function incrementLikes(productId: string) {
  await db.product.update({
    where: { id: productId },
    data: { likes: { increment: 1 } },
  });
  revalidatePath('/products');
}

// LikeButton.tsx
'use client';
import { incrementLikes } from './actions';
import { useTransition } from 'react';

export function LikeButton({ productId }: { productId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => startTransition(() => incrementLikes(productId))}
      disabled={isPending}
    >
      {isPending ? '❤️...' : '🤍 Like'}
    </button>
  );
}`}
        </pre>
      </section>

      {/* Revalidación */}
      <section className="bg-gray-800 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-red-400 mb-4">🔄 Revalidación</h2>

        <pre className="bg-gray-900 p-4 rounded text-sm overflow-x-auto">
{`'use server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
  const post = await db.post.create({ ... });

  // Opción 1: Revalidar una ruta específica
  revalidatePath('/posts');

  // Opción 2: Revalidar una ruta dinámica
  revalidatePath('/posts/[id]', 'page');

  // Opción 3: Revalidar por tag
  revalidateTag('posts');

  // Opción 4: Redirigir después de crear
  redirect(\`/posts/\${post.id}\`);
}`}
        </pre>
      </section>

      {/* Best Practices */}
      <section className="bg-yellow-900/30 border border-yellow-600 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold text-yellow-400 mb-2">💡 Best Practices</h2>
        <ul className="text-gray-300 space-y-2">
          <li>✅ Siempre valida datos en el servidor (nunca confíes en el cliente)</li>
          <li>✅ Usa <code>revalidatePath/revalidateTag</code> después de mutaciones</li>
          <li>✅ Muestra estados de carga con <code>useFormStatus</code></li>
          <li>✅ Separa las actions en archivos <code>actions.ts</code></li>
          <li>❌ No pases datos sensibles desde el cliente</li>
          <li>❌ No uses Server Actions para leer datos (usa Server Components)</li>
        </ul>
      </section>

      <div className="mt-8 flex justify-between">
        <Link href="/learn/03-data-fetching" className="text-gray-400 hover:text-white">
          ← Data Fetching
        </Link>
        <Link href="/learn/06-streaming" className="text-blue-400 hover:underline">
          Siguiente: Streaming →
        </Link>
      </div>
    </div>
  );
}
