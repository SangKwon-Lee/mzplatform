/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import theme from '../../commons/theme'; // requires a loader
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import { fetchNews } from '../../lib/redux/news';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { INews } from '../../commons/types';
import { setNewsBottomSheet, closeNewsBottomSheet } from '../../lib/redux/bottomSheets';
import CarouselImage from '../image/carouselImage';
import Image from 'next/image';
import router from 'next/router';
import StockChip from '../chip/stock';
import Link from 'next/link';

const TitleSource = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: ${theme.metrics.m4};
  margin: 0 0 ${theme.metrics.m4} 0;
`;

const Title = css`
  font-size: 18px;
  line-height: 130%;
  font-weight: 500;
  color: ${theme.color.gray.w900};
  text-overflow: ellipsis !important;
  overflow: hidden !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  line-clamp: 2 !important;
  -webkit-box-orient: vertical;
`;

const SourceTime = css`
  display: flex;
  ${theme.fonts.s12_w400}
  gap: ${theme.metrics.m1};
  line-height: 100%;
`;

const Source = css`
  font-weight: 500;
  color: ${theme.color.gray.w600};
`;

const Time = css`
  font-weight: 400;
  color: ${theme.color.gray.w400};
`;

export default function HeadlineNewsList() {
  const [title, setTitle] = useState('');
  const [openSheet, setOpenSheet] = useState(false);
  const container = useRef<null | HTMLInputElement>(null);
  const [viewWidth, setViewWidth] = useState<number | undefined>(undefined);
  const news = useAppSelector((state) => state.news.news);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!news || news.length === 0) {
      dispatch(fetchNews());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [news]);

  useEffect(() => {
    if (container.current) {
      setViewWidth(container.current.offsetWidth);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container.current]);

  const handleOpenSheet = () => {
    dispatch(closeNewsBottomSheet());
  };

  const onClickCarouselItem = (news: INews) => {
    dispatch(
      setNewsBottomSheet({
        title: news.title,
        summary: news.summarized,
        openSheet: true,
        handleOpenSheet: handleOpenSheet,
        url: news.url,
        photo: news.photo || '',
        publishDate: news.publishDate,
        media: news.mediaName,
      }),
    );
  };

  return (
    <>
      <div
        css={css`
          padding: ${theme.metrics.m6} 0 0 0;
          margin: 0 0 ${theme.metrics.m6} 0;
        `}
      >
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={16}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          autoplay={{
            delay: 3000,
          }}
        >
          {news.slice(0, 3).map((data, index) => {
            return (
              <SwiperSlide key={data.id}>
                <Link
                  href={data.url}
                  target="_blank"
                  onClick={() => {
                    // onClickCarouselItem(data);
                  }}
                  css={css`
                    display: block;
                    width: 100%;
                    height: 375px;
                    border-radius: 32px;
                    background-color: #ffffff;
                    position: relative;
                  `}
                >
                  {data.similarNewsList && data.similarNewsList.length > 0 ? (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/market/headline/${data.id}`);
                      }}
                      css={css`
                        display: flex;
                        align-items: center;
                        position: absolute;
                        top: 10%;
                        left: 85%;
                        @media (max-width: 360px) {
                          left: 80%;
                        }
                        cursor: pointer;
                        background: rgba(33, 37, 41, 0.4);
                        border-radius: 8px;
                        color: ${theme.color.gray.white};
                        ${theme.fonts.s12_w400};
                        padding: 4px 6px;
                      `}
                    >
                      <Image
                        css={css`
                          max-height: 12px;
                          margin: 0 3px 0 0;
                        `}
                        src="/images/news_link.svg"
                        alt="link icon"
                        height={5}
                        width={5}
                      />
                      {data.similarNewsList.length}
                    </div>
                  ) : null}

                  <CarouselImage src={data.photo} alt="headline image" />
                  <div
                    css={{
                      padding: `0 ${theme.metrics.m6} ${theme.metrics.m6} ${theme.metrics.m6}`,
                    }}
                  >
                    <div css={TitleSource}>
                      <div css={Title}>{data.title}</div>
                      <div css={SourceTime}>
                        <div css={Source}>{data.mediaName}</div>
                        <div css={Time}>{dayjs(data.publishDate).add(9, 'hour').locale('ko').fromNow()}</div>
                      </div>
                    </div>
                    <div
                      css={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: `${theme.metrics.m1} ${theme.metrics.m2}`,
                      }}
                    >
                      {data.stockList.map(
                        (data, index) => index < 5 && <StockChip key={index} stockcode={data.stockCode} stockname={data.stockName} />,
                      )}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
