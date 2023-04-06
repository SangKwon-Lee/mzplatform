import { ReactElement } from 'react';
import { apiServer } from '../../../../lib/api';
import styles from '../../../../styles/Home.module.css';
import { IStockInfoProps } from '../../../../commons/types';
import TitleLayout from '../../../../components/layout/title';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import StockDetailCard from '../../../../components/card/stockDetail';
import SubMainContainer from '../../../../components/container/subMain';
import NoContentsImage from '../../../../components/image/noContentsImage';
import StockDetailChartCard from '../../../../components/card/stockDetailChart';
import StockDetailDonutCard from '../../../../components/card/stockDetailDonut';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const stockcode = query.stockcode;
  let resultStockInfo;
  try {
    const { data, status } = await apiServer.get(`/stock/${stockcode}/detail`);
    if (status === 200) {
      resultStockInfo = data;
    }
  } catch (e) {
    resultStockInfo = {};
  }

  // Pass data to the page via props
  return {
    props: {
      data: {
        stockInfo: resultStockInfo,
      },
    },
  };
};

export default function InfoStock(props: IStockInfoProps) {
  const { data } = props;
  const { stockInfo } = data;
  return (
    <>
      {/* Header 영역 */}
      <SubMainContainer>
        {stockInfo.stockInfo?.code ? <StockDetailCard stockDetail={stockInfo} /> : <NoContentsImage text="종목 정보가 없어요." />}
        {Array.isArray(stockInfo?.finance?.salesYearly) && stockInfo?.finance?.salesYearly.length > 0 && (
          <StockDetailChartCard isYear={true} title="매출액" lineLabel="증가율" barLabel="연간 매출액" stockInfo={stockInfo} />
        )}
        {Array.isArray(stockInfo?.products) && stockInfo.products.length > 0 && (
          <StockDetailDonutCard title="매출액 비중" products={stockInfo?.products} />
        )}
        {Array.isArray(stockInfo?.finance?.operatingProfitYearly) && stockInfo?.finance?.salesYearly.length > 0 && (
          <StockDetailChartCard title="영업이익" lineLabel="증가율" barLabel="연간 영업이익" stockInfo={stockInfo} isYear={true} />
        )}
        {Array.isArray(stockInfo?.finance?.operatingProfitQuarterly) && stockInfo?.finance.salesYearly.length > 0 && (
          <StockDetailChartCard title="분기 영업이익" lineLabel="증가율" barLabel="분기 영업이익" stockInfo={stockInfo} isYear={false} />
        )}
      </SubMainContainer>
      {/* Footer 영역 */}
      <footer className={styles.footer}></footer>
    </>
  );
}

InfoStock.getLayout = function getLayout(page: ReactElement) {
  return (
    <TitleLayout isTitle={true} title={'기업정보'} isWhite={true}>
      {page}
    </TitleLayout>
  );
};
