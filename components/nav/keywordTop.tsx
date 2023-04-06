/** @jsxImportSource @emotion/react */

import theme from '../../commons/theme';
import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { imageLoader, signFormat } from '../../commons/utils';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

const Title = css`
  ${theme.fonts.s20_w500};
  font-size: 1.8rem;
  color: ${theme.color.gray.w900};
  margin: auto;
  margin-bottom: ${theme.metrics.m1};
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
`;

interface Props {
  location: string;
  isWhite: boolean;
  isTitle: boolean;
  title?: string;
  price: number;
  ratio: number;
  diff: any;
}

export default function KeywordTopNav(props: Props) {
  const { location, isWhite, isTitle, title, price, ratio, diff } = props;
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  }, []);
  const router = useRouter();
  return (
    <div
      css={{
        display: 'flex',
        position: 'sticky',
        justifyContent: 'center',
        top: 0,
        width: '100%',
        zIndex: 5,
        minHeight: '62px',
        alignItems: 'center',
        backgroundColor: scrollPosition > 30 ? `${theme.color.gray.white}` : 'none',
        borderBottom: scrollPosition > 30 ? `1px solid ${theme.color.gray.w200}` : 'none',
        transition: 'all .3s',
      }}
    >
      <NavWrapper>
        <Button
          sx={{
            minWidth: 40,
            padding: 0,
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Link href={location} onClick={() => router.back()}>
            <div
              css={css`
                display: flex;
                justify-content: flex-start;
                align-items: center;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                margin: auto;
                margin-left: ${theme.metrics.m3};
                position: absolute;
                z-index: 6;
              `}
            >
              <Image
                objectFit="cover"
                loader={imageLoader}
                src="/images/leftArrow.svg"
                alt="left arrow"
                height={15}
                width={15}
                css={
                  {
                    // margin: `0 0 0 ${theme.metrics.m2}`,
                  }
                }
              />
            </div>
          </Link>
        </Button>
        <div
          css={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {isTitle && <div css={Title}>{scrollPosition > 30 ? title : ''}</div>}
          <div
            css={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {scrollPosition > 30 ? (
              <>
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                  `}
                ></div>
                <div
                  css={css`
                    ${theme.fonts.s14_w500};
                    color: ${ratio > 0 ? theme.color.chart.up : ratio < 0 ? theme.color.chart.down : theme.color.gray.w900};
                  `}
                >
                  {signFormat(ratio)}
                  {ratio}%
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </NavWrapper>
    </div>
  );
}
