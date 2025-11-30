/**
 * CAPA: APPLICATION - USE CASE (FUNCIONAL)
 *
 * Use Case para eliminar un producto.
 */

import { DeleteProductFn } from '../../domain/repositories/ProductRepository';

export type DeleteProductUseCase = (id: string) => Promise<boolean>;

export const createDeleteProduct = (deleteFn: DeleteProductFn): DeleteProductUseCase => {
  return (id: string) => deleteFn(id);
};
