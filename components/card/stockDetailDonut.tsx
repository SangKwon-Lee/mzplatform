import styled from '@emotion/styled';
import theme from '../../commons/theme';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import NoContentsImage from '../image/noContentsImage';

interface Props {
  title: string;
  products: {
    name: string;
    ratio: number;
  }[];
}
ChartJS.register(ArcElement, Tooltip, Legend);

const backgroundColor = [
  theme.color.secondary.blue01,
  theme.color.secondary.green,
  theme.color.secondary.pink01,
  theme.color.secondary.orange,
  theme.color.learn_random.turquoise,
  theme.color.primary.purple,
  theme.color.learn_random.olive,
  theme.color.learn_random.indigo,
  theme.color.learn_random.brown,
];

export default function StockDetailDonutCard(props: Props) {
  const { title, products } = props;
  const [label, setLabel] = useState(['']);
  const [ratio, setRatio] = useState([0]);
  useEffect(() => {
    if (Array.isArray(products) && products.length > 0) {
      setLabel(products.map((data) => data.name));
      setRatio(products.map((data) => data.ratio));
    }
  }, [products]);
  const data = {
    labels: Array.isArray(label) && label.length > 0 ? label : [],
    datasets: [
      {
        label: '',
        data: Array.isArray(ratio) && ratio.length > 0 ? ratio : [].sort((a: any, b: any) => b - a),
        backgroundColor: backgroundColor,
        hoverOffset: 4,
      },
    ],
  };

  return (
    <>
      <StockDetailDonutContainer>
        <StockDetailDonutTitle>{title}</StockDetailDonutTitle>
        {Array.isArray(label) && Array.isArray(ratio) && label.length > 0 && ratio.length > 0 && ratio.filter((data) => data).length > 0 ? (
          <>
            <DoughnutWrapper>
              <DoughnutTitle>{dayjs().format('YYYY.MM')} 기준</DoughnutTitle>
              <div style={{ padding: '5%' }}>
                {Array.isArray(label) && Array.isArray(ratio) && label.length > 0 && ratio.length > 0 && (
                  <Doughnut
                    data={data}
                    options={{
                      responsive: true,
                      plugins: {
                        //@ts-ignore
                        datalabels: {
                          display: false,
                        },
                        tooltip: {
                          usePointStyle: true,
                          boxHeight: 7,
                          boxWidth: 7,
                          callbacks: {
                            label: function (context) {
                              return `${context.label} :  ${context.raw}%`;
                            },
                            title: function () {
                              return '';
                            },
                          },
                        },
                        legend: {
                          display: false,
                        },
                      },
                      cutout: '65%',
                    }}
                  />
                )}
              </div>
              <DoughnutListWrapper>
                {Array.isArray(label) &&
                  label.length > 0 &&
                  ratio.filter((data) => data).length > 0 &&
                  label
                    .filter((data) => data)
                    .map((data, index) => (
                      <DoughnutItemWrapper key={index}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <DoughnutItemCircle style={{ backgroundColor: backgroundColor[index] }} />
                          <DoughnutItemName>{data}</DoughnutItemName>
                        </div>
                        <DoughnutItemPercent>{ratio[index]}%</DoughnutItemPercent>
                      </DoughnutItemWrapper>
                    ))}
              </DoughnutListWrapper>
            </DoughnutWrapper>
          </>
        ) : (
          <NoContentsImage text="매출액 비중 정보가 없어요." />
        )}
      </StockDetailDonutContainer>
      <StockItemDivider />
    </>
  );
}

const StockDetailDonutContainer = styled.div`
  padding: ${theme.metrics.m8} ${theme.metrics.m4};
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const StockDetailDonutTitle = styled.div`
  color: ${theme.color.gray.w800};
  ${theme.fonts.s20_w500};
  margin-bottom: ${theme.metrics.m4};
`;

const StockItemDivider = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${theme.color.gray.w100};
`;

const DoughnutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${theme.metrics.m6};
  background-color: ${theme.color.gray.w100};
  border-radius: 32px;
`;

const DoughnutTitle = styled.div`
  display: flex;
  justify-content: flex-end;
  ${theme.fonts.s12_w400};
  color: ${theme.color.gray.w600};
`;

const DoughnutListWrapper = styled.div`
  margin-top: ${theme.metrics.m4};
  background-color: white;
  border-radius: 8px;
  width: 100%;
  padding: ${theme.metrics.m2} ${theme.metrics.m4};
`;

const DoughnutItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${theme.metrics.m2} 0;
`;

const DoughnutItemCircle = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: ${theme.metrics.m1};
`;

const DoughnutItemName = styled.div`
  ${theme.fonts.s14_w400};
  display: -webkit-box;
  align-items: center;
  color: ${theme.color.gray.w600};
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const DoughnutItemPercent = styled.div`
  ${theme.fonts.s12_w500};
  margin-left: ${theme.metrics.m2};
`;
