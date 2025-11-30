/**
 * CAPA: ADAPTERS - REPOSITORY ADAPTER
 *
 * Este adapter TRADUCE entre:
 * - El DOMINIO (Product, ProductRepository interface)
 * - El EXTERNAL (InMemoryDatabase genérico)
 *
 * Es un "traductor" que:
 * 1. Recibe llamadas del dominio (findAll, findById, create, etc.)
 * 2. Las convierte a operaciones del driver externo (getAll, getById, insert, etc.)
 * 3. Transforma los datos de vuelta al formato del dominio
 *
 * Si cambias de InMemory a MySQL, solo cambias el driver que recibes,
 * la lógica de traducción se mantiene similar.
 */

import { Product, CreateProductDTO, UpdateProductDTO } from '../../domain/entities/Product';
import { ProductRepository } from '../../domain/repositories/ProductRepository';
import { InMemoryDatabase } from '../../external/database';

// Tipo interno para la base de datos (puede ser diferente al dominio)
type ProductRecord = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string; // En BD se guarda como string ISO
  updatedAt: string;
};

// Funciones de mapeo (transformación de datos)
const toProduct = (record: ProductRecord): Product => ({
  ...record,
  createdAt: new Date(record.createdAt),
  updatedAt: new Date(record.updatedAt),
});

const toRecord = (product: Product): ProductRecord => ({
  ...product,
  createdAt: product.createdAt.toISOString(),
  updatedAt: product.updatedAt.toISOString(),
});

// Factory que crea el adapter
export const createProductRepositoryAdapter = (
  database: InMemoryDatabase<ProductRecord>
): ProductRepository => {
  const findAll = async (): Promise<Product[]> => {
    const records = await database.getAll();
    return records.map(toProduct);
  };

  const findById = async (id: string): Promise<Product | null> => {
    const record = await database.getById(id);
    return record ? toProduct(record) : null;
  };

  const create = async (data: CreateProductDTO): Promise<Product> => {
    const id = Date.now().toString();
    const now = new Date();

    const record: ProductRecord = {
      id,
      ...data,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    await database.insert(id, record);
    return toProduct(record);
  };

  const update = async (id: string, data: UpdateProductDTO): Promise<Product | null> => {
    const existing = await database.getById(id);
    if (!existing) return null;

    const updatedRecord = await database.update(id, {
      ...data,
      updatedAt: new Date().toISOString(),
    });

    return updatedRecord ? toProduct(updatedRecord) : null;
  };

  const deleteFn = async (id: string): Promise<boolean> => {
    return database.remove(id);
  };

  return {
    findAll,
    findById,
    create,
    update,
    delete: deleteFn,
  };
};
