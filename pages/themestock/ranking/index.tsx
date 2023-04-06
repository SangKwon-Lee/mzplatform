import StockList from '../../../components/list/stock';
import { fetchPriceList } from '../../../lib/redux/price';
import { ReactElement, useEffect, useState } from 'react';
import TitleLayout from '../../../components/layout/title';
import SubMainContainer from '../../../components/container/subMain';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/hooks';
import RandomNavThemestock from '../../../components/list/ranking/randomproverbs';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { apiServer } from '../../../lib/api';
import { IPriceList } from '../../../commons/types';
import { useRouter } from 'next/router';

const btnArr = [
  { value: 'trade', text: '거래량' },
  { value: 'inc', text: '상승률' },
  { value: 'dec', text: '하락률' },
  { value: 'cap', text: '시가총액' },
];

interface Props {
  data: IPriceList[];
}
export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  // Fetch data from external API
  const { query } = context;
  let value = 'trade';
  if (query.value) {
    value = String(query.value);
  }
  let resultStockList;
  try {
    const { data, status } = await apiServer.get(`/price/list?tp=all&gbn=${value}&cnt=${20}`);
    if (status === 200) {
      resultStockList = data;
    }
  } catch (e) {
    resultStockList = [];
  }
  // Pass data to the page via props
  return {
    props: {
      data: resultStockList,
    },
  };
};

export default function RankingThemeStock(props: Props) {
  const { data } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { priceList } = useAppSelector((state) => state.price);
  const [btnValue, setBtnValue] = useState((router.query?.value as string) || 'trade');
  const [bg, setBg] = useState('');

  const handleBtnValue = (value: string) => {
    setBtnValue(value);
  };

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchPriceList({ limit: 20, gbn: btnValue }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [btnValue]);

  useEffect(() => {
    if (router.query?.value) {
      setBtnValue(String(router.query?.value));
    }
  }, [router.query]);

  return (
    <>
      {/* Header 영역 */}
      <SubMainContainer>
        <RandomNavThemestock setBg={setBg} btnArr={btnArr} btnValue={btnValue} handelBtnValue={handleBtnValue} />
        {Array.isArray(priceList) && Array.isArray(data) && (
          <StockList
            bg={bg}
            rankingStockList={priceList.length === 0 ? data : priceList}
            MZStockList={{ fromDate: '', count: 0, stocks: [] }}
            themeStockList={{ count: 0, data: [] }}
          />
        )}
      </SubMainContainer>
      {/* Footer 영역 */}
      {/* <footer className={styles.footer}></footer> */}
    </>
  );
}

RankingThemeStock.getLayout = function getLayout(page: ReactElement) {
  return (
    <TitleLayout isTitle={true} title={'종목 상위 순위'} isWhite={true}>
      {page}
    </TitleLayout>
  );
};
