/** @jsxImportSource @emotion/react */
import Head from 'next/head';
import React from 'react';
import styled from '@emotion/styled';
import theme from '../../commons/theme';
import { useRouter } from 'next/router';
import TopNav from '../nav/top';
import NewsNav from '../nav/news';

export const siteTitle = 'MZ Platform';

interface Props {
  children: React.ReactNode;
  title: string;
  isWhite: boolean;
  isTitle: boolean;
  isKeyword?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: #e9ecef;
  margin: 0 auto;
  padding-bottom: ${theme.metrics.m4};
`;

export default function TitleLayout({ children, title, isTitle, isWhite, isKeyword = false }: Props) {
  const router = useRouter();
  const { keyword } = router.query;
  return (
    <>
      <Head>
        <title>{title ? title : `MZ Platform`}</title>
        <meta name="description" content="MZ Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopNav isTitle={isTitle} title={isKeyword ? keyword : title} isWhite={isWhite} location={String(router.asPath)} />
      <Wrapper>{children}</Wrapper>
      <NewsNav />
    </>
  );
}
