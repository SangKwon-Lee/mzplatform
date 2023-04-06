/** @jsxImportSource @emotion/react */

import theme from '../../commons/theme';
import { css } from '@emotion/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  style?: any;
}

export default function MainContainer({ children, style }: Props) {
  return (
    <div
      style={style}
      css={css`
        width: 100%;
        min-width: 360px;
        max-width: 600px;
        padding: 0 ${theme.metrics.m4};
      `}
    >
      {children}
    </div>
  );
}
