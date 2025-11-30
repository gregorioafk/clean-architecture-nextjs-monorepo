# Clean Architecture - Guía Completa

## Índice

1. [¿Qué es Clean Architecture?](#qué-es-clean-architecture)
2. [Las 4 Capas Explicadas](#las-4-capas-explicadas)
3. [Reglas de Comunicación Entre Capas](#reglas-de-comunicación-entre-capas)
4. [Estructura de Este Proyecto](#estructura-de-este-proyecto)
5. [Flujo de una Request](#flujo-de-una-request)
6. [¿Por Qué Se Junta en dependencies.ts?](#por-qué-se-junta-en-dependenciests)
7. [Formas de Implementar Clean Architecture](#formas-de-implementar-clean-architecture)
8. [Cuándo Usar Cada Enfoque](#cuándo-usar-cada-enfoque)

---

## ¿Qué es Clean Architecture?

Clean Architecture es un patrón de diseño propuesto por Robert C. Martin (Uncle Bob) que organiza el código en capas concéntricas, donde **las dependencias siempre apuntan hacia adentro**.

```
┌─────────────────────────────────────────────────────────────┐
│                      EXTERNAL                                │
│   (Frameworks, DB, APIs externas, UI)                       │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                    ADAPTERS                          │   │
│  │   (Controllers, Gateways, Presenters)               │   │
│  │                                                     │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │              APPLICATION                     │   │   │
│  │  │   (Use Cases)                               │   │   │
│  │  │                                             │   │   │
│  │  │  ┌─────────────────────────────────────┐   │   │   │
│  │  │  │            DOMAIN                    │   │   │   │
│  │  │  │   (Entities, Repository Interfaces) │   │   │   │
│  │  │  └─────────────────────────────────────┘   │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Regla de Oro

> **Las capas internas NO conocen a las capas externas.**

- Domain NO sabe que existe Application
- Application NO sabe que existe Adapters
- Adapters NO sabe qué framework específico se usa

### Regla de Dependencias

```
EXTERNAL ──→ ADAPTERS ──→ APPLICATION ──→ DOMAIN
   │            │              │            │
   │            │              │            └── No importa nada
   │            │              └── Solo importa Domain
   │            └── Puede importar Application y Domain
   └── Puede importar Adapters (y transitivamente el resto)

Las flechas indican "puede importar/conocer"
```

---

## Las 4 Capas Explicadas

### 1. DOMAIN (Núcleo) 🎯

**Ubicación:** `src/domain/`

**¿Qué contiene?**
- Entidades del negocio
- Interfaces/contratos de repositorios
- Reglas de negocio fundamentales

**¿Qué NO contiene?**
- Imports de frameworks
- Lógica de base de datos
- Código HTTP

**Ejemplo - Entidad:**
```typescript
// src/domain/entities/Product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}
```

**Ejemplo - Contrato de Repositorio:**
```typescript
// src/domain/repositories/ProductRepository.ts
export type FindAllProducts = () => Promise<Product[]>;
export type CreateProductFn = (data: CreateProductDTO) => Promise<Product>;

export type ProductRepository = {
  findAll: FindAllProducts;
  create: CreateProductFn;
  // ...
};
```

**¿Por qué es importante?**
- Es el corazón de tu aplicación
- Puede probarse sin frameworks
- Si cambias de Express a Fastify, esta capa NO cambia
- Si cambias de MySQL a MongoDB, esta capa NO cambia

---

### 2. APPLICATION (Casos de Uso) ⚙️

**Ubicación:** `src/application/`

**¿Qué contiene?**
- Casos de uso (acciones del sistema)
- Orquestación de entidades
- Reglas de aplicación

**¿Qué NO contiene?**
- Detalles de HTTP (status codes, headers)
- Detalles de base de datos (queries SQL)

**Ejemplo:**
```typescript
// src/application/use-cases/CreateProduct.ts
export const createCreateProduct = (create: CreateProductFn): CreateProductUseCase => {
  return async (data: CreateProductDTO) => {
    // Regla de negocio: precio no puede ser negativo
    if (data.price < 0) {
      throw new Error('El precio no puede ser negativo');
    }

    // Delega al repositorio (no sabe si es MySQL, Mongo, etc.)
    return create(data);
  };
};
```

**¿Por qué es importante?**
- Contiene la lógica de "qué hace el sistema"
- No le importa "cómo" se guarda o "cómo" llega la petición
- Fácil de testear con mocks

---

### 3. ADAPTERS (Adaptadores) 🔌

**Ubicación:** `src/adapters/`

**¿Qué contiene?**
- **Controllers:** Traducen HTTP ↔ Use Cases
- **Repository Adapters:** Traducen Domain ↔ Database
- **Presenters:** Formatean datos de salida

**Ejemplo - Controller:**
```typescript
// src/adapters/controllers/ProductController.ts
export const createProductController = (deps: ProductControllerDeps) => {
  const create = async (data: Partial<CreateProductDTO>): Promise<ControllerResponse> => {
    // Validación de FORMATO (no de negocio)
    if (!data.name || data.price === undefined) {
      return { status: 400, body: { error: 'Faltan campos' } };
    }

    try {
      const product = await deps.createProduct(data);
      return { status: 201, body: { success: true, data: product } };
    } catch (error) {
      return { status: 400, body: { error: error.message } };
    }
  };

  return { create };
};
```

**Ejemplo - Repository Adapter:**
```typescript
// src/adapters/repositories/ProductRepositoryAdapter.ts
export const createProductRepositoryAdapter = (
  database: InMemoryDatabase<ProductRecord>
): ProductRepository => {

  // Traduce del formato de BD al formato de dominio
  const findAll = async (): Promise<Product[]> => {
    const records = await database.getAll();
    return records.map(toProduct); // Transforma ProductRecord → Product
  };

  return { findAll, /* ... */ };
};
```

**¿Por qué es importante?**
- Aísla los detalles técnicos
- El Controller no sabe si usa Next.js, Express o Fastify
- El Repository Adapter no sabe si la BD es MySQL o MongoDB

---

### 4. EXTERNAL (Externos) 🌐

**Ubicación:** `src/external/` y `app/api/`

**¿Qué contiene?**
- Drivers de base de datos
- Frameworks (Next.js, Express)
- Clientes de APIs externas
- Librerías de terceros

**Ejemplo - Database Driver:**
```typescript
// src/external/database/InMemoryDatabase.ts
export const createInMemoryDatabase = <T>(initialData: Map<string, T>) => {
  const store = new Map<string, T>(initialData);

  return {
    getAll: async () => Array.from(store.values()),
    insert: async (id: string, data: T) => { store.set(id, data); return data; },
    // ... operaciones genéricas de BD
  };
};
```

**Ejemplo - Framework (Next.js):**
```typescript
// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { productController } from '../../../src/infrastructure/dependencies';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await productController.create(body);
  return NextResponse.json(result.body, { status: result.status });
}
```

**¿Por qué es importante?**
- Contiene todo lo que es "reemplazable"
- Si cambias de Next.js a Express, solo cambias esta capa
- Si cambias de InMemory a PostgreSQL, solo cambias el driver

---

## Reglas de Comunicación Entre Capas

### ¿Qué comunicaciones están permitidas?

```
┌─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
│   EXTERNAL ──→ ADAPTERS ──→ APPLICATION ──→ DOMAIN                     │
│      │            │              │                                      │
│      │            │              └──→ DOMAIN ✅                         │
│      │            │                                                     │
│      │            ├──→ APPLICATION ✅                                   │
│      │            └──→ DOMAIN ✅ (para transformar datos)              │
│      │                                                                  │
│      ├──→ ADAPTERS ✅                                                   │
│      └──→ DOMAIN ❌ (NO recomendado, salta capas)                      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

### Caso 1: External → Domain (❌ NO recomendado)

```typescript
// ❌ MAL: Next.js route accediendo directamente al dominio
// app/api/products/route.ts
import { Product } from '../../../src/domain/entities/Product';
import { someDatabase } from 'some-db';

export async function GET() {
  // External conoce el dominio Y la base de datos directamente
  // Mezcla responsabilidades, difícil de testear
  const data = await someDatabase.query('SELECT * FROM products');
  const products: Product[] = data.map(/* transformación aquí */);
  return NextResponse.json(products);
}
```

**¿Por qué es malo?**
- El framework conoce detalles del dominio
- No hay validación de negocio
- Difícil de testear
- Si cambias el dominio, rompes el framework

### Caso 2: Adapter → Domain saltando Application (⚠️ Depende)

```typescript
// ✅ VÁLIDO: Repository Adapter conoce el dominio para transformar datos
// src/adapters/repositories/ProductRepositoryAdapter.ts

import { Product } from '../../domain/entities/Product'; // ✅ Conoce el dominio

const toProduct = (record: ProductRecord): Product => ({
  ...record,
  createdAt: new Date(record.createdAt),
});
```

#### ¿Cuándo el Adapter puede saltarse Application?

| Escenario | ¿Válido? | Razón |
|-----------|----------|-------|
| **Transformar datos** | ✅ Sí | El adapter necesita conocer la forma del dominio |
| **CRUD sin lógica** | ⚠️ Depende | Si no hay validaciones, puede ir directo |
| **Operaciones con lógica de negocio** | ❌ No | Validaciones y reglas deben estar en Application |

### Caso 3: ¿Cuándo SÍ pasar por Application?

```typescript
// Escenario: Crear un producto

// ✅ CORRECTO: Controller → Use Case → Repository
// El Use Case valida las reglas de negocio
const createProduct = createCreateProduct(repository.create);
// Dentro del use case:
//   - Valida: precio >= 0
//   - Valida: stock >= 0
//   - Luego llama al repository

// ❌ INCORRECTO: Controller → Repository (salta Application)
// ¿Quién valida el precio? ¿El controller? ¿La BD?
// Las reglas de negocio quedan dispersas
```

### Caso 4: ¿Cuándo se puede saltar Application?

```typescript
// Escenario: Listar todos los productos (sin filtros ni lógica)

// Opción A: Con Application (más "puro")
Controller → GetAllProductsUseCase → Repository

// Opción B: Directo (válido si NO hay lógica)
Controller → Repository

// Ambas son válidas porque:
// - No hay validaciones
// - No hay transformaciones de negocio
// - Es solo SELECT * FROM products
```

### Resumen de Comunicaciones

| Desde | Hacia | ¿Permitido? | Notas |
|-------|-------|-------------|-------|
| External | Adapters | ✅ Sí | Flujo normal |
| External | Application | ⚠️ Evitar | Salta el adapter |
| External | Domain | ❌ No | Rompe la arquitectura |
| Adapters | Application | ✅ Sí | Flujo normal |
| Adapters | Domain | ✅ Sí | Para transformar datos |
| Application | Domain | ✅ Sí | Flujo normal |
| Domain | Cualquiera | ❌ No | El dominio no conoce nada externo |

### Principio Clave

> **"Las capas externas conocen a las internas, pero las internas NO conocen a las externas"**

Esto significa:
- Un Controller puede importar un UseCase ✅
- Un UseCase NO puede importar un Controller ❌
- Un Repository Adapter puede importar una Entity ✅
- Una Entity NO puede importar un Repository Adapter ❌

---

## Estructura de Este Proyecto

```
proyecto/
├── backend/                         # 🔧 CLEAN ARCHITECTURE (API)
│   ├── domain/                      # 🎯 NÚCLEO
│   │   ├── entities/
│   │   │   └── Product.ts           # Entidad Product + DTOs
│   │   └── repositories/
│   │       └── ProductRepository.ts # Contratos (tipos de función)
│   │
│   ├── application/                 # ⚙️ CASOS DE USO
│   │   └── use-cases/
│   │       ├── GetAllProducts.ts
│   │       ├── GetProductById.ts
│   │       ├── CreateProduct.ts
│   │       ├── UpdateProduct.ts
│   │       ├── DeleteProduct.ts
│   │       └── index.ts
│   │
│   ├── adapters/                    # 🔌 ADAPTADORES
│   │   ├── controllers/
│   │   │   ├── ProductController.ts
│   │   │   └── index.ts
│   │   └── repositories/
│   │       ├── ProductRepositoryAdapter.ts
│   │       └── index.ts
│   │
│   ├── external/                    # 🌐 EXTERNOS
│   │   └── database/
│   │       ├── InMemoryDatabase.ts
│   │       └── index.ts
│   │
│   └── infrastructure/
│       └── dependencies.ts          # 🔧 COMPOSITION ROOT
│
├── frontend/                        # 🖥️ UI (React)
│   ├── components/                  # Componentes reutilizables
│   ├── hooks/                       # Custom hooks
│   └── services/
│       └── api.ts                   # Cliente HTTP base
│
└── app/                             # 🌐 EXTERNAL (Framework Next.js)
    ├── api/products/                # API REST (importa backend/)
    │   ├── route.ts
    │   └── [id]/route.ts
    └── page.tsx                     # UI (importará frontend/)
```

---

## Flujo de una Request

### Ejemplo: POST /api/products (Crear Producto)

```
1. EXTERNAL (Next.js)
   ┌────────────────────────────────────────┐
   │ app/api/products/route.ts              │
   │                                        │
   │ POST(request) {                        │
   │   body = await request.json()          │
   │   result = productController.create()  │──────┐
   │   return NextResponse.json(result)     │      │
   │ }                                      │      │
   └────────────────────────────────────────┘      │
                                                   ↓
2. ADAPTER (Controller)
   ┌────────────────────────────────────────┐
   │ ProductController.create()             │
   │                                        │
   │ - Valida formato (campos requeridos)   │
   │ - Llama: deps.createProduct(data)      │──────┐
   │ - Retorna: { status, body }            │      │
   └────────────────────────────────────────┘      │
                                                   ↓
3. APPLICATION (Use Case)
   ┌────────────────────────────────────────┐
   │ createProduct(data)                    │
   │                                        │
   │ - Valida negocio (precio >= 0)         │
   │ - Llama: repository.create(data)       │──────┐
   └────────────────────────────────────────┘      │
                                                   ↓
4. ADAPTER (Repository)
   ┌────────────────────────────────────────┐
   │ ProductRepositoryAdapter.create()      │
   │                                        │
   │ - Transforma: DTO → Record             │
   │ - Llama: database.insert(id, record)   │──────┐
   │ - Transforma: Record → Product         │      │
   └────────────────────────────────────────┘      │
                                                   ↓
5. EXTERNAL (Database)
   ┌────────────────────────────────────────┐
   │ InMemoryDatabase.insert()              │
   │                                        │
   │ - store.set(id, data)                  │
   │ - return data                          │
   └────────────────────────────────────────┘
```

---

## ¿Por Qué Se Junta en dependencies.ts?

El archivo `dependencies.ts` es el **Composition Root** (Raíz de Composición).

### ¿Qué es el Composition Root?

Es el **único lugar** donde se conectan todas las capas. Es donde:
- Se instancian las implementaciones concretas
- Se inyectan las dependencias
- Se "cablea" todo el sistema

### ¿Por qué en un solo lugar?

```typescript
// src/infrastructure/dependencies.ts

// 1. EXTERNAL - Crear el driver de BD
const database = createInMemoryDatabase<ProductRecord>(initialProducts);

// 2. ADAPTER - Crear el adapter del repositorio
const productRepository = createProductRepositoryAdapter(database);

// 3. APPLICATION - Crear los use cases
const createProduct = createCreateProduct(productRepository.create);

// 4. ADAPTER - Crear el controller
export const productController = createProductController({
  createProduct,
  // ...
});
```

### Beneficios

| Beneficio | Explicación |
|-----------|-------------|
| **Un solo lugar para cambios** | Si quieres cambiar de InMemory a MySQL, solo modificas aquí |
| **Fácil de testear** | Puedes crear un "test composition root" con mocks |
| **Visibilidad** | Ves todas las dependencias en un solo archivo |
| **Inversión de dependencias** | Las capas internas no saben qué implementación concreta se usa |

### Ejemplo: Cambiar a MySQL

```typescript
// ANTES (InMemory)
const database = createInMemoryDatabase<ProductRecord>(initialProducts);

// DESPUÉS (MySQL) - Solo cambias esta línea
const database = createMySQLDatabase<ProductRecord>({
  host: 'localhost',
  user: 'root',
  database: 'products_db'
});

// El resto del código NO cambia
const productRepository = createProductRepositoryAdapter(database);
// ...
```

---

## Formas de Implementar Clean Architecture

### 1. Enfoque con Clases (OOP Tradicional)

```typescript
// Use Case como clase
class CreateProduct {
  constructor(private repository: ProductRepository) {}

  async execute(data: CreateProductDTO): Promise<Product> {
    if (data.price < 0) throw new Error('Precio inválido');
    return this.repository.create(data);
  }
}

// Uso
const useCase = new CreateProduct(repository);
await useCase.execute(data);
```

**Pros:**
- Familiar para desarrolladores Java/C#
- Fácil de entender el patrón
- IDE muestra métodos disponibles

**Contras:**
- Más verboso
- Acoplamiento a la instancia

---

### 2. Enfoque Funcional (Este Proyecto)

```typescript
// Use Case como función factory
const createCreateProduct = (create: CreateProductFn) => {
  return async (data: CreateProductDTO): Promise<Product> => {
    if (data.price < 0) throw new Error('Precio inválido');
    return create(data);
  };
};

// Uso
const createProduct = createCreateProduct(repository.create);
await createProduct(data);
```

**Pros:**
- Menos código
- Más composable
- Fácil de testear (solo funciones)
- Tree-shaking friendly

**Contras:**
- Puede ser confuso al principio
- Menos explícito sobre dependencias

---

### 3. Enfoque Híbrido (Clases + Funciones)

```typescript
// Entidades como interfaces (funcional)
interface Product {
  id: string;
  name: string;
}

// Repository como clase (OOP)
class InMemoryProductRepository implements ProductRepository {
  private products = new Map<string, Product>();

  async findAll(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
}

// Use Cases como funciones
const getAllProducts = (repo: ProductRepository) => () => repo.findAll();
```

**Pros:**
- Lo mejor de ambos mundos
- Clases donde tiene sentido (estado complejo)
- Funciones donde es más simple

---

### 4. Enfoque Modular por Feature

```
src/
├── products/
│   ├── domain/
│   │   ├── Product.ts
│   │   └── ProductRepository.ts
│   ├── application/
│   │   └── use-cases/
│   ├── adapters/
│   │   ├── ProductController.ts
│   │   └── ProductRepositoryAdapter.ts
│   └── index.ts
│
├── users/
│   ├── domain/
│   ├── application/
│   └── adapters/
│
└── shared/
    └── external/
        └── database/
```

**Pros:**
- Escalable para proyectos grandes
- Equipos pueden trabajar en features separadas
- Fácil de convertir en microservicios

**Contras:**
- Más estructura inicial
- Puede haber duplicación

---

### 5. Enfoque Minimalista (Proyectos Pequeños)

```
src/
├── domain/
│   └── Product.ts          # Entidad + Repository interface
├── use-cases/
│   └── products.ts         # Todos los use cases juntos
├── adapters/
│   └── products.ts         # Controller + Repository impl
└── index.ts                # Composition root
```

**Pros:**
- Rápido de implementar
- Menos archivos
- Suficiente para MVPs

**Contras:**
- No escala bien
- Archivos pueden crecer mucho

---

## Cuándo Usar Cada Enfoque

| Proyecto | Enfoque Recomendado |
|----------|---------------------|
| MVP / Prototipo | Minimalista |
| Startup temprana | Funcional o Híbrido |
| App empresarial mediana | Funcional con estructura completa (este proyecto) |
| App empresarial grande | Modular por Feature |
| Equipo Java/C# | Clases (OOP Tradicional) |
| Equipo funcional | Funcional puro |

---

## Resumen Visual

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│   "Quiero cambiar         "Quiero cambiar        "Quiero cambiar   │
│    de framework"           de base de datos"      reglas de        │
│                                                   negocio"          │
│         │                        │                     │            │
│         ▼                        ▼                     ▼            │
│   ┌──────────┐            ┌──────────┐          ┌──────────┐       │
│   │ EXTERNAL │            │ ADAPTERS │          │APPLICATION│       │
│   │          │            │          │          │          │       │
│   │ Next.js  │            │ MySQL    │          │ Use Cases│       │
│   │ Express  │            │ Adapter  │          │          │       │
│   └──────────┘            └──────────┘          └──────────┘       │
│                                                                     │
│   Solo cambias             Solo cambias          Solo cambias       │
│   app/api/                 adapters/             application/       │
│                            repositories/         use-cases/         │
│                                                                     │
│                    EL DOMINIO NUNCA CAMBIA                         │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Comandos para Probar

```bash
# Iniciar servidor
bun run dev
# o
npm run dev

# Listar productos
curl http://localhost:3000/api/products

# Crear producto
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Monitor","description":"27 pulgadas","price":299.99,"stock":15}'

# Obtener por ID
curl http://localhost:3000/api/products/1

# Actualizar
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":799.99}'

# Eliminar
curl -X DELETE http://localhost:3000/api/products/1
```

---

## Referencias

- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [The Clean Architecture - Book](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)
