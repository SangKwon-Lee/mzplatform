/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import StockKoCard from '../../components/card/stockKo';
import Image from 'next/image';
import NewsList from '../../components/list/news';
import Link from 'next/link';
import theme from '../../commons/theme';
import MainCalendar from '../../components/calendar/main';
import MainContainer from '../../components/container/main';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import { useEffect, useContext, useState, useRef } from 'react';
import PriceContext from '../../contexts/price';
import { MarketServerSideProps, MarketIndex, IndexValue } from '../../commons/types';
import { fetchStockTodayPrice } from '../../lib/redux/stocks';
import { SimilarNewsByKey } from '../../lib/redux/news';
import { getNewPriceData, imageLoader } from '../../commons/utils';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import { apiServer } from '../../lib/api';
import { GetServerSideProps } from 'next';
import store from '../../lib/redux/store';
import { fetchMonthlySchedules } from '../../lib/redux/schedules';
import MarketChart from '../../components/chart/market';
import FloatingActionButton from '../../components/button/fab';

export const getServerSideProps: GetServerSideProps = async () => {
  let resultSchedule;
  let resultNewsList;
  let resultSimilarNewsList: SimilarNewsByKey = {};

  if (store.getState().news.news.length && Array.isArray(store.getState().news.news.length) && store.getState().news.news.length > 0) {
    resultNewsList = store.getState().news.news;
    resultSimilarNewsList[store.getState().news.news[0].id] = store.getState().news.news[0].similarNewsList;
  } else {
    try {
      const { data, status } = await apiServer.get('/news?_sort=publishDate:desc&source=flash&_limit=10');
      if (status === 200 && data[0]) {
        resultNewsList = data;
        resultSimilarNewsList[data[0].id] = data;
      }
    } catch (e) {
      resultNewsList = [];
      resultSimilarNewsList = {};
    }
  }

  if (
    store.getState().schedules.schedules &&
    Array.isArray(store.getState().schedules.schedules) &&
    store.getState().schedules.schedules.length > 0
  ) {
    resultSchedule = store.getState().schedules.schedules;
  } else {
    try {
      const startDate = dayjs().format('YYYYMMDD');
      const endDate = dayjs().format('YYYYMMDD');
      //const startDate = dayjs().startOf('month').format('YYYYMMDD');
      //const endDate = dayjs().endOf('month').format('YYYYMMDD');

      const { data, status } = await apiServer.get(`/schedules?_sort=startDate:desc&_startDate=${startDate}&_endDate=${endDate}&_limit=10}`);
      if (status === 200) {
        resultSchedule = data;
      }
    } catch (e) {
      resultSchedule = [];
    }
  }

  return {
    props: {
      data: {
        newsListData: resultNewsList,
        similarNewsListData: resultSimilarNewsList,
        scheduleData: resultSchedule,
      },
    },
  };
};

export default function Market(props: MarketServerSideProps) {
  const container = useRef<null | HTMLInputElement>(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [chartEnter, setChartEnter] = useState(false);
  const [indicesPrice, setIndicesPrice] = useState<IndexValue[]>([]);
  const [filteredIndicesPrice, setFilteredIndicesPrice] = useState<IndexValue[]>([]);
  const [chartIndex, setChartIndex] = useState<MarketIndex>('kospi');
  const { fetchIndicesPrice, connected, registRealtimePrice, unregistRealtimePriceAll } = useContext(PriceContext);
  const dispatch = useAppDispatch();

  const router = useRouter();
  const { schedules } = useAppSelector((state) => state.schedules);
  const { news } = useAppSelector((state) => state.news);

  const GraphContainer = css`
    margin: ${theme.metrics.m8} 0 0 0;
  `;

  const MainCalendarContainer = css`
    margin: 0 0 ${theme.metrics.m13} 0;
  `;

  const onSelectedChanged = (selected: MarketIndex) => {
    if (chartIndex !== selected) {
      setChartIndex(selected);
    }
  };

  useEffect(() => {
    if (props.data.scheduleData && props.data.scheduleData.length > 0) {
      const fetchedStocks: string[] = [];
      props.data.scheduleData.forEach((schedule) => {
        if (schedule.stocks && schedule.stocks.length > 0) {
          schedule.stocks.forEach((stock) => {
            // 일정에 포함된 종목들 중 이미 fetch한 경우는 스킵
            if (fetchedStocks.find((item) => item === stock.code) || !stock.code) {
              !stock.code ? console.log('Stock code is not found: ', stock) : null;
              return;
            }

            dispatch(fetchStockTodayPrice(stock.code));
            fetchedStocks.push(stock.code);
          });
        }
      });
      registRealtimePrice(fetchedStocks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedules]);

  useEffect(() => {
    if (props.data.newsListData && props.data.newsListData.length > 0) {
      const fetchedStocks: string[] = [];
      props.data.newsListData.forEach((news) => {
        if (news.stockList && news.stockList.length > 0) {
          news.stockList.forEach((stock) => {
            // 일정에 포함된 종목들 중 이미 fetch한 경우는 스킵
            if (fetchedStocks.find((item) => item === stock.stockCode) || !stock.stockCode) {
              !stock.stockCode ? console.log('Stock code is not found: ', stock) : null;
              return;
            }

            dispatch(fetchStockTodayPrice(stock.stockCode));
            fetchedStocks.push(stock.stockCode);
          });
        }
      });
      registRealtimePrice(fetchedStocks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [news]);

  useEffect(() => {
    dispatch(fetchMonthlySchedules(dayjs().format('YYYY.MM.DD')));
    //dispatch(fetchNews());
    return () => {
      unregistRealtimePriceAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (connected) {
      getIndicesPrice();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  useEffect(() => {
    if (container.current) {
      setChartWidth(container.current.offsetWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container.current]);

  const getIndicesPrice = async () => {
    const data = await fetchIndicesPrice();
    if (Array.isArray(data) && data.length > 0) {
      setIndicesPrice(data);
      setFilteredIndicesPrice(data);
    }
  };

  const onChartEnter = (price: number) => {
    if (!indicesPrice || indicesPrice.length < 2) return;

    if (chartIndex === 'kospi') {
      const kospiPrice = indicesPrice[0];
      if (kospiPrice) {
        const { newDiff, newRatio } = getNewPriceData({
          newPrice: price,
          oldPrice: kospiPrice.value,
          oldDiff: kospiPrice.diff,
          oldRatio: kospiPrice.ratio,
        });
        const newKospiPrice = {
          name: '코스피',
          value: price,
          diff: newDiff,
          ratio: newRatio,
        };
        setFilteredIndicesPrice([newKospiPrice, indicesPrice[1]]);
      }
    } else {
      const kosdaqPrice = indicesPrice[1];
      if (kosdaqPrice) {
        const { newDiff, newRatio } = getNewPriceData({
          newPrice: price,
          oldPrice: kosdaqPrice.value,
          oldDiff: kosdaqPrice.diff,
          oldRatio: kosdaqPrice.ratio,
        });
        const newKosdaqPrice = {
          name: '코스닥',
          value: price,
          diff: newDiff,
          ratio: newRatio,
        };
        setFilteredIndicesPrice([indicesPrice[0], newKosdaqPrice]);
      }
    }

    if (chartEnter === false) {
      setChartEnter(true);
    }
  };

  const onChartLeave = () => {
    setChartEnter(false);
  };

  const onClickHandler = (selected: string) => {
    if (chartIndex === selected) router.push(`/market/major/${selected}`);
  };

  return (
    <>
      <div
        css={css`
          display: flex;
          justify-content: center;
          width: 100%;
          max-width: 600px;
          -webkit-touch-callout: none; /* Safari */
          -webkit-user-select: none; /* Chrome */
          -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none;
        `}
        ref={container}
      >
        <MainContainer>
          <div css={GraphContainer}>
            {indicesPrice && Array.isArray(indicesPrice) && indicesPrice.length >= 2 ? (
              <StockKoCard
                onClick={onClickHandler}
                kospi={!chartEnter ? indicesPrice[0] : filteredIndicesPrice[0]}
                kosdaq={!chartEnter ? indicesPrice[1] : filteredIndicesPrice[1]}
                onSelectedChanged={onSelectedChanged}
              />
            ) : (
              <div
                css={css`
                  display: flex;
                  justify-content: space-evenly;
                  margin: 0 0 ${theme.metrics.m8} 0;
                `}
              >
                <div
                  css={css`
                    background-color: ${theme.color.gray.white};
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: ${theme.metrics.m4};
                    gap: ${theme.metrics.m4};
                    min-width: 163px;
                    height: 116px;
                    border-radius: ${theme.metrics.m8};
                  `}
                ></div>
                <div
                  css={css`
                    background-color: ${theme.color.gray.white};
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: ${theme.metrics.m4};
                    gap: ${theme.metrics.m4};
                    min-width: 163px;
                    height: 116px;
                    border-radius: ${theme.metrics.m8};
                  `}
                ></div>
              </div>
            )}
          </div>
          <MarketChart chartIndex={chartIndex} chartWidth={chartWidth} onChartLeave={onChartLeave} onChartEnter={onChartEnter} />
          <div css={MainCalendarContainer}>
            {chartWidth !== 0 && <MainCalendar viewWidth={chartWidth + 60} schedules={schedules.length > 0 ? schedules : props.data.scheduleData} />}
          </div>
          <div
            css={css`
              ${theme.fonts.s20_w700};
              margin: 0 0 ${theme.metrics.m6} 0;
              color: ${theme.color.gray.w800};
              display: flex;
              align-items: center;
            `}
          >
            <Link href="/market/headline">
              {'새로 나온 뉴스'}
              <Image loader={imageLoader} src="/images/rightArrow.svg" alt="right arrow" width={14} height={14} css={{ margin: '0 0 0 .5rem' }} />
            </Link>
          </div>
          {props.data.newsListData && Array.isArray(props.data.newsListData) && props.data.newsListData.length > 0 ? (
            <NewsList isRound={true} news={props.data.newsListData.slice(0, 5)} />
          ) : (
            <div
              css={css`
                display: flex;
                height: 200px;
                justify-content: center;
                align-items: center;
                border-radius: 24px;
              `}
            >
              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-direction: column;
                `}
              >
                <Image
                  css={css`
                    filter: contrast(0.95);
                    margin: auto;
                    position: rel;
                  `}
                  src={'/images/noContents.svg'}
                  alt={'no-content'}
                  width={145}
                  height={80}
                />
                <p
                  css={css`
                    ${theme.fonts.s16_w400};
                    color: ${theme.color.gray.w600};
                  `}
                >
                  {'새로 나온 뉴스가 없어요.'}
                </p>
              </div>
            </div>
          )}

          <div
            css={css`
              display: flex;
              align-items: flex-start;
              padding: ${theme.metrics.m4};
              background-color: ${theme.color.gray.w300};
              ${theme.fonts.s12_w400};
              color: ${theme.color.gray.w600};
              flex-grow: 1;
              margin: ${theme.metrics.m6} 0 ${theme.metrics.m4} 0;
              line-height: 150%;
            `}
          >
            이노핀에서 제공하는 자료를 기초로 만들어 졌으며, 최종 투자 판단에 대한 책임은 본인에게 있음을 알려드립니다.
          </div>
        </MainContainer>
        <FloatingActionButton />
      </div>
    </>
  );
}
