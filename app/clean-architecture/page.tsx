/**
 * PÁGINA: CLEAN ARCHITECTURE
 *
 * Explicación completa de Clean Architecture con ejemplos del proyecto.
 */

import Link from 'next/link';

export default function CleanArchitecturePage() {
  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-white">Clean Architecture</h1>
        <p className="text-gray-400 mb-8">
          Propuesta por Robert C. Martin (Uncle Bob) para crear software mantenible y testeable.
        </p>

        {/* ¿Qué es? */}
        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">¿Qué es Clean Architecture?</h2>
          <p className="text-gray-300 mb-4">
            Es un patrón de diseño que organiza el código en capas concéntricas, donde las
            <strong className="text-white"> dependencias siempre apuntan hacia adentro</strong>.
            El objetivo es separar las reglas de negocio de los detalles de implementación.
          </p>
          <div className="bg-gray-800 p-4 rounded-lg">
            <p className="text-yellow-400 font-medium mb-2">Principio fundamental:</p>
            <p className="text-gray-300">
              Las capas internas NO conocen a las capas externas. El dominio nunca importa
              de adapters o external.
            </p>
          </div>
        </section>

        {/* Diagrama */}
        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-green-400 mb-4">Las 4 Capas</h2>

          <div className="grid gap-4 mb-6">
            {/* Diagrama visual */}
            <div className="bg-gray-800 p-6 rounded-lg text-center font-mono text-sm">
              <div className="inline-block text-left">
                <pre className="text-gray-300">
{`┌─────────────────────────────────────────────────────┐
│                    EXTERNAL                          │
│            (Database, APIs, Frameworks)              │
│  ┌─────────────────────────────────────────────┐    │
│  │                ADAPTERS                      │    │
│  │         (Controllers, Repositories)          │    │
│  │  ┌─────────────────────────────────────┐    │    │
│  │  │            APPLICATION              │    │    │
│  │  │           (Use Cases)               │    │    │
│  │  │  ┌─────────────────────────────┐   │    │    │
│  │  │  │          DOMAIN             │   │    │    │
│  │  │  │   (Entities, Interfaces)    │   │    │    │
│  │  │  └─────────────────────────────┘   │    │    │
│  │  └─────────────────────────────────────┘    │    │
│  └─────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────┘

          ← ← ← Las dependencias apuntan hacia adentro → → →`}
                </pre>
              </div>
            </div>
          </div>

          {/* Explicación de cada capa */}
          <div className="space-y-4">
            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="text-lg font-bold text-yellow-400">1. Domain (Entidades)</h3>
              <p className="text-gray-400 text-sm mb-2">
                El corazón del sistema. Contiene las reglas de negocio más importantes.
              </p>
              <code className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">
                backend/domain/entities/ + backend/domain/repositories/
              </code>
            </div>

            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="text-lg font-bold text-blue-400">2. Application (Use Cases)</h3>
              <p className="text-gray-400 text-sm mb-2">
                Orquesta el flujo de datos. Implementa los casos de uso del negocio.
              </p>
              <code className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">
                backend/application/use-cases/
              </code>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="text-lg font-bold text-green-400">3. Adapters (Interface Adapters)</h3>
              <p className="text-gray-400 text-sm mb-2">
                Convierte datos entre el formato del dominio y el mundo exterior.
              </p>
              <code className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">
                backend/adapters/controllers/ + backend/adapters/repositories/
              </code>
            </div>

            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="text-lg font-bold text-purple-400">4. External (Frameworks & Drivers)</h3>
              <p className="text-gray-400 text-sm mb-2">
                Detalles de implementación: bases de datos, frameworks, APIs externas.
              </p>
              <code className="text-xs bg-gray-800 px-2 py-1 rounded text-gray-300">
                backend/external/database/
              </code>
            </div>
          </div>
        </section>

        {/* Implementación en este proyecto */}
        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">Implementación en Este Proyecto</h2>

          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-4">
            <pre className="text-gray-300">
{`backend/
├── domain/                    # CAPA 1: Dominio
│   ├── entities/
│   │   └── Product.ts         # Entidad Product + DTOs
│   └── repositories/
│       └── ProductRepository.ts  # Interface (contrato)
│
├── application/               # CAPA 2: Aplicación
│   └── use-cases/
│       ├── GetAllProducts.ts  # Caso de uso: listar
│       ├── GetProductById.ts  # Caso de uso: obtener uno
│       ├── CreateProduct.ts   # Caso de uso: crear
│       ├── UpdateProduct.ts   # Caso de uso: actualizar
│       └── DeleteProduct.ts   # Caso de uso: eliminar
│
├── adapters/                  # CAPA 3: Adaptadores
│   ├── controllers/
│   │   └── ProductController.ts  # Maneja HTTP requests
│   └── repositories/
│       └── ProductRepositoryAdapter.ts  # Implementa la interface
│
├── external/                  # CAPA 4: Externa
│   └── database/
│       └── InMemoryDatabase.ts  # Almacenamiento en memoria
│
└── infrastructure/
    └── dependencies.ts        # Composition Root (DI)`}
            </pre>
          </div>
        </section>

        {/* Flujo de datos */}
        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-orange-400 mb-4">Flujo de una Request</h2>

          <div className="bg-gray-800 rounded-lg p-4 font-mono text-sm overflow-x-auto mb-4">
            <pre className="text-gray-300">
{`HTTP Request → API Route → Controller → Use Case → Repository → Database
                                                         ↓
HTTP Response ← API Route ← Controller ← Use Case ← Repository ← Database

Ejemplo: GET /api/products/1

1. API Route recibe la request
   app/api/products/[id]/route.ts

2. Controller procesa y valida
   ProductController.getById(id)

3. Use Case ejecuta la lógica
   GetProductById(repository)(id)

4. Repository obtiene los datos
   ProductRepositoryAdapter.findById(id)

5. Database retorna el producto
   InMemoryDatabase.get("products", id)`}
            </pre>
          </div>
        </section>

        {/* Código de ejemplo */}
        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">Código de Ejemplo</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-white font-medium mb-2">1. Entidad (Domain)</h3>
              <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                <code className="text-gray-300">
{`// backend/domain/entities/Product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export type CreateProductDTO = Omit<Product, 'id'>;
export type UpdateProductDTO = Partial<CreateProductDTO>;`}
                </code>
              </pre>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">2. Interface del Repository (Domain)</h3>
              <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                <code className="text-gray-300">
{`// backend/domain/repositories/ProductRepository.ts
import { Product, CreateProductDTO, UpdateProductDTO } from '../entities/Product';

// Solo definimos el CONTRATO, no la implementación
export type FindAllProducts = () => Promise<Product[]>;
export type FindProductById = (id: string) => Promise<Product | null>;
export type CreateProduct = (data: CreateProductDTO) => Promise<Product>;
export type UpdateProduct = (id: string, data: UpdateProductDTO) => Promise<Product | null>;
export type DeleteProduct = (id: string) => Promise<boolean>;

export interface ProductRepository {
  findAll: FindAllProducts;
  findById: FindProductById;
  create: CreateProduct;
  update: UpdateProduct;
  delete: DeleteProduct;
}`}
                </code>
              </pre>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">3. Use Case (Application)</h3>
              <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                <code className="text-gray-300">
{`// backend/application/use-cases/GetProductById.ts
import { ProductRepository } from '../../domain/repositories/ProductRepository';

// Factory function que recibe la dependencia
export const GetProductById = (repository: ProductRepository) => {
  return async (id: string) => {
    const product = await repository.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  };
};`}
                </code>
              </pre>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">4. Composition Root (Infrastructure)</h3>
              <pre className="bg-gray-800 p-4 rounded-lg text-sm overflow-x-auto">
                <code className="text-gray-300">
{`// backend/infrastructure/dependencies.ts

// Aquí se ensamblan todas las piezas
const database = createInMemoryDatabase();
const productRepository = createProductRepositoryAdapter(database);
const productController = createProductController({
  getAllProducts: GetAllProducts(productRepository),
  getProductById: GetProductById(productRepository),
  createProduct: CreateProduct(productRepository),
  updateProduct: UpdateProduct(productRepository),
  deleteProduct: DeleteProduct(productRepository),
});

export { productController };`}
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className="bg-gray-900 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-lime-400 mb-4">Beneficios</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-white font-medium mb-2">Testeable</h3>
              <p className="text-gray-400 text-sm">
                Puedes testear cada capa de forma aislada usando mocks.
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-white font-medium mb-2">Mantenible</h3>
              <p className="text-gray-400 text-sm">
                Los cambios en una capa no afectan a las demás.
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-white font-medium mb-2">Independiente del Framework</h3>
              <p className="text-gray-400 text-sm">
                El dominio no depende de Next.js, Express, etc.
              </p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-white font-medium mb-2">Independiente de la Base de Datos</h3>
              <p className="text-gray-400 text-sm">
                Puedes cambiar de InMemory a PostgreSQL sin tocar el dominio.
              </p>
            </div>
          </div>
        </section>

        {/* Links al código */}
        <section className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-pink-400 mb-4">Explora el Código</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/api/products"
              className="block bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <h3 className="text-white font-medium mb-1">API Demo</h3>
              <p className="text-gray-400 text-sm">
                Prueba la API REST implementada con Clean Architecture
              </p>
            </Link>
            <Link
              href="/learn"
              className="block bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <h3 className="text-white font-medium mb-1">Guía de Next.js</h3>
              <p className="text-gray-400 text-sm">
                Aprende Next.js 15 con ejemplos prácticos
              </p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
