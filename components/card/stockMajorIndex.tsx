/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import theme from '../../commons/theme';

interface Props {
  data: [
    jnilClose: string | number,
    price: string | number,
    high: string | number,
    low: string | number,
    volume: string | number,
    trans: string | number,
  ];
}

export default function StockMajorIndexCard(props: Props) {
  const { data } = props;
  const dataSet = [
    { value: data[0], name: '전일' },
    { value: data[1], name: '시가' },
    { value: data[2], name: '고가' },
    { value: data[3], name: '저가' },
    { value: data[4], name: '거래량(천주)' },
    { value: data[5], name: '거래대금(백만원)' },
  ];
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        background-color: ${theme.color.primary.purple06};
        min-width: 140px;
        min-height: 70px;
        border-radius: ${theme.metrics.m2};
        padding: ${theme.metrics.m4} ${theme.metrics.m6} ${theme.metrics.m4};
        ${theme.metrics.m4};
        gap: ${theme.metrics.m2};
      `}
    >
      {dataSet.map((data, index) => (
        <div key={index}>
          <div
            css={css`
              color: ${theme.color.gray.w600};
              ${theme.fonts.s14_w400}
            `}
          >
            {data.name}
          </div>
          <div
            css={css`
              ${theme.fonts.s20_w400}
              color: ${theme.color.gray.w800};
            `}
          >
            {data.value}
          </div>
        </div>
      ))}
    </div>
  );
}
