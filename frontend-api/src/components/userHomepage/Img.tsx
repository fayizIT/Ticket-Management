import React from "react";

type ImgProps = React.PropsWithChildren<{
  src: string;
  alt: string;
  className?: string;
}>;

const Img: React.FC<ImgProps> = ({ src, alt, className }) => {
  return <img src={src} alt={alt} className={className} loading="lazy" />;
};

export { Img };
