import { UseFormRegisterReturn } from "react-hook-form";

export default function SignupInput({ className, placeholder, register, disabled, type }: InputProps) {
  return (
    <input
      className={`px-1 py-2 mb-1 outline-none bg-bg-color border-b border-b-silver ${className}`}
      type={type ? type : 'text'}
      placeholder={placeholder}
      disabled={disabled}
      {...register}
    />
  );
}

interface InputProps extends React.ComponentProps<'input'> {
  register: UseFormRegisterReturn;
}