export type IconButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'danger2';

export type IconButtonSize = 'sm' | 'md';

export interface IconButtonProps extends React.ComponentProps<'button'> {
  size?: IconButtonSize;
  variant?: IconButtonVariant;
}

export function IconButton({
  className,
  size = 'md',
  type = 'button',
  variant = 'primary',
  ...props
}: IconButtonProps) {
  return (
    <button
      {...props}
      type={type}
      className={`${getIconButtonClassName(variant, size)} ${className}`}
    />
  );
}

const iconButtonBaseClasses =
  'rounded-full transition-colors disabled:cursor-not-allowed';

const iconButtonVariantClasses = {
  primary: 'text-blue-500 hover:bg-blue-50',
  secondary: 'text-gray-700 hover:bg-gray-100',
  success: 'bg-green-100 text-green-600 hover:bg-green-200',
  danger: 'text-red-500 hover:bg-red-50',
  danger2: 'bg-red-100 text-red-600 hover:bg-red-200',
} satisfies Record<IconButtonVariant, string>;

const iconButtonSizeClasses = {
  sm: 'p-1',
  md: 'p-2',
} satisfies Record<IconButtonSize, string>;

function getIconButtonClassName(
  variant: IconButtonVariant,
  size: IconButtonSize
) {
  return `${iconButtonBaseClasses} ${iconButtonVariantClasses[variant]} ${iconButtonSizeClasses[size]}`;
}
