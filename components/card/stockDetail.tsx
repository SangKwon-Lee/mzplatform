import styled from '@emotion/styled';
import theme from '../../commons/theme';
import { IStockInfo } from '../../commons/types';
import { cdnStockLogoUrl, imageLoader, numberToKorean, priceToString } from '../../commons/utils';
import StockImage from '../image/stockImage';

interface Props {
  stockDetail: IStockInfo;
}

export default function StockDetailCard(props: Props) {
  const { stockDetail } = props;
  const { stockInfo } = stockDetail;
  return (
    <>
      <StockInfoContainer>
        <StockInfoTopWrapper>
          <StockImage
            src={cdnStockLogoUrl(stockInfo.code)}
            width={48}
            style={{
              maxWidth: 48,
              maxHeight: 48,
              borderRadius: '50%',
              marginRight: theme.metrics.m2,
            }}
            height={48}
            alt={stockInfo.code}
            loader={imageLoader}
          />
          <StockInfoTitleWrapper>
            <StockInfoTitle>{stockInfo.name}</StockInfoTitle>
            <StockInfoStockNumWrapper>
              <StockInfoStockNum>{stockInfo.code}</StockInfoStockNum>
              <StockInfoStockNumDivide />
              <StockInfoStockNum>{stockInfo.market}</StockInfoStockNum>
            </StockInfoStockNumWrapper>
          </StockInfoTitleWrapper>
        </StockInfoTopWrapper>
        <StockInfoGrayWrapper>
          {stockInfo?.ceo && (
            <StockInfoGrayTextWrapper>
              <StockInfoGrayText>대표이사</StockInfoGrayText>
              <StockInfoGrayTextRight>{stockInfo.ceo}</StockInfoGrayTextRight>{' '}
            </StockInfoGrayTextWrapper>
          )}
          {stockDetail?.marketInfo?.mktCap && (
            <StockInfoGrayTextWrapper>
              <StockInfoGrayText>시가총액</StockInfoGrayText>
              <StockInfoGrayTextRight>{numberToKorean(stockDetail?.marketInfo?.mktCap)}원</StockInfoGrayTextRight>
            </StockInfoGrayTextWrapper>
          )}
          {stockDetail?.marketInfo?.mktCap && (
            <StockInfoGrayTextWrapper>
              <StockInfoGrayText>발행주식주</StockInfoGrayText>
              <StockInfoGrayTextRight>{priceToString(stockInfo?.shares)}주</StockInfoGrayTextRight>
            </StockInfoGrayTextWrapper>
          )}
        </StockInfoGrayWrapper>
        {/* <StockInfoDescription>
          한국 및 DX부문 해외 9개 지역총괄과 DS부문 해외 5개 지역총괄, SDC, Harman 등 233개의 종속기업으로 구성된 글로벌 전자기업임. 세트사업(DX)에는
          TV, 냉장고 등을 생산하는 CE부문과 스마트폰, 네트워크시스템, 컴퓨터 등을 생산하는 IM부문이 있음. 부품사업(DS)에서는 D램, 낸드 플래쉬,
          모바일AP 등의 제품을 생산하는 반도체 사업과 TFT-LCD 및 OLED 디스플레이 패널을 생산하는 DP사업으로 구성됨.
        </StockInfoDescription> */}
      </StockInfoContainer>
      <StockItemDivider />
    </>
  );
}

const StockInfoContainer = styled.div`
  padding: ${theme.metrics.m8} ${theme.metrics.m4};
  display: flex;
  background-color: white;
  flex-direction: column;
`;

const StockInfoTopWrapper = styled.div`
  display: flex;
  /* margin-bottom: ${theme.metrics.m8}; */
  align-items: center;
`;
const StockInfoTitleImg = styled.img`
  min-width: 48px;
  min-height: 48px;
  border-radius: 50%;
  background-color: ${theme.color.chart.up};
`;
const StockInfoTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: ${theme.metrics.m2};
`;
const StockInfoTitle = styled.div`
  ${theme.fonts.s16_w700};
  margin-bottom: ${theme.metrics.m2};
`;
const StockInfoStockNumWrapper = styled.div`
  display: flex;
`;
const StockInfoStockNum = styled.div`
  ${theme.fonts.s14_w400};
  color: ${theme.color.gray.w600};
`;
const StockInfoStockNumDivide = styled.div`
  height: auto;
  border-right: 1px solid ${theme.color.gray.w600};
  margin: 0px ${theme.metrics.m2};
`;

const StockInfoGrayWrapper = styled.div`
  padding: ${theme.metrics.m6};
  background-color: ${theme.color.gray.w100};
  display: flex;
  flex-direction: column;
  border-radius: ${theme.metrics.m8};
  gap: ${theme.metrics.m2};
  margin-bottom: ${theme.metrics.m8};
  margin-top: ${theme.metrics.m9};
`;
const StockInfoGrayTextWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const StockInfoGrayText = styled.div`
  color: ${theme.color.gray.w600};
  ${theme.fonts.s16_w400};
  flex: 0.7;
`;
const StockInfoGrayTextRight = styled.div`
  ${theme.fonts.s16_w500};
  flex: 1;
  text-align: left;
`;

const StockInfoDescription = styled.div`
  ${theme.fonts.s16_w400};
  /* line-height:2.6rem ; */
  color: ${theme.color.gray.w700};
`;

const StockItemDivider = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${theme.color.gray.w100};
`;
