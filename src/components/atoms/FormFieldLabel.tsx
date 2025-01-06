export type FormFieldLabelVariant = 'primary' | 'secondary';

export interface FormFieldLabelProps extends React.ComponentProps<'label'> {
  required?: boolean;
  variant?: FormFieldLabelVariant;
}

export function FormFieldLabel({
  required,
  children,
  variant = 'primary',
  className,
  ...props
}: FormFieldLabelProps) {
  return (
    <label
      {...props}
      className={`${getFormFieldLabelClassName(variant)} ${className}`}
    >
      {children}&nbsp;
      {required ? <span className="text-red-500">*</span> : null}
    </label>
  );
}

const formFieldLabelBaseClass = 'block text-sm';

const formFieldLabelVariantClasses = {
  primary: 'font-medium text-gray-700',
  secondary: 'font-normal text-gray-600',
} satisfies Record<FormFieldLabelVariant, string>;

function getFormFieldLabelClassName(variant: FormFieldLabelVariant) {
  return `${formFieldLabelBaseClass} ${formFieldLabelVariantClasses[variant]}`;
}
