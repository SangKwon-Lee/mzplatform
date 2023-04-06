import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ReactElement } from 'react';
import { StockNewsServerSideProps } from '../../../../commons/types';
import SubMainContainer from '../../../../components/container/subMain';
import TitleLayout from '../../../../components/layout/title';
import StockNewsList from '../../../../components/list/stock-news';
import { apiServer } from '../../../../lib/api';
import styles from '../../../../styles/Home.module.css';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const stockcode = query.stockcode;
  let resultStockNews;
  try {
    const { data, status } = await apiServer.get(`/stock/${stockcode}/news?limit=30`);
    if (status === 200) {
      resultStockNews = data;
    }
  } catch (e) {
    resultStockNews = [];
  }
  // Pass data to the page via props
  return {
    props: {
      data: {
        stockNews: resultStockNews,
      },
    },
  };
};

export default function NewsStock(props: StockNewsServerSideProps) {
  const { data } = props;
  const { stockNews } = data;
  return (
    <>
      {/* Header 영역 */}
      <SubMainContainer>
        <StockNewsList stockNews={stockNews} />
      </SubMainContainer>
      {/* Footer 영역 */}
      <footer className={styles.footer}></footer>
    </>
  );
}

NewsStock.getLayout = function getLayout(page: ReactElement) {
  return (
    <TitleLayout isTitle={true} title={'회사소식'} isWhite={true}>
      {page}
    </TitleLayout>
  );
};
