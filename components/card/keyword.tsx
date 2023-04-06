/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import theme from '../../commons/theme';
import Icon from '../../commons/theme/icon';
import images from '../../commons/theme/images';
import KeywordChip from '../chip/keyword';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef } from 'react';
import { fetchKeywordNews } from '../../lib/redux/news';
import { fetchKeywords, fetchStockKeyword } from '../../lib/redux/keyword';
import { priceToString, signFormat, textColor } from '../../commons/utils';
import { useAppSelector, useAppDispatch } from '../../lib/redux/hooks';
import PriceContext from '../../contexts/price';
import { fetchStockTodayPrice } from '../../lib/redux/stocks';
import { IKeywordNews } from '../../commons/types';
import { setNewsBottomSheet, closeNewsBottomSheet } from '../../lib/redux/bottomSheets';
import { useAnimation, useInView, motion } from 'framer-motion';
import _ from 'lodash';
import Link from 'next/link';
import moment from 'moment';
import { Button } from '@mui/material';

interface Props {
  keyword: string;
  backgroundColor: string;
}
const listAnimationVariants = {
  visible: { opacity: 1, transition: { duration: 0.3 } },
  hidden: { opacity: 0 },
};

export default function KeywordCard(props: Props) {
  const router = useRouter();
  const { keyword, backgroundColor } = props;
  const dispatch = useAppDispatch();
  const stocks = useAppSelector((state) => state.stocks);
  //@ts-ignore
  const { registRealtimePrice, unregistRealtimePriceAll } = useContext(PriceContext);
  const { keywordNews } = useAppSelector((state) => state.news);
  const { loading, stockKeyword, keywords } = useAppSelector((state) => state.keyword);

  //* 화면에 들어왔을 때 애니메이션 시작
  const ref = useRef(null);
  const isInView = useInView(ref);
  const animationControls = useAnimation();

  useEffect(() => {
    if (Array.isArray(stockKeyword.data) && stockKeyword.data.length > 0) {
      const fetchedStocks: string[] = [];
      stockKeyword.data
        .slice()
        .sort((a, b) => Number(b.price.ratio) - Number(a.price.ratio))
        .slice(0, 4)
        .map((data) => {
          // 일정에 포함된 종목들 중 이미 fetch한 경우는 스킵
          if (fetchedStocks.find((item) => item === data.stockCode) || !data.stockCode) {
            data.stockCode ? console.log('Stock code is not found: ', data.stockCode) : null;
            return;
          }
          dispatch(fetchStockTodayPrice(data.stockCode));
          fetchedStocks.push(data.stockCode);
        });
      registRealtimePrice(fetchedStocks);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockKeyword]);

  useEffect(() => {
    if (Array.isArray(keywordNews) && keywordNews.length > 0) {
      if (Array.isArray(keywordNews[0].stockList) && keywordNews[0].stockList.length > 0) {
        dispatch(fetchStockTodayPrice(keywordNews[0].stockList[0].stockCode));
        registRealtimePrice([keywordNews[0].stockList[0].stockCode]);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywordNews]);

  useEffect(() => {
    if (keyword) {
      //@ts-ignore
      dispatch(fetchStockKeyword(keyword));
      //@ts-ignore
      dispatch(fetchKeywordNews(keyword));
      //@ts-ignore
      dispatch(fetchKeywords(keyword));
    }
  }, [dispatch, keyword]);

  useEffect(() => {
    return () => {
      unregistRealtimePriceAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // * 뉴스 바텀시트
  const handleOpenSheet = () => {
    dispatch(closeNewsBottomSheet());
  };

  const onClickNewsItem = (news: IKeywordNews) => {
    dispatch(
      setNewsBottomSheet({
        title: news.title,
        summary: news.summarized,
        openSheet: true,
        handleOpenSheet: handleOpenSheet,
        url: news.url,
        photo: news.photo || '',
        publishDate: news.publishDate,
        media: news.mediaName,
      }),
    );
  };

  useEffect(() => {
    if (isInView) {
      // animationControls.set('hidden');
      animationControls.start('visible');
    }
  }, [animationControls, isInView]);

  return (
    <motion.div initial={'hidden'} variants={listAnimationVariants} animate={animationControls} transition={{ easings: 'easeIn', duration: 0.5 }}>
      <ContentsContainer ref={ref}>
        <ContentsWrapper>
          <KeywordChip backgroundColor={backgroundColor} keyword={keyword}></KeywordChip>
          <ContentsNumberWrapper>
            <ContentsNumberPrice>{priceToString(keywords?.avgPrice)}</ContentsNumberPrice>
            <ContentsNumberRatioWrapper>
              {Array.isArray(keywords?.stocks) && keywords?.stocks.length > 0 && (
                <ContentsNumberRatio
                  css={css`
                    color: ${textColor(_.meanBy(keywords.stocks.map((data: any) => data.diff)))};
                  `}
                >
                  <>
                    <Icon
                      icon={_.meanBy(keywords.stocks.map((data: any) => data.diff)) >= 0 ? images.chartUpTriangle : images.chartDownTriangle}
                      width={10}
                      height={8}
                      style={{ marginRight: theme.metrics.m2 }}
                    />
                    {_.meanBy(keywords.stocks.map((data: any) => data.diff)).toFixed(2)}
                  </>
                </ContentsNumberRatio>
              )}
              <ContentsNumberRatio
                css={css`
                  color: ${textColor(keywords?.avgRatio)};
                `}
              >
                {signFormat(keywords?.avgRatio)}
                {keywords?.avgRatio?.toFixed(2)}%
              </ContentsNumberRatio>
            </ContentsNumberRatioWrapper>
          </ContentsNumberWrapper>
          <ContentsDivider />
          {loading === 'succeeded' ? (
            <ContentsStockWrapper>
              {Array.isArray(stockKeyword.data) && stockKeyword.data.length > 0 ? (
                stockKeyword.data
                  .slice()
                  .sort((a, b) => Number(b.price.ratio) - Number(a.price.ratio))
                  .slice(0, 4)
                  .map((data, index) => (
                    <ContentsStockNameWrapper key={data.stockCode + index} onClick={() => router.push(`/stock/${data.stockCode}`)}>
                      <ContentsStockName>{data.name}</ContentsStockName>
                      <ContentsStockRatio
                        css={css`
                          color: ${Number(stocks[data.stockCode]?.ratio) >= 0 ? theme.color.chart.up : theme.color.chart.down};
                        `}
                      >
                        {signFormat(Number(stocks[data.stockCode]?.ratio))}
                        {/* {Number(String(stocks[data.stockCode]?.ratio)) > 0 ? 'ASD' : String(stocks[data.stockCode]?.ratio)} */}
                        {stocks[data.stockCode] && stocks[data.stockCode].ratio ? stocks[data.stockCode].ratio.toFixed(2) : 0}%
                      </ContentsStockRatio>
                    </ContentsStockNameWrapper>
                  ))
              ) : (
                <div
                  css={css`
                    ${theme.fonts.s14_w400};
                  `}
                >
                  관련된 종목이 없습니다
                </div>
              )}
            </ContentsStockWrapper>
          ) : (
            <div
              css={css`
                height: 60px;
              `}
            ></div>
          )}

          <ContentsDivider />
          <ContentsNewsTitleWrapper onClick={() => router.push(`/keyword/${keyword}/news`)}>
            <ContentsNewsTitle>관련뉴스</ContentsNewsTitle>
            <ContentsNewsCount>
              {Array.isArray(keywordNews) && keywordNews.length}건
              <Icon icon={images.rightArrow} width={10} height={8} style={{ marginLeft: theme.metrics.m1 }} />
            </ContentsNewsCount>
          </ContentsNewsTitleWrapper>
          {Array.isArray(keywordNews) && keywordNews.length > 0 ? (
            <Link
              href={keywordNews[0].url}
              target={'_blank'}
              css={css`
                cursor: pointer;
                display: -webkit-box;
                -webkit-line-clamp: 1;
                -webkit-box-orient: vertical;
                overflow: hidden;
                width: 100%;
                ${theme.fonts.s16_w400};
                margin-top: ${theme.metrics.m2};
                margin-bottom: ${theme.metrics.m1};
              `}
              style={{ width: '100%' }}
              // onClick={() => onClickNewsItem(keywordNews[0])}
            >
              <ContentsNewsText
                css={css`
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  width: 100%;
                  ${theme.fonts.s16_w400};
                  margin-top: ${theme.metrics.m2};
                  margin-bottom: ${theme.metrics.m1};
                `}
              >
                {keywordNews[0].title}
              </ContentsNewsText>
              <ContentsBottomWrapper>
                <ContentsNews>
                  {keywordNews[0].mediaName}
                  <ContentsNewsTime>{moment(keywordNews[0].publishDate).add(9, 'hour').fromNow()}</ContentsNewsTime>
                </ContentsNews>
                {Array.isArray(keywordNews[0].stockList) && keywordNews[0].stockList.length > 0 && stocks[keywordNews[0].stockList[0].stockCode] && (
                  <ContentsNewsStock>
                    {Array.isArray(keywordNews[0].stockList) && keywordNews[0].stockList.length > 0 ? keywordNews[0].stockList[0].stockName : <></>}
                    <ContentsNewsStockRatio style={{ color: textColor(stocks[keywordNews[0].stockList[0].stockCode]?.ratio) }}>
                      {Array.isArray(keywordNews[0].stockList) && keywordNews[0].stockList.length > 0 ? (
                        stocks[keywordNews[0].stockList[0].stockCode]?.ratio.toFixed(2) + '%'
                      ) : (
                        <></>
                      )}
                    </ContentsNewsStockRatio>
                  </ContentsNewsStock>
                )}
              </ContentsBottomWrapper>
            </Link>
          ) : (
            <div
              css={css`
                ${theme.fonts.s16_w400}
                text-align: left;
                width: 100%;
                padding-top: ${theme.metrics.m2};
              `}
            >
              관련된 뉴스가 없습니다.
            </div>
          )}
        </ContentsWrapper>
      </ContentsContainer>
    </motion.div>
  );
}

const ContentsContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const ContentsWrapper = styled.div`
  width: 100%;
  background-color: ${theme.color.gray.white};
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.metrics.m6};
  border-radius: 32px;
`;

const ContentsNumberWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: ${theme.metrics.m4};
  align-items: center;
`;

const ContentsNumberPrice = styled.div`
  ${theme.fonts.s20_w700}
`;

const ContentsNumberRatioWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ContentsNumberRatio = styled.div`
  margin-left: ${theme.metrics.m2};
  ${theme.fonts.s20_w500}
  font-size:1.8rem;
  color: ${theme.color.chart.up};
  display: flex;
  align-items: center;
`;

const ContentsDivider = styled.div`
  border-top: 1px solid ${theme.color.gray.w200};
  width: 100%;
  margin: ${theme.metrics.m4} 0px;
`;

const ContentsStockWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  /* gap: ${theme.metrics.m1}; */
`;

const ContentsStockNameWrapper = styled(Button)`
  display: flex !important;
  margin-right: ${theme.metrics.m2};
  cursor: pointer;
  padding: 0;
`;

const ContentsStockName = styled.div`
  color: ${theme.color.gray.w700};
  ${theme.fonts.s16_w400}
`;

const ContentsStockRatio = styled.div`
  ${theme.fonts.s16_w400}
  min-width: 66px;
  margin-left: ${theme.metrics.m2};
  color: ${theme.color.chart.up};
`;

const ContentsNewsTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const ContentsNewsTitle = styled.div`
  color: ${theme.color.gray.w800};
  ${theme.fonts.s16_w700}
  margin-right: ${theme.metrics.m2};
`;

const ContentsNewsCount = styled.div`
  color: ${theme.color.gray.w600};
  ${theme.fonts.s12_w400}
  cursor: pointer;
`;

const ContentsNewsText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  width: 100%;
  ${theme.fonts.s16_w400};
  margin-top: ${theme.metrics.m2};
  margin-bottom: ${theme.metrics.m1};
`;

const ContentsBottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const ContentsNews = styled.div`
  ${theme.fonts.s12_w500}
  color: ${theme.color.gray.w600};
`;

const ContentsNewsTime = styled.span`
  ${theme.fonts.s12_w400}
  color: ${theme.color.gray.w500};
  margin-left: ${theme.metrics.m1};
`;

const ContentsNewsStock = styled.div`
  ${theme.fonts.s12_w400}
  color: ${theme.color.gray.w700};
`;

const ContentsNewsStockRatio = styled.span`
  ${theme.fonts.s12_w400};
  min-width: 40px;
  color: ${theme.color.chart.up};
  margin-left: ${theme.metrics.m2};
`;
