/** @jsxImportSource @emotion/react */

import theme from '../../commons/theme';
import { randomColorFormat } from '../../commons/utils';
import { css } from '@emotion/react';

interface Props {
  keyword: string;
}

export default function KeywordRatioChip(props: Props) {
  const { keyword } = props;
  const randomColor = randomColorFormat(1);
  return (
    <>
      <div
        css={css`
          display: flex;
          background-color: ${randomColor};
          border-radius: 99px;
          padding: ${theme.metrics.m2} ${theme.metrics.m4};
          margin: ${theme.metrics.m8} 0 0 0;
        `}
      >
        <div
          css={css`
            ${theme.fonts.s16_w500}
            color: ${theme.color.gray.white};
          `}
        >
          {keyword}
        </div>
      </div>
    </>
  );
}
