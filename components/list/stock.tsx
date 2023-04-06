import Image from 'next/image';
import TagChip from '../chip/tag';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import theme from '../../commons/theme';
import StockImage from '../image/stockImage';
import PriceContext from '../../contexts/price';
import images from '../../commons/theme/images';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import { fetchStockTodayPrice } from '../../lib/redux/stocks';
import { IKeywordStockList, IPriceList, MZMost } from '../../commons/types';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import { priceToString, textColor, imageLoader, cdnStockLogoUrl } from '../../commons/utils';
import NoContentsImage from '../image/noContentsImage';

const stockListAnimationVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

interface StockListProps {
  title?: string;
  MZStockList: MZMost;
  themeStockList: IKeywordStockList;
  rankingStockList: IPriceList[];
  bg?: string;
}

export default function StockList({ title, MZStockList, themeStockList, bg, rankingStockList }: StockListProps) {
  const router = useRouter();
  const { count } = themeStockList;
  const animationControls = useAnimation();
  const dispatch = useAppDispatch();
  const stocks = useAppSelector((state) => state.stocks);
  // @ts-ignore
  const { registRealtimePrice, unregistRealtimePriceAll } = useContext(PriceContext);
  //* 화면에 들어왔을 때 애니메이션 시작
  const ref = useRef(null);
  const isInView = useInView(ref);

  //* 등락률 정렬
  const [sortValue, setSortValue] = useState({
    value: 'ratio',
    sort: true,
  });

  const handleSortValue = (e: any) => {
    if (e === 'ratio') {
      setSortValue({
        ...sortValue,
        value: 'ratio',
        sort: sortValue.value === 'price' ? true : !sortValue.sort,
      });
    } else {
      setSortValue({
        ...sortValue,
        value: 'price',
        sort: sortValue.value === 'ratio' ? true : !sortValue.sort,
      });
    }
  };

  useEffect(() => {
    if (Array.isArray(MZStockList.stocks) && MZStockList.stocks.length > 0) {
      setSortValue({
        value: 'ratio',
        sort: true,
      });
      const fetchedStocks: string[] = [];
      MZStockList.stocks.map((data) => {
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
  }, [MZStockList]);
  useEffect(() => {
    if (Array.isArray(rankingStockList) && rankingStockList.length > 0) {
      setSortValue({
        value: 'ratio',
        sort: true,
      });
      const fetchedStocks: string[] = [];
      rankingStockList.map((data) => {
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
  }, [rankingStockList]);

  useEffect(() => {
    if (Array.isArray(themeStockList.data) && themeStockList.data.length > 0) {
      setSortValue({
        value: 'ratio',
        sort: true,
      });
      const fetchedStocks: string[] = [];
      themeStockList.data.map((data) => {
        if (fetchedStocks.find((item) => item === data.stockCode.replaceAll('A', '')) || !data.stockCode.replaceAll('A', '')) {
          data.stockCode.replaceAll('A', '') ? console.log('Stock code is not found: ', data.stockCode.replaceAll('A', '')) : null;
          return;
        }
        dispatch(fetchStockTodayPrice(data.stockCode.replaceAll('A', '')));
        fetchedStocks.push(data.stockCode.replaceAll('A', ''));
      });
      registRealtimePrice(fetchedStocks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeStockList]);

  useEffect(() => {
    if (isInView) {
      // animationControls.set('hidden');
      animationControls.start('visible');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  useEffect(() => {
    return () => {
      unregistRealtimePriceAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StockListBg
      ref={ref}
      css={css`
        background-color: ${bg ? bg : 'transparent'};
      `}
    >
      <div
        css={css`
          width: 100%;
          background-color: ${theme.color.gray.white};
          padding: ${theme.metrics.m6} 0px;
          border-top-left-radius: 32px;
          min-height: 100vh;
          border-top-right-radius: 32px;
          height: 100%;
        `}
      >
        <StockListTopWrapper>
          <StockListTopItemWrapper>
            {title && count ? (
              <>
                <StockListTopTitle>{title}</StockListTopTitle>
                <StockListTopCount>{count}건</StockListTopCount>
              </>
            ) : (
              <></>
            )}
          </StockListTopItemWrapper>
          <StockListTopItemWrapper>
            <StockListSortTextWrapper onClick={() => handleSortValue('ratio')}>
              <StockListSortText style={{ color: sortValue.value === 'ratio' ? theme.color.primary.purple : theme.color.gray.w700 }}>
                등락률
              </StockListSortText>
              <Image
                alt="sortArrow"
                loader={imageLoader}
                src={
                  sortValue.value === 'ratio' && sortValue.sort
                    ? '/' + images.sortDownArrowColor
                    : sortValue.value === 'ratio' && !sortValue.sort
                    ? images.sortUpArrowColor
                    : '/' + images.sortDownArrow
                }
                width={12}
                loading="lazy"
                height={6}
              />
            </StockListSortTextWrapper>
            <StockListSortTextWrapper onClick={() => handleSortValue('price')}>
              <StockListSortText style={{ color: sortValue.value === 'price' ? theme.color.primary.purple : theme.color.gray.w700 }}>
                시가총액
              </StockListSortText>
              <Image
                alt="sortArrow"
                loader={imageLoader}
                src={
                  sortValue.value === 'price' && sortValue.sort
                    ? '/' + images.sortDownArrowColor
                    : sortValue.value === 'price' && !sortValue.sort
                    ? images.sortUpArrowColor
                    : '/' + images.sortDownArrow
                }
                width={12}
                loading="lazy"
                height={6}
              />
            </StockListSortTextWrapper>
          </StockListTopItemWrapper>
        </StockListTopWrapper>
        <motion.div
          initial={'hidden'}
          variants={stockListAnimationVariants}
          animate={animationControls}
          viewport={{ once: true }}
          transition={{ easings: 'easeIn', duration: 1 }}
        >
          {/* Number((price / jnilclose - 1 * 100).toFixed(2)) */}
          {Array.isArray(rankingStockList) && rankingStockList.length > 0 ? (
            rankingStockList
              .slice()
              .sort((a, b) => {
                if (sortValue.value === 'ratio') {
                  if (sortValue.sort) {
                    return Number(b.price) / Number(b.jnilclose) - 1 * 100 - (Number(a.price) / Number(a.jnilclose) - 1 * 100);
                  } else {
                    return Number(a.price) / Number(a.jnilclose) - 1 * 100 - (Number(b.price) / Number(b.jnilclose) - 1 * 100);
                  }
                } else {
                  if (sortValue.sort) {
                    return Number(b.marketCap) - Number(a.marketCap);
                  } else {
                    return Number(a.marketCap) - Number(b.marketCap);
                  }
                }
              })
              .map((data, index) => (
                <StockItemWrapper key={data.shcode + index}>
                  <StockItemTopWrapper onClick={() => router.push(`/stock/${data.shcode.replaceAll('A', '')} `)}>
                    <StockItemTitleWrapper>
                      <StockImage
                        src={cdnStockLogoUrl(data.shcode.replaceAll('A', ''))}
                        width={24}
                        style={{
                          maxWidth: 24,
                          maxHeight: 24,
                          borderRadius: '50%',
                          marginRight: theme.metrics.m2,
                        }}
                        height={24}
                        alt={data.shcode.replaceAll('A', '')}
                        loader={imageLoader}
                      />
                      <StockItemName>{data.hname}</StockItemName>
                    </StockItemTitleWrapper>
                    <StockItemPriceWrapper>
                      <StockItemPriceRatioWrapper>
                        {stocks[data.shcode.replaceAll('A', '')] && stocks[data.shcode.replaceAll('A', '')].price ? (
                          <StockItemPrice>{priceToString(stocks[data.shcode.replaceAll('A', '')].price)}</StockItemPrice>
                        ) : (
                          <StockItemPrice></StockItemPrice>
                        )}

                        <StockItemPercentWrapper>
                          {stocks[data.shcode.replaceAll('A', '')] && stocks[data.shcode.replaceAll('A', '')].diff ? (
                            <StockItemRatio style={{ color: textColor(stocks[data.shcode.replaceAll('A', '')].diff) }}>
                              <Image
                                loader={imageLoader}
                                src={
                                  Number(stocks[data.shcode.replaceAll('A', '')].diff) >= 0
                                    ? '/' + images.chartUpTriangle
                                    : '/' + images.chartDownTriangle
                                }
                                alt="chartUp"
                                width={10}
                                height={8}
                                style={{ marginRight: '8px' }}
                              />
                              {priceToString(stocks[data.shcode.replaceAll('A', '')].diff)}
                            </StockItemRatio>
                          ) : (
                            <StockItemRatio></StockItemRatio>
                          )}
                          {stocks[data.shcode.replaceAll('A', '')] && stocks[data.shcode.replaceAll('A', '')].ratio ? (
                            <StockItemPercent style={{ color: textColor(stocks[data.shcode.replaceAll('A', '')].ratio) }}>
                              {stocks[data.shcode.replaceAll('A', '')].ratio.toFixed(2)}%
                            </StockItemPercent>
                          ) : (
                            <StockItemPercent></StockItemPercent>
                          )}
                        </StockItemPercentWrapper>
                      </StockItemPriceRatioWrapper>
                    </StockItemPriceWrapper>
                  </StockItemTopWrapper>
                  <StockItemTagWrapper>
                    {Array.isArray(data.keywordList) && data.keywordList.length > 0 && <TagChip size={12} Tags={data.keywordList} />}
                  </StockItemTagWrapper>
                </StockItemWrapper>
              ))
          ) : (
            <div></div>
          )}

          {Array.isArray(themeStockList.data) && themeStockList.data.length > 0 ? (
            themeStockList.data
              .slice()
              .sort((a, b) => {
                if (sortValue.value === 'ratio' && stocks[b.stockCode.replaceAll('A', '')] && stocks[a.stockCode.replaceAll('A', '')]) {
                  if (sortValue.sort) {
                    return stocks[b.stockCode.replaceAll('A', '')].ratio - stocks[a.stockCode.replaceAll('A', '')].ratio;
                  } else {
                    return stocks[a.stockCode.replaceAll('A', '')].ratio - stocks[b.stockCode.replaceAll('A', '')].ratio;
                  }
                } else {
                  if (sortValue.sort) {
                    return Number(b.marketCap) - Number(a.marketCap);
                  } else {
                    return Number(a.marketCap) - Number(b.marketCap);
                  }
                }
              })
              .map((data, index) => (
                <StockItemWrapper key={data.stockCode.replaceAll('A', '') + index}>
                  <StockItemTopWrapper onClick={() => router.push(`/stock/${data.stockCode.replaceAll('A', '')} `)}>
                    <StockItemTitleWrapper>
                      <StockImage
                        src={cdnStockLogoUrl(data.stockCode.replaceAll('A', ''))}
                        width={24}
                        style={{
                          maxWidth: 24,
                          maxHeight: 24,
                          borderRadius: '50%',
                          marginRight: theme.metrics.m2,
                        }}
                        height={24}
                        alt={data.stockCode.replaceAll('A', '')}
                        loader={imageLoader}
                      />
                      <StockItemName>{data.name}</StockItemName>
                    </StockItemTitleWrapper>
                    <StockItemPriceWrapper>
                      <StockItemPriceRatioWrapper>
                        {stocks[data.stockCode.replaceAll('A', '')] && stocks[data.stockCode.replaceAll('A', '')].price ? (
                          <StockItemPrice>{priceToString(stocks[data.stockCode.replaceAll('A', '')].price)}</StockItemPrice>
                        ) : (
                          <StockItemPrice>0</StockItemPrice>
                        )}

                        <StockItemPercentWrapper>
                          {stocks[data.stockCode.replaceAll('A', '')] && stocks[data.stockCode.replaceAll('A', '')].diff ? (
                            <StockItemRatio style={{ color: textColor(stocks[data.stockCode.replaceAll('A', '')].diff) }}>
                              <Image
                                loader={imageLoader}
                                src={
                                  Number(stocks[data.stockCode.replaceAll('A', '')].diff) >= 0
                                    ? '/' + images.chartUpTriangle
                                    : '/' + images.chartDownTriangle
                                }
                                alt="chartUp"
                                width={10}
                                height={8}
                                style={{ marginRight: '8px' }}
                              />
                              {priceToString(stocks[data.stockCode.replaceAll('A', '')].diff)}
                            </StockItemRatio>
                          ) : (
                            <StockItemRatio>0</StockItemRatio>
                          )}
                          {stocks[data.stockCode.replaceAll('A', '')] && stocks[data.stockCode.replaceAll('A', '')].ratio ? (
                            <StockItemPercent style={{ color: textColor(stocks[data.stockCode.replaceAll('A', '')].ratio) }}>
                              {stocks[data.stockCode.replaceAll('A', '')].ratio.toFixed(2)}%
                            </StockItemPercent>
                          ) : (
                            <StockItemPercent>0%</StockItemPercent>
                          )}
                        </StockItemPercentWrapper>
                      </StockItemPriceRatioWrapper>
                    </StockItemPriceWrapper>
                  </StockItemTopWrapper>
                  <StockItemTagWrapper>
                    {Array.isArray(data.keywordList) && data.keywordList.length > 0 && <TagChip size={12} Tags={data.keywordList} />}
                  </StockItemTagWrapper>
                </StockItemWrapper>
              ))
          ) : (
            <div></div>
          )}

          {Array.isArray(MZStockList.stocks) && MZStockList.stocks.length > 0 ? (
            MZStockList.stocks
              .sort((a, b) => {
                if (sortValue.value === 'ratio' && stocks[b.stockcode] && stocks[a.stockcode]) {
                  if (sortValue.sort) {
                    return stocks[b.stockcode].ratio - stocks[a.stockcode].ratio;
                  } else {
                    return stocks[a.stockcode].ratio - stocks[b.stockcode].ratio;
                  }
                } else {
                  if (sortValue.sort) {
                    return Number(b.marketCap) - Number(a.marketCap);
                  } else {
                    return Number(a.marketCap) - Number(b.marketCap);
                  }
                }
              })
              .map((data, index) => (
                <StockItemWrapper key={data.stockcode + index}>
                  <StockItemTopWrapper onClick={() => router.push(`/stock/${data.stockcode.replaceAll('A', '')}`)}>
                    <StockItemTitleWrapper>
                      <StockImage
                        src={cdnStockLogoUrl(data.stockcode)}
                        width={24}
                        style={{
                          maxWidth: 24,
                          maxHeight: 24,
                          borderRadius: '50%',
                          marginRight: theme.metrics.m2,
                        }}
                        height={24}
                        alt={data.stockcode}
                        loader={imageLoader}
                      />
                      <StockItemName>{data.stockname}</StockItemName>
                    </StockItemTitleWrapper>
                    <StockItemPriceWrapper>
                      <StockItemPriceRatioWrapper>
                        {stocks[data.stockcode.replaceAll('A', '')] && stocks[data.stockcode.replaceAll('A', '')].price ? (
                          <StockItemPrice>{priceToString(stocks[data.stockcode.replaceAll('A', '')].price)}</StockItemPrice>
                        ) : (
                          <StockItemPrice>0</StockItemPrice>
                        )}

                        <StockItemPercentWrapper>
                          {stocks[data.stockcode.replaceAll('A', '')] && stocks[data.stockcode.replaceAll('A', '')].diff ? (
                            <StockItemRatio style={{ color: textColor(stocks[data.stockcode.replaceAll('A', '')].diff) }}>
                              <Image
                                loader={imageLoader}
                                src={
                                  Number(stocks[data.stockcode.replaceAll('A', '')].diff) >= 0
                                    ? '/' + images.chartUpTriangle
                                    : '/' + images.chartDownTriangle
                                }
                                alt="chartUp"
                                width={10}
                                height={8}
                                style={{ marginRight: '8px' }}
                              />
                              {priceToString(stocks[data.stockcode.replaceAll('A', '')].diff)}
                            </StockItemRatio>
                          ) : (
                            <StockItemRatio>0</StockItemRatio>
                          )}
                          {stocks[data.stockcode.replaceAll('A', '')] && stocks[data.stockcode.replaceAll('A', '')].ratio ? (
                            <StockItemPercent style={{ color: textColor(stocks[data.stockcode.replaceAll('A', '')].ratio) }}>
                              {stocks[data.stockcode.replaceAll('A', '')].ratio.toFixed(2)}%
                            </StockItemPercent>
                          ) : (
                            <StockItemPercent>0%</StockItemPercent>
                          )}
                        </StockItemPercentWrapper>
                      </StockItemPriceRatioWrapper>
                    </StockItemPriceWrapper>
                  </StockItemTopWrapper>
                  <StockItemTagWrapper>
                    {Array.isArray(data.keywordList) && data.keywordList.length > 0 && <TagChip size={12} Tags={data.keywordList} />}
                  </StockItemTagWrapper>
                </StockItemWrapper>
              ))
          ) : (
            <></>
          )}
          {Array.isArray(themeStockList?.data) &&
            Array.isArray(rankingStockList) &&
            Array.isArray(MZStockList?.stocks) &&
            themeStockList.data.length === 0 &&
            MZStockList.stocks.length === 0 &&
            rankingStockList.length === 0 && <NoContentsImage text="종목이 없습니다" />}
        </motion.div>
      </div>
    </StockListBg>
  );
}

const StockListBg = styled.div``;

const StockListTopWrapper = styled.div`
  display: flex;
  padding: 0px ${theme.metrics.m4};
  justify-content: space-between;
`;

const StockListTopItemWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${theme.metrics.m4};
`;

const StockListTopTitle = styled.div`
  color: ${theme.color.gray.w800};
  ${theme.fonts.s16_w700};
`;

const StockListTopCount = styled.div`
  color: ${theme.color.primary.purple};
  ${theme.fonts.s12_w400};
  margin-left: ${theme.metrics.m2};
`;

const StockListSortTextWrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  margin-left: ${theme.metrics.m6};
`;

const StockListSortText = styled.div`
  ${theme.fonts.s14_w400};
  color: ${theme.color.gray.w700};
  margin-right: ${theme.metrics.m2};
`;

const StockItemWrapper = styled.div`
  padding: ${theme.metrics.m6} 0px;
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${theme.color.gray.w200};
`;

const StockItemTopWrapper = styled.div`
  padding: 0px ${theme.metrics.m4};
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  cursor: pointer;
`;

const StockItemTitleWrapper = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
`;

const StockItemPriceWrapper = styled.div`
  display: flex;
`;

const StockItemImage = styled.img`
  min-width: 24px;
  min-height: 24px;
  background-color: ${theme.color.chart.up};
  border-radius: 50%;
  margin-right: ${theme.metrics.m2};
`;

const StockItemName = styled.div`
  ${theme.fonts.s16_w700};
  color: ${theme.color.gray.w900};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* max-width: 102px; */
`;

const StockItemPriceRatioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const StockItemPrice = styled.div`
  ${theme.fonts.s16_w700};
  color: ${theme.color.gray.w900};
  height: 24px;
  display: flex;
  align-items: center;
`;

const StockItemPercentWrapper = styled.div`
  display: flex;
  margin-top: ${theme.metrics.m2};
  height: 14px;
`;
const StockItemRatio = styled.div`
  ${theme.fonts.s14_w400};
  color: ${theme.color.chart.up};
  margin-right: ${theme.metrics.m2};
  font-weight: 500;
  display: flex;
  align-items: center;
`;

const StockItemPercent = styled.div`
  ${theme.fonts.s14_w500};
  color: ${theme.color.chart.up};
  font-weight: 500;
  min-width: 48px;
  text-align: right;
`;

const StockItemTotal = styled.div`
  ${theme.fonts.s16_w700};
  color: ${theme.color.gray.w900};
  margin-left: ${theme.metrics.m4};
  height: 24px;
  display: flex;
  align-items: center;
`;

const StockItemTagWrapper = styled.div`
  display: flex;
  /* width: 100%; */
  z-index: 1;
  overflow: scroll;
  flex-wrap: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  white-space: nowrap;
  /* padding-left: ${theme.metrics.m4}; */
  /* margin-left: ${'-' + theme.metrics.m4}; */
`;

const StockItemTag = styled.button`
  cursor: auto;
  border-radius: 8px;
  border: 1px solid ${theme.color.secondary.blue03};
  background-color: ${theme.color.secondary.blue04};
  padding: 6px ${theme.metrics.m2};
  color: ${theme.color.secondary.blue01};
  ${theme.fonts.s12_w500};
  margin-right: ${theme.metrics.m1};
`;
