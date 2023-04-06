import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import theme from '../../commons/theme';
import StockImage from '../image/stockImage';
import Icon from '../../commons/theme/icon';
import images from '../../commons/theme/images';
import PriceContext from '../../contexts/price';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useContext, useEffect, useRef } from 'react';
import { fetchPriceMZMost } from '../../lib/redux/price';
import { fetchStockTodayPrice } from '../../lib/redux/stocks';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import { cdnStockLogoUrl, imageLoader, signFormat, textColor } from '../../commons/utils';
import { useDraggable } from 'react-use-draggable-scroll';
import NoContentsImage from '../image/noContentsImage';
import { Button } from '@mui/material';

const listAnimationVariants = {
  visible: { opacity: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0 },
};

export default function MostViewList() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  //*웹에서 마우스 드래그 가능
  const list = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(list);

  const { priceListMZMost } = useAppSelector((state) => state.price);
  const stocks = useAppSelector((state) => state.stocks);
  // @ts-ignore
  const { registRealtimePrice, unregistRealtimePriceAll } = useContext(PriceContext);

  //* 화면에 들어왔을 때 애니메이션 시작
  const ref = useRef(null);
  const isInView = useInView(ref);
  const animationControls = useAnimation();
  // * 종목 실시간 등록
  useEffect(() => {
    if (Array.isArray(priceListMZMost.stocks) && priceListMZMost.stocks.length > 0) {
      const fetchedStocks: string[] = [];
      priceListMZMost.stocks.map((data) => {
        // 일정에 포함된 종목들 중 이미 fetch한 경우는 스킵
        if (fetchedStocks.find((item) => item === data.stockcode.replaceAll('A', '')) || !data.stockcode.replaceAll('A', '')) {
          data.stockcode.replaceAll('A', '') ? console.log('Stock code is not found: ', data.stockcode.replaceAll('A', '')) : null;
          return;
        }
        dispatch(fetchStockTodayPrice(data.stockcode.replaceAll('A', '')));
        fetchedStocks.push(data.stockcode.replaceAll('A', ''));
      });
      registRealtimePrice(fetchedStocks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priceListMZMost]);
  useEffect(() => {
    setTimeout(() => {
      //@ts-ignore
      dispatch(fetchPriceMZMost());
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      unregistRealtimePriceAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInView) {
      // animationControls.set('hidden');
      animationControls.start('visible');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <MostViewContainer>
      <div>
        <MostViewTitle ref={ref} onClick={() => router.push(`/themestock/popular`)}>
          MZ인기 랭킹
          <Icon icon={images.rightArrow} width={10} height={14} style={{ marginLeft: '8px' }} />
        </MostViewTitle>
      </div>
      <motion.div initial={'hidden'} variants={listAnimationVariants} animate={animationControls} transition={{ easings: 'easeIn', duration: 0.5 }}>
        <MostViewContentsWrapper ref={list} {...events}>
          {Array.isArray(priceListMZMost.stocks) && priceListMZMost.stocks.length > 0 ? (
            priceListMZMost.stocks.map((data, index) => (
              <MostViewContentsBox
                style={{ marginRight: index + 1 === priceListMZMost.stocks.length ? theme.metrics.m4 : theme.metrics.m2 }}
                key={data.stockcode + index}
                onClick={() => router.push(`/stock/${data.stockcode.replaceAll('A', '')}`)}
              >
                <StockImage
                  src={cdnStockLogoUrl(data.stockcode)}
                  width={38}
                  style={{
                    maxWidth: 38,
                    maxHeight: 38,
                    borderRadius: '50%',
                    marginBottom: theme.metrics.m2,
                    backgroundColor: theme.color.gray.white,
                    border: `5px solid ${theme.color.gray.w100}`,
                  }}
                  loading="lazy"
                  height={38}
                  alt={data.stockcode}
                  loader={imageLoader}
                />
                <MostViewContentsName>{data.stockname}</MostViewContentsName>
                {stocks[data.stockcode.replaceAll('A', '')] && stocks[data.stockcode.replaceAll('A', '')].ratio ? (
                  <MostViewContentsRatio
                    style={{
                      color: textColor(stocks[data.stockcode.replaceAll('A', '')].ratio),
                    }}
                  >
                    {signFormat(stocks[data.stockcode.replaceAll('A', '')].ratio)}
                    {stocks[data.stockcode.replaceAll('A', '')].ratio.toFixed(2)}
                    <MostViewContentsPercent
                      style={{
                        color: textColor(stocks[data.stockcode.replaceAll('A', '')].ratio),
                      }}
                    >
                      %
                    </MostViewContentsPercent>
                  </MostViewContentsRatio>
                ) : (
                  <MostViewContentsRatio style={{ color: theme.color.chart.up }}>
                    0<MostViewContentsPercent style={{ color: theme.color.chart.up }}>%</MostViewContentsPercent>
                  </MostViewContentsRatio>
                )}
              </MostViewContentsBox>
            ))
          ) : (
            <NoContentsImage text="종목이 없어요." height="175px" />
          )}
        </MostViewContentsWrapper>
      </motion.div>
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
`;

const MostViewContentsWrapper = styled.div`
  display: flex;
  padding-left: ${theme.metrics.m4};
  margin-top: ${theme.metrics.m4};
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
  ${theme.fonts.s20_w400};
  min-width: 89px;
  text-align: center;
`;

const MostViewContentsPercent = styled.span`
  ${theme.fonts.s16_w400};
  color: ${theme.color.gray.w800};
`;
