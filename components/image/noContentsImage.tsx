import { css } from '@emotion/react';
import Image from 'next/image';
import theme from '../../commons/theme';
import images from '../../commons/theme/images';

interface Props {
  text?: string;
  src?: string;
  height?: string;
}

export default function NoContentsImage(props: Props) {
  const { text, src, height } = props;
  return (
    <div
      css={css`
        display: flex;
        width: 100%;
        justify-content: center;
        height: ${height ? height : '250px'};
        align-items: center;
        flex-direction: column;
      `}
    >
      <Image src={src ? src : '/' + images.noContents} alt="" width={150} height={80} />
      <div
        css={css`
          ${theme.fonts.s16_w400}
          margin-top:${theme.metrics.m4};
        `}
      >
        {text}
      </div>
      <div />
    </div>
  );
}
