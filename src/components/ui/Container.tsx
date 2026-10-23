/**
 * Shared horizontal container.
 *
 * Content width and gutters live in one place so every section aligns to the
 * same edges: 20px on phones, 32px on tablets, 48px on wide screens, with a
 * 1280px maximum.
 */

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-8 xl:px-12 ${className}`}>
      {children}
    </div>
  );
}
