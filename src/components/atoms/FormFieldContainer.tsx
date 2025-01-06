import { ContainerProps } from './utils';

export function FormFieldContainer({ children, className }: ContainerProps) {
  return <div className={`flex flex-col gap-2 ${className}`}>{children}</div>;
}
