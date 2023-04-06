/** @jsxImportSource @emotion/react */

import theme from '../../commons/theme';
import Image from 'next/image';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { imageLoader } from '../../commons/utils';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

const Title = css`
  ${theme.fonts.s20_w500};
  font-size: 1.8rem;
  color: ${theme.color.gray.w900};
  margin: auto;
`;

const NavWrapper = styled.div`
  display: flex;
  max-width: 600px;
  min-width: 360px;
  /* column-gap: 0.5rem; */
  width: 100%;
  align-items: center;
  justify-content: center;
  align-items: center;
  height: 62px;
  margin: 0 auto;
`;

interface Props {
  title?: string;
}

export default function ViewerNav(props: Props) {
  const { title = 'WonderingM' } = props;
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  }, []);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        z-index: 5;
        min-height: 62px;
        align-items: center;
        background-color: ${theme.color.gray.white};
        transition: 'all .3s';
        /* padding: 0 ${theme.metrics.m4}; */
        margin: 0 auto;
        position: sticky;
        top: 0;
      `}
    >
      <NavWrapper>
        <div
          css={css`
            width: 48px;
          `}
        ></div>
        <div
          css={css`
            flex: 1 0 auto;
            display: flex;
            align-items: center;
          `}
        >
          <div css={Title}>{title}</div>
        </div>
        <Button
          css={css`
            cursor: pointer;
            padding: 0;
            width: 0px;
            min-width: 48px;
            height: 100%;
          `}
          onClick={() => router.replace('/wondering')}
        >
          <Image loader={imageLoader} src={`/${theme.images.close}`} alt="left arrow" height={15} width={15} color={theme.color.gray.w600} css={{}} />
        </Button>
      </NavWrapper>
    </div>
  );
}
