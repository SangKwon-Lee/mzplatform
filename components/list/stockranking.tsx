import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Swiper } from 'swiper/react';
import { useRouter } from 'next/router';
import theme from '../../commons/theme';
import StockImage from '../image/stockImage';
import PriceContext from '../../contexts/price';
import { motion, useAnimation, useInView } from 'framer-motion';
import { fetchPriceList } from '../../lib/redux/price';
import SortBtnArraySelect from '../select/sortBtnArray';
import { fetchStockTodayPrice } from '../../lib/redux/stocks';
import { useContext, useEffect, useRef, useState } from 'react';
import SwiperCore, { Navigation, Scrollbar, A11y } from 'swiper';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import { priceToString, signFormat, textColor, imageLoader, cdnStockLogoUrl } from '../../commons/utils';
import { Button } from '@mui/material';
SwiperCore.use([Navigation, Scrollbar, A11y]);

const listAnimationVariants = {
  visible: { opacity: 1, transition: { duration: 0.5 } },
  hidden: { opacity: 0 },
};

const sortBtnArr = [
  { value: 'trade', text: '거래량' },
  { value: 'inc', text: '상승률' },
  { value: 'dec', text: '하락률' },
  { value: 'cap', text: '시가총액' },
];

const CustomSwiper = styled(Swiper)`
  .swiper-button-next,
  .swiper-button-prev {
    display: flex;
  }
  .swiper-scrollbar {
    display: none;
  }
`;

export default function RankingThemeStock() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, priceList } = useAppSelector((state) => state.price);
  const stocks = useAppSelector((state) => state.stocks);
  //@ts-ignore
  const { registRealtimePrice, unregistRealtimePriceAll } = useContext(PriceContext);

  // * 화면에 들어왔을 때 애니메이션 시작
  const ref = useRef(null);
  const isInView = useInView(ref);
  const animationControls = useAnimation();

  //* Swiper
  const swiperRef = useRef(null);
  const [swiperIndex, setSwiperIndex] = useState<number>(0);

  //* 버튼 함수
  const [btnValue, setBtnValue] = useState('trade');
  const handleBtnValue = async (value: string) => {
    dispatch(fetchPriceList({ gbn: value, limit: 5 }));
    if (value === 'trade') {
      //@ts-ignore
      swiperRef.current.slideTo(0);
    } else if (value === 'inc') {
      //@ts-ignore
      swiperRef.current.slideTo(1);
    } else if (value === 'dec') {
      //@ts-ignore
      swiperRef.current.slideTo(2);
    } else if (value === 'cap') {
      //@ts-ignore
      swiperRef.current.slideTo(3);
    }
    setBtnValue(value);
  };

  useEffect(() => {
    //@ts-ignore
    setTimeout(() => {
      dispatch(fetchPriceList({ gbn: 'trade', limit: 5 }));
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Array.isArray(priceList) && priceList.length > 0) {
      const fetchedStocks: string[] = [];
      priceList.map((data) => {
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
  }, [priceList]);

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
  }, [animationControls, isInView]);

  return (
    <>
      <RankingContainer>
        <div>
          <RankingTitle ref={ref} onClick={() => router.push(`themestock/ranking?value=${btnValue}`)}>
            종목 랭킹
            <Image
              loader={imageLoader}
              src={'/images/rightArrow.svg'}
              width={10}
              height={14}
              style={{ marginLeft: theme.metrics.m2 }}
              alt="rightArrow"
              loading="lazy"
            />
          </RankingTitle>
        </div>
        <div style={{ margin: `${theme.metrics.m4} 0` }}>
          <SortBtnArraySelect SortArray={sortBtnArr} btnValue={btnValue} handleBtnValue={handleBtnValue} />
        </div>
        <motion.div initial={'hidden'} variants={listAnimationVariants} animate={animationControls} transition={{ easings: 'easeIn' }}>
          {loading === 'succeeded' ? (
            <div className="swiper-container">
              <CustomSwiper
                loop={true}
                allowTouchMove
                spaceBetween={8}
                color={String(swiperIndex)}
                scrollbar={{
                  draggable: true,
                  hide: true,
                  el: '.swiper-scrollbar',
                }}
                // modules={[Navigation, Scrollbar, A11y]}
                slidesPerView={1}
                touchEventsTarget={'container'}
                // scrollbar
                observer={true}
                // navigation
                onSwiper={(event) => {
                  //@ts-ignore
                  swiperRef.current = event;
                  setSwiperIndex(0);
                }}
                onSlideChange={(event) => {
                  if (event.realIndex === 0) {
                    setBtnValue('trade');
                  } else if (event.realIndex === 1) {
                    setBtnValue('inc');
                  } else if (event.realIndex === 2) {
                    setBtnValue('dec');
                  } else if (event.realIndex === 3) {
                    setBtnValue('cap');
                  }
                  setSwiperIndex(event.realIndex);
                }}
              >
                <div className="swiper-wrapper">
                  {new Array(4).fill(0).map((__, index) => (
                    <div
                      className="swiper-slide"
                      key={index}
                      style={{ display: 'flex', flexDirection: 'column', minWidth: '100%', overflow: 'hidden' }}
                    >
                      <RankingStockWrapper>
                        {Array.isArray(priceList) && priceList.length > 0 ? (
                          priceList.map((data, index) => (
                            <RankingStockItemWrapper
                              onClick={() => router.push(`/stock/${data.shcode.replaceAll('A', '')}`)}
                              style={{
                                borderBottom: index === 4 ? 'none' : `1px solid ${theme.color.gray.w200}`,
                              }}
                              css={css`
                                border-top-left-radius: ${index === 0 ? '32px' : '0px'};
                                border-top-right-radius: ${index === 0 ? '32px' : '0px'};
                                border-bottom-left-radius: ${index === 4 ? '32px' : '0px'};
                                border-bottom-right-radius: ${index === 4 ? '32px' : '0px'};
                              `}
                              key={data.shcode + index}
                            >
                              <RankingStockItemNameWrapper>
                                <RankingStockItemNumber>{index + 1}</RankingStockItemNumber>
                                <StockImage
                                  src={cdnStockLogoUrl(data.shcode)}
                                  width={24}
                                  loading="lazy"
                                  style={{
                                    maxWidth: 24,
                                    maxHeight: 24,
                                    borderRadius: '50%',
                                    marginRight: theme.metrics.m2,
                                    marginLeft: theme.metrics.m2,
                                  }}
                                  height={24}
                                  alt={data.shcode}
                                  loader={imageLoader}
                                />
                                <RankingStockItemName>{data.hname}</RankingStockItemName>
                              </RankingStockItemNameWrapper>
                              <RankingStockItemPriceWrapper>
                                <RankingStockItemPrice> {data.price ? priceToString(data.price) : 0}</RankingStockItemPrice>
                                <RankingStockItemRatio
                                  style={{
                                    color: textColor(Number(stocks[data.shcode.replaceAll('A', '')]?.ratio)),
                                  }}
                                >
                                  {signFormat(Number(stocks[data.shcode.replaceAll('A', '')]?.ratio))}
                                  {stocks[data.shcode.replaceAll('A', '')] && stocks[data.shcode.replaceAll('A', '')].ratio
                                    ? stocks[data.shcode.replaceAll('A', '')].ratio
                                    : 0}
                                  %
                                </RankingStockItemRatio>
                              </RankingStockItemPriceWrapper>
                            </RankingStockItemWrapper>
                          ))
                        ) : (
                          <div
                            css={css`
                              display: flex;
                              justify-content: center;
                              align-items: center;
                              flex-direction: column;
                              height: 440px;
                            `}
                          >
                            <Image
                              css={css`
                                width: 145px !important;
                                height: 80px !important;
                              `}
                              src={'/images/noContents.png'}
                              alt={'no-content'}
                              width={145}
                              loading="lazy"
                              height={80}
                            />
                            <p
                              css={css`
                                ${theme.fonts.s16_w400};
                                color: ${theme.color.gray.w600};
                              `}
                            >
                              {'아직 랭킹 종목이 없어요.'}
                            </p>
                          </div>
                        )}
                      </RankingStockWrapper>
                    </div>
                  ))}
                </div>
                <div className="swiper-scrollbar" style={{ display: 'none' }}></div>
              </CustomSwiper>
            </div>
          ) : (
            <div
              css={css`
                height: 440px;
              `}
            ></div>
          )}
        </motion.div>
      </RankingContainer>
    </>
  );
}

const RankingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const RankingTitle = styled.div`
  align-items: center;
  ${theme.fonts.s20_w500}
  color: ${theme.color.gray.w800};
  cursor: pointer;
  width: auto;
  display: inline-block;
`;

const RankingStockWrapper = styled.div`
  padding: 0 0;
  background-color: ${theme.color.gray.white};
  border-radius: 32px;
  width: 100%;
`;

const RankingStockItemWrapper = styled(Button)`
  display: flex;
  align-items: center;
  width: 100%;
  /* border-radius: 32px; */
  justify-content: space-between;
  padding: ${theme.metrics.m6} ${theme.metrics.m6};
  border-bottom: 1px solid ${theme.color.gray.w200};
  cursor: pointer;
`;

const RankingStockItemNumber = styled.div`
  font-size: 3rem;
  font-weight: 200;
  line-height: 30px;
  min-width: 17px;
  color: ${theme.color.gray.w800};
`;
const RankingStockItemNameWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const RankingStockItemName = styled.div`
  ${theme.fonts.s16_w700}
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: ${theme.color.gray.w900};
`;

const RankingStockItemPriceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: ${theme.metrics.m2};
`;
const RankingStockItemPrice = styled.div`
  ${theme.fonts.s16_w700}
  color: ${theme.color.gray.w900};
  margin-bottom: ${theme.metrics.m2}; ;
`;

const RankingStockItemRatio = styled.div`
  ${theme.fonts.s12_w400}
  color: ${theme.color.chart.up};
`;
