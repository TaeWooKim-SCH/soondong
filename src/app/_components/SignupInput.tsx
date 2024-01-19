import { UseFormRegisterReturn } from "react-hook-form";

export default function SignupInput({ className, placeholder, register }: InputProps) {
  return (
    <input
      className={`px-1 py-2 mb-5 outline-none bg-bg-color border-b border-b-silver ${className}`}
      placeholder={placeholder}
      {...register}
    />
  );
}

interface InputProps extends React.ComponentProps<'input'> {
  register: UseFormRegisterReturn;
}