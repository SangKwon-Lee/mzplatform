import styled from '@emotion/styled';
import { useAppDispatch } from '../../lib/redux/hooks';
import theme from '../../commons/theme';
import { IStockNews, INews } from '../../commons/types';
import { setNewsBottomSheet, closeNewsBottomSheet } from '../../lib/redux/bottomSheets';
import { css } from '@emotion/react';
import moment from 'moment';
import NoContentsImage from '../image/noContentsImage';
import { Button } from '@mui/material';

interface Props {
  stockNews: IStockNews[];
}

export default function StockNewsList(props: Props) {
  const { stockNews } = props;
  const dispatch = useAppDispatch();

  return (
    <StockNewsListContainer>
      <StockNewsListWrapper>
        {Array.isArray(stockNews) && stockNews.length > 0 ? (
          stockNews
            //@ts-ignore
            .sort((a: any, b: any) => new Date(b.time) - new Date(a.time))
            .map((data, index) => (
              <Button
                href={data.url}
                key={index}
                css={css`
                  display: flex;
                  padding: 0;
                  border-bottom: 1px solid ${theme.color.gray.w300};
                  cursor: pointer;
                `}
                target={'_blank'}
                onClick={() => {
                  // onClickNewsItem(data);
                }}
              >
                <StockNewsListTopWrapper>
                  <StockNewsListTitleWrapper>
                    <StockNewsListTitle>{data.title}</StockNewsListTitle>
                    <StockNewsListCompyWrapper>
                      <StockNewsListCompy>{data.mediaName}</StockNewsListCompy>
                      <StockNewsListTime>{moment(data.publishDate).add(9, 'hour').fromNow()}</StockNewsListTime>
                    </StockNewsListCompyWrapper>
                  </StockNewsListTitleWrapper>
                  {data.photo && <StockNewsListImg src={data.photo} />}
                </StockNewsListTopWrapper>
              </Button>
            ))
        ) : (
          <NoContentsImage text="뉴스 소식이 없어요." />
        )}
      </StockNewsListWrapper>
    </StockNewsListContainer>
  );
}

const StockNewsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const StockNewsBtnWrapper = styled.div`
  padding: ${theme.metrics.m6} ${theme.metrics.m4} 0px ${theme.metrics.m4};
`;
const StockNewsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const StockNewsListItemWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${theme.color.gray.w300};
  cursor: pointer;
`;

const StockNewsListTopWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin: ${theme.metrics.m6} ${theme.metrics.m4};
`;

const StockNewsListTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StockNewsListTitle = styled.div`
  display: flex;
  margin-bottom: ${theme.metrics.m4};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  ${theme.fonts.s16_w400};
`;
const StockNewsListCompyWrapper = styled.div`
  display: flex;
`;

const StockNewsListCompy = styled.div`
  display: flex;
  color: ${theme.color.gray.w600};
  ${theme.fonts.s12_w400};
`;
const StockNewsListTime = styled.div`
  display: flex;
  color: ${theme.color.gray.w500};
  ${theme.fonts.s12_w400};
  margin-left: ${theme.metrics.m1};
`;
const StockNewsListImg = styled.img`
  display: flex;
  min-height: 72px;
  max-width: 72px;
  max-height: 72px;
  margin-left: ${theme.metrics.m4};
  min-width: 72px;
  object-fit: cover;
  border: 1px solid ${theme.color.gray.w200};
  border-radius: 8px;
`;
