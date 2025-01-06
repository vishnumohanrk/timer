export interface ModalProps {
  children: React.ReactNode;
}

export function Modal({ children }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
        {children}
      </div>
    </div>
  );
}

interface ModalHeadingProps {
  children: React.ReactNode;
}

export function ModalHeading({ children }: ModalHeadingProps) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}
