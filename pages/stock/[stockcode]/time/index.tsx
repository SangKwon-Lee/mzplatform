import { GetServerSideProps } from 'next';
import { ReactElement } from 'react';
import { StockTimeListSSRProps } from '../../../../commons/types';
import SubMainContainer from '../../../../components/container/subMain';
import TitleLayout from '../../../../components/layout/title';
import StockTimeList from '../../../../components/list/stockTime';
import styles from '../../../../styles/Home.module.css';
import { apiServer } from '../../../../lib/api';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  try {
    if (params && params.stockcode) {
      const dailyData = await apiServer.get(`/price/daily/stock/${params.stockcode}?count=30`);
      const hourlyData = await apiServer.get(`/price/hourly/stock/${params.stockcode}?count=30`);
      if (dailyData.status === 200 && hourlyData.status === 200) {
        return {
          props: {
            data: {
              dailyPriceData: dailyData.data.data,
              dailyContiKey: dailyData.data.strContiKey,
              hourlyPriceData: hourlyData.data.data,
              hourlyContiKey: hourlyData.data.data,
            },
          },
        };
      } else {
        return {
          props: {
            data: {
              dailyPriceData: [],
              hourlyPriceData: [],
              dailyContiKey: '',
              hourlyContiKey: '',
            },
          },
        };
      }
    } else {
      return {
        props: {
          data: {
            dailyPriceData: [],
            hourlyPriceData: [],
            dailyContiKey: '',
            hourlyContiKey: '',
          },
        },
      };
    }
  } catch (e) {
    return {
      props: {
        data: {
          dailyPriceData: [],
          hourlyPriceData: [],
          dailyContiKey: '',
          hourlyContiKey: '',
        },
      },
    };
  }
};

export default function TimeStock(props: StockTimeListSSRProps) {
  const { data } = props;
  const { dailyPriceData, hourlyPriceData } = data;

  return (
    <>
      {/* Header 영역 */}

      <SubMainContainer>
        <StockTimeList dailyPriceData={dailyPriceData} hourlyPriceData={hourlyPriceData} />
      </SubMainContainer>
      {/* Footer 영역 */}
      <footer className={styles.footer}></footer>
    </>
  );
}
TimeStock.getLayout = function getLayout(page: ReactElement) {
  return (
    <TitleLayout isTitle={true} title={'일별/시간별 보기'} isWhite={true}>
      {page}
    </TitleLayout>
  );
};
