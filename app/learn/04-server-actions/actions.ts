'use server';

/**
 * Server Actions para la lección 04
 *
 * Este archivo debe tener 'use server' al inicio para
 * poder ser importado desde Client Components.
 */

// Server Action que simula un delay
export async function slowAction(formData: FormData) {
  // Simular delay de 2 segundos
  await new Promise((r) => setTimeout(r, 2000));
  console.log('Datos recibidos:', formData.get('data'));
}
