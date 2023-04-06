/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import { imageLoader } from '../../commons/utils';

interface Props {
  src: string | null;
  alt: string;
}

export default function CarouselImage({ src, alt }: Props) {
  const [showDefault, setShowDefault] = useState(true);
  const defaultSrc = `/images/logoNoImg.png`;

  useEffect(() => {
    if (src) {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        const height = image.height;
        if (height >= 300) {
          setShowDefault(false);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showDefault || !src) {
    return (
      <>
        <div
          css={css`
            z-index: 5;
            display: flex;
            width: 100%;
            height: 245px;
            border-radius: 32px 32px 0 0;
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0) 100%);
          `}
        >
          <NextImage
            width={87.2}
            height={83}
            alt={alt}
            src={defaultSrc}
            css={css`
              margin: auto;
              width: 87.2px !important;
              height: 83px !important;
            `}
          />
        </div>
      </>
    );
  } else {
    return (
      <NextImage
        loader={imageLoader}
        css={css`
          border-radius: 32px 32px 0 0;
        `}
        width={375}
        height={265}
        alt={alt}
        src={src}
      />
    );
  }
}
