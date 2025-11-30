/**
 * CAPA: DOMAIN - REPOSITORY INTERFACE (FUNCIONAL)
 *
 * Define el CONTRATO usando tipos de función en lugar de una interfaz de clase.
 * Cada operación es un tipo de función independiente.
 */

import { Product, CreateProductDTO, UpdateProductDTO } from '../entities/Product';

// Tipos de función para cada operación del repositorio
export type FindAllProducts = () => Promise<Product[]>;
export type FindProductById = (id: string) => Promise<Product | null>;
export type CreateProductFn = (data: CreateProductDTO) => Promise<Product>;
export type UpdateProductFn = (id: string, data: UpdateProductDTO) => Promise<Product | null>;
export type DeleteProductFn = (id: string) => Promise<boolean>;
export type EditProductFn = (id: string) => Promise<Product>

// Tipo que agrupa todas las funciones del repositorio
export type ProductRepository = {
  findAll: FindAllProducts;
  findById: FindProductById;
  create: CreateProductFn;
  update: UpdateProductFn;
  delete: DeleteProductFn;
  edit: EditProductFn;
};
