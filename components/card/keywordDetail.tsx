/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import theme from '../../commons/theme';
import { IKeywords } from '../../commons/types';
import { signFormat, textColor } from '../../commons/utils';

interface Props {
  keyword: IKeywords;
}

export default function KeywordDetail({ keyword }: Props) {
  const { avgRatio, name } = keyword;
  return (
    <div
      css={css`
        margin-bottom: ${theme.metrics.m8};
        padding: 0 ${theme.metrics.m4};
      `}
    >
      <div
        css={css`
          display: flex;
          margin-top: ${theme.metrics.m8};
        `}
      >
        <div
          css={css`
            margin-bottom: ${theme.metrics.m4};
            ${theme.fonts.s20_w500};
          `}
        >
          {name}
        </div>
      </div>
      <div
        css={css`
          display: flex;
          ${theme.fonts.s16_w400};
          align-items: center;
        `}
      >
        <span>상위 5개 종목 평균 등락률</span>
        <span
          css={css`
            font-size: 1.8rem;
            font-weight: 500;
            color: ${textColor(avgRatio)};
            margin-left: ${theme.metrics.m2};
          `}
        >
          {signFormat(avgRatio)}
          {`${avgRatio.toFixed(2)}%`}
        </span>
      </div>
    </div>
  );
}
