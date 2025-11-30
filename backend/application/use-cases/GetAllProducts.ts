/**
 * CAPA: APPLICATION - USE CASE (FUNCIONAL)
 *
 * Función de orden superior que retorna el use case.
 * Recibe las dependencias y retorna una función ejecutable.
 */

import { Product } from '../../domain/entities/Product';
import { FindAllProducts } from '../../domain/repositories/ProductRepository';

// Tipo del use case
export type GetAllProductsUseCase = () => Promise<Product[]>;

// Factory function: recibe dependencias, retorna el use case
export const createGetAllProducts = (findAll: FindAllProducts): GetAllProductsUseCase => {
  return () => findAll();
};
