/** @jsxImportSource @emotion/react */
import Head from 'next/head';
import React, { useContext, useEffect } from 'react';
import styled from '@emotion/styled';
import theme from '../../commons/theme';
import { useRouter } from 'next/router';
import StockTopNav from '../nav/stockTop';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import { fetchStockTodayPrice } from '../../lib/redux/stocks';
import PriceContext from '../../contexts/price';
import NewsNav from '../nav/news';
import FooterNav from '../nav/footer';

export const siteTitle = 'MZ Platform';

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
  stockName: string;
}

export default function StockLayout({ children, stockName }: Props) {
  const router = useRouter();
  //@ts-ignore
  const { registRealtimePrice, unregistRealtimePriceAll } = useContext(PriceContext);
  const stockcode = String(router.query.stockcode);
  const dispatch = useAppDispatch();
  const stocks = useAppSelector((state) => state.stocks);
  const stockRatio = stocks[stockcode] && stocks[stockcode].ratio ? stocks[stockcode].ratio : 0;
  const stockDiff = stocks[stockcode] && stocks[stockcode].diff ? stocks[stockcode].diff : 0;
  const stockPrice = stocks[stockcode] && stocks[stockcode].price ? stocks[stockcode].price : 0;
  useEffect(() => {
    return () => {
      unregistRealtimePriceAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // StockChip 로딩 후 1.5초가 지나도 ratio 데이터를 못 받았을 때 다시 요청
    setTimeout(() => {
      if (!stocks[stockcode]) {
        dispatch(fetchStockTodayPrice(stockcode));
      }
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockRatio]);

  useEffect(() => {
    if (stockcode) {
      dispatch(fetchStockTodayPrice(stockcode));
    }
    registRealtimePrice([stockcode]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockcode]);

  return (
    <>
      <Head>
        <title>MZ Platform</title>
        <meta name="description" content="MZ Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StockTopNav
        diff={stockDiff}
        ratio={stockRatio}
        price={stockPrice}
        location={`/stock/${stockcode}`}
        isTitle={true}
        isWhite={true}
        title={`${stockName}`}
      />
      <Wrapper>{children}</Wrapper>
      <FooterNav value={'learn'} />
      <NewsNav />
    </>
  );
}
