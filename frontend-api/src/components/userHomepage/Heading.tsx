import React from "react";

type HeadingProps = React.PropsWithChildren<{
  as?: React.ElementType;
  className?: string;
}>;

const Heading: React.FC<HeadingProps> = ({ as: Component = "h2", className, children }) => {
  return <Component className={`text-white ${className}`}>{children}</Component>;
};

export { Heading };
