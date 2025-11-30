/**
 * LAYOUT para Intercepting Routes
 *
 * Renderiza children (la página) + modal slot
 */

export default function InterceptingLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
