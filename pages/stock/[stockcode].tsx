/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { apiServer } from '../../lib/api';
import TabsNav from '../../components/nav/tabs';
import styles from '../../styles/Home.module.css';
import FeedCard from '../../components/card/feed';
import StockInfoCard from '../../components/card/stockInfo';
import AskingPriceCard from '../../components/card/askingPrice';
import { StockDetailServerSideProps } from '../../commons/types';
import SubMainContainer from '../../components/container/subMain';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import StockComponyInfoCard from '../../components/card/stockComponyInfo';
import StockInvestmentInfoCard from '../../components/card/stockInvestment';
import StockInvestmentOpinionCard from '../../components/card/stockInvestmentOpinion';
import StockLayout from '../../components/layout/stock';
import { ReactElement } from 'react';
import StockDetailChart from '../../components/chart/stockDetail';
import Custom404 from '../404';
import FloatingActionButton from '../../components/button/fab';

const Tabs = ['기업정보', '투자정보', 'AI의견', '회사소식', '피드'];

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const stockcode = query.stockcode;

  let resultStockInvestment;

  try {
    const { data, status } = await apiServer.get(`/stock/${stockcode}/info`);
    if (status === 200) {
      resultStockInvestment = data;
    }
  } catch (e) {
    resultStockInvestment = {};
  }

  // Pass stockData to the page via props
  return {
    props: {
      stockInfo: resultStockInvestment,
    },
  };
};

export default function Stock(props: StockDetailServerSideProps) {
  const router = useRouter();
  const { stockInfo } = props;
  const stockcode: string = typeof router.query.stockcode === 'string' ? router.query.stockcode : '';
  if (!stockInfo?.stockname) {
    return <Custom404></Custom404>;
  }
  return (
    <>
      <SubMainContainer>
        <div
          css={css`
            background-color: #ffffff;
            margin: 0;
            -webkit-touch-callout: none; /* Safari */
            -webkit-user-select: none; /* Chrome */
            -moz-user-select: none; /* Firefox */
            -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none;
          `}
        >
          <StockDetailChart stockcode={stockcode} stockInfo={stockInfo} />
          <AskingPriceCard></AskingPriceCard>
        </div>
        <TabsNav Tabs={Tabs} initValue="기업정보" />
        <StockInfoCard stockInfo={stockInfo}></StockInfoCard>
        <StockInvestmentInfoCard stockInfo={stockInfo} />
        <StockInvestmentOpinionCard />
        <StockComponyInfoCard />
        <FeedCard />
      </SubMainContainer>
      <FloatingActionButton />
      {/* Footer 영역 */}
      <footer className={styles.footer}></footer>
    </>
  );
}

Stock.getLayout = function getLayout(page: ReactElement) {
  const stockname = page.props.stockInfo.stockname;
  return <StockLayout stockName={stockname}>{page}</StockLayout>;
};
