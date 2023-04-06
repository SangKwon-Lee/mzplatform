/** @jsxImportSource @emotion/react */
import Head from 'next/head';
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import StockTopNav from '../nav/stockTop';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import NewsNav from '../nav/news';
import { MarketIndex } from '../../commons/types';
import { fetchKospiPrice, fetchKosdaqPrice } from '../../lib/redux/indices';
import IndexDetailChart from '../chart/indexDetail';
import FooterNav from '../nav/footer';

export const siteTitle = 'MZ Platform';
const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: #e9ecef;
  margin: 0 auto;
  padding-bottom: 100px;
`;

interface Props {
  children: React.ReactNode;
  index: MarketIndex;
}

export default function IndexLayout({ children, index }: Props) {
  const router = useRouter();
  //@ts-ignore
  const dispatch = useAppDispatch();
  const { kospiPrice, kosdaqPrice, kospiLoading, kosdaqLoading } = useAppSelector((state) => state.indices);

  useEffect(() => {
    dispatch(fetchKospiPrice());
    dispatch(fetchKosdaqPrice());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loaded = index === 'kospi' ? kospiLoading === 'succeeded' : kosdaqLoading === 'succeeded';
  return (
    <>
      <Head>
        <title>MZ Platform</title>
        <meta name="description" content="MZ Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loaded ? (
        <StockTopNav
          location="/market"
          isWhite={false}
          isTitle={true}
          title={index === 'kospi' ? 'KOSPI' : 'KOSDAQ'}
          price={index === 'kospi' ? kospiPrice.price : kosdaqPrice.price}
          diff={index === 'kospi' ? kospiPrice.diff : kosdaqPrice.diff}
          ratio={index === 'kospi' ? kospiPrice.ratio : kosdaqPrice.ratio}
        />
      ) : null}

      <IndexDetailChart index={index} />
      <Wrapper>{children}</Wrapper>
      <FooterNav value={'learn'} />
      <NewsNav />
    </>
  );
}
