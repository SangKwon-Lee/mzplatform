import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import { CDN_URL } from '../../commons/theme/images';

interface Props {
  src: string;
  alt: string;
  [property: string]: any;
}

function StockImage({ src, alt, ...rest }: Props) {
  const [imgSrc, setImgSrc] = useState(src);
  const defaultSrc = `${CDN_URL}ci/stock@160.png`;
  return (
    <Image
      {...rest}
      alt={alt}
      src={imgSrc}
      loading="lazy"
      onError={() => {
        setImgSrc(defaultSrc);
      }}
    />
  );
}

export default StockImage;
