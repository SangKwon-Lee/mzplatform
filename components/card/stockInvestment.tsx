import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import theme from '../../commons/theme';
import { IStockInfo } from '../../commons/types';
import { priceToString } from '../../commons/utils';
import StockBottomSheetNav from '../nav/StockBottomSheet';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, LineElement, Legend, LineController, BarController, PointElement } from 'chart.js';
import NoContentsImage from '../image/noContentsImage';
import BarChart from '../chart/bar';

ChartJS.register(LinearScale, CategoryScale, BarElement, LineElement, LineController, BarController, Legend, PointElement, ChartDataLabels);
interface Props {
  stockInfo: IStockInfo;
}

export default function StockInvestmentInfoCard(props: Props) {
  const { stockInfo } = props;
  const { info } = stockInfo;
  //*웹에서 마우스 드래그 가능
  const list = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(list);
  //* 바텀시트
  const [openSheet, setOpenSheet] = useState(false);
  const [sheetContents, setSheetContents] = useState({
    title: '',
    subTitle: '',
    boldText: '',
    description: [{ text: '', style: '16' }],
    subText: '',
  });

  const handleOpenSheet = () => {
    setOpenSheet(() => !openSheet);
  };

  const handleSheetContents = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    handleOpenSheet();
    //@ts-ignore
    if (e.target.id === 'PER') {
      setSheetContents({
        ...sheetContents,
        title: 'PER이란?',
        subTitle: '주가 수익 비율, Price Earning Ratio',
        boldText: 'PER = 주가 / 주당 순이익',
        description: [
          {
            text: '∙ PER이 낮으면 벌어들인 순이익에 비해 주가가 저평가됐다는 뜻이에요. 저PER 주식은 앞으로 주가가 오를 가능성이 있으니 관심을 둘 만해요.',
            style: '16',
          },
          {
            text: '∙ 하지만 늘 그런 건 아니니 유의하세요. 기업 경쟁력이 약화되어 PER이 낮아질 때도 있거든요. 또 업종마다 평균 PER은 다 달라요. 투자하기 전에 산업별 평균 PER 추이를 꼭 확인하세요.',
            style: '16',
          },
        ],

        subText: '주가가 1주당 순이익의 몇 배인지 알 수 있어요.',
      });
      //@ts-ignore
    } else if (e.target.id === 'PBR') {
      setSheetContents({
        ...sheetContents,
        title: 'PBR이란?',
        subTitle: '주가 순자산 비율, Price Book Value Ratio',
        boldText: `PBR = 주가 / 주당 순자산 \n  = 시가총액 / 순자산총액`,
        description: [
          {
            text: '∙ PBR이 1보다 작으면 자산 규모에 비해 주가가 저렴한 거예요. 할인 판매 중인 거죠. 따라서 저PBR 주식은 앞으로 주가가 오를 가능성이 커요. 반면 고PBR이면 비싼 주식이죠.',
            style: '16',
          },
          {
            text: '∙ PBR < 1 : 이 회사의 순자산을 다 팔면 내 투자금을 회수하고도 돈이 남아요.',
            style: '14',
          },
          {
            text: '∙ 저PBR 주식이 항상 저평가라는 뜻은 아니니 유의하세요. 기업 경쟁력이 떨어져서 PBR이 낮을 때도 있거든요.',
            style: '16',
          },
          {
            text: '∙ 업종마다 평균 PBR은 다 달라요. 투자하기 전에 꼭 확인하세요. 공장이나 토지가 필요한 제조업은 PBR이 낮은 편이고, 인터넷 기업처럼 제조 설비가 필요 없는 업종은 PBR이 높답니다.',
            style: '16',
          },
        ],
        subText: '주가가 1주당 순자산의 몇 배인지 보여줘요.',
      });
    } else {
      setSheetContents({
        ...sheetContents,
        title: 'ROE란?',
        subTitle: '자기 자본 이익률, Return On Equity',
        boldText: 'ROE = 당기순이익 / 평균자기자본 × 100',
        description: [
          {
            text: '· ROE는 자본을 얼마나 효율적으로 써서 돈을 버는지 알려줘요. 시중금리보다는 높아야 투자할 만하다는 뜻이고요.',
            style: '16',
          },
          {
            text: '*ROE가 3%인 주식이라면, 그 돈으로 그냥 금리 5%짜리 은행 예금을 하는 게 나아요.',
            style: '14',
          },
          {
            text: '· ROE는 높을수록 좋아요. ROE 5%인 기업보다 ROE 20%인 기업이 돈을 훨씬 잘 버는 거예요.',
            style: '16',
          },
          {
            text: '· 업종마다 평균 ROE는 다 달라요. 투자하기 전에 꼭 확인하세요. 공장이나 토지가 필요한 제조업은 ROE가 상대적으로 낮은 편이에요. 인터넷기업처럼 제조 설비가 필요 없는 업종은 ROE가 높답니다(대개 두 자릿수 이상).',
            style: '16',
          },
        ],
        subText: '투입한 자본으로 이익을 얼마나 잘 올리는지 보여줘요.',
      });
    }
  };
  return (
    <>
      <StockInvestmentWrapper id="투자정보">
        <StockInvestmentTitle>투자 정보</StockInvestmentTitle>
        <StockInvestmentInfoWrapper ref={list} {...events}>
          {!info?.per && !info?.pbr && !info?.roe && !info?.dividend && !info.dividendYield && !info?.netPurchasePriceCompany && (
            <NoContentsImage height="100" text="투자 지표 정보가 없어요." />
          )}
          {!info?.per && !info?.pbr && !info?.roe ? (
            <div></div>
          ) : (
            <StockInvestmentInfoBox>
              <StockInvestmentInfoTitleWrapper>
                <StockInvestmentInfoTitle>투자지표</StockInvestmentInfoTitle>
                <StockInvestmentInfoTime>오늘 {dayjs().format('HH:MM')} 기준</StockInvestmentInfoTime>
              </StockInvestmentInfoTitleWrapper>
              <StockInvestmentInfoPerWrapper>
                {info?.per && (
                  <StockInvestmentInfoPer>
                    <StockInvestmentInfoPerTitle id="PER" onClick={handleSheetContents}>
                      PER
                      <StockContentsQuestionMark id="PER" src="/images/questionMark.svg" alt="question" />
                    </StockInvestmentInfoPerTitle>
                    <StockInvestmentInfoPerNumber>{info?.per}배</StockInvestmentInfoPerNumber>
                  </StockInvestmentInfoPer>
                )}
                {info?.pbr && (
                  <StockInvestmentInfoPer>
                    <StockInvestmentInfoPerTitle id="PBR" onClick={handleSheetContents}>
                      PBR
                      <StockContentsQuestionMark id="PBR" src="/images/questionMark.svg" alt="question" />
                    </StockInvestmentInfoPerTitle>
                    <StockInvestmentInfoPerNumber>{info?.pbr}배</StockInvestmentInfoPerNumber>
                  </StockInvestmentInfoPer>
                )}
                {info?.roe && (
                  <StockInvestmentInfoPer>
                    <StockInvestmentInfoPerTitle id="ROE" onClick={handleSheetContents}>
                      ROE
                      <StockContentsQuestionMark id="ROE" src="/images/questionMark.svg" alt="question" />
                    </StockInvestmentInfoPerTitle>
                    <StockInvestmentInfoPerNumber>{info?.roe}%</StockInvestmentInfoPerNumber>
                  </StockInvestmentInfoPer>
                )}
              </StockInvestmentInfoPerWrapper>
            </StockInvestmentInfoBox>
          )}

          {info?.dividend && info?.dividendYield && (
            <StockInvestmentInfoBox>
              <StockInvestmentInfoTitleWrapper>
                <StockInvestmentInfoTitle>배당</StockInvestmentInfoTitle>
                <StockInvestmentInfoTime></StockInvestmentInfoTime>
              </StockInvestmentInfoTitleWrapper>
              <StockAllocationWrapper>
                <StockAllocationTextWrapper>
                  <StockAllocationText>배당수익률</StockAllocationText>
                  <StockAllocationNumber>연 {info?.dividendYield}%</StockAllocationNumber>
                </StockAllocationTextWrapper>
                <StockAllocationDivider />
                <StockAllocationTextWrapper>
                  <StockAllocationText>최근 배당금</StockAllocationText>
                  <StockAllocationNumber>{priceToString(info?.dividend)}원</StockAllocationNumber>
                </StockAllocationTextWrapper>
              </StockAllocationWrapper>
            </StockInvestmentInfoBox>
          )}
          {info?.netPurchasePriceCompany !== 0 && info?.netPurchasePriceForeigner !== 0 && info?.netPurchasePriceIndividual !== 0 && (
            <StockInvestmentInfoBox>
              <StockInvestmentInfoTitleWrapper style={{ marginBottom: theme.metrics.m4 }}>
                <StockInvestmentInfoTitle>거래현황</StockInvestmentInfoTitle>
              </StockInvestmentInfoTitleWrapper>
              {info?.netPurchasePriceCompany && info?.netPurchasePriceForeigner && info?.netPurchasePriceIndividual && (
                <BarChart
                  labels={['외국인', '기관', '개인']}
                  dataset={[info?.netPurchasePriceForeigner, info?.netPurchasePriceCompany, info?.netPurchasePriceIndividual]}
                />
              )}
            </StockInvestmentInfoBox>
          )}
        </StockInvestmentInfoWrapper>
      </StockInvestmentWrapper>
      <StockBottomSheetNav
        openSheet={openSheet}
        bgColor={theme.color.gray.w100}
        title={sheetContents.title}
        subTitle={sheetContents.subTitle}
        boldText={sheetContents.boldText}
        description={sheetContents.description}
        subText={sheetContents.subText}
        handleOpenSheet={handleOpenSheet}
      />
      <StockItemDivider />
    </>
  );
}

const StockInvestmentWrapper = styled.div`
  width: 100%;
  padding: ${theme.metrics.m8} ${theme.metrics.m4};
  display: flex;
  flex-direction: column;
`;

const StockInvestmentTitle = styled.div`
  ${theme.fonts.s20_w500};
  color: ${theme.color.gray.w800};
  margin-bottom: ${theme.metrics.m4};
`;

const StockInvestmentInfoWrapper = styled.div`
  display: flex;
  gap: ${theme.metrics.m4};
  overflow: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const StockInvestmentInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.gray.white};
  border-radius: 32px;
  padding: ${theme.metrics.m4} ${theme.metrics.m4} ${theme.metrics.m6} ${theme.metrics.m4};
  min-width: 253px;
  max-height: 240px;
`;

const StockInvestmentInfoTitleWrapper = styled.div`
  width: 100%;
  padding: ${theme.metrics.m3} ${theme.metrics.m4};
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.color.primary.purple06};
  margin-bottom: ${theme.metrics.m8};
`;

const StockInvestmentInfoTitle = styled.div`
  color: ${theme.color.gray.w900};
  ${theme.fonts.s16_w400};
`;

const StockInvestmentInfoTime = styled.div`
  ${theme.fonts.s14_w400};
  color: ${theme.color.gray.w600};
`;

const StockInvestmentInfoPerWrapper = styled.div`
  width: 100%;
  gap: ${theme.metrics.m4};
  display: flex;
  flex-direction: column;
`;
const StockInvestmentInfoPer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${theme.metrics.m2};
`;

const StockInvestmentInfoPerTitle = styled.div`
  color: ${theme.color.gray.w600};
  ${theme.fonts.s16_w400};
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const StockContentsQuestionMark = styled.img`
  border: 1px solid ${theme.color.gray.w600};
  border-radius: 50%;
  margin-left: ${theme.metrics.m1};
  padding: 2px;
  width: 14px;
  height: 14px;
`;

const StockInvestmentInfoPerNumber = styled.div`
  ${theme.fonts.s20_w500};
  color: ${theme.color.gray.w900};
  font-weight: 500;
`;

const StockItemDivider = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${theme.color.gray.w300};
`;

const StockAllocationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 100%; */
  justify-content: space-between;
`;
const StockAllocationTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const StockAllocationText = styled.div`
  ${theme.fonts.s14_w400};
  color: ${theme.color.gray.w600};
`;

const StockAllocationDivider = styled.div`
  /* height: ; */
  width: 100%;
  border-top: 1px solid ${theme.color.gray.w300};
  margin: ${theme.metrics.m6} 0;
`;

const StockAllocationNumber = styled.div`
  ${theme.fonts.s20_w500}
  font-size:2.2rem;
`;
