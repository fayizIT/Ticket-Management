import React from "react";

const shapes = {
  square: "rounded-[0px]",
  circle: "rounded-full",
  round: "rounded-lg",
} as const;

const variants = {
  f111: {
    indigo_800: "bg-indigo-800 text-white",
    gray_50: "bg-gray-50 text-indigo-800",
  },
} as const;

const sizes = {
  "5xl": "h-[62px] px-[34px] text-[28px]",
  "3xl": "h-[56px] px-[34px] text-[24px]",
} as const;

type ButtonProps = Omit<
  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  "onClick"
> &
Partial<{
  className: string;
  leftIcon: React.ReactNode;
  rightIcon: React.ReactNode;
  shape: keyof typeof shapes;
  variant: keyof typeof variants | null;
  size: keyof typeof sizes;
}>;

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape = "square",
  variant = "f111",
  size = "5xl",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center ${shapes[shape]} ${sizes[size]} ${variant ? variants[variant].indigo_800 : ''}`}
      {...restProps}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  );
};
export { Button };
