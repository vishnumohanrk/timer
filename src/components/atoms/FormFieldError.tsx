export type FormFieldErrorProps = React.ComponentProps<'p'>;

export function FormFieldError({ className, ...props }: FormFieldErrorProps) {
  return <p {...props} className={`text-sm text-red-500 ${className}`} />;
}
