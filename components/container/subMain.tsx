/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  style?: any;
}
export default function SubMainContainer({ children, style }: Props) {
  return (
    <div
      style={style}
      css={css`
        width: 100%;
        min-width: 360px;
        max-width: 600px;
      `}
    >
      {children}
    </div>
  );
}
