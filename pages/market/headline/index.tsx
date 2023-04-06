/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { ReactElement, useContext, useEffect } from 'react';
import TitleLayout from '../../../components/layout/title';
import HeadlineNewsList from '../../../components/list/headline-news';
import NewsList from '../../../components/list/news';
import PriceContext from '../../../contexts/price';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/hooks';
import { fetchStockTodayPrice } from '../../../lib/redux/stocks';

const Wrapper = css`
  display: flex;
  flex-direction: column;
  max-width: 600px;
  width: 100%;
`;

export default function MarketHeadline() {
  const dispatch = useAppDispatch();
  const { news, loading: newsLoading } = useAppSelector((state) => state.news);
  const { fetchIndicesPrice, connected, registRealtimePrice, unregistRealtimePriceAll } = useContext(PriceContext);

  useEffect(() => {
    if (news && news.length > 0) {
      const fetchedStocks: string[] = [];
      news.forEach((news) => {
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

  return (
    <>
      <div css={Wrapper}>
        <div>
          <HeadlineNewsList />
        </div>
        <NewsList isRound={false} news={news.slice(3, 8)} loading={newsLoading} />
      </div>
    </>
  );
}
MarketHeadline.getLayout = function getLayout(page: ReactElement) {
  return (
    <TitleLayout isTitle={true} title={'새로 나온 뉴스'} isWhite={true}>
      {page}
    </TitleLayout>
  );
};
