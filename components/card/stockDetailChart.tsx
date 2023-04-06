import styled from '@emotion/styled';
import theme from '../../commons/theme';
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  LineElement,
  Tooltip,
  Legend,
  LineController,
  BarController,
  PointElement,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { priceToString } from '../../commons/utils';
import { IStockInfo } from '../../commons/types';
import { useEffect, useState } from 'react';

ChartJS.register(LinearScale, CategoryScale, BarElement, LineElement, LineController, BarController, Tooltip, Legend, PointElement);
interface Props {
  title: string;
  barLabel: string;
  lineLabel: string;
  stockInfo: IStockInfo;
  isYear: boolean;
}
export default function StockDetailChartCard(props: Props) {
  const { title, barLabel, lineLabel, stockInfo, isYear } = props;
  const { finance } = stockInfo;
  const [lineData, setLineData] = useState(['']);
  const [barData, setBardata] = useState([0]);
  const [year, setYears] = useState(['']);
  const [quarter, setQuarter] = useState(['']);
  const [quarterSales, setQuarterSales] = useState([
    {
      growthRate: '',
      quarter: '',
      sales: 0,
    },
  ]);
  useEffect(() => {
    if (stockInfo) {
      if (title === '매출액') {
        if (Array.isArray(finance.salesYearly) && finance.salesYearly.length > 0) {
          setLineData(finance.salesYearly.map((data) => data.growthRate));
          setBardata(finance.salesYearly.map((data) => data.sales));
        }
      } else if (title === '영업이익') {
        if (Array.isArray(finance.operatingProfitYearly) && finance.operatingProfitYearly.length > 0) {
          setLineData(finance.operatingProfitYearly.map((data) => data.growthRate));
          setBardata(finance.operatingProfitYearly.map((data) => data.operatingProfit));
        }
      } else if (title === '분기 영업이익') {
        if (Array.isArray(finance.operatingProfitQuarterly) && finance.operatingProfitQuarterly.length > 0) {
          setLineData(finance.operatingProfitQuarterly.map((data) => data.growthRate));
          setBardata(finance.operatingProfitQuarterly.map((data) => data.operatingProfit));
        }
        if (Array.isArray(finance.salesQuarterly) && finance.salesQuarterly.length > 0) {
          setQuarterSales(finance.salesQuarterly);
        }
      }
    }
    if (Array.isArray(finance.salesYearly) && finance.salesYearly.length > 0) {
      setYears(finance.salesYearly.map((data) => data.year));
      setQuarter(finance.salesQuarterly.map((data) => data.quarter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockInfo]);

  const data = {
    labels: isYear ? year : quarter,
    datasets: [
      {
        type: 'line' as const,
        label: lineLabel,
        yAxisID: 'A',
        fill: false,
        backgroundColor: 'white',
        borderColor: theme.color.secondary.orange,
        borderWidth: 2,
        data: lineData,
      },
      {
        type: 'bar' as const,
        label: barLabel,
        yAxisID: 'B',
        barThickness: 35,
        backgroundColor: [theme.color.primary.purple03, theme.color.primary.purple02, theme.color.primary.purple01, theme.color.primary.purple],
        borderRadius: 5,
        borderSkipped: false,
        data: barData,
      },
    ],
  };

  return (
    <>
      <StockDetailCahrtContainer>
        <StockDetailChartTitle>{title}</StockDetailChartTitle>
        {Array.isArray(barData) && Array.isArray(lineData) && lineData.length > 0 && barData.length > 0 && (
          <>
            <LabelWrapper>
              <LabelTitleWrapper>
                <LabelCirclePurple></LabelCirclePurple>
                <LabelTitle>{barLabel}</LabelTitle>
              </LabelTitleWrapper>
              <LabelTitleWrapper>
                <LabelCircleOrange></LabelCircleOrange>
                <LabelTitle>{lineLabel}</LabelTitle>
              </LabelTitleWrapper>
            </LabelWrapper>
            <Chart
              type="bar"
              //@ts-ignore
              data={data}
              options={{
                animation: false,
                plugins: {
                  tooltip: {
                    usePointStyle: true,
                    boxHeight: 7,
                    boxWidth: 7,
                  },
                  legend: {
                    display: false,
                    position: 'top',
                    align: 'end',
                    labels: {
                      usePointStyle: true,
                      pointStyle: 'circle',
                      boxHeight: 7,
                      boxWidth: 7,
                    },
                    reverse: true,
                  },
                  datalabels: {
                    display: false,
                  },
                },
                scales: {
                  x: {
                    grid: {
                      display: false,
                    },
                    ticks: {
                      font: {
                        size: 14,
                      },
                    },
                  },
                  A: {
                    type: 'linear',
                    position: 'right',
                    ticks: {
                      color: theme.color.secondary.orange,
                      font: {
                        size: 10,
                      },
                    },
                    border: {
                      dash: [3, 3],
                      display: false,
                    },
                    grid: {
                      display: false,
                    },
                  },
                  B: {
                    type: 'linear',
                    position: 'left',
                    ticks: {
                      color: theme.color.primary.purple,
                      font: {
                        size: 10,
                      },
                    },
                    border: {
                      dash: [3, 3],
                      display: false,
                    },
                    grid: {
                      display: true,
                    },
                  },
                },
              }}
            />
          </>
        )}
        {isYear ? (
          <StockTableWrapper>
            <StockTableTitleWrapper>
              <StockTableTitle>{}</StockTableTitle>
              <StockTableSubTitle>(단위:억원, %)</StockTableSubTitle>
            </StockTableTitleWrapper>
            <StockTableHeadeWrapper>
              <StockTableHeadeTitle>연도</StockTableHeadeTitle>
              <StockTableHeadeTitle>{title}</StockTableHeadeTitle>
              <StockTableHeadeTitle>증가율</StockTableHeadeTitle>
            </StockTableHeadeWrapper>
            <StockTableItemWContainer>
              {Array.isArray(lineData) && lineData.length > 0 ? (
                lineData.map((i, index) => (
                  <StockTableItemWrapper key={index}>
                    <StockTableItem>{year[index]}</StockTableItem>
                    <StockTableItem>
                      {barData[index] && index === barData.length - 1
                        ? `${priceToString(barData[index])} (E)`
                        : barData[index]
                        ? priceToString(barData[index])
                        : '--'}
                    </StockTableItem>
                    <StockTableItem>{i ? i : '--'}</StockTableItem>
                  </StockTableItemWrapper>
                ))
              ) : (
                <></>
              )}
            </StockTableItemWContainer>
          </StockTableWrapper>
        ) : (
          <>
            <StockTableWrapper>
              <StockTableTitleWrapper>
                <StockTableTitle>매출액</StockTableTitle>
                <StockTableSubTitle>(단위:억원, %)</StockTableSubTitle>
              </StockTableTitleWrapper>
              <StockTableHeadeWrapper>
                <StockTableHeadeTitle>연도</StockTableHeadeTitle>
                <StockTableHeadeTitle>매출액</StockTableHeadeTitle>
                <StockTableHeadeTitle>증가율</StockTableHeadeTitle>
              </StockTableHeadeWrapper>
              <StockTableItemWContainer>
                {Array.isArray(lineData) && lineData.length > 0 ? (
                  lineData.map((i, index) => (
                    <StockTableItemWrapper key={index}>
                      <StockTableItem>{quarter[index]}Q</StockTableItem>
                      <StockTableItem>{priceToString(quarterSales[index]?.sales) ? priceToString(quarterSales[index].sales) : '--'}</StockTableItem>
                      <StockTableItem>{quarterSales[index]?.growthRate ? priceToString(quarterSales[index].growthRate) : '--'}</StockTableItem>
                    </StockTableItemWrapper>
                  ))
                ) : (
                  <></>
                )}
              </StockTableItemWContainer>
            </StockTableWrapper>
            <StockTableWrapper>
              <StockTableTitleWrapper>
                <StockTableTitle>영업이익</StockTableTitle>
                <StockTableSubTitle>(단위:억원, %)</StockTableSubTitle>
              </StockTableTitleWrapper>
              <StockTableHeadeWrapper>
                <StockTableHeadeTitle>연도</StockTableHeadeTitle>
                <StockTableHeadeTitle>영업이익</StockTableHeadeTitle>
                <StockTableHeadeTitle>증가율</StockTableHeadeTitle>
              </StockTableHeadeWrapper>
              <StockTableItemWContainer>
                {Array.isArray(lineData) && lineData.length > 0 ? (
                  lineData.map((i, index) => (
                    <StockTableItemWrapper key={index}>
                      <StockTableItem>{quarter[index]}Q</StockTableItem>
                      <StockTableItem>{barData[index] ? priceToString(barData[index]) : '--'}</StockTableItem>
                      <StockTableItem>{i ? i : '--'}</StockTableItem>
                    </StockTableItemWrapper>
                  ))
                ) : (
                  <></>
                )}
              </StockTableItemWContainer>
            </StockTableWrapper>
          </>
        )}
      </StockDetailCahrtContainer>
      <StockItemDivider />
    </>
  );
}

const StockDetailCahrtContainer = styled.div`
  padding: ${theme.metrics.m8} ${theme.metrics.m4};
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const StockDetailChartTitle = styled.div`
  color: ${theme.color.gray.w800};
  ${theme.fonts.s20_w500};
  margin-bottom: ${theme.metrics.m4};
`;

const StockItemDivider = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${theme.color.gray.w100};
`;

const StockTableWrapper = styled.div`
  width: 100%;
  margin-top: ${theme.metrics.m8};
`;

const StockTableTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.metrics.m2};
`;

const StockTableTitle = styled.div`
  ${theme.fonts.s16_w700};
  color: ${theme.color.gray.w600};
`;

const StockTableSubTitle = styled.div`
  ${theme.fonts.s12_w400};
  color: ${theme.color.gray.w600};
`;

const StockTableHeadeWrapper = styled.div`
  background-color: ${theme.color.gray.w100};
  width: 100%;
  height: 34px;
  border-radius: 32px;
  display: flex;
  align-items: center;
`;

const StockTableHeadeTitle = styled.div`
  color: ${theme.color.gray.w800};
  flex: 1;
  display: flex;
  justify-content: center;
  ${theme.fonts.s14_w500};
`;

const StockTableItemWContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.metrics.m4};
  margin-top: ${theme.metrics.m2};
`;
const StockTableItemWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const StockTableItem = styled.div`
  color: ${theme.color.gray.w600};
  ${theme.fonts.s14_w400};
  flex: 1;
  display: flex;
  justify-content: center;
`;

const LabelWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  margin-bottom: ${theme.metrics.m4};
`;

const LabelTitle = styled.div`
  ${theme.fonts.s12_w400};
  color: ${theme.color.gray.w600};
`;

const LabelTitleWrapper = styled.div`
  display: flex;
  margin-left: ${theme.metrics.m2};
`;

const LabelCirclePurple = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${theme.color.primary.purple};
  margin-right: ${theme.metrics.m1};
`;
const LabelCircleOrange = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  padding: 4px;
  border: 1.5px solid ${theme.color.secondary.orange};
  margin-right: ${theme.metrics.m1};
`;
