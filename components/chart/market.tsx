/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import theme from '../../commons/theme';
import { ReactStockChart } from '@innofin/react-stock-chart';
import ChartPeriodNav from '../../components/nav/chartPeriod';
import { MarketIndex, IStockPrice, ChartPeriod, ChartStatus } from '../../commons/types';
import { useAppSelector } from '../../lib/redux/hooks';
import { useRef, useState } from 'react';
import ActivityIndicator from '../indicator/activity';

import { motion, useAnimation } from 'framer-motion';

const chartAnimationVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

interface Props {
  chartIndex: MarketIndex;
  chartWidth: number;
  onChartEnter: (price: number) => void;
  onChartLeave: () => void;
}

export default function MarketChart({ chartIndex, chartWidth, onChartEnter, onChartLeave }: Props) {
  const animationControls = useAnimation();
  const [period, setPeriod] = useState<ChartPeriod>('1M');
  const [chartLoaded, setChartLoaded] = useState<boolean>(false);

  const onChartLoaded = (loaded: ChartStatus) => {
    if (loaded.status === true) {
      setChartLoaded(true);
      animationControls.start('visible');
    }
  };

  return (
    <>
      <div
        css={css`
          height: 270px;
          min-height: 270px;
          justify-content: center;
          display: flex;
          margin: 0 0 ${theme.metrics.m4} 0;
        `}
      >
        <motion.div initial={'hidden'} animate={animationControls} variants={chartAnimationVariants} transition={{ ease: 'easeOut', duration: 1 }}>
          <ReactStockChart
            onMouseEnter={onChartEnter}
            onMouseLeave={onChartLeave}
            width={chartWidth}
            height={270}
            source={{ index: chartIndex }}
            period={period}
            onLoadEnd={onChartLoaded}
            fill={false}
          />
        </motion.div>
        {!chartLoaded ? <ActivityIndicator containerHeight={100} /> : null}
      </div>
      <ChartPeriodNav selectedPeriod={period} setPeriod={setPeriod} mode={'gray'} />
    </>
  );
}
