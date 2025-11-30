/**
 * LAYOUT DE APRENDIZAJE
 *
 * Este layout envuelve todas las páginas de /learn/*
 * La navegación global ya está en el layout raíz.
 */

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900">
      {children}
    </div>
  );
}
