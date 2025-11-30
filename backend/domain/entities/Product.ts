/**
 * CAPA: DOMAIN - ENTITIES
 *
 * Las entidades representan los objetos de negocio fundamentales.
 * Son independientes de cualquier framework o tecnología externa.
 * Contienen las reglas de negocio más importantes.
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

// DTO para crear un producto (sin id ni fechas)
export interface CreateProductDTO {
  name: string;
  description: string;
  price: number;
  stock: number;
}

// DTO para actualizar un producto (todos los campos opcionales)
export interface UpdateProductDTO {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}


export interface EditProdctDTO {
  name?: string
  descripcion?: string;
  price?: number
  stock?: number
}