/**
 * COMPOSITION ROOT - INYECCIÓN DE DEPENDENCIAS
 *
 * Este es el único lugar donde se conectan todas las capas.
 * Aquí se "cablea" todo:
 *
 * EXTERNAL (DB) -> ADAPTER (Repository) -> APPLICATION (Use Cases) -> ADAPTER (Controller)
 *
 * Para cambiar de InMemory a MySQL:
 * 1. Crear MySQLDatabase en external/
 * 2. Cambiar solo la línea del database aquí
 * 3. El resto del código no cambia
 */

import { createInMemoryDatabase } from '../external/database';
import { createProductRepositoryAdapter } from '../adapters/repositories';
import { createProductController } from '../adapters/controllers';
import {
  createGetAllProducts,
  createGetProductById,
  createCreateProduct,
  createUpdateProduct,
  createDeleteProduct,
} from '../application/use-cases';

// Tipo para los registros de la BD
type ProductRecord = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
};

// ============================================
// 1. EXTERNAL LAYER - Database/Driver
// ============================================
const initialProducts = new Map<string, ProductRecord>([
  ['1', {
    id: '1',
    name: 'Laptop HP',
    description: 'Laptop HP 15 pulgadas, 8GB RAM',
    price: 899.99,
    stock: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }],
  ['2', {
    id: '2',
    name: 'Mouse Logitech',
    description: 'Mouse inalámbrico ergonómico',
    price: 29.99,
    stock: 50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }],
  ['3', {
    id: '3',
    name: 'Teclado Mecánico',
    description: 'Teclado mecánico RGB',
    price: 79.99,
    stock: 25,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }],
]);

const database = createInMemoryDatabase<ProductRecord>(initialProducts);

// ============================================
// 2. ADAPTERS LAYER - Repository Adapter
// ============================================
const productRepository = createProductRepositoryAdapter(database);

// ============================================
// 3. APPLICATION LAYER - Use Cases
// ============================================
const getAllProducts = createGetAllProducts(productRepository.findAll);
const getProductById = createGetProductById(productRepository.findById);
const createProduct = createCreateProduct(productRepository.create);
const updateProduct = createUpdateProduct(productRepository.update);
const deleteProduct = createDeleteProduct(productRepository.delete);

// ============================================
// 4. ADAPTERS LAYER - Controller
// ============================================
export const productController = createProductController({
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
});

// También exportamos los use cases por si se necesitan directamente
export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
