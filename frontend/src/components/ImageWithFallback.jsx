import React, { useState } from "react";

const ImageWithFallback = ({ src, alt, className, fallbackSrc }) => {
  const [imageSrc, setImageSrc] = useState(src);

  const handleError = () => {
    setImageSrc(fallbackSrc);
  };

  return (
    <img src={imageSrc} alt={alt} className={className} onError={handleError} />
  );
};

export default ImageWithFallback;
