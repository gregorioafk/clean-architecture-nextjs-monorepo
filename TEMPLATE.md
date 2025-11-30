# Template: Proyecto Educativo de Arquitectura

Estructura reutilizable para crear proyectos de aprendizaje con cualquier framework.

---

## Estructura Base

```
proyecto/
├── app/                      # Rutas/páginas del framework
│   ├── page.tsx              # Home con cards de navegación
│   ├── [seccion]/            # Secciones principales
│   │   └── page.tsx
│   └── learn/                # Guía de aprendizaje
│       ├── page.tsx          # Índice de lecciones
│       └── [nivel]/          # Lecciones por nivel
│
├── backend/                  # Clean Architecture
│   ├── domain/               # Entidades e interfaces
│   ├── application/          # Use Cases
│   ├── adapters/             # Controllers
│   └── external/             # DB, APIs externas
│
├── frontend/                 # Componentes compartidos
│   ├── components/
│   └── services/
│
└── TEMPLATE.md               # Este archivo
```

---

## Secciones Recomendadas

### 1. Home (`/`)
Cards con accesos a cada sección:
- Explicación de arquitectura
- Guía del framework
- API Demo
- Escalabilidad

### 2. Arquitectura (`/arquitectura`)
- Explicación de Clean Architecture
- Diagrama de capas
- Flujo de dependencias

### 3. Escalabilidad (`/escalabilidad`)
Tabla comparativa:

| Nivel | Arquitectura | Complejidad | Cuándo usar |
|-------|--------------|-------------|-------------|
| 1 | Simple | ⭐ | MVP, landing |
| 2 | Híbrida | ⭐⭐ | App + algunos endpoints |
| 3 | Clean Architecture | ⭐⭐⭐ | Lógica compleja |
| 4 | Monorepo | ⭐⭐⭐⭐ | Múltiples apps |

### 4. Guía del Framework (`/learn`)
Organizar por niveles:

```
learn/
├── 01-basics/           # Conceptos fundamentales
├── 02-data-fetching/    # Obtención de datos
├── 03-forms/            # Formularios
├── 04-state/            # Manejo de estado
├── 05-routing/          # Rutas avanzadas
└── 06-deployment/       # Despliegue
```

---

## Patrón de Página Educativa

```tsx
export default function LeccionPage() {
  return (
    <div>
      {/* Título y descripción */}
      <h1>Título de la Lección</h1>
      <p>Descripción breve del concepto</p>

      {/* Comparación lado a lado */}
      <div className="grid grid-cols-2">
        <div>Opción A</div>
        <div>Opción B</div>
      </div>

      {/* Código de ejemplo */}
      <pre><code>// Ejemplo funcional</code></pre>

      {/* Demo interactivo */}
      <InteractiveDemo />

      {/* Navegación */}
      <nav>
        <a href="/prev">← Anterior</a>
        <a href="/next">Siguiente →</a>
      </nav>
    </div>
  );
}
```

---

## Adaptación por Framework

### Next.js
- Server Components vs Client Components
- App Router, layouts, loading states
- Server Actions para mutations

### Nuxt (Vue)
- Composables vs Options API
- Auto-imports, layouts
- useFetch, useAsyncData

### SvelteKit
- +page.svelte, +layout.svelte
- load functions, form actions
- Stores reactivos

### Remix
- Loaders y Actions
- Nested routes
- Progressive enhancement

### Astro
- Islands architecture
- Content collections
- Partial hydration

---

## Checklist de Contenido

- [ ] Home con navegación visual
- [ ] Explicación de arquitectura con diagrama
- [ ] Comparativa de escalabilidad (4 niveles)
- [ ] Guía básica (3-5 lecciones)
- [ ] Guía intermedia (3-5 lecciones)
- [ ] Guía avanzada (3-5 lecciones)
- [ ] Demos interactivos
- [ ] API de ejemplo funcional
- [ ] Footer con autor y links

---

## Comandos de Inicio

```bash
# Clonar y adaptar
git clone [repo] mi-proyecto-[framework]
cd mi-proyecto-[framework]

# Instalar dependencias
npm install  # o bun install

# Desarrollo
npm run dev

# Build
npm run build
```

---

Creado por **Miguel Angel Rojas**
- GitHub: https://github.com/gregorioafk
- LinkedIn: https://www.linkedin.com/in/miguelangelgrojas/
