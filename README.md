# Clean Architecture + Next.js 15

Proyecto educativo para aprender **Clean Architecture** y **Next.js App Router** de forma práctica e interactiva.

## Qué incluye

- **Clean Architecture** - Implementación completa con 4 capas (Domain, Application, Adapters, External)
- **Guía de Next.js** - Lecciones interactivas desde básico hasta avanzado
- **Demos funcionales** - Ejemplos que puedes ejecutar y modificar
- **Arquitecturas de escalabilidad** - Comparativa de 4 niveles para escalar tu app

## Inicio rápido

Este proyecto usa [Bun](https://bun.sh) como runtime y package manager, pero puedes usar el que prefieras:

```bash
# Con Bun (recomendado)
bun install
bun dev

# Con npm
npm install
npm run dev

# Con yarn
yarn install
yarn dev

# Con pnpm
pnpm install
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del proyecto

```
├── app/                      # Next.js App Router
│   ├── page.tsx              # Home con navegación
│   ├── clean-architecture/   # Explicación de Clean Architecture
│   ├── arquitecturas/        # Escalabilidad y patrones
│   ├── learn/                # Guía interactiva de Next.js
│   │   ├── 01-basics/        # Fundamentos
│   │   ├── 02-data-fetching/ # Obtención de datos
│   │   └── ...
│   └── api/                  # API Routes
│
├── backend/                  # Clean Architecture
│   ├── domain/               # Entidades e interfaces
│   ├── application/          # Casos de uso
│   ├── adapters/             # Controllers
│   └── external/             # Repositorios, DB
│
├── frontend/                 # Componentes compartidos
│   └── components/
│
└── TEMPLATE.md               # Template para otros frameworks
```

## Secciones principales

| Ruta | Descripción |
|------|-------------|
| `/` | Home con cards de navegación |
| `/clean-architecture` | Explicación de las 4 capas |
| `/arquitecturas` | Escalabilidad: MVP → Monorepo |
| `/learn` | Guía completa de Next.js |
| `/api/products` | API REST de ejemplo |

## Tecnologías

- **Next.js 15** - App Router, Server Components, Server Actions
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos
- **Bun** - Runtime y package manager

## Template reutilizable

Revisa [TEMPLATE.md](./TEMPLATE.md) para crear proyectos similares con otros frameworks (Nuxt, SvelteKit, Remix, Astro).

---

Creado por **Miguel Angel Rojas**

[![GitHub](https://img.shields.io/badge/GitHub-gregorioafk-black?logo=github)](https://github.com/gregorioafk)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-miguelangelgrojas-blue?logo=linkedin)](https://www.linkedin.com/in/miguelangelgrojas/)
