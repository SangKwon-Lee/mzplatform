import styled from '@emotion/styled';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ReactElement } from 'react';
import theme from '../../../commons/theme';
import { StockListServerSideProps } from '../../../commons/types';
import FloatingActionButton from '../../../components/button/fab';
import KeywordDescription from '../../../components/card/keywordDescription';
import KeywordDetail from '../../../components/card/keywordDetail';
import SubMainContainer from '../../../components/container/subMain';
import KeywordLayout from '../../../components/layout/keyword';
import StockList from '../../../components/list/stock';
import { apiServer } from '../../../lib/api';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const keyword = query.keyword;
  let resultStockList;
  let resultKeyword;

  try {
    const { data, status } = await apiServer.get(`/search/stock/${keyword}`);
    if (status === 200) {
      resultStockList = data;
    }
  } catch (e) {
    resultStockList = { count: 0, data: [] };
    // Pass data to the page via props
  }

  try {
    const { data, status } = await apiServer.get(`/keywords/${keyword}`);
    if (status === 200) {
      resultKeyword = data;
    }
  } catch (e) {
    resultStockList = { count: 0, data: [] };
    resultKeyword = {
      name: '',
      avgRatio: 0,
      avgPrice: 0,
      summary: '',
      description: '',
      stocks: [
        {
          code: '',
          name: '',
          price: 0,
          diff: 0,
          ratio: 0,
          open: 0,
          high: 0,
          low: 0,
        },
      ],
    };
  }

  return {
    props: {
      data: {
        stockList: resultStockList,
        keyword: resultKeyword,
      },
    },
  };
};

export default function KeywordThemeStock(props: StockListServerSideProps) {
  const { data } = props;
  return (
    <>
      {/* <div style={{ width: "100%" }}> */}
      {/* Header 영역 */}
      <SubMainContainer>
        <KeywordDetail keyword={data?.keyword} />
        <KeywordDescription keyword={data?.keyword} />
        <StockList
          bg="tranparent"
          title="관련종목"
          rankingStockList={[]}
          MZStockList={{ fromDate: '', count: 0, stocks: [] }}
          themeStockList={data?.stockList}
        />{' '}
        <FloatingActionButton />
      </SubMainContainer>
      {/* Footer 영역 */}
      {/* <footer className={styles.footer}></footer> */}
      {/* </div> */}
    </>
  );
}

const KeywordTextWrapper = styled.div`
  width: 100%;
  padding: 16px;
  margin-bottom: 16px;
`;

const KeywordTextTitle = styled.div`
  ${theme.fonts.s20_w700};
  color: ${theme.color.gray.w800};
  margin-bottom: 24px;
  word-break: keep-all;
  line-height: 3rem;
`;

const KeywordTextSub = styled.div`
  ${theme.fonts.s16_w400};
  word-break: keep-all;
  color: ${theme.color.gray.w800};
  line-height: 2.6rem;
`;

KeywordThemeStock.getLayout = function getLayout(page: ReactElement) {
  return <KeywordLayout>{page}</KeywordLayout>;
};
