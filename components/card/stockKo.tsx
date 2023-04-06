/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useState, useMemo, useEffect } from 'react';
import theme from '../../commons/theme';
import { arrowFormat, numberColorFormat, signFormat } from '../../commons/utils';
import { IndexValue, MarketIndex } from '../../commons/types';
import { motion } from 'framer-motion';
import FlipNumbers from 'react-flip-numbers';
import { priceToString } from '../../commons/utils';

interface Props {
  kospi: IndexValue;
  kosdaq: IndexValue;
  onSelectedChanged: (selected: MarketIndex) => void;
  onClick: (selected: string) => void;
}

export default function StockKoCard(props: Props) {
  const { kospi, kosdaq, onSelectedChanged, onClick } = props;
  const [selected, setSelected] = useState<MarketIndex>('kospi');

  useEffect(() => {
    onSelectedChanged(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const KospiAnimatedNumber = useMemo(
    () => (
      <FlipNumbers
        height={20.4}
        width={14.5}
        color={theme.color.gray.w900}
        background="white"
        play
        perspective={200}
        numbers={kospi && kospi.value ? priceToString(Number(kospi.value).toFixed(2)) : '0'}
      />
    ),
    [kospi],
  );

  const KosdaqAnimatedNumber = useMemo(
    () => (
      <FlipNumbers
        height={20.4}
        width={14.5}
        color={theme.color.gray.w900}
        background="white"
        play
        perspective={200}
        numbers={kosdaq && kosdaq.value ? priceToString(Number(kosdaq.value).toFixed(2)) : '0'}
      />
    ),
    [kosdaq],
  );

  return (
    <div
      css={css`
        display: flex;
        justify-content: space-evenly;
        margin: 0 0 ${theme.metrics.m8} 0;
        @media (max-width: 360px) {
          gap: 2px;
        }
      `}
    >
      {/* <Link href="/market/major/kospi/"> */}
      <div
        css={css`
          cursor: pointer;
          padding: ${theme.metrics.m4};
          background-color: ${selected === 'kospi' ? theme.color.gray.white : theme.color.gray.w100};
          min-width: 163px;
          height: 116px;
          border: ${selected === 'kospi' && `1px solid ${theme.color.primary.purple}`};
          border-radius: ${theme.metrics.m8};
        `}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => {
            setSelected('kospi');
            onClick('kospi');
          }}
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: center;
              position: relative;
            `}
          >
            <div
              css={css`
                height: 8px;
                width: 8px;
                background-color: ${selected === 'kospi' ? theme.color.chart.up : theme.color.gray.w400};
                margin: 0 ${theme.metrics.m2} 0 0;
                border-radius: 50%;
                position: relative;
                top: 0px;
              `}
            />
            <span
              css={css`
                ${theme.fonts.s16_w400};
                line-height: 1.6rem;
                color: #000000;
              `}
            >
              {'KOSPI'}
            </span>
          </div>
          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              css={css`
                height: 29px;
                margin-top: ${theme.metrics.m4};
              `}
              className={'flipNumber'}
            >
              {KospiAnimatedNumber}
            </div>
            <div
              css={{
                display: 'flex',
                margin: `${theme.metrics.m3} 0 0 0`,
              }}
            >
              <span
                css={css`
                  ${theme.fonts.s14_w400};
                  margin: 0 ${theme.metrics.m2} 0 0;
                  color: ${numberColorFormat(Number(kospi.diff))};
                `}
              >
                <>
                  {arrowFormat(Number(kospi.diff))}
                  {Math.abs(Number(kospi.diff.toFixed(2)))}
                </>
              </span>
              <span
                css={css`
                  ${theme.fonts.s14_w500};
                  color: ${numberColorFormat(Number(kospi.ratio))};
                `}
              >
                <>
                  {signFormat(Number(kospi.ratio))}
                  {(Math.round(kospi.ratio * 100) / 100).toFixed(2)}%
                </>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
      {/* </Link> */}
      {/* <Link href="/market/major/kosdaq"> */}
      <div
        css={css`
          cursor: pointer;
          padding: ${theme.metrics.m4};
          background-color: ${selected === 'kosdaq' ? theme.color.gray.white : theme.color.gray.w100};
          min-width: 163px;
          height: 116px;
          border: ${selected === 'kosdaq' && `1px solid ${theme.color.primary.purple}`};
          border-radius: ${theme.metrics.m8};
        `}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => {
            setSelected('kosdaq');
            onClick('kosdaq');
          }}
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
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
                height: 8px;
                width: 8px;
                background-color: ${selected === 'kosdaq' ? theme.color.chart.up : theme.color.gray.w400};
                margin: 0 ${theme.metrics.m2} 0 0;
                border-radius: 50%;
                position: relative;
                top: 0px;
              `}
            />
            <span
              css={css`
                ${theme.fonts.s16_w400};
                line-height: 1.6rem;
                color: #000000;
              `}
            >
              {'KOSDAQ'}
            </span>
          </div>

          <div
            css={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              css={css`
                height: 29px;
                margin-top: ${theme.metrics.m4};
              `}
              className={'flipNumber'}
            >
              {KosdaqAnimatedNumber}
            </div>
            <div
              css={{
                display: 'flex',
                margin: `${theme.metrics.m2} 0 0 0`,
              }}
            >
              <span
                css={css`
                  ${theme.fonts.s14_w400};
                  margin: 0 ${theme.metrics.m2} 0 0;
                  color: ${numberColorFormat(Number(kosdaq.diff))};
                `}
              >
                <>
                  {arrowFormat(Number(kosdaq.diff))}
                  {Math.abs(Number(kosdaq.diff.toFixed(2)))}
                </>
              </span>
              <span
                css={css`
                  ${theme.fonts.s14_w500};
                  color: ${numberColorFormat(Number(kosdaq.ratio))};
                `}
              >
                <>
                  {signFormat(Number(kosdaq.ratio))}
                  {(Math.round(kosdaq.ratio * 100) / 100).toFixed(2)}%
                </>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
      {/* </Link> */}
    </div>
  );
}
