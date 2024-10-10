import React from "react";

const sizes = {
  textxl: "text-[16px] font-normal",
  text4xl: "text-[28px] font-light",
} as const;

type TextProps = Partial<{
  className: string;
  size: keyof typeof sizes;
}> & React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>;

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  children,
  className = "",
  size = "textxl",
  ...restProps
}) => {
  return (
    <span className={`${sizes[size]} ${className}`} {...restProps}>
      {children}
    </span>
  );
};

export { Text };
