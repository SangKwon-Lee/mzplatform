/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Button } from '@mui/material';
import theme from '../../commons/theme';
import { IChartPeriodNav, ChartPeriod } from '../../commons/types';

const periods: IChartPeriodNav[] = [
  {
    name: '1일',
    period: '1D',
  },
  {
    name: '1주일',
    period: '1W',
  },
  {
    name: '1개월',
    period: '1M',
  },
  {
    name: '1년',
    period: '1Y',
  },
  {
    name: '3년',
    period: '3Y',
  },
];

interface Props {
  mode: 'white' | 'gray';
  selectedPeriod: ChartPeriod;
  setPeriod: (period: ChartPeriod) => void;
}

export default function ChartPeriodNav({ mode, selectedPeriod, setPeriod }: Props) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        margin-bottom: ${theme.metrics.m10};
        touch-action: none;
        -ms-touch-action: none;
      `}
    >
      {periods.map((thePeriod) => {
        const focus = selectedPeriod === thePeriod.period;
        const backgroundColor = mode === 'gray' ? (focus ? '#ffffff' : 'transparent') : focus ? theme.color.primary.purple06 : 'transparent';
        const fontColor = focus ? theme.color.primary.purple : theme.color.gray.w600;
        return (
          <Button
            css={css`
              display: flex;
              flex-direction: row;
              justify-content: center;
              align-items: center;
              padding: 0px 20px 0 20px;
              background-color: ${backgroundColor};
              border-radius: 99px;
              flex: none;
              order: 0;
              flex-grow: 0;
              cursor: pointer;
              height: 28px;
              :hover {
                background-color: #fff;
              }
            `}
            key={`period-${thePeriod.period}`}
            onClick={() => setPeriod(thePeriod.period)}
          >
            <p
              css={css`
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
                touch-action: none;
                -ms-touch-action: none;
                ${focus ? theme.fonts.s14_w700 : theme.fonts.s14_w400}
                color: ${fontColor};
              `}
            >
              {thePeriod.name}
            </p>
          </Button>
        );
      })}
    </div>
  );
}
