import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect } from 'react';
import SubMainContainer from '../../../components/container/subMain';
import TitleLayout from '../../../components/layout/title';
import SimilarNewsList from '../../../components/list/similarNews';
import PriceContext from '../../../contexts/price';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/hooks';
import { fetchNews } from '../../../lib/redux/news';
import { fetchStockTodayPrice } from '../../../lib/redux/stocks';

export default function SimilarNews() {
  const router = useRouter();
  const { newsid } = router.query;
  const dispatch = useAppDispatch();
  const { similarNews, news, loading: newsLoading } = useAppSelector((state) => state.news);
  const { registRealtimePrice } = useContext(PriceContext);
  useEffect(() => {
    if (!news || news.length === 0) {
      dispatch(fetchNews());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [news]);

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

  if (newsid) {
    const newsIdNumber = Number(newsid);
    return (
      <SubMainContainer>
        <SimilarNewsList isRound={false} loading={newsLoading} similarNews={similarNews[newsIdNumber]} />
      </SubMainContainer>
    );
  } else {
    return <></>;
  }
}

SimilarNews.getLayout = function getLayout(page: ReactElement) {
  return (
    <TitleLayout isTitle={true} title="뉴스" isWhite={true}>
      {page}
    </TitleLayout>
  );
};
