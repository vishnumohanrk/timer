export interface FormFieldContainerProps {
  children: React.ReactNode;
}

export function FormFieldContainer({ children }: FormFieldContainerProps) {
  return <div className="flex flex-col space-y-2">{children}</div>;
}
