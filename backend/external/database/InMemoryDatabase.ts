/**
 * CAPA: EXTERNAL - DATABASE DRIVER
 *
 * Esta es la capa más externa. Contiene detalles de implementación
 * específicos de la tecnología (en este caso, almacenamiento en memoria).
 *
 * En un caso real, aquí estaría:
 * - Conexión a MySQL/PostgreSQL
 * - Cliente de MongoDB
 * - Cliente de Redis
 * - etc.
 *
 * Esta capa NO conoce nada del dominio, solo provee operaciones CRUD genéricas.
 */

export type DatabaseRecord = Record<string, unknown>;

export type InMemoryDatabase<T extends DatabaseRecord> = {
  getAll: () => Promise<T[]>;
  getById: (id: string) => Promise<T | null>;
  insert: (id: string, data: T) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T | null>;
  remove: (id: string) => Promise<boolean>;
};

// Factory para crear una "base de datos" en memoria genérica
export const createInMemoryDatabase = <T extends DatabaseRecord>(
  initialData: Map<string, T> = new Map()
): InMemoryDatabase<T> => {
  const store = new Map<string, T>(initialData);

  return {
    getAll: async () => Array.from(store.values()),

    getById: async (id: string) => store.get(id) || null,

    insert: async (id: string, data: T) => {
      store.set(id, data);
      return data;
    },

    update: async (id: string, data: Partial<T>) => {
      const existing = store.get(id);
      if (!existing) return null;

      const updated = { ...existing, ...data } as T;
      store.set(id, updated);
      return updated;
    },

    remove: async (id: string) => store.delete(id),
  };
};
