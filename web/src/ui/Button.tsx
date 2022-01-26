import { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: FC<ButtonProps> = ({ children, ...props }) => (
  <button
    type="button"
    className="bg-primary rounded-lg w-full text-white py-3 text-sm disabled:bg-gray-900 disabled:text-white disabled:cursor-not-allowed"
    {...props}
  >
    {children}
  </button>
);
export default Button;
