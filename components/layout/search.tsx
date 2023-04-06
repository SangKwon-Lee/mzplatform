/** @jsxImportSource @emotion/react */

import Head from 'next/head';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import theme from '../../commons/theme';
import { useRouter } from 'next/router';
import NewsNav from '../nav/news';
import FooterNav from '../nav/footer';

export const siteTitle = 'MZ Platform';
const pageInfo = {
  market: {
    title: '시장',
  },
  themestock: {
    title: '테마/종목',
  },
  wondering: {
    title: '원더링M',
  },
  search: {
    title: '검색',
  },
};

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: #e9ecef;
  margin: 0 auto;
  padding-bottom: ${theme.metrics.m4};
`;

interface Props {
  children: React.ReactNode;
}

export default function SearchLayout({ children }: Props) {
  const router = useRouter();
  const pageName = router.route.substring(1);
  const [inputText, setInputText] = useState('');
  const onChangeHandler = (value: string) => {
    setInputText(value);
  };

  if (pageName === 'market' || pageName === 'themestock' || pageName === 'wondering' || pageName === 'search') {
    return (
      <>
        <Head>
          <title>{pageInfo[pageName].title}</title>
          <meta name="description" content="MZ Platform" />
          <link rel="apple-touch-icon" sizes="180x180" href="apple-touch-icon-180x180.svg" />
          <link rel="apple-touch-icon" sizes="167x167" href="apple-touch-icon-167x167.svg" />
          <link rel="apple-touch-icon" sizes="152x152" href="apple-touch-icon-152x152.svg" />
          <link rel="apple-touch-icon" sizes="120x120" href="apple-touch-icon-120x120.svg" />
          <link rel="icon" sizes="512x512" type="image/svg" href="default-512x512.svg" />
          <link rel="google-icon" sizes="96x96" type="image/svg" href="google-icon-96x96.svg" />
          <link rel="google-icon" sizes="32x32" type="image/svg" href="google-icon-32x32.svg" />
          <link rel="google-icon" sizes="16x16" type="image/svg" href="google-icon-16x16.svg" />
          <link rel="windows-icon" sizes="310x310" type="image/svg" href="windows-icon-310x310.svg" />
          <link rel="windows-icon" sizes="310x150" type="image/svg" href="windows-icon-310x150.svg" />
          <link rel="windows-icon" sizes="270x270" type="image/svg" href="windows-icon-270x270.svg" />
          <link rel="windows-icon" sizes="70x70" type="image/svg" href="windows-icon-70x70.svg" />
        </Head>
        <Wrapper>{children}</Wrapper>
        <FooterNav value={'learn'} />
        <NewsNav />
      </>
    );
  } else {
    return <></>;
  }
}
