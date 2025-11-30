/**
 * CAPA: ADAPTERS - CONTROLLER
 *
 * El Controller es un ADAPTER que traduce entre:
 * - El mundo HTTP (requests, responses, status codes)
 * - Los Use Cases de la aplicación
 *
 * Responsabilidades:
 * 1. Extraer datos del request (body, params, query)
 * 2. Validar formato de entrada (NO lógica de negocio)
 * 3. Llamar al Use Case correspondiente
 * 4. Formatear la respuesta HTTP
 *
 * NO contiene lógica de negocio, solo traducción HTTP <-> Application
 */

import { CreateProductDTO, UpdateProductDTO } from '../../domain/entities/Product';
import {
  GetAllProductsUseCase,
  GetProductByIdUseCase,
  CreateProductUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from '../../application/use-cases';

// Tipos para request/response genéricos (independientes de Next.js)
export type ControllerResponse<T = unknown> = {
  status: number;
  body: {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
  };
};

export type ProductControllerDeps = {
  getAllProducts: GetAllProductsUseCase;
  getProductById: GetProductByIdUseCase;
  createProduct: CreateProductUseCase;
  updateProduct: UpdateProductUseCase;
  deleteProduct: DeleteProductUseCase;
};

// Factory que crea el controller
export const createProductController = (deps: ProductControllerDeps) => {
  const getAll = async (): Promise<ControllerResponse> => {
    try {
      const products = await deps.getAllProducts();
      return {
        status: 200,
        body: { success: true, data: products },
      };
    } catch (error) {
      return {
        status: 500,
        body: { success: false, error: 'Error al obtener productos' },
      };
    }
  };

  const getById = async (id: string): Promise<ControllerResponse> => {
    try {
      const product = await deps.getProductById(id);

      if (!product) {
        return {
          status: 404,
          body: { success: false, error: 'Producto no encontrado' },
        };
      }

      return {
        status: 200,
        body: { success: true, data: product },
      };
    } catch (error) {
      return {
        status: 500,
        body: { success: false, error: 'Error al obtener producto' },
      };
    }
  };

  const create = async (data: Partial<CreateProductDTO>): Promise<ControllerResponse> => {
    try {
      // Validación de formato (NO de negocio)
      if (!data.name || data.price === undefined || data.stock === undefined) {
        return {
          status: 400,
          body: { success: false, error: 'Faltan campos requeridos: name, price, stock' },
        };
      }

      const product = await deps.createProduct({
        name: data.name,
        description: data.description || '',
        price: data.price,
        stock: data.stock,
      });

      return {
        status: 201,
        body: { success: true, data: product },
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al crear producto';
      return {
        status: 400,
        body: { success: false, error: message },
      };
    }
  };

  const update = async (id: string, data: UpdateProductDTO): Promise<ControllerResponse> => {
    try {
      const product = await deps.updateProduct(id, data);

      if (!product) {
        return {
          status: 404,
          body: { success: false, error: 'Producto no encontrado' },
        };
      }

      return {
        status: 200,
        body: { success: true, data: product },
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al actualizar producto';
      return {
        status: 400,
        body: { success: false, error: message },
      };
    }
  };

  const remove = async (id: string): Promise<ControllerResponse> => {
    try {
      const deleted = await deps.deleteProduct(id);

      if (!deleted) {
        return {
          status: 404,
          body: { success: false, error: 'Producto no encontrado' },
        };
      }

      return {
        status: 200,
        body: { success: true, message: 'Producto eliminado correctamente' },
      };
    } catch (error) {
      return {
        status: 500,
        body: { success: false, error: 'Error al eliminar producto' },
      };
    }
  };

  return {
    getAll,
    getById,
    create,
    update,
    remove,
  };
};

export type ProductController = ReturnType<typeof createProductController>;
