import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef } from 'react';
import theme from '../../commons/theme';
import Icon from '../../commons/theme/icon';
import images from '../../commons/theme/images';
import { cdnStockLogoUrl, imageLoader, signFormat, textColor } from '../../commons/utils';
import PriceContext from '../../contexts/price';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import { fetchPriceKospiRanking } from '../../lib/redux/price';
import { fetchStockTodayPrice } from '../../lib/redux/stocks';
import StockImage from '../image/stockImage';
import FadeIn from 'react-fade-in';
import { Button } from '@mui/material';

export default function KospiRankingViewList() {
  const ref = useRef(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { priceListKospi } = useAppSelector((state) => state.price);
  const stocks = useAppSelector((state) => state.stocks);
  // @ts-ignore
  const { registRealtimePrice, unregistRealtimePriceAll } = useContext(PriceContext);
  const isInViewport = useIntersectionObserver(ref);

  useEffect(() => {
    if (Array.isArray(priceListKospi) && priceListKospi.length > 0) {
      const fetchedStocks: string[] = [];
      priceListKospi.map((data) => {
        // 일정에 포함된 종목들 중 이미 fetch한 경우는 스킵
        if (fetchedStocks.find((item) => item === data.shcode.replaceAll('A', '')) || !data.shcode.replaceAll('A', '')) {
          data.shcode.replaceAll('A', '') ? console.log('Stock code is not found: ', data.shcode.replaceAll('A', '')) : null;
          return;
        }
        dispatch(fetchStockTodayPrice(data.shcode.replaceAll('A', '')));
        fetchedStocks.push(data.shcode.replaceAll('A', ''));
      });
      registRealtimePrice(fetchedStocks);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceListKospi]);

  useEffect(() => {
    //@ts-ignore
    dispatch(fetchPriceKospiRanking());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      unregistRealtimePriceAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MostViewContainer>
      <div>
        <MostViewTitle ref={ref} onClick={() => router.push(`/themestock/popular`)}>
          {'이 시각 코스피 특징주'}
          <Icon icon={images.rightArrow} width={10} height={14} style={{ marginLeft: '8px' }} />
        </MostViewTitle>
      </div>
      {isInViewport && (
        <FadeIn delay={150} transitionDuration={1000}>
          <MostViewContentsWrapper>
            {Array.isArray(priceListKospi) && priceListKospi.length > 0 ? (
              priceListKospi.map((data, index) => (
                <MostViewContentsBox key={data.shcode + index} onClick={() => router.push(`/stock/${data.shcode.replaceAll('A', '')}`)}>
                  <StockImage
                    src={cdnStockLogoUrl(data.shcode)}
                    width={38}
                    style={{
                      maxWidth: 38,
                      maxHeight: 38,
                      borderRadius: '50%',
                      marginBottom: theme.metrics.m2,
                      backgroundColor: theme.color.gray.white,
                      border: `5px solid ${theme.color.gray.w100}`,
                    }}
                    height={38}
                    alt={data.shcode}
                    loader={imageLoader}
                  />
                  <MostViewContentsName>{data.hname}</MostViewContentsName>
                  {stocks[data.shcode.replaceAll('A', '')] && stocks[data.shcode.replaceAll('A', '')].ratio && (
                    <MostViewContentsRatio
                      style={{
                        color: textColor(stocks[data.shcode.replaceAll('A', '')].ratio),
                      }}
                    >
                      {signFormat(stocks[data.shcode.replaceAll('A', '')].ratio)}
                      {stocks[data.shcode.replaceAll('A', '')].ratio}
                      <MostViewContentsPercent
                        style={{
                          color: textColor(stocks[data.shcode.replaceAll('A', '')].ratio),
                        }}
                      >
                        %
                      </MostViewContentsPercent>
                    </MostViewContentsRatio>
                  )}
                </MostViewContentsBox>
              ))
            ) : (
              <></>
            )}
          </MostViewContentsWrapper>
        </FadeIn>
      )}
    </MostViewContainer>
  );
}

const MostViewContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MostViewTitle = styled.div`
  ${theme.fonts.s20_w500}
  color: ${theme.color.gray.w800};
  cursor: pointer;
  display: inline-block;
  align-items: center;
  padding: 0 0 0 ${theme.metrics.m4};
`;

const MostViewContentsWrapper = styled.div`
  display: flex;
  margin-top: ${theme.metrics.m4};
  padding: 0 ${theme.metrics.m4} 0 ${theme.metrics.m4};
  overflow: scroll;
  -ms-overflow-style: none;
  margin-right: ${'-' + theme.metrics.m4};
  margin-left: ${'-' + theme.metrics.m4};
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  /* transform: translateY(-50px);
  opacity: 0;
  transition-property: transform, opacity;
  transition-duration: 0.5s;
  transition-timing-function: linear;
  &.fadein {
    opacity: 1;
    transform: translateY(0px);
  } */
`;

const MostViewContentsBox = styled(Button)`
  min-width: min-content;
  background-color: ${theme.color.gray.white};
  padding: ${theme.metrics.m6} ${theme.metrics.m2};
  border-radius: 99px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: ${theme.metrics.m2};
  cursor: pointer;
  width: 104px;
`;

const MostViewContentsImage = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: ${theme.color.gray.white};
  border: 5px solid ${theme.color.gray.w100};
  margin-bottom: ${theme.metrics.m2};
  background-color: ${theme.color.chart.up};
  cursor: pointer;
`;

const MostViewContentsName = styled.div`
  ${theme.fonts.s16_w500}
  cursor: pointer;
  color: ${theme.color.gray.w800};
  height: 38px;
  max-width: 70px;
  margin-bottom: ${theme.metrics.m4};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const MostViewContentsRatio = styled.div`
  color: ${theme.color.gray.w800};
  font-size: 2.2rem;
  min-width: 86px;
  text-align: center;
`;

const MostViewContentsPercent = styled.span`
  ${theme.fonts.s16_w400};
  color: ${theme.color.gray.w800};
`;
