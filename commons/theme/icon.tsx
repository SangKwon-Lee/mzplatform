//const CDN_URL = "https://innofin.cdn.ntruss.com/";

import { CSSProperties } from '@emotion/serialize';
import Image from 'next/image';
import { imageLoader } from '../utils';

interface Props {
  style?: CSSProperties | undefined;
  className?: string;
  icon: string;
  width: number;
  height: number;
  onClick?: any;
}
export default function Icon({ icon, style, width, height, className, onClick, ...other }: Props) {
  return (
    <Image
      loader={imageLoader}
      src={`/${icon}`}
      //@ts-ignore
      style={{ ...style }}
      width={width}
      onClick={onClick}
      className={className}
      height={height}
      {...other}
      alt={icon}
    />
  );
}
