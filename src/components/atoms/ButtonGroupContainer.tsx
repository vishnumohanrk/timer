import { ContainerProps } from './utils';

export function ButtonGroupContainer({ children, className }: ContainerProps) {
  return (
    <div className={`flex justify-end gap-3 pt-4 border-t ${className}`}>
      {children}
    </div>
  );
}
