import { css, SerializedStyles } from '@emotion/react';

export interface FontsType {
  s12_w400: SerializedStyles;
  s12_w500: SerializedStyles;
  s12_w700: SerializedStyles;
  s14_w400: SerializedStyles;
  s14_w500: SerializedStyles;
  s14_w700: SerializedStyles;
  s16_w400: SerializedStyles;
  s16_w500: SerializedStyles;
  s16_w700: SerializedStyles;
  s20_w400: SerializedStyles;
  s20_w500: SerializedStyles;
  s20_w700: SerializedStyles;
  s22_w400: SerializedStyles;
  s24_w200: SerializedStyles;
  s26_w400: SerializedStyles;
  s26_w500: SerializedStyles;
  s26_w700: SerializedStyles;
  s36_w400: SerializedStyles;
  s36_w500: SerializedStyles;
  s36_w700: SerializedStyles;
}

const Fonts: FontsType = {
  s12_w400: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 400;
    font-size: 1.2rem;
    line-height: 100%;
  `,
  s12_w500: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 500;
    font-size: 1.2rem;
    line-height: 100%;
  `,
  s12_w700: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    font-size: 1.2rem;
    line-height: 100%;
  `,
  s14_w400: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 400;
    font-size: 1.4rem;
    line-height: 100%;
  `,
  s14_w500: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 100%;
  `,
  s14_w700: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 100%;
  `,
  s16_w400: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.6rem;
  `,
  s16_w500: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 500;
    font-size: 1.6rem;
    line-height: 120%;
  `,
  s16_w700: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    font-size: 1.6rem;
    line-height: 120%;
  `,
  s20_w400: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 400;
    font-size: 2rem;
    line-height: 2.4rem;
  `,
  s20_w500: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 500;
    font-size: 2rem;
    line-height: 2.4rem;
  `,
  s20_w700: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    font-size: 2rem;
    line-height: 2.4rem;
  `,
  s22_w400: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 400;
    font-size: 2.2rem;
    line-height: 2.625rem;
  `,
  s24_w200: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 200;
    font-size: 2.4rem;
    line-height: 2.4rem;
  `,
  s26_w400: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 400;
    font-size: 2.6rem;
    line-height: 130%;
    letter-spacing: -1%;
    font-feature-settings: 'pnum' on, 'lnum' on;
  `,
  s26_w500: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 500;
    font-size: 2.6rem;
    line-height: 130%;
    letter-spacing: -1%;
    font-feature-settings: 'pnum' on, 'lnum' on;
  `,
  s26_w700: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    font-size: 2.6rem;
    line-height: 130%;
    letter-spacing: -1%;
    font-feature-settings: 'pnum' on, 'lnum' on;
  `,
  s36_w400: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 400;
    font-size: 3.6rem;
    line-height: 130%;
    letter-spacing: -1%;
    font-feature-settings: 'pnum' on, 'lnum' on;
  `,
  s36_w500: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 500;
    font-size: 3.6rem;
    line-height: 130%;
    letter-spacing: -1%;
    font-feature-settings: 'pnum' on, 'lnum' on;
  `,
  s36_w700: css`
    font-family: Pretendard;
    font-style: normal;
    font-weight: 700;
    font-size: 3.6rem;
    line-height: 130%;
    letter-spacing: -1%;
    font-feature-settings: 'pnum' on, 'lnum' on;
  `,
};

export default Fonts;
