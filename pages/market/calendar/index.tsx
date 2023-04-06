/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import InvestmentCalendar from '../../../components/calendar/investment';
import { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../lib/redux/hooks';
import { fetchMonthlySchedules } from '../../../lib/redux/schedules';
import PriceContext from '../../../contexts/price';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import theme from '../../../commons/theme';
import { SchedulesByMonth } from '../../../lib/redux/schedules';
import TitleLayout from '../../../components/layout/title';
import { fetchStockTodayPrice } from '../../../lib/redux/stocks';
import SubMainContainer from '../../../components/container/subMain';
import { GetServerSideProps } from 'next';
import store from '../../../lib/redux/store';
import { apiServer } from '../../../lib/api';
import { ISchedule, MarketServerSideProps } from '../../../commons/types';

dayjs.extend(isBetween);

export const getServerSideProps: GetServerSideProps = async () => {
  let resultScheduleList;
  let resultMultipleScheduleList: SchedulesByMonth = {};

  if (
    store.getState().schedules.schedules &&
    Array.isArray(store.getState().schedules.schedules) &&
    store.getState().schedules.schedules.length > 0
  ) {
    resultScheduleList = store.getState().schedules.schedules;
    resultMultipleScheduleList[dayjs().format('YYYY.MM')] = store.getState().schedules.schedules;
  } else {
    try {
      const startDate = dayjs().startOf('month').format('YYYYMMDD');
      const endDate = dayjs().endOf('month').format('YYYYMMDD');
      const { data, status } = await apiServer.get(`/schedules?_sort=startDate:desc&_startDate=${startDate}&_endDate=${endDate}&_limit=${200}`);
      if (status === 200) {
        resultScheduleList = data;
        resultMultipleScheduleList[dayjs().format('YYYY.MM')] = data;
      }
    } catch (e) {
      resultScheduleList = [];
      resultMultipleScheduleList = {};
    }
  }
  return {
    props: {
      data: {
        scheduleData: resultScheduleList,
        multipleScheduleData: resultMultipleScheduleList,
      },
    },
  };
};

export default function MarketCalendar(props: MarketServerSideProps) {
  const dispatch = useAppDispatch();
  const { schedules } = useAppSelector((state) => state.schedules);
  const container = useRef<null | HTMLInputElement>(null);
  const { fetchIndicesPrice, connected, registRealtimePrice, unregistRealtimePriceAll } = useContext(PriceContext);
  const [viewWidth, setViewWidth] = useState(0);
  const [date, setDate] = useState(dayjs().format('YYYY.MM.DD'));

  //* SSR로 가져온 데이터를 클라이언트에서 따로 관리해야 하기 때문에 state에 따로 저장해서 관리해준다.
  const [multipleSchedules, setMultipleSchedules] = useState(props.data.multipleScheduleData);
  const [schedule, setSchedule] = useState(props.data.scheduleData);
  const handleScheduleAdd = (date: string, data: ISchedule[]) => {
    let original = { ...multipleSchedules };
    original[date] = data;
    setMultipleSchedules(original);
  };

  const handleScheduleChange = (data: ISchedule[]) => {
    setSchedule(data);
  };

  const changeDate = (value: string) => {
    setDate(value);
  };

  useEffect(() => {
    if (schedule && schedule.length > 0) {
      const fetchedStocks: string[] = [];
      schedule.forEach((schedule) => {
        if (schedule.stocks && schedule.stocks.length > 0) {
          schedule.stocks.forEach((stock) => {
            if (fetchedStocks.find((item) => item === stock.code) || !stock.code) {
              !stock.code ? console.log('Stock code is not found: ', stock) : null;
              return;
            }
            dispatch(fetchStockTodayPrice(stock.code));
            fetchedStocks.push(stock.code);
          });
        }
      });
      registRealtimePrice(fetchedStocks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedules]);

  useEffect(() => {
    dispatch(fetchMonthlySchedules(dayjs().format('YYYY.MM.DD')));
    return () => {
      unregistRealtimePriceAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (container.current) {
      setViewWidth(container.current.offsetWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container.current]);

  return (
    <>
      <SubMainContainer>
        <InvestmentCalendar
          viewWidth={viewWidth}
          schedule={schedule}
          multipleSchedules={multipleSchedules}
          handleScheduleAdd={handleScheduleAdd}
          handleScheduleChange={handleScheduleChange}
        />
        <div
          ref={container}
          css={css`
            width: 100%;
            min-width: 360px;
            max-width: 600px;
            padding: 0 ${theme.metrics.m4};
          `}
        ></div>
      </SubMainContainer>
    </>
  );
}
MarketCalendar.getLayout = function getLayout(page: ReactElement) {
  return (
    <TitleLayout isTitle={true} title={'투자 캘린더'} isWhite={true}>
      {page}
    </TitleLayout>
  );
};
