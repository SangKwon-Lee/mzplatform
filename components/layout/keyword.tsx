/** @jsxImportSource @emotion/react */
import Head from 'next/head';
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import theme from '../../commons/theme';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import KeywordTopNav from '../nav/keywordTop';
import { fetchKeywords } from '../../lib/redux/keyword';
import FooterNav from '../nav/footer';
import _ from 'lodash';

export const siteTitle = 'MZ Platform';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: #e9ecef;
  margin: 0 auto ${theme.metrics.m4} auto;
`;

interface Props {
  children: React.ReactNode;
}

export default function KeywordLayout({ children }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { keywords } = useAppSelector((state) => state.keyword);
  useEffect(() => {
    if (router.query?.keyword) {
      //@ts-ignore
      dispatch(fetchKeywords(router.query?.keyword));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <>
      <Head>
        <title>MZ Platform</title>
        <meta name="description" content="MZ Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <KeywordTopNav
        diff={Array.isArray(keywords.stocks) && keywords.stocks.length > 0 ? _.meanBy(keywords.stocks.map((data: any) => data.diff)).toFixed(2) : 0}
        price={keywords.avgPrice}
        location={router.asPath}
        isTitle={true}
        ratio={keywords.avgRatio}
        isWhite={true}
        title={String(router.query.keyword)}
      />
      <Wrapper>{children}</Wrapper>
      <FooterNav value={'learn'} />
    </>
  );
}
