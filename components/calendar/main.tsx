/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import theme from '../../commons/theme';
import { useState } from 'react';
import { ISchedule } from '../../commons/types';
import { css } from '@emotion/react';
import ScheduleInfoList from '../list/scheduleInfo';
import isBetween from 'dayjs/plugin/isBetween';
import { imageLoader } from '../../commons/utils';
import { useAppSelector } from '../../lib/redux/hooks';
dayjs.extend(isBetween);

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${theme.metrics.m6} ${theme.metrics.m4} ${theme.metrics.m4} ${theme.metrics.m4};
  border-radius: ${theme.metrics.m8};
  background-color: ${theme.color.gray.white};
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
`;

const CalendarMonth = styled.span`
  ${theme.fonts.s16_w700};
  color: ${theme.color.gray.w900};
  margin: 0 0 14.5px 0;
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
  margin: ${theme.metrics.m12} 0 0 0;
`;

interface Props {
  schedules: ISchedule[];
  viewWidth: number;
}

export default function MainCalendar(props: Props) {
  const { schedules, viewWidth } = props;
  const multipleSchedules = useAppSelector((state) => state.schedules.multipleSchedules);

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
  const [selected, setSelected] = useState(dayjs().format('YYYY-MM-DD'));
  const filteredSchedule = schedules.filter((data) => dayjs(selected).isBetween(data.startDate, data.endDate, 'day', '[]'));

  return (
    <Wrapper>
      <CalendarMonth>
        <Link
          href="/market/calendar"
          css={css`
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
          `}
        >
          {startOfWeek.year()}년 {whichMonth + 1}월
          <Image
            loader={imageLoader}
            css={css`
              margin: 0 0 0 ${theme.metrics.m3};
            `}
            src="/images/rightArrow.svg"
            width={10}
            height={10}
            alt="right arrow"
          />
        </Link>
      </CalendarMonth>
      <CalendarContainer>
        <CalendarDays>
          {weekDays.map((data, index) => (
            <CalendarDay
              key={index}
              day={data.key}
              css={css`
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
              `}
            >
              {data.value}
            </CalendarDay>
          ))}
        </CalendarDays>
        <CalendarDates>
          {weekDates.map((data, index) => (
            <CalendarDate
              css={css`
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
              `}
              key={index}
              day={data.key}
              isToday={dayjs(data.value).format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD')}
              isSelected={dayjs(data.value).format('YYYY-MM-DD') === selected}
              isSameMonth={dayjs(data.value).month() === whichMonth}
              onClick={() => {
                setSelected(dayjs(data.value).format('YYYY-MM-DD'));
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
        </CalendarDates>
      </CalendarContainer>
      <ScheduleInfoContainer>
        {/* 메인 페이지에서는 최대 10개만 보여줄 수 있도록 한다. 설계서 기준 */}
        {filteredSchedule && Array.isArray(filteredSchedule) && filteredSchedule.length > 0 ? (
          filteredSchedule.map((data) => <ScheduleInfoList isWhite={true} viewWidth={viewWidth} key={`schedule-${data.id}`} schedule={data} />)
        ) : (
          <div
            css={css`
              display: flex;
              background-color: ${theme.color.gray.white};
              height: 140px;
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
              `}
            >
              <Image
                css={css`
                  filter: contrast(0.95);
                  margin: auto;
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
    </Wrapper>
  );
}
