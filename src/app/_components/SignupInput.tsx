export default function SignupInput({ className, placeholder }: React.ComponentProps<'input'>) {
  return (
    <input
      className={`px-1 py-2 mb-5 outline-none bg-bg-color border-b border-b-silver ${className}`}
      placeholder={placeholder}
    />
  );
}