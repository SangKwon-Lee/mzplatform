/** @jsxImportSource @emotion/react */
import theme from '../../../../commons/theme';
import { css } from '@emotion/react';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { priceToString, imageLoader } from '../../../../commons/utils';
import NewsList from '../../../../components/list/news';
import KosdaqRankingViewList from '../../../../components/list/kosdaqRanking';
import { fetchNews } from '../../../../lib/redux/news';
import MainContainer from '../../../../components/container/main';
import { ReactElement, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../lib/redux/hooks';
import IndexLayout from '../../../../components/layout/index';
import LargeBarChart from '../../../../components/chart/largeBar';

const infoWrapper = css`
  display: flex;
  flex-direction: column;
  padding: ${theme.metrics.m6} ${theme.metrics.m4};
  background-color: ${theme.color.gray.white};
  border-radius: ${theme.metrics.m8};
  margin: 0 0 52px 0;
`;

const infoDate = css`
  ${theme.fonts.s16_w700};
  line-height: 19px;
  color: ${theme.color.gray.w900};
  margin: 0 0 ${theme.metrics.m4} 0;
`;

const infoContainer = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px 8px;
  justify-content: center;
`;

const infoCard = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: ${theme.color.primary.purple06};
  min-width: 140px;
  width: 48%;
  min-height: 70px;
  border-radius: ${theme.metrics.m2};
  padding: ${theme.metrics.m4} ${theme.metrics.m6} ${theme.metrics.m4};
  ${theme.metrics.m4};
  gap: ${theme.metrics.m2};
`;

const infoCardName = css`
  color: ${theme.color.gray.w600};
  ${theme.fonts.s14_w400}
`;

const infoCardValue = css`
  ${theme.fonts.s20_w400}
  color: ${theme.color.gray.w800};
`;

const SectionTitle = css`
  ${theme.fonts.s20_w500}
  margin: 0 0 ${theme.metrics.m4} 0;
  color: ${theme.color.gray.w800};
  display: flex;
  align-items: center;
`;

export default function MajorKosdaq() {
  const { news, loading: newsLoading } = useAppSelector((state) => state.news);
  const { kosdaqPrice } = useAppSelector((state) => state.indices);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (newsLoading === 'idle') {
      dispatch(fetchNews());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsLoading]);

  return (
    <>
      <MainContainer>
        <div css={infoWrapper}>
          <span css={infoDate}>{dayjs().format('YYYY. MM. DD')}</span>
          <div css={infoContainer}>
            <div css={infoCard}>
              <span css={infoCardName}>{'전 거래일'}</span>
              <span css={infoCardValue}>{priceToString(Number(kosdaqPrice.last.toFixed(2)))}</span>
            </div>
            <div css={infoCard}>
              <span css={infoCardName}>{'시초가'}</span>
              <span css={infoCardValue}>{priceToString(Number(kosdaqPrice.open.toFixed(2)))}</span>
            </div>
            <div css={infoCard}>
              <span css={infoCardName}>{'고가'}</span>
              <span css={infoCardValue}>{priceToString(Number(kosdaqPrice.high.toFixed(2)))}</span>
            </div>
            <div css={infoCard}>
              <span css={infoCardName}>{'저가'}</span>
              <span css={infoCardValue}>{priceToString(Number(kosdaqPrice.low.toFixed(2)))}</span>
            </div>
            <div css={infoCard}>
              <span css={infoCardName}>{'거래량(천주)'}</span>
              <span css={infoCardValue}>{priceToString(kosdaqPrice.volume)}</span>
            </div>
            <div css={infoCard}>
              <span css={infoCardName}>{'거래대금(백만원)'}</span>
              <span css={infoCardValue}>{priceToString(kosdaqPrice.value)}</span>
            </div>
          </div>
        </div>
        <span css={SectionTitle}>투자자 거래현황</span>
        <div css={{ height: '380px' }}>
          {kosdaqPrice &&
          kosdaqPrice.netPurchasePriceCompany !== 0 &&
          kosdaqPrice.netPurchasePriceForeigner !== 0 &&
          kosdaqPrice.netPurchasePriceIndividual !== 0 ? (
            <LargeBarChart
              labels={['외국인', '기관', '개인']}
              dataset={[kosdaqPrice.netPurchasePriceForeigner, kosdaqPrice.netPurchasePriceCompany, kosdaqPrice.netPurchasePriceIndividual]}
            />
          ) : null}
        </div>
        <Link href="/market/headline">
          <span css={SectionTitle}>
            새로 나온 뉴스{' '}
            <Image
              loader={imageLoader}
              src="/images/rightArrow.svg"
              alt="right arrow"
              height={12}
              width={12}
              css={{ margin: `0 0 0 ${theme.metrics.m2}` }}
            />
          </span>
        </Link>
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            margin: `0 0 52px 0`,
            borderRadius: '32px',
          }}
        >
          <NewsList isRound={true} news={news} loading={newsLoading} />
        </div>
        <KosdaqRankingViewList />
      </MainContainer>
    </>
  );
}

MajorKosdaq.getLayout = function getLayout(page: ReactElement) {
  return <IndexLayout index={'kosdaq'}>{page}</IndexLayout>;
};
