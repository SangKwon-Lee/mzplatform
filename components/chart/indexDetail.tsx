/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import theme from '../../commons/theme';
import { ReactStockChart } from '@innofin/react-stock-chart';
import ChartPeriodNav from '../nav/chartPeriod';
import { IStockPrice, ChartPeriod, MarketIndex, IIndexPrice } from '../../commons/types';
import { useAppSelector } from '../../lib/redux/hooks';
import { useRef, useState, useEffect, useMemo } from 'react';
import FlipNumbers from 'react-flip-numbers';
import { priceToString } from '../../commons/utils';
import { getNewPriceData } from '../../commons/utils';

interface Props {
  index: MarketIndex;
}

export default function IndexDetailChart({ index }: Props) {
  const container = useRef<null | HTMLInputElement>(null);
  const price: IIndexPrice =
    useAppSelector((state) => (index === 'kospi' ? state.indices.kospiPrice : state.indices.kosdaqPrice)) || ({} as IStockPrice);

  const [filteredPrice, setFilteredPrice] = useState<IIndexPrice>({} as IIndexPrice);
  const [period, setPeriod] = useState<ChartPeriod>('1M');
  const [chartWidth, setChartWidth] = useState(0);
  const [chartEnter, setChartEnter] = useState(false);
  const PriceAnimatedNumber = useMemo(
    () =>
      !chartEnter ? (
        <FlipNumbers
          height={25}
          width={18}
          color={theme.color.gray.w900}
          background="transparent"
          play
          perspective={200}
          numbers={priceToString(Number(price ? price.price : 0))}
        />
      ) : (
        <FlipNumbers
          height={25}
          width={18}
          color={theme.color.gray.w900}
          background="transparent"
          play
          perspective={200}
          numbers={priceToString(Number(filteredPrice ? filteredPrice.price : 0))}
        />
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [price.price, filteredPrice.price],
  );
  const ratio = !chartEnter ? price.ratio || 0 : filteredPrice.ratio || 0;
  const ratioColor = ratio > 0 ? theme.color.chart.up : ratio < 0 ? theme.color.chart.down : theme.color.gray.w500;

  useEffect(() => {
    if (container.current) {
      setChartWidth(container.current.offsetWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container.current]);

  const onChartEnter = (newPrice: number) => {
    const { newDiff, newRatio } = getNewPriceData({
      newPrice: newPrice,
      oldPrice: price.last,
      oldDiff: price.diff,
      oldRatio: price.ratio,
    });

    setFilteredPrice({
      ...price,
      price: newPrice,
      diff: newDiff,
      ratio: newRatio,
    });

    if (chartEnter === false) {
      setChartEnter(true);
    }
  };

  const onChartLeave = () => {
    setChartEnter(false);
  };

  return (
    <div
      css={css`
        max-width: 600px;
        text-align: center;
        margin: 0 auto;
      `}
    >
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: end;
          padding: ${theme.metrics.m10} ${theme.metrics.m4} 0 ${theme.metrics.m4};
        `}
      >
        <h1
          css={css`
            margin: 0;
            ${theme.fonts.s20_w500};
            line-height: 20px;
            margin-right: ${theme.metrics.m2};
          `}
        >
          {index === 'kospi' ? 'KOSPI' : 'KOSDAQ'}
        </h1>
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: row;
          align-items: end;
          padding: ${theme.metrics.m1} 0 0 ${theme.metrics.m4};
          margin-bottom: ${theme.metrics.m10};
        `}
        className="largeFlipNumber"
      >
        {PriceAnimatedNumber}
        <span
          css={css`
            ${theme.fonts.s14_w500};
            color: ${ratioColor};
            margin-left: ${theme.metrics.m4};
            margin-bottom: ${theme.metrics.m1};
          `}
        >
          {`${ratio}%`}
        </span>
      </div>
      <div
        ref={container}
        css={css`
          height: 270px;
          justify-content: center;
          display: flex;
        `}
      >
        {chartWidth !== 0 ? (
          <ReactStockChart
            onMouseEnter={onChartEnter}
            onMouseLeave={onChartLeave}
            width={chartWidth - 4 * 8}
            height={270}
            source={{ index }}
            period={period}
            fill={false}
          />
        ) : (
          <div
            css={css`
              height: 280px;
            `}
          ></div>
        )}
      </div>
      <ChartPeriodNav mode={'white'} selectedPeriod={period} setPeriod={setPeriod} />
    </div>
  );
}
