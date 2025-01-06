export type ButtonVariant = 'primary' | 'secondary';

export type ButtonSize = 'sm' | 'md';

export interface ButtonProps extends React.ComponentProps<'button'> {
  size?: ButtonSize;
  variant?: ButtonVariant;
}

export function Button({
  className,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`${getButtonClasses(variant, size)} ${className}`}
    />
  );
}

const buttonBaseClasses =
  'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed';

const buttonVariantClasses = {
  primary: 'text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400',
  secondary: 'text-gray-700 bg-gray-100 hover:bg-gray-200',
} satisfies Record<ButtonVariant, string>;

const buttonSizeClasses = {
  sm: 'text-sm rounded-md',
  md: 'text-base rounded-lg',
} satisfies Record<ButtonSize, string>;

function getButtonClasses(variant: ButtonVariant, size: ButtonSize) {
  return `${buttonBaseClasses} ${buttonVariantClasses[variant]} ${buttonSizeClasses[size]}`;
}
