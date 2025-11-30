/**
 * CAPA: APPLICATION - USE CASE (FUNCIONAL)
 *
 * Use Case para crear un nuevo producto.
 * Incluye validaciones de negocio.
 */

import { Product, CreateProductDTO } from '../../domain/entities/Product';
import { CreateProductFn } from '../../domain/repositories/ProductRepository';

export type CreateProductUseCase = (data: CreateProductDTO) => Promise<Product>;

export const createCreateProduct = (create: CreateProductFn): CreateProductUseCase => {
  return async (data: CreateProductDTO) => {
    // Validaciones de negocio
    if (data.price < 0) {
      throw new Error('El precio no puede ser negativo');
    }

    if (data.stock < 0) {
      throw new Error('El stock no puede ser negativo');
    }

    return create(data);
  };
};
