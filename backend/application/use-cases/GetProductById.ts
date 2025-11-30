/**
 * CAPA: APPLICATION - USE CASE (FUNCIONAL)
 *
 * Use Case para obtener un producto por su ID.
 */

import { Product } from '../../domain/entities/Product';
import { FindProductById } from '../../domain/repositories/ProductRepository';

export type GetProductByIdUseCase = (id: string) => Promise<Product | null>;

export const createGetProductById = (findById: FindProductById): GetProductByIdUseCase => {
  return (id: string) => findById(id);
};
