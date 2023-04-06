/** @jsxImportSource @emotion/react */

import theme from '../../commons/theme';
import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { arrowFormat, imageLoader, priceToString, signFormat } from '../../commons/utils';
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';

const Title = css`
  ${theme.fonts.s20_w500};
  font-size: 1.8rem;
  color: ${theme.color.gray.w900};
  display: flex;
`;

const NavWrapper = styled.div`
  display: flex;
  max-width: 600px;
  min-width: 360px;
  /* column-gap: 0.5rem; */
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  height: 62px;
`;

interface Props {
  location: string;
  isWhite: boolean;
  isTitle: boolean;
  title?: string;
  price: number;
  diff: number;
  ratio: number;
}

export default function StockTopNav(props: Props) {
  const { location, isWhite, isTitle, title, price, diff, ratio } = props;
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
        flexGrow: 1,
        zIndex: 5,
        minHeight: '62px',
        alignItems: 'center',
        backgroundColor: isWhite || scrollPosition > 30 ? `${theme.color.gray.white}` : 'none',
        borderBottom: isWhite || scrollPosition > 30 ? `1px solid ${theme.color.gray.w200}` : 'none',
        transition: 'all .3s',
      }}
    >
      <NavWrapper>
        <Button
          sx={{
            height: '100%',
            paddingLeft: '0px',
          }}
        >
          <Link
            css={css`
              flex: 0 0 50px;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              height: 100%;
              z-index: 6;
              width: 45px;
            `}
            href={location}
            onClick={() => router.back()}
          >
            <Image
              loader={imageLoader}
              src="/images/leftArrow.svg"
              alt="left arrow"
              unoptimized={true}
              height={15}
              width={15}
              css={{
                margin: `0 0 0 ${theme.metrics.m2}`,
              }}
            />
          </Link>
        </Button>
        <div
          css={css`
            flex: 1 0 auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
        >
          {isTitle && <div css={Title}>{scrollPosition > 30 ? title : ''}</div>}
          <div
            css={css`
              display: flex;
              flex-direction: row;
              flex: 1;
              align-items: center;
              justify-content: space-around;
            `}
          >
            {scrollPosition > 30 ? (
              <>
                <div
                  css={css`
                    display: flex;
                    ${theme.fonts.s14_w700};
                    color: ${ratio > 0 ? theme.color.chart.up : ratio < 0 ? theme.color.chart.down : theme.color.gray.w900};
                    justify-content: center;
                    width: 90px;
                  `}
                >
                  {`${priceToString(String(price))}${title === 'KOSPI' || title === 'KOSDAQ' ? '' : '원'}`}
                </div>
                <div
                  css={css`
                    display: flex;
                    ${theme.fonts.s14_w400};
                    color: ${diff > 0 ? theme.color.chart.up : ratio < 0 ? theme.color.chart.down : theme.color.gray.w900};
                    justify-content: center;
                    width: 85px;
                  `}
                >
                  {arrowFormat(diff)}
                  {Math.abs(diff)}
                </div>
                <div
                  css={css`
                    display: flex;
                    ${theme.fonts.s14_w500};
                    color: ${ratio > 0 ? theme.color.chart.up : ratio < 0 ? theme.color.chart.down : theme.color.gray.w900};
                    justify-content: center;
                    width: 60px;
                  `}
                >
                  {signFormat(ratio)}
                  {ratio}%
                </div>
              </>
            ) : null}
          </div>
        </div>
        <div
          css={css`
            width: 45px;
          `}
        />
      </NavWrapper>
    </div>
  );
}
