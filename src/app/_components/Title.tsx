export default function Title({ children, className }: React.ComponentProps<'div'>) {
  return (
    <div className={`text-lg text-blue font-bold sm:text-2xl ${className}`}>{ children }</div>
  );
}