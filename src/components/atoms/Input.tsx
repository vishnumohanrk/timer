export type InputProps = React.ComponentProps<'input'>;

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
    />
  );
}
