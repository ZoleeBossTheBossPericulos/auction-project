import React, { ReactNode, ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={`${className} bg-[#9C6615] px-4 py-2 rounded-full hover:opacity-90`}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
