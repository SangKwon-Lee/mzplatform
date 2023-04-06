import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import theme from '../../commons/theme';
import { IStockNews } from '../../commons/types';
import { imageLoader } from '../../commons/utils';
import { css } from '@emotion/react';
import moment from 'moment';
import NoContentsImage from '../image/noContentsImage';
import { Button } from '@mui/material';
import { apiServer } from '../../lib/api';

// const sortArr = [
//   {
//     value: '뉴스',
//     text: '뉴스',
//   },
//   {
//     value: '공시',
//     text: '공시',
//   },
// ];

export default function StockComponyInfoCard() {
  const router = useRouter();
  const { stockcode } = router.query;
  const [stockNews, setStockNews] = useState<IStockNews[]>([]);

  //* 뉴스 정보 불러오기
  const handleGetStockNews = useCallback(async () => {
    try {
      const { data, status } = await apiServer.get(`/stock/${stockcode}/news?limit=3`);
      if (status === 200) {
        setStockNews(data);
      }
    } catch (e) {}
  }, [stockcode]);
  useEffect(() => {
    if (stockcode) {
      handleGetStockNews();
    }
  }, [handleGetStockNews, stockcode]);

  // // *바텀시트 관리
  // //! 현재는 임시 비활성화입니다. iframe 문제
  // const [openSheet, setOpenSheet] = useState(false);

  // const handleOpenSheet = () => {
  //   dispatch(closeNewsBottomSheet());
  // };

  // const onClickNewsItem = (news: IStockNews) => {
  //   dispatch(
  //     setNewsBottomSheet({
  //       title: news.title,
  //       summary: news.summarized,
  //       openSheet: true,
  //       handleOpenSheet: handleOpenSheet,
  //       url: news.url,
  //       photo: news.photo || '',
  //       publishDate: news.publishDate,
  //       media: news.mediaName,
  //     }),
  //   );
  // };

  return (
    <>
      <StockCompoanyInfoWrapper id="회사소식">
        <div>
          <StockCompoanyInfoTitle onClick={() => router.push(`/stock/${router.query.stockcode}/news`)}>
            회사 소식
            <Image
              loader={imageLoader}
              src="/images/rightArrow.svg"
              width={12}
              height={12}
              style={{ marginLeft: theme.metrics.m2 }}
              alt="rightArrow"
            />
          </StockCompoanyInfoTitle>
        </div>
        {/* <SortBtnArraySelect SortArray={sortArr} btnValue={btnValue} handleBtnValue={handleBtnValue} /> */}
        <StockNewsWrapper>
          {Array.isArray(stockNews) && stockNews.length > 0 ? (
            stockNews.map((data, index) => (
              <Button
                css={css`
                  display: flex;
                  padding: ${theme.metrics.m6} 0px;
                  border-bottom: 1px solid ${theme.color.gray.w300};
                  justify-content: space-between;
                  cursor: pointer;
                `}
                href={data.url}
                target="_blank"
                style={{ borderBottom: index !== stockNews.length - 1 ? `1px solid ${theme.color.gray.w300}` : 'none' }}
                onClick={() => {
                  // onClickNewsItem(data);
                }}
                key={data.url + index}
              >
                <StockNewsTitleWrapper>
                  <StockNewsTitle>{data.title}</StockNewsTitle>
                  <StockNewsCompWrapper>
                    <StockNewsComp>{data.mediaName}</StockNewsComp>
                    <StockNewsTime>{moment(data.created_at).fromNow()}</StockNewsTime>
                  </StockNewsCompWrapper>
                </StockNewsTitleWrapper>
                {data.photo && <StockNewsImg src={data.photo} />}
              </Button>
            ))
          ) : (
            <NoContentsImage text="회사 소식이 없어요." />
          )}
        </StockNewsWrapper>
      </StockCompoanyInfoWrapper>
      <StockDivider />
    </>
  );
}

const StockCompoanyInfoWrapper = styled.div`
  width: 100%;
  padding: ${theme.metrics.m8} ${theme.metrics.m4};
  display: flex;
  flex-direction: column;
`;

const StockCompoanyInfoTitle = styled.div`
  ${theme.fonts.s20_w500};
  color: ${theme.color.gray.w800};
  display: inline-block;
  align-items: center;
  cursor: pointer;
  margin-bottom: ${theme.metrics.m4};
`;

const StockDivider = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${theme.color.gray.w300};
`;

const StockNewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StockNewsItemWrapper = styled.div`
  display: flex;
  padding: ${theme.metrics.m6} 0px;
  border-bottom: 1px solid ${theme.color.gray.w300};
  justify-content: space-between;
  cursor: pointer;
`;

const StockNewsTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StockNewsTitle = styled.div`
  ${theme.fonts.s16_w400};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: keep-all;
  margin-bottom: ${theme.metrics.m4};
  cursor: pointer;
`;

const StockNewsImg = styled.img`
  min-width: 72px;
  max-width: 72px;
  min-height: 72px;
  max-height: 72px;
  margin-left: ${theme.metrics.m4};
  border-radius: 8px;
  background-color: white;
  cursor: pointer;
`;

const StockNewsCompWrapper = styled.div`
  display: flex;
`;
const StockNewsComp = styled.div`
  ${theme.fonts.s12_w500};
  color: ${theme.color.gray.w600};
  margin-right: ${theme.metrics.m1};
`;
const StockNewsTime = styled.div`
  ${theme.fonts.s12_w400};
  color: ${theme.color.gray.w500};
`;

// const StockNewsNoData = styled.div`
//   ${theme.fonts.s16_w500}
//   text-align: center;
//   padding: ${theme.metrics.m4};
// `;
