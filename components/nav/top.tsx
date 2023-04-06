/** @jsxImportSource @emotion/react */

import theme from '../../commons/theme';
import Image from 'next/image';
import Link from 'next/link';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { imageLoader } from '../../commons/utils';
import { Button } from '@mui/material';

const Title = css`
  ${theme.fonts.s20_w500};
  color: ${theme.color.gray.w900};
  margin: 0 auto;
  position: relative;
  /* left: -18px; */
`;

const NavWrapper = styled.div`
  display: flex;
  max-width: 600px;
  min-width: 360px;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 56px;
`;

interface Props {
  location: string;
  isWhite: boolean;
  isTitle: boolean;
  title?: string | string[];
}

export default function TopNav(props: Props) {
  const { location, isWhite, isTitle, title } = props;
  const router = useRouter();
  return (
    <div
      css={{
        display: 'flex',
        position: 'sticky',
        top: 0,
        width: '100%',
        justifyContent: 'center',
        minHeight: '56px',
        alignItems: 'center',
        backgroundColor: isWhite ? `${theme.color.gray.white}` : 'none',
        borderBottom: `1px solid ${theme.color.gray.w200}`,
        zIndex: 5,
      }}
    >
      <NavWrapper>
        <Button
          sx={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: 0,
            margin: 0,
            minWidth: '48px',
          }}
        >
          <Link href={location} onClick={() => router.back()}>
            <div
              css={css`
                display: flex;
                justify-content: center;
                /* margin-left: ${theme.metrics.m2}; */
              `}
            >
              <Image
                loader={imageLoader}
                src="/images/leftArrow.svg"
                alt="left arrow"
                height={15}
                width={15}
                unoptimized={true}
                css={
                  {
                    // margin: `0 0 0 ${theme.metrics.m4}`,
                  }
                }
              />
            </div>
          </Link>
        </Button>
        {isTitle && <div css={Title}>{title}</div>}
        <div style={{ width: '48px' }}></div>
      </NavWrapper>
    </div>
  );
}
