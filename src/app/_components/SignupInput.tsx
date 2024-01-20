import { UseFormRegisterReturn } from "react-hook-form";

export default function SignupInput({ className, placeholder, register, disabled }: InputProps) {
  return (
    <input
      className={`px-1 py-2 mb-5 outline-none bg-bg-color border-b border-b-silver ${className}`}
      placeholder={placeholder}
      disabled={disabled}
      {...register}
    />
  );
}

interface InputProps extends React.ComponentProps<'input'> {
  register: UseFormRegisterReturn;
}