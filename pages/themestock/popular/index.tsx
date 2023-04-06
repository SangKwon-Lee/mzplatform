import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import theme from '../../../commons/theme';
import { IStockPopular } from '../../../commons/types';
import SubMainContainer from '../../../components/container/subMain';
import TitleLayout from '../../../components/layout/title';
import StockList from '../../../components/list/stock';
import RankingMainThemestock from '../../../components/nav/ranking/rankingnav';
import { apiServer } from '../../../lib/api';

export const getServerSideProps: GetServerSideProps = async () => {
  // Fetch data from external API
  let resultStockList;
  try {
    const { data, status } = await apiServer.get(`/analytics/mzHotStocks?inKey=Y`);
    if (status === 200) {
      resultStockList = data;
    }
  } catch (e) {
    resultStockList = {
      fromDate: '',
      count: 0,
      stocks: [],
    };
  }
  // Pass data to the page via props
  return {
    props: {
      data: resultStockList,
    },
  };
};

export default function PopularThemeStock(props: IStockPopular) {
  const { data } = props;
  return (
    <>
      {/* Header 영역 */}
      <SubMainContainer>
        <RankingMainThemestock />
        <StockList bg={theme.color.primary.purple} themeStockList={{ count: 0, data: [] }} rankingStockList={[]} MZStockList={data} />
      </SubMainContainer>
      {/* Footer 영역 */}
      {/* <footer className={styles.footer}></footer> */}
    </>
  );
}

PopularThemeStock.getLayout = function getLayout(page: ReactElement) {
  return (
    <TitleLayout isTitle={true} title={'MZ인기 랭킹'} isWhite={true}>
      {page}
    </TitleLayout>
  );
};
