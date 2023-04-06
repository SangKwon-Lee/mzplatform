import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import theme from '../../commons/theme';
import { arrowFormat, numberColorFormat, signFormat } from '../../commons/utils';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import { fetchStockTodayPrice } from '../../lib/redux/stocks';

interface Props {
  index: number;
  stockname: string;
  stockcode: string;
}

export default function PopularSearchListItem({ index, stockname, stockcode }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
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
    <div
      onClick={() => router.push(`/stock/${stockcode}`)}
      css={css`
        display: flex;
        padding: 10px ${theme.metrics.m6};
        border-radius: 56px;
        background-color: ${theme.color.gray.white};
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <div
          css={css`
            margin: 0 ${theme.metrics.m3} 0 0;
            color: ${theme.color.gray.w900};
            ${theme.fonts.s24_w200};
          `}
        >
          {index + 1}
        </div>
        <div
          css={css`
            color: ${theme.color.gray.w900};
            ${theme.fonts.s16_w700};
          `}
        >
          {stockname}
        </div>
      </div>
      <div
        css={css`
          display: flex;
          justify-content: space-between;
        `}
      >
        <div
          css={css`
            ${theme.fonts.s14_w400};
            color: ${numberColorFormat(stockRatio)};
          `}
        >
          {arrowFormat(stockRatio)}
          {signFormat(stockRatio)}
          {stockRatio}%
        </div>
      </div>
    </div>
  );
}
