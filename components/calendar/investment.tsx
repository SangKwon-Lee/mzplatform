/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import Image from 'next/image';
import dayjs from 'dayjs';
import theme from '../../commons/theme';
import React, { ReactNode, Touch, useContext, useEffect, useState } from 'react';
import { ISchedule } from '../../commons/types';
import { css } from '@emotion/react';
import ScheduleInfoList from '../list/scheduleInfo';
import isBetween from 'dayjs/plugin/isBetween';
import { imageLoader } from '../../commons/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import { fetchMonthlySchedules, SchedulesByMonth } from '../../lib/redux/schedules';
import PriceContext from '../../contexts/price';
import { apiServer } from '../../lib/api';
import { Resizable } from 're-resizable';
import { relative } from 'node:path/win32';

dayjs.extend(isBetween);

const Wrapper = styled.div<{ height: number }>`
  display: flex;
  flex-direction: column;
  padding: ${theme.metrics.m4} ${theme.metrics.m4} ${theme.metrics.m4} ${theme.metrics.m4};
  border-radius: 0 0 ${theme.metrics.m8} ${theme.metrics.m8};
  background-color: ${theme.color.gray.white};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  min-width: 360px;
  max-width: 600px;
  height: ${(props) => props.height}px;
  /* resize: vertical; */
`;

const YearMonth = styled.span`
  ${theme.fonts.s16_w700};
  color: ${theme.color.gray.w900};
  margin: 12.5px 0 14.5px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CalendarDays = styled.div`
  display: flex;
  background-color: ${theme.color.gray.w100};
  justify-content: space-between;
  border-radius: ${theme.metrics.m8};
  padding: 0 12px;
  margin: 0 0 ${theme.metrics.m2} 0;
`;

const CalendarDay = styled.div<{ day: number }>`
  text-align: center;
  color: ${(props) => (props.day === 0 ? theme.color.secondary.pink01 : props.day === 6 ? theme.color.secondary.blue01 : theme.color.gray.w700)};
  font-weight: 700;
  font-size: 14px;
  min-width: 34px;
  min-height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CalendarDates = styled.div`
  display: flex;
  background-color: ${theme.color.gray.white};
  padding: 13px 16px;
  justify-content: space-between;
  border-radius: ${theme.metrics.m8};
  padding: 0 ${theme.metrics.m3};
  align-items: center;
`;

const CalendarDate = styled.div<{
  day: number;
  isToday?: boolean;
  isSelected?: boolean;
  isSameMonth?: boolean;
}>`
  text-align: center;
  color: ${(props) =>
    props.isSelected
      ? theme.color.gray.white
      : props.isToday
      ? theme.color.primary.purple
      : props.day === 0
      ? theme.color.secondary.pink01
      : props.day === 6
      ? theme.color.secondary.blue01
      : theme.color.gray.w700};
  opacity: ${(props) => (props.isSameMonth ? 1 : 0.0)};
  pointer-events: ${(props) => !props.isSameMonth && 'none'};
  font-weight: 700;
  font-size: 14px;
  background-color: ${(props) => (props.isSelected ? theme.color.primary.purple : theme.color.gray.white)};
  border-radius: 50%;
  min-width: 34px;
  min-height: 34px;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const TodayDot = styled.img<{ isToday: boolean; isSelected: boolean }>`
  display: ${(props) =>
    !props.isToday ? 'none' : props.isToday && props.isSelected ? 'display' : props.isToday && !props.isSelected ? 'display' : 'none'} !important;
  filter: ${(props) => !props.isSelected && 'invert(52%) sepia(47%) saturate(5224%) hue-rotate(220deg) brightness(93%) contrast(95%)'};
  position: absolute;
  top: 26px;
  max-height: 4px;
  max-width: 4px;
`;

const ScheduleInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 24px 16px 0 16px;
`;

interface Props {
  multipleSchedules: SchedulesByMonth;
  schedule: ISchedule[];
  viewWidth: number;
  handleScheduleAdd: (date: string, data: ISchedule[]) => void;
  handleScheduleChange: (data: ISchedule[]) => void;
}

export default function InvestmentCalendar({ multipleSchedules, schedule, handleScheduleAdd, handleScheduleChange, viewWidth }: Props) {
  const { fetchIndicesPrice, connected, registRealtimePrice, unregistRealtimePriceAll } = useContext(PriceContext);
  const { schedules } = useAppSelector((state) => state.schedules);

  const weekDays = [
    { key: 0, value: '일' },
    { key: 1, value: '월' },
    { key: 2, value: '화' },
    { key: 3, value: '수' },
    { key: 4, value: '목' },
    { key: 5, value: '금' },
    { key: 6, value: '토' },
  ];
  const [startOfWeek, setStartOfWeek] = useState(dayjs().startOf('week'));
  const [whichMonth, setWhichMonth] = useState(dayjs().month());
  const [isMonthChanged, setIsMonthChanged] = useState(false);
  const weekDates = [
    { key: 0, value: startOfWeek.add(0, 'day') },
    { key: 1, value: startOfWeek.add(1, 'day') },
    { key: 2, value: startOfWeek.add(2, 'day') },
    { key: 3, value: startOfWeek.add(3, 'day') },
    { key: 4, value: startOfWeek.add(4, 'day') },
    { key: 5, value: startOfWeek.add(5, 'day') },
    { key: 6, value: startOfWeek.add(6, 'day') },
  ];
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(dayjs().format('YYYY-MM-DD'));
  const [date, setDate] = useState(dayjs().startOf('month'));
  const [monthView, setMonthView] = useState(false);
  const [startOfMonth, setStartOfMonth] = useState(dayjs().startOf('month'));

  const monthDate = [
    [
      { key: 0, value: startOfMonth.subtract(startOfMonth.day(), 'day') },
      { key: 1, value: startOfMonth.subtract(startOfMonth.day(), 'day').add(1, 'day') },
      { key: 2, value: startOfMonth.subtract(startOfMonth.day(), 'day').add(2, 'day') },
      { key: 3, value: startOfMonth.subtract(startOfMonth.day(), 'day').add(3, 'day') },
      { key: 4, value: startOfMonth.subtract(startOfMonth.day(), 'day').add(4, 'day') },
      { key: 5, value: startOfMonth.subtract(startOfMonth.day(), 'day').add(5, 'day') },
      { key: 6, value: startOfMonth.subtract(startOfMonth.day(), 'day').add(6, 'day') },
    ],
    [
      { key: 0, value: startOfMonth.add(1, 'week').startOf('week') },
      { key: 1, value: startOfMonth.add(1, 'week').startOf('week').add(1, 'day') },
      { key: 2, value: startOfMonth.add(1, 'week').startOf('week').add(2, 'day') },
      { key: 3, value: startOfMonth.add(1, 'week').startOf('week').add(3, 'day') },
      { key: 4, value: startOfMonth.add(1, 'week').startOf('week').add(4, 'day') },
      { key: 5, value: startOfMonth.add(1, 'week').startOf('week').add(5, 'day') },
      { key: 6, value: startOfMonth.add(1, 'week').startOf('week').add(6, 'day') },
    ],
    [
      { key: 0, value: startOfMonth.add(2, 'week').startOf('week') },
      { key: 1, value: startOfMonth.add(2, 'week').startOf('week').add(1, 'day') },
      { key: 2, value: startOfMonth.add(2, 'week').startOf('week').add(2, 'day') },
      { key: 3, value: startOfMonth.add(2, 'week').startOf('week').add(3, 'day') },
      { key: 4, value: startOfMonth.add(2, 'week').startOf('week').add(4, 'day') },
      { key: 5, value: startOfMonth.add(2, 'week').startOf('week').add(5, 'day') },
      { key: 6, value: startOfMonth.add(2, 'week').startOf('week').add(6, 'day') },
    ],
    [
      { key: 0, value: startOfMonth.add(3, 'week').startOf('week') },
      { key: 1, value: startOfMonth.add(3, 'week').startOf('week').add(1, 'day') },
      { key: 2, value: startOfMonth.add(3, 'week').startOf('week').add(2, 'day') },
      { key: 3, value: startOfMonth.add(3, 'week').startOf('week').add(3, 'day') },
      { key: 4, value: startOfMonth.add(3, 'week').startOf('week').add(4, 'day') },
      { key: 5, value: startOfMonth.add(3, 'week').startOf('week').add(5, 'day') },
      { key: 6, value: startOfMonth.add(3, 'week').startOf('week').add(6, 'day') },
    ],
    [
      { key: 0, value: startOfMonth.add(4, 'week').startOf('week') },
      { key: 1, value: startOfMonth.add(4, 'week').startOf('week').add(1, 'day') },
      { key: 2, value: startOfMonth.add(4, 'week').startOf('week').add(2, 'day') },
      { key: 3, value: startOfMonth.add(4, 'week').startOf('week').add(3, 'day') },
      { key: 4, value: startOfMonth.add(4, 'week').startOf('week').add(4, 'day') },
      { key: 5, value: startOfMonth.add(4, 'week').startOf('week').add(5, 'day') },
      { key: 6, value: startOfMonth.add(4, 'week').startOf('week').add(6, 'day') },
    ],
  ];

  const handleSwipeRightMonthly = async () => {
    if (!multipleSchedules[startOfMonth.subtract(1, 'day').format('YYYY.MM')]) {
      try {
        const { data, status } = await apiServer.get(
          `/schedules?_sort=startDate:desc&_startDate=${startOfMonth.subtract(1, 'day').startOf('month').format('YYYYMMDD')}&_endDate=${startOfMonth
            .subtract(1, 'day')
            .endOf('month')
            .format('YYYYMMDD')}&_limit=200`,
        );
        if (status === 200) {
          handleScheduleAdd(startOfMonth.subtract(1, 'day').format('YYYY.MM'), data);
          handleScheduleChange(data);
          dispatch(fetchMonthlySchedules(startOfMonth.subtract(1, 'day').format('YYYY.MM.DD')));
        }
      } catch (e) {
        console.log(e);
      }
    }
    whichMonth === 0 ? setWhichMonth(11) : setWhichMonth(whichMonth - 1);
    setStartOfMonth(startOfMonth.subtract(1, 'day').startOf('month'));
    setStartOfWeek(startOfMonth.subtract(1, 'day').startOf('month').startOf('week'));
    setSelected(startOfMonth.subtract(1, 'day').startOf('month').format('YYYY-MM-DD'));
    return;
  };
  const handleSwipeLeftMonthly = async () => {
    if (!multipleSchedules[startOfMonth.endOf('month').add(1, 'day').format('YYYY.MM')]) {
      try {
        const { data, status } = await apiServer.get(
          `/schedules?_sort=startDate:desc&_startDate=${startOfMonth.endOf('month').add(1, 'day').format('YYYYMMDD')}&_endDate=${startOfMonth
            .endOf('month')
            .add(1, 'day')
            .endOf('month')
            .format('YYYYMMDD')}&_limit=200`,
        );
        if (status === 200) {
          handleScheduleAdd(startOfMonth.endOf('month').add(1, 'day').format('YYYY.MM'), data);
          handleScheduleChange(data);
          dispatch(fetchMonthlySchedules(startOfMonth.endOf('month').add(1, 'day').format('YYYY.MM.DD')));
        }
      } catch (e) {
        console.log(e);
      }
    }
    whichMonth === 11 ? setWhichMonth(0) : setWhichMonth(whichMonth + 1);
    setStartOfMonth(startOfMonth.endOf('month').add(1, 'day'));
    setStartOfWeek(startOfMonth.endOf('month').add(1, 'day').startOf('week'));
    setSelected(startOfMonth.endOf('month').add(1, 'day').format('YYYY-MM-DD'));
    return;
  };

  const handleSwipeRightWeekly = async () => {
    if (startOfWeek.format('YYYY.MM.DD') === startOfMonth.format('YYYY.MM.DD')) {
      //* 예) 23.01.01(일요일)
      if (!multipleSchedules[startOfWeek.subtract(1, 'week').format('YYYY.MM')]) {
        try {
          const { data, status } = await apiServer.get(
            `/schedules?_sort=startDate:desc&_startDate=${startOfMonth.subtract(1, 'day').startOf('month').format('YYYYMMDD')}&_endDate=${startOfMonth
              .subtract(1, 'day')
              .endOf('month')
              .format('YYYYMMDD')}&_limit=200`,
          );
          if (status === 200) {
            handleScheduleAdd(startOfMonth.subtract(1, 'day').format('YYYY.MM'), data);
            handleScheduleChange(data);
            dispatch(fetchMonthlySchedules(startOfMonth.subtract(1, 'day').format('YYYY.MM.DD')));
            whichMonth === 0 ? setWhichMonth(11) : setWhichMonth(whichMonth - 1);
            setStartOfMonth(startOfMonth.subtract(1, 'day').startOf('month'));
            setStartOfWeek(startOfWeek.subtract(1, 'week'));
            setSelected(startOfWeek.subtract(1, 'week').format('YYYY-MM-DD'));
            return;
          }
        } catch (e) {
          console.log(e);
        }
      }
      whichMonth === 0 ? setWhichMonth(11) : setWhichMonth(whichMonth - 1);
      setStartOfMonth(startOfMonth.subtract(1, 'day').startOf('month'));
      setStartOfWeek(startOfWeek.subtract(1, 'week'));
      setSelected(startOfWeek.subtract(1, 'week').format('YYYY-MM-DD'));
      return;
    } else if (
      startOfWeek.subtract(1, 'week').month() !== startOfWeek.month() &&
      startOfWeek.format('YYYY.MM.DD') !== startOfMonth.format('YYYY.MM.DD')
    ) {
      //* 주 이동시 이전 달 날짜가 같은 주에 있을 때
      setStartOfWeek(startOfWeek.subtract(1, 'week'));
      setSelected(startOfWeek.subtract(1, 'week').add(startOfMonth.day(), 'day').format('YYYY-MM-DD'));
      return;
    } else if (startOfWeek.subtract(1, 'week').month() !== whichMonth && startOfMonth.format('YYYY.MM.DD') !== startOfWeek.format('YYYY.MM.DD')) {
      //* 주 시작일이 다른 달이고 주 시작일이과 월 시작일이 다른 경우, startOfWeek는 유지하면서 달만 이동하고 다른 달의 날짜를 보이게끔 설정
      if (!multipleSchedules[startOfWeek.endOf('week').format('YYYY.MM')]) {
        try {
          const { data, status } = await apiServer.get(
            `/schedules?_sort=startDate:desc&_startDate=${startOfMonth.subtract(1, 'day').startOf('month').format('YYYYMMDD')}&_endDate=${startOfMonth
              .subtract(1, 'day')
              .endOf('month')
              .format('YYYYMMDD')}&_limit=200`,
          );
          if (status === 200) {
            handleScheduleAdd(startOfMonth.subtract(1, 'day').format('YYYY.MM'), data);
            handleScheduleChange(data);
            dispatch(fetchMonthlySchedules(startOfMonth.subtract(1, 'day').format('YYYY.MM.DD')));
            whichMonth === 0 ? setWhichMonth(11) : setWhichMonth(whichMonth - 1);
            setSelected(startOfWeek.format('YYYY-MM-DD'));
            setStartOfMonth(startOfMonth.subtract(1, 'day').startOf('month'));
            return;
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        whichMonth === 0 ? setWhichMonth(11) : setWhichMonth(whichMonth - 1);
        setSelected(startOfWeek.format('YYYY-MM-DD'));
        setStartOfMonth(startOfMonth.subtract(1, 'day').startOf('month'));
        return;
      }
    } else {
      setStartOfWeek(startOfWeek.subtract(1, 'week'));
      setSelected(startOfWeek.subtract(1, 'week').format('YYYY-MM-DD'));
      return;
    }
  };

  const handleSwipeLeftWeekly = async () => {
    if (startOfWeek.add(1, 'week').date() === 1) {
      //* 다음주 첫째날이 차월 1일인 경우, 즉 1일 일요일
      if (!multipleSchedules[startOfWeek.add(1, 'week').format('YYYY.MM')]) {
        try {
          const { data, status } = await apiServer.get(
            `/schedules?_sort=startDate:desc&_startDate=${startOfMonth
              .endOf('month')
              .add(1, 'day')
              .startOf('month')
              .format('YYYYMMDD')}&_endDate=${startOfMonth.endOf('month').add(1, 'day').endOf('month').format('YYYYMMDD')}&_limit=200`,
          );
          if (status === 200) {
            handleScheduleAdd(startOfMonth.endOf('month').add(1, 'day').format('YYYY.MM'), data);
            handleScheduleChange(data);
            dispatch(fetchMonthlySchedules(startOfMonth.endOf('month').add(1, 'day').format('YYYY.MM')));
            whichMonth === 11 ? setWhichMonth(0) : setWhichMonth(whichMonth + 1);
            setStartOfWeek(startOfWeek.add(1, 'week'));
            setStartOfMonth(startOfWeek.add(1, 'week'));
            return;
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        whichMonth === 11 ? setWhichMonth(0) : setWhichMonth(whichMonth + 1);
        setStartOfWeek(startOfWeek.add(1, 'week'));
        setStartOfMonth(startOfWeek.add(1, 'week'));
        return;
      }
    } else if (startOfWeek.endOf('week').month() !== whichMonth) {
      //* 금주에 차월 날짜가 포함되어 있는 경우
      if (!multipleSchedules[startOfWeek.endOf('week').format('YYYY.MM')]) {
        try {
          const { data, status } = await apiServer.get(
            `/schedules?_sort=startDate:desc&_startDate=${startOfMonth
              .endOf('month')
              .add(1, 'day')
              .startOf('month')
              .format('YYYYMMDD')}&_endDate=${startOfMonth.endOf('month').add(1, 'day').endOf('month').format('YYYYMMDD')}&_limit=200`,
          );
          if (status === 200) {
            handleScheduleAdd(startOfMonth.endOf('month').add(1, 'day').format('YYYY.MM'), data);
            handleScheduleChange(data);
            dispatch(fetchMonthlySchedules(startOfMonth.endOf('month').add(1, 'day').format('YYYY.MM')));
            whichMonth === 11 ? setWhichMonth(0) : setWhichMonth(whichMonth + 1);
            setStartOfMonth(startOfWeek.add(1, 'week').startOf('month'));
            setSelected(startOfWeek.add(1, 'week').startOf('month').format('YYYY-MM-DD'));
            return;
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        whichMonth === 11 ? setWhichMonth(0) : setWhichMonth(whichMonth + 1);
        setStartOfMonth(startOfWeek.add(1, 'week').startOf('month'));
        setSelected(startOfWeek.add(1, 'week').startOf('month').format('YYYY-MM-DD'));
        return;
      }
    } else {
      setStartOfWeek(startOfWeek.add(1, 'week'));
      setSelected(startOfWeek.add(1, 'week').format('YYYY-MM-DD'));
      return;
    }
  };

  const [height, setHeight] = useState(170);

  return (
    <>
      <Resizable
        style={{
          display: 'flex',
          flexDirection: 'column',
          padding: `${theme.metrics.m4} ${theme.metrics.m4} ${theme.metrics.m4} ${theme.metrics.m4}`,
          borderRadius: `0 0 ${theme.metrics.m8} ${theme.metrics.m8}`,
          backgroundColor: `${theme.color.gray.white}`,
          boxShadow: `0px 2px 8px rgba(0, 0, 0, 0.04)`,
          overflow: `hidden`,
          minWidth: '360px',
          maxWidth: '600px',
          height: `${height}px`,
        }}
        handleStyles={{
          bottom: {
            position: 'initial',
            borderRadius: '5px',
            height: '8px',
            backgroundColor: `${theme.color.gray.w300}`,
            width: '30px',
            margin: '10px auto 0 auto',
          },
        }}
        handleWrapperStyle={{ height: '20px' }}
        enable={{ bottom: true, top: false, left: false, right: false, bottomLeft: false, bottomRight: false, topLeft: false, topRight: false }}
        size={{ height: height, width: '100%' }}
        maxHeight={300}
        minHeight={175}
        snap={{ y: [175, 300] }}
        snapGap={30}
        onResizeStop={(e, dir, ref, delta) => {
          if (ref.clientHeight >= 175 && ref.clientHeight < 232.5) {
            setMonthView(false);
            setHeight(175);
          } else if (ref.clientHeight >= 232.5) {
            setMonthView(true);
            setHeight(300);
          }

          // if (ref.clientHeight === 175) setMonthView(false);
          // else if (ref.clientHeight === 300) setMonthView(true);
        }}
      >
        <YearMonth>
          <Image
            onClick={() => (monthView ? handleSwipeRightMonthly() : handleSwipeRightWeekly())}
            loader={imageLoader}
            css={css`
              margin: 0 ${theme.metrics.m6} 0 0;
              transform: scaleX(-1);
              cursor: pointer;
            `}
            src="/images/rightArrow.svg"
            width={10}
            height={10}
            alt="left arrow"
          />
          {dayjs(selected).format('YYYY년 M월')}
          <Image
            onClick={() => (monthView ? handleSwipeLeftMonthly() : handleSwipeLeftWeekly())}
            loader={imageLoader}
            css={css`
              margin: 0 0 0 ${theme.metrics.m6};
              cursor: pointer;
            `}
            src="/images/rightArrow.svg"
            width={10}
            height={10}
            alt="right arrow"
          />
        </YearMonth>
        <CalendarContainer>
          <CalendarDays>
            {weekDays.map((data, index) => (
              <CalendarDay key={index} day={data.key}>
                {data.value}
              </CalendarDay>
            ))}
          </CalendarDays>
          {monthView ? (
            <Swiper
              spaceBetween={12}
              loopPreventsSlide={true}
              onSlideChangeTransitionEnd={(swiper) => {
                if (swiper.touches.diff > 10) {
                  handleSwipeRightMonthly();
                } else if (swiper.touches.diff < -10) {
                  handleSwipeLeftMonthly();
                }
              }}
              loop={true}
            >
              <CalendarDates>
                <SwiperSlide className="calendar-slide-month">
                  {monthDate.map((data, index) => (
                    <div
                      key={index}
                      css={css`
                        display: flex;
                        justify-content: space-between;
                        width: 100%;
                      `}
                    >
                      {data.map((data, index) => (
                        <CalendarDate
                          key={index}
                          day={data.key}
                          isToday={dayjs(data.value).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')}
                          isSelected={dayjs(data.value).format('YYYY-MM-DD') === selected}
                          isSameMonth={data.value.month() == whichMonth}
                          onClick={() => {
                            setSelected(data.value.format('YYYY-MM-DD'));
                            setStartOfWeek(data.value.startOf('week'));
                          }}
                        >
                          {dayjs(data.value).date()}
                          <TodayDot
                            isToday={dayjs(data.value).format('YYYY.MM.DD') === dayjs().format('YYYY.MM.DD')}
                            isSelected={dayjs(data.value).format('YYYY-MM-DD') === selected}
                            src="/images/todayDot.svg"
                            alt="today dot"
                            width={4}
                            height={4}
                            style={{ fill: theme.color.primary.purple }}
                          />
                        </CalendarDate>
                      ))}
                    </div>
                  ))}
                </SwiperSlide>
              </CalendarDates>
            </Swiper>
          ) : (
            <Swiper
              spaceBetween={12}
              loopPreventsSlide={true}
              onSlideChangeTransitionEnd={async (swiper) => {
                if (swiper.touches.diff > 0) {
                  handleSwipeRightWeekly();
                } else if (swiper.touches.diff < 0) {
                  handleSwipeLeftWeekly();
                }
              }}
              loop={true}
            >
              <CalendarDates draggable>
                <SwiperSlide className="calendar-slide">
                  {weekDates.map((data, index) => (
                    <CalendarDate
                      key={index}
                      day={data.key}
                      isToday={dayjs(data.value).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')}
                      isSelected={dayjs(data.value).format('YYYY-MM-DD') === selected}
                      isSameMonth={data.value.month() == whichMonth}
                      onClick={() => {
                        setSelected(data.value.format('YYYY-MM-DD'));
                        if (isMonthChanged) setIsMonthChanged(!isMonthChanged);
                      }}
                    >
                      {dayjs(data.value).date()}
                      <TodayDot
                        isToday={dayjs(data.value).format('YYYY.MM.DD') === dayjs().format('YYYY.MM.DD')}
                        isSelected={dayjs(data.value).format('YYYY-MM-DD') === selected}
                        src="/images/todayDot.svg"
                        alt="today dot"
                        width={4}
                        height={4}
                        style={{ fill: theme.color.primary.purple }}
                      />
                    </CalendarDate>
                  ))}
                </SwiperSlide>
              </CalendarDates>
            </Swiper>
          )}
        </CalendarContainer>
        {/* <Image
          css={css`
            cursor: ns-resize;
            margin: auto auto 0 auto;
          `}
          src="/images/calendarToggle.svg"
          alt="calendar toggle"
          width={30}
          height={5}
          onClick={() => {
            if (dayjs(selected).format('YYYY.MM') !== startOfMonth.format('YYYY.MM')) {
              setStartOfWeek(startOfMonth.subtract(startOfMonth.day(), 'day'));
              setSelected(startOfMonth.format('YYYY-MM-DD'));
              setMonthView(!monthView);
              return;
            } else if (isMonthChanged && dayjs(selected).format('YYYY.MM') !== startOfMonth.format('YYYY.MM')) {
              setStartOfMonth(startOfWeek.startOf('month'));
              setSelected(startOfWeek.startOf('month').format('YYYY-MM-DD'));
              setStartOfWeek(startOfWeek.startOf('month').subtract(startOfWeek.startOf('month').day(), 'day'));
              setIsMonthChanged(false);
              setMonthView(!monthView);
              return;
            } else if (isMonthChanged && startOfMonth.format('YYYY.MM') !== startOfWeek.format('YYYY.MM')) {
              setStartOfMonth(startOfWeek.startOf('month'));
              setSelected(startOfWeek.startOf('month').format('YYYY-MM-DD'));
              setMonthView(!monthView);
              return;
            }
            setMonthView(!monthView);
          }}
        /> */}
      </Resizable>
      <ScheduleInfoContainer>
        {multipleSchedules[dayjs(selected).format('YYYY.MM')] &&
        Array.isArray(multipleSchedules[dayjs(selected).format('YYYY.MM')]) &&
        multipleSchedules[dayjs(selected).format('YYYY.MM')].length > 0 &&
        multipleSchedules[dayjs(selected).format('YYYY.MM')].filter((data) => dayjs(selected).isBetween(data.startDate, data.endDate, 'day', '[]')) &&
        Array.isArray(
          multipleSchedules[dayjs(selected).format('YYYY.MM')].filter((data) => dayjs(selected).isBetween(data.startDate, data.endDate, 'day', '[]')),
        ) &&
        multipleSchedules[dayjs(selected).format('YYYY.MM')].filter((data) => dayjs(selected).isBetween(data.startDate, data.endDate, 'day', '[]'))
          .length > 0 ? (
          multipleSchedules[dayjs(selected).format('YYYY.MM')]
            .filter((data) => dayjs(selected).isBetween(data.startDate, data.endDate, 'day', '[]'))
            .map((data) => <ScheduleInfoList isWhite={false} viewWidth={viewWidth + 60} key={`schedule-${data.id}`} schedule={data} />)
        ) : (
          <div
            css={css`
              display: flex;
              height: 300px;
              justify-content: center;
              align-items: center;
              border-radius: 24px;
            `}
          >
            <div
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                position: relative;
                top: 24px;
              `}
            >
              <Image
                css={css`
                  filter: contrast(0.95);
                  margin: auto;
                  position: rel;
                `}
                src={'/images/noContents.svg'}
                alt={'no-content'}
                width={145}
                height={80}
              />
              <p
                css={css`
                  ${theme.fonts.s16_w400};
                  color: ${theme.color.gray.w600};
                `}
              >
                {'일정이 없어요.'}
              </p>
            </div>
          </div>
        )}
      </ScheduleInfoContainer>
    </>
  );
}
