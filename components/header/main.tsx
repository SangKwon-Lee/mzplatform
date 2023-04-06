/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import Link from 'next/link';
import theme from '../../commons/theme';
import { css } from '@emotion/react';
import Image from 'next/image';
import { imageLoader } from '../../commons/utils';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Statement = styled.div`
  margin: 0;
  text-align: left;
  color: ${theme.color.gray.w900};
  font-size: 26px;
`;

interface Props {
  firstTitle: string;
  secondTitle: string;
}

export default function MainHeader(props: Props) {
  const { firstTitle, secondTitle } = props;
  return (
    <Wrapper>
      <Link css={{ margin: '1rem 1rem 1rem auto' }} href="/search">
        <div
          css={css`
            width: 50px;
            height: 40px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
          `}
        >
          <Image loader={imageLoader} src="/images/search.svg" alt="search btn" width={20} height={20} />
        </div>
      </Link>
      <Statement>
        {firstTitle} <br /> <span style={{ fontWeight: 700 }}>{secondTitle}</span>
      </Statement>
    </Wrapper>
  );
}
