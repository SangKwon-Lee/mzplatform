/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import theme from '../../commons/theme';
import { INews } from '../../commons/types';
import Image from 'next/image';
import StockChip from '../chip/stock';
import { imageLoader } from '../../commons/utils';
import dayjs from 'dayjs';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
dayjs.extend(relativeTime);

const itemAnimationVariants = {
  hidden: { opacity: 0, marginTop: '32px' },
  visible: { opacity: 1, marginTop: '0px', transition: { duration: 0.5 } },
};

interface Props {
  onClickNewsItem: (news: INews) => void;
  isRound: boolean;
  news: INews;
  isBorder?: boolean;
}

export default function NewsListItem({ news, onClickNewsItem, isRound, isBorder = false }: Props) {
  const [ref, inView] = useInView();
  const animationControls = useAnimation();
  const router = useRouter();

  useEffect(() => {
    if (inView) {
      animationControls.start('visible');
    }
  }, [animationControls, inView]);

  return (
    <motion.div
      ref={ref}
      viewport={{ once: true }}
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
        position: relative;
      `}
    >
      <div
        // href={news.url}
        // target="_blank"
        onClick={() => {
          window.open(news.url);
          // onClickNewsItem(news);
        }}
        css={{
          cursor: 'pointer',
          display: 'flex',
          gap: `${theme.metrics.m4}`,
          justifyContent: 'space-between',
        }}
      >
        <div css={TitleSource}>
          <div css={Title}>{news.title}</div>
          <div css={SourceTime}>
            <div css={Source}>{news.mediaName}</div>
            <div css={Time}>{dayjs(news.publishDate).add(9, 'hour').locale('ko').fromNow()}</div>
          </div>
        </div>
        {news.photo ? (
          <div
            css={css`
              background-image: url(${news.photo});
              background-position: center;
              background-size: cover;
              min-width: 72px;
              max-height: 72px;
              border-radius: ${theme.metrics.m2};
              border: 1px solid #adb5bd;
              display: flex;
              align-items: flex-end;
            `}
          >
            {news.similarNewsList && Array.isArray(news.similarNewsList) && news.similarNewsList.length > 0 ? (
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/market/headline/${news.id}`);
                }}
                css={css`
                  display: flex;
                  column-gap: 3px;
                  margin-left: auto;
                  cursor: pointer;
                  background: rgba(33, 37, 41, 0.4);
                  border-radius: 8px;
                  color: ${theme.color.gray.white};
                  ${theme.fonts.s12_w400};
                  padding: 4px 6px;
                  z-index: 1;
                `}
              >
                <Image loader={imageLoader} src="/images/news_link.svg" alt="link icon" width={10} height={10} />
                <div
                  css={css`
                    ${theme.fonts.s12_w400}
                    color: ${theme.color.gray.white};
                  `}
                >
                  {news.similarNewsList.length}
                </div>
              </div>
            ) : null}
            {/* <Image
              loader={imageLoader}
              css={{ borderRadius: `${theme.metrics.m2}`, objectFit: 'cover', border: '1px solid #E9ECEF' }}
              src={news.photo}
              alt="thumbnail img url"
              width={72}
              height={72}
            /> */}
          </div>
        ) : null}
      </div>
      <div
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: `${theme.metrics.m1} ${theme.metrics.m2}`,
        }}
      >
        {/* //* 종목이 5개 이상 오더라도 최대 5개만 보여질 수 있도록 한다. */}
        {news.stockList?.map(
          (data: any, index: number) => index < 5 && <StockChip key={index} stockname={data.stockName} stockcode={data.stockCode} />,
        )}
      </div>
    </motion.div>
  );
}
const TitleSource = css`
  display: flex !important;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${theme.metrics.m4};
  margin: 0 0 ${theme.metrics.m4} 0;
`;

const Title = css`
  ${theme.fonts.s16_w400};
  color: ${theme.color.gray.w900};
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  line-clamp: 2 !important;
  -webkit-box-orient: vertical;
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
  color: ${theme.color.gray.w500};
`;
