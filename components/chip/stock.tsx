import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import theme from '../../commons/theme';
import { signFormat } from '../../commons/utils';
import { useAppSelector, useAppDispatch } from '../../lib/redux/hooks';
import { fetchStockTodayPrice } from '../../lib/redux/stocks';
import { Button } from '@mui/material';

const Container = styled.div<{ isWhite?: boolean }>`
  display: flex;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  background-color: ${(props) => (props.isWhite ? theme.color.gray.white : theme.color.gray.w100)};
`;

const Stock = styled.div`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  align-items: center;
  ${theme.fonts.s12_w400};
  color: ${theme.color.gray.w700};
  margin: 0 0.25rem 0 0;
`;

const Ratio = styled.div<{ ratio: number }>`
  display: flex;
  align-items: center;
  color: ${(props) => (props.ratio > 0 ? theme.color.chart.up : props.ratio < 0 ? theme.color.chart.down : theme.color.gray.w700)};
  ${theme.fonts.s12_w500};
`;

interface Props {
  stockcode: string;
  stockname: string;
  isWhite?: boolean;
}

export default function StockChip(props: Props) {
  const { stockname, stockcode, isWhite } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();
  const stocks = useAppSelector((state) => state.stocks);
  const stockRatio = stocks[stockcode] && stocks[stockcode].ratio ? stocks[stockcode].ratio : 0;

  useEffect(() => {
    // StockChip 로딩 후 1.5초가 지나도 ratio 데이터를 못 받았을 때 다시 요청
    setTimeout(() => {
      if (!stocks[stockcode]) {
        dispatch(fetchStockTodayPrice(stockcode));
      }
    }, 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockRatio]);

  return (
    <Button
      css={css`
        :hover {
          background-color: ${theme.color.gray.white};
        }
        display: flex;
        padding: 4px;
        cursor: pointer;
        border-radius: 4px;
        background-color: ${isWhite ? theme.color.gray.white : theme.color.gray.w100};
      `}
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/stock/${stockcode}`);
      }}
    >
      <Stock>{stockname}</Stock>{' '}
      <Ratio ratio={Number(stockRatio)}>
        {signFormat(Number(stockRatio))}
        {(Math.round(stockRatio * 100) / 100).toFixed(2)}%
      </Ratio>
    </Button>
  );
}
