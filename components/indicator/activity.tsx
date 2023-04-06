/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Image from 'next/image';
import { imageLoader } from '../../commons/utils';
import { motion } from 'framer-motion';

interface Props {
  containerHeight: number;
}

export default function ActivityIndicator({ containerHeight }: Props) {
  return (
    <div
      css={css`
        height: ${containerHeight}px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -17px;
        margin-left: -17px;
        justify-content: center;
        align-items: center;
        display: flex;
      `}
    >
      <Image loader={imageLoader} src="/images/logoLoading.png" alt="logoLoading" width={34} height={34} />
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 1, easings: 'easeOut', repeat: Infinity }}
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -40px;
          margin-left: -40px;
        `}
      >
        <Image loader={imageLoader} src="/images/circle.png" alt="circle" width={80} height={80} />
      </motion.div>
    </div>
  );
}
