import styled from '@emotion/styled';
import { useState } from 'react';
import theme from '../../commons/theme';
import { priceToString, signFormat } from '../../commons/utils';
import SortBtnArraySelect from '../select/sortBtnArray';
import { IStockPrice, IStockExecutionPrice } from '../../commons/types';
import moment from 'moment';
import NoContentsImage from '../image/noContentsImage';

interface Props {
  dailyPriceData: IStockPrice[];
  hourlyPriceData: IStockExecutionPrice[];
}
const btnArr = [
  {
    value: '일별',
    text: '일별',
  },
  {
    value: '시간별',
    text: '시간별',
  },
];

export default function StockTimeList(props: Props) {
  const { dailyPriceData, hourlyPriceData } = props;
  const [btnValue, setBtnValue] = useState('일별');
  const handleBtnValue = (value: string) => {
    setBtnValue(value);
  };

  return (
    <StockTimeListContainer>
      <StockTimeBtnWrapper>
        <SortBtnArraySelect SortArray={btnArr} btnValue={btnValue} handleBtnValue={handleBtnValue} />
      </StockTimeBtnWrapper>
      <StockTimeListWrapper>
        {btnValue === '일별' ? (
          <>
            <StockTimeListHeader>
              <StockTimeHeader>일자</StockTimeHeader>
              <StockTimeHeader>종가</StockTimeHeader>
              <StockTimeHeader>등락률</StockTimeHeader>
              <StockTimeHeader>거래량(백만)</StockTimeHeader>
            </StockTimeListHeader>
            {Array.isArray(dailyPriceData) && dailyPriceData.length > 0 ? (
              dailyPriceData
                //@ts-ignore
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .map((data, index) => (
                  <StockItemWrapper key={`${data.date}-${index}`}>
                    <StockItemGrayText>{moment(data.date).format('MM.DD')}</StockItemGrayText>
                    <StockItemGrayText>{priceToString(data.price)}</StockItemGrayText>
                    <StockItemGrayPercent>
                      {signFormat(data.ratio)}
                      {data.ratio}%
                    </StockItemGrayPercent>
                    <StockItemGrayText>{(data.volume! / 1000000).toFixed(2)}</StockItemGrayText>
                  </StockItemWrapper>
                ))
            ) : (
              <NoContentsImage text="일별/시간별 정보가 없어요."></NoContentsImage>
            )}
          </>
        ) : (
          <>
            <StockTimeListHeader>
              <StockTimeHeader>시간</StockTimeHeader>
              <StockTimeHeader>체결가</StockTimeHeader>
              <StockTimeHeader>전일대비</StockTimeHeader>
              <StockTimeHeader>체결량</StockTimeHeader>
            </StockTimeListHeader>
            {Array.isArray(hourlyPriceData) && hourlyPriceData.length > 0 ? (
              hourlyPriceData
                //@ts-ignore
                .sort((a, b) => new Date(a.time) - new Date(b.time))
                .map((data, index) => {
                  const today = moment().format('YYYYMMDD');
                  return (
                    <StockItemWrapper key={`${data.date}-${data.chetime}-${index}`}>
                      <StockItemGrayText>{moment(data.chetime, 'HHmmss').format('HH:mm:ss')}</StockItemGrayText>
                      <StockItemGrayText>{priceToString(data.price)}</StockItemGrayText>
                      <StockItemGrayPercent>
                        {signFormat(data.ratio)}
                        {data.ratio}%
                      </StockItemGrayPercent>
                      <StockItemGrayText>{data.cvolume}</StockItemGrayText>
                    </StockItemWrapper>
                  );
                })
            ) : (
              <NoContentsImage text="일별/시간별 정보가 없어요."></NoContentsImage>
            )}
          </>
        )}
      </StockTimeListWrapper>
    </StockTimeListContainer>
  );
}

const StockTimeListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const StockTimeBtnWrapper = styled.div`
  padding: ${theme.metrics.m6} ${theme.metrics.m4} 0px ${theme.metrics.m4};
`;

const StockTimeListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 2px solid ${theme.color.gray.w400};
  background-color: ${theme.color.gray.w100};
  margin: ${theme.metrics.m4};
`;

const StockTimeListHeader = styled.div`
  display: flex;
  height: 42px;
`;

const StockTimeHeader = styled.div`
  flex: 1;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  ${theme.fonts.s14_w500};
`;

const StockItemWrapper = styled.div`
  display: flex;
  padding: 12px 0px;
  background-color: white;
  border-top: 1px solid ${theme.color.gray.w300};
  :hover {
    background-color: ${theme.color.primary.purple07};
  }
`;

const StockItemGrayText = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.color.gray.w600};
  ${theme.fonts.s14_w400};
`;
const StockItemGrayPercent = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  color: ${theme.color.chart.up};
  ${theme.fonts.s14_w400};
`;
