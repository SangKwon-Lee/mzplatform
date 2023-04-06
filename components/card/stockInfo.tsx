import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import theme from '../../commons/theme';
import images from '../../commons/theme/images';
import { IStockInfo } from '../../commons/types';
import { cdnStockLogoUrl, imageLoader } from '../../commons/utils';
import TagChip from '../chip/tag';
import NoContentsImage from '../image/noContentsImage';
import StockImage from '../image/stockImage';

interface Props {
  stockInfo: IStockInfo;
}
export default function StockInfoCard(props: Props) {
  const { stockInfo } = props;
  const { stockcode, stockname, tags, info } = stockInfo;
  const router = useRouter();
  return (
    <StockContentsContainer id="기업정보">
      {stockcode ? (
        <>
          <StockContentsItemWrapper>
            <StockContentsTopWrapper onClick={() => router.push(`${stockcode}/info`)}>
              <StockContentsTopLeftWrapper>
                <StockImage
                  src={cdnStockLogoUrl(stockcode)}
                  width={48}
                  style={{
                    maxWidth: 48,
                    maxHeight: 48,
                    borderRadius: '50%',
                    marginRight: theme.metrics.m2,
                  }}
                  height={48}
                  alt={stockcode}
                  loader={imageLoader}
                />
                <StockContentsNameWrapper>
                  <StockContentsName>{stockname}</StockContentsName>
                  <StockContentsSubInfoWrapper>
                    <StockContentsSubInfo>{`국내`}</StockContentsSubInfo>
                    <StockContentsSubInfoDivide />
                    <StockContentsSubInfo>{stockcode}</StockContentsSubInfo>
                    <StockContentsSubInfoDivide />
                    <StockContentsSubInfo>{info?.category}</StockContentsSubInfo>
                  </StockContentsSubInfoWrapper>
                </StockContentsNameWrapper>
              </StockContentsTopLeftWrapper>
              <Image
                loader={imageLoader}
                style={{ cursor: 'pointer' }}
                src={`/${images.rightArrow}`}
                height={13}
                alt="rightArrow"
                width={12}
                onClick={() => router.push(`${stockcode}/info`)}
              />
            </StockContentsTopWrapper>
            {/* <StockContentsText>
          {`${stockname}은/는 대한민국의 최대 규모 다국적 기업이다. 2021년 기준
            자본총액 기준 재계서열 1위로, 그외의 시가총액 등 기업 평가 요소의 모든
            영역에서 2위 그룹과 압도적 격차를 보인다. 단순히 기업의 규모를
            자랑한다`}
        </StockContentsText> */}
            <div
              css={css`
                margin-left: ${'-' + theme.metrics.m4};
                margin-right: ${'-' + theme.metrics.m4};
              `}
            >
              {Array.isArray(tags) && tags.length > 0 && <TagChip size={14} Tags={tags} />}
            </div>
          </StockContentsItemWrapper>
          <StockItemDivider />
        </>
      ) : (
        <>
          <NoContentsImage text="기업 정보가 없어요." />
        </>
      )}
    </StockContentsContainer>
  );
}

const StockContentsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StockContentsItemWrapper = styled.div`
  width: 100%;
  padding: ${theme.metrics.m8} ${theme.metrics.m4};
  display: flex;
  flex-direction: column;
`;

const StockContentsTopWrapper = styled(Button)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  margin-bottom: ${theme.metrics.m6};
  cursor: pointer;
`;

const StockContentsTopLeftWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const StockContentsImg = styled.img`
  width: 48px;
  height: 48px;
  background-color: ${theme.color.chart.up};
  margin-right: ${theme.metrics.m2};
  border-radius: 50%;
`;

const StockContentsNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StockContentsName = styled.div`
  color: ${theme.color.gray.w900};
  ${theme.fonts.s16_w700}
  text-align:left;
  margin-bottom: ${theme.metrics.m2};
`;

const StockContentsSubInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StockContentsSubInfo = styled.div`
  color: ${theme.color.gray.w600};
  ${theme.fonts.s14_w400};
`;
const StockContentsSubInfoDivide = styled.div`
  width: 1px;
  height: auto;
  border-right: 1px solid ${theme.color.gray.w400};
  margin: 0px ${theme.metrics.m2};
`;

const StockContentsText = styled.div`
  ${theme.fonts.s16_w400};
  color: ${theme.color.gray.w700};
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: keep-all;
`;

const StockItemDivider = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${theme.color.gray.w300};
`;
