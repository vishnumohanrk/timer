export type TextAreaProps = React.ComponentProps<'textarea'>;

export function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <textarea
      {...props}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 data-[invalid=true]:border-red-500 ${className}`}
    />
  );
}
