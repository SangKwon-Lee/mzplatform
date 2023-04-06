/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import theme from '../../commons/theme';
import { ISimilarNews } from '../../commons/types';
import Image from 'next/image';
import StockChip from '../chip/stock';
import { imageLoader } from '../../commons/utils';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
dayjs.extend(relativeTime);

const itemAnimationVariants = {
  hidden: { opacity: 0, marginTop: '32px' },
  visible: { opacity: 1, marginTop: '0px', transition: { duration: 0.5 } },
};

interface Props {
  onClickNewsItem: (news: ISimilarNews) => void;
  isRound: boolean;
  similarNews: ISimilarNews;
  isBorder?: boolean;
}

export default function SimilarNewsListItem({ similarNews, onClickNewsItem, isRound, isBorder = false }: Props) {
  const [ref, inView] = useInView();
  const animationControls = useAnimation();

  useEffect(() => {
    if (inView) {
      animationControls.start('visible');
    }
  }, [animationControls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={animationControls}
      initial="hidden"
      variants={itemAnimationVariants}
      css={css`
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: ${theme.color.gray.white};
        padding: ${theme.metrics.m6} ${theme.metrics.m4};
        border-radius: ${isRound ? theme.metrics.m8 : '0'};
        margin-bottom: 2px;
        border-width: ${isBorder ? '0 0 1px 0' : 0};
        border-color: ${theme.color.gray.w200};
        border-style: solid;
      `}
    >
      <div
        onClick={() => {
          // onClickNewsItem(similarNews)
          window.open(similarNews.url);
        }}
        css={{
          cursor: 'pointer',
          display: 'flex',
          gap: `${theme.metrics.m4}`,
          justifyContent: 'space-between',
        }}
      >
        <div css={TitleSource}>
          <div css={Title}>{similarNews.title}</div>
          <div css={SourceTime}>
            <div css={Source}>{similarNews.mediaName}</div>
            <div css={Time}>{dayjs(similarNews.publishDate).add(9, 'hour').locale('ko').fromNow()}</div>
          </div>
        </div>
        {similarNews.photo ? (
          <Image
            loader={imageLoader}
            css={{ borderRadius: `${theme.metrics.m2}`, objectFit: 'cover' }}
            src={similarNews.photo}
            alt="thumbnail img url"
            width={72}
            height={72}
          />
        ) : null}
      </div>
      <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: `${theme.metrics.m1} ${theme.metrics.m2}`,
        }}
      >
        <StockChip stockname={similarNews.stockName} stockcode={similarNews.stockCode} />
      </div>
    </motion.div>
  );
}
const TitleSource = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${theme.metrics.m4};
  margin: 0 0 ${theme.metrics.m4} 0;
`;

const Title = css`
  ${theme.fonts.s16_w400};
  color: ${theme.color.gray.w900};
`;

const SourceTime = css`
  ${theme.fonts.s12_w400};
  display: flex;
  gap: ${theme.metrics.m1};
`;

const Source = css`
  font-weight: 500;
  color: ${theme.color.gray.w600};
`;

const Time = css`
  font-weight: 400;
  color: ${theme.color.gray.w400};
`;
