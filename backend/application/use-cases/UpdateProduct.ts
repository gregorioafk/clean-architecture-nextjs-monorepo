/**
 * CAPA: APPLICATION - USE CASE (FUNCIONAL)
 *
 * Use Case para actualizar un producto existente.
 */

import { Product, UpdateProductDTO } from '../../domain/entities/Product';
import { UpdateProductFn } from '../../domain/repositories/ProductRepository';

export type UpdateProductUseCase = (id: string, data: UpdateProductDTO) => Promise<Product | null>;

export const createUpdateProduct = (update: UpdateProductFn): UpdateProductUseCase => {
  return async (id: string, data: UpdateProductDTO) => {
    // Validaciones de negocio
    if (data.price !== undefined && data.price < 0) {
      throw new Error('El precio no puede ser negativo');
    }

    if (data.stock !== undefined && data.stock < 0) {
      throw new Error('El stock no puede ser negativo');
    }

    return update(id, data);
  };
};
