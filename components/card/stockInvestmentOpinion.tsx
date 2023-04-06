/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import theme from '../../commons/theme';
import { useIntersectionObserver } from '../../hooks';
import { useSpring, animated } from 'react-spring';
import images from '../../commons/theme/images';
import StockBottomSheetNav from '../nav/StockBottomSheet';
import { IStockOpinion } from '../../commons/types';
import Image from 'next/image';
import { imageLoader, opinionBgColor } from '../../commons/utils';
import { css } from '@emotion/react';
import { motion, AnimatePresence } from 'framer-motion';
import NoContentsImage from '../image/noContentsImage';
import { useRouter } from 'next/router';
import { apiServer } from '../../lib/api';
interface Gradient {
  score: number;
}
export default function StockInvestmentOpinionCard() {
  const ref = useRef(null);
  const router = useRouter();
  const { stockcode } = router.query;
  const [stockOpinion, setStockOpinion] = useState<IStockOpinion>({
    opinion: '',
    score: 0,
    analysisScore: { chart: 0, earning: 0, momentum: 0, supply: 0, total: 0, value: 0 },
    evaluation: {
      main_buyer: '',
      main_trading: '',
      net_pur_for: '',
      net_pur_inv: '',
      net_pur_pen: '',
      net_pur_prif: '',
      pbr_curr: 0,
      pbr_in_rr: 0,
      per_curr: 0,
      per_in_rr: 0,
      short_trend: '',
    },
    signal: {
      ad: '',
      total_strategy: '',
      trend: '',
      volume: '',
    },
    stock: {
      code: '',
      ir_phone: '',
      market: '',
      name: '',
      sector: '',
      status: '',
    },
  });
  const { opinion, score } = stockOpinion;
  const [toggle, setToggle] = useState(false);

  const handleGetStockOpinion = useCallback(async () => {
    try {
      const { data, status } = await apiServer.get(`/stock/${stockcode}/diagnose`);
      if (status === 200) {
        setStockOpinion(data);
        set({ number: data.score });
      }
    } catch (e) {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockcode]);

  useEffect(() => {
    if (stockcode) {
      handleGetStockOpinion();
    }
  }, [stockcode, handleGetStockOpinion]);

  // * 화면에 보일 때 애니메이션 작동
  const isInViewport = useIntersectionObserver(ref);
  //* 바텀시트
  const [openSheet, setOpenSheet] = useState(false);
  const handleOpenSheet = () => {
    setOpenSheet(() => !openSheet);
  };

  const handleToggle = () => {
    setToggle(() => !toggle);
  };

  const [{ number }, set] = useSpring(() => ({
    from: { number: 0 },
    number: score,
    delay: 400,
    config: { precision: 0.01, duration: 1000, mass: 1, tension: 30, friction: 10 },
  }));

  return (
    <>
      <StockInvestmentOpinionWrapper id="AI의견" ref={ref}>
        <div>
          <StockInvestmentOpinionTitle onClick={handleOpenSheet}>
            AI 투자의견
            <Image
              alt="questionMark"
              src={'/' + images.questionMark}
              width={16}
              height={16}
              loader={imageLoader}
              style={{ marginLeft: theme.metrics.m1, border: `1px solid ${theme.color.gray.w600}`, borderRadius: '50%', padding: '2px' }}
            />
          </StockInvestmentOpinionTitle>
        </div>
        {score !== 0 ? (
          <>
            <StockOpinionImgWrapper>
              <Image
                width={153}
                height={116}
                alt="opinion"
                src={opinion.includes('매수') ? `/${images.opinionUp}` : opinion === '중립' ? `/${images.opinion}` : `/${images.opinionDown}`}
                loader={imageLoader}
              />
            </StockOpinionImgWrapper>
            <GradientBarWrapper>
              <GradientBarItemWrapper>
                <GradientBar score={score} ref={ref} className={isInViewport ? 'move' : ''}>
                  <GradientCircle>{isInViewport ? <animated.div>{number.to((n) => n.toFixed(0))}</animated.div> : 0}</GradientCircle>
                </GradientBar>
              </GradientBarItemWrapper>
            </GradientBarWrapper>
            <StockOpinionTextWrapper>
              <StockOpinionText>
                AI는 종합진단 후
                <StockOpinionSubText
                  css={css`
                    color: ${opinion.includes('중립')
                      ? theme.color.gray.w700
                      : opinion.includes('매수')
                      ? theme.color.chart.up
                      : theme.color.chart.down};
                  `}
                >
                  &nbsp;{opinion.replaceAll('강력', '')}&nbsp;
                </StockOpinionSubText>
                <Image
                  onClick={handleToggle}
                  alt="questionMark"
                  src={'/' + images.questionMark}
                  width={12}
                  height={12}
                  loader={imageLoader}
                  style={{
                    border: `1px solid ${theme.color.gray.w600}`,
                    borderRadius: '50%',
                    padding: '2px',
                    marginRight: theme.metrics.m1,
                    cursor: 'pointer  ',
                  }}
                />
                의견을 냈어요
              </StockOpinionText>
            </StockOpinionTextWrapper>
          </>
        ) : (
          <NoContentsImage height="175px" text="AI 투자의견 정보가 없어요."></NoContentsImage>
        )}

        <AnimatePresence mode="wait">
          {stockOpinion?.signal?.trend && toggle && (
            <motion.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: 'auto',
                opacity: 1,
                transition: {
                  height: {
                    duration: 0.4,
                  },
                  opacity: {
                    duration: 0.25,
                    delay: 0.15,
                  },
                },
              }}
              exit={{
                height: 0,
                opacity: 0,
                transition: {
                  height: {
                    duration: 0.4,
                  },
                  opacity: {
                    duration: 0.25,
                    delay: 0.15,
                  },
                },
              }}
              key="test"
              className="font-light"
            >
              <StockOpinionTotalWrapper>
                {stockOpinion?.signal?.trend || stockOpinion?.signal?.ad || stockOpinion?.signal?.volume ? (
                  <StockOpinionTotalItem>
                    <StockOpinionItemTitle>차트 레이더</StockOpinionItemTitle>
                    <StockOpinionItemContents>
                      <StockOpinionItemContentsTitleWrapper>
                        {stockOpinion?.signal?.trend && (
                          <StockOpinionItemContentsTextWrapper>
                            <StockOpinionItemContentsTitle>트랜드파워</StockOpinionItemContentsTitle>
                            <StockOpinionItemContentsText
                              css={css`
                                background-color: ${opinionBgColor(stockOpinion.signal.trend)};
                              `}
                            >
                              {stockOpinion.signal.trend}
                            </StockOpinionItemContentsText>
                          </StockOpinionItemContentsTextWrapper>
                        )}
                        {stockOpinion?.signal?.ad && (
                          <StockOpinionItemContentsTextWrapper>
                            <StockOpinionItemContentsTitle>매집분산</StockOpinionItemContentsTitle>
                            <StockOpinionItemContentsText
                              css={css`
                                background-color: ${opinionBgColor(stockOpinion.signal.ad)};
                              `}
                            >
                              {stockOpinion.signal.ad}
                            </StockOpinionItemContentsText>
                          </StockOpinionItemContentsTextWrapper>
                        )}
                        {stockOpinion?.signal?.volume && (
                          <StockOpinionItemContentsTextWrapper>
                            <StockOpinionItemContentsTitle>볼륨파워</StockOpinionItemContentsTitle>
                            <StockOpinionItemContentsText
                              css={css`
                                background-color: ${opinionBgColor(stockOpinion.signal.volume)};
                              `}
                            >
                              {stockOpinion.signal.volume}
                            </StockOpinionItemContentsText>
                          </StockOpinionItemContentsTextWrapper>
                        )}
                      </StockOpinionItemContentsTitleWrapper>
                    </StockOpinionItemContents>
                  </StockOpinionTotalItem>
                ) : (
                  <></>
                )}

                {stockOpinion?.evaluation?.main_buyer || stockOpinion?.evaluation?.main_trading || stockOpinion?.evaluation?.short_trend ? (
                  <StockOpinionTotalItem>
                    <StockOpinionItemTitle>수급 레이더</StockOpinionItemTitle>
                    <StockOpinionItemContents>
                      <StockOpinionItemContentsTitleWrapper>
                        {stockOpinion?.evaluation?.main_buyer && (
                          <StockOpinionItemContentsTextWrapper>
                            <StockOpinionItemContentsTitle>주력매수</StockOpinionItemContentsTitle>
                            <StockOpinionItemContentsText
                              css={css`
                                background-color: ${opinionBgColor(stockOpinion.evaluation.main_buyer)};
                              `}
                            >
                              {stockOpinion.evaluation.main_buyer === null ? '측정불가' : stockOpinion.evaluation.main_buyer}
                            </StockOpinionItemContentsText>
                          </StockOpinionItemContentsTextWrapper>
                        )}

                        {stockOpinion?.evaluation?.main_trading && (
                          <StockOpinionItemContentsTextWrapper>
                            <StockOpinionItemContentsTitle>주요주체</StockOpinionItemContentsTitle>
                            <StockOpinionItemContentsText
                              css={css`
                                background-color: ${opinionBgColor(stockOpinion.evaluation.main_trading)};
                              `}
                            >
                              {stockOpinion.evaluation.main_trading === null ? '측정불가' : stockOpinion.evaluation.main_trading}
                            </StockOpinionItemContentsText>
                          </StockOpinionItemContentsTextWrapper>
                        )}

                        {stockOpinion?.evaluation?.short_trend && (
                          <StockOpinionItemContentsTextWrapper>
                            <StockOpinionItemContentsTitle>공매도</StockOpinionItemContentsTitle>
                            <StockOpinionItemContentsText
                              css={css`
                                background-color: ${opinionBgColor(stockOpinion.evaluation.short_trend)};
                              `}
                            >
                              {stockOpinion.evaluation.short_trend === null ? '측정불가' : stockOpinion.evaluation.short_trend}
                            </StockOpinionItemContentsText>
                          </StockOpinionItemContentsTextWrapper>
                        )}
                      </StockOpinionItemContentsTitleWrapper>
                    </StockOpinionItemContents>
                  </StockOpinionTotalItem>
                ) : (
                  <></>
                )}

                {stockOpinion?.evaluation?.net_pur_for || stockOpinion?.evaluation?.net_pur_pen || stockOpinion?.evaluation?.net_pur_inv ? (
                  <StockOpinionTotalItem>
                    <StockOpinionItemTitle>머니 레이더</StockOpinionItemTitle>
                    <StockOpinionItemContents>
                      <StockOpinionItemContentsTitleWrapper>
                        {stockOpinion?.evaluation?.net_pur_for && (
                          <StockOpinionItemContentsTextWrapper>
                            <StockOpinionItemContentsTitle>외국인</StockOpinionItemContentsTitle>
                            <StockOpinionItemContentsText
                              css={css`
                                background-color: ${opinionBgColor(stockOpinion.evaluation.net_pur_for)};
                              `}
                            >
                              {stockOpinion.evaluation.net_pur_for}
                            </StockOpinionItemContentsText>
                          </StockOpinionItemContentsTextWrapper>
                        )}
                        {stockOpinion?.evaluation?.net_pur_pen && (
                          <StockOpinionItemContentsTextWrapper>
                            <StockOpinionItemContentsTitle>연기금/국가</StockOpinionItemContentsTitle>
                            <StockOpinionItemContentsText
                              css={css`
                                background-color: ${opinionBgColor(stockOpinion.evaluation.net_pur_pen)};
                              `}
                            >
                              {stockOpinion.evaluation.net_pur_pen}
                            </StockOpinionItemContentsText>
                          </StockOpinionItemContentsTextWrapper>
                        )}
                        {stockOpinion?.evaluation?.net_pur_inv && (
                          <StockOpinionItemContentsTextWrapper>
                            <StockOpinionItemContentsTitle>투신</StockOpinionItemContentsTitle>
                            <StockOpinionItemContentsText
                              css={css`
                                background-color: ${opinionBgColor(stockOpinion.evaluation.net_pur_inv)};
                              `}
                            >
                              {stockOpinion.evaluation.net_pur_inv}
                            </StockOpinionItemContentsText>
                          </StockOpinionItemContentsTextWrapper>
                        )}
                      </StockOpinionItemContentsTitleWrapper>
                    </StockOpinionItemContents>
                  </StockOpinionTotalItem>
                ) : (
                  <></>
                )}
                {stockOpinion?.evaluation?.per_curr || stockOpinion?.evaluation?.pbr_curr ? (
                  <StockOpinionTotalItem>
                    <StockOpinionItemTitle>밸류 레이더</StockOpinionItemTitle>
                    {stockOpinion?.evaluation?.per_curr && (
                      <StockOpinionItemContents style={{ marginBottom: theme.metrics.m2 }}>
                        <StockOpinionItemContentsTitleWrapper>
                          <StockOpinionItemContentsTextWrapper>
                            <StockOpinionItemContentsTitle>PER</StockOpinionItemContentsTitle>
                            <StockOpinionItemContentsText
                              css={css`
                                background-color: ${opinionBgColor(stockOpinion.evaluation.per_curr)};
                              `}
                            >
                              {stockOpinion.evaluation.per_curr}
                            </StockOpinionItemContentsText>
                          </StockOpinionItemContentsTextWrapper>
                          <StockOpinionItemContentsTextWrapper>
                            <StockOpinionItemContentsTitle>PER 업종대비 (%)</StockOpinionItemContentsTitle>
                            <StockOpinionItemContentsText
                              css={css`
                                background-color: ${opinionBgColor(stockOpinion.evaluation.per_in_rr)};
                              `}
                            >
                              {stockOpinion.evaluation.per_in_rr}
                            </StockOpinionItemContentsText>
                          </StockOpinionItemContentsTextWrapper>
                        </StockOpinionItemContentsTitleWrapper>
                      </StockOpinionItemContents>
                    )}
                    {stockOpinion?.evaluation?.pbr_curr && (
                      <StockOpinionItemContents>
                        <StockOpinionItemContentsTitleWrapper>
                          <StockOpinionItemContentsTextWrapper>
                            <StockOpinionItemContentsTitle>PBR</StockOpinionItemContentsTitle>
                            <StockOpinionItemContentsText
                              css={css`
                                background-color: ${opinionBgColor(stockOpinion.evaluation.pbr_curr)};
                              `}
                            >
                              {stockOpinion.evaluation.pbr_curr}
                            </StockOpinionItemContentsText>
                          </StockOpinionItemContentsTextWrapper>
                          <StockOpinionItemContentsTextWrapper>
                            <StockOpinionItemContentsTitle>PBR 업종대비 (%)</StockOpinionItemContentsTitle>
                            <StockOpinionItemContentsText
                              css={css`
                                background-color: ${opinionBgColor(stockOpinion.evaluation.pbr_in_rr)};
                              `}
                            >
                              {stockOpinion.evaluation.pbr_in_rr}
                            </StockOpinionItemContentsText>
                          </StockOpinionItemContentsTextWrapper>
                        </StockOpinionItemContentsTitleWrapper>
                      </StockOpinionItemContents>
                    )}
                  </StockOpinionTotalItem>
                ) : (
                  <></>
                )}
              </StockOpinionTotalWrapper>
            </motion.div>
          )}
        </AnimatePresence>
      </StockInvestmentOpinionWrapper>
      <StockBottomSheetNav
        openSheet={openSheet}
        bgColor={'white'}
        title={'AI 투자의견이란?'}
        subTitle={'AI 투자의견은 (주)이노핀에서 개발한 알고리즘에 따라 5가지의 주요 투자레이더(진단, 차트, 수급, 머니, 밸류)를 종합하여 제시합니다.'}
        handleOpenSheet={handleOpenSheet}
      />
      <StockDivider />
    </>
  );
}

const StockInvestmentOpinionWrapper = styled.div`
  width: 100%;
  padding: ${theme.metrics.m8} ${theme.metrics.m4};
  display: flex;
  flex-direction: column;
`;

const StockInvestmentOpinionTitle = styled.div`
  ${theme.fonts.s20_w500};
  color: ${theme.color.gray.w800};
  margin-bottom: ${theme.metrics.m4};
  display: inline-block;
  align-items: center;
  cursor: pointer;
`;

const StockDivider = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${theme.color.gray.w300};
`;

const StockOpinionImgWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: ${theme.metrics.m4};
`;
const StockOpinionImg = styled.img``;

const GradientBarWrapper = styled.div`
  width: 100%;
  position: relative;
  border-radius: 99px;
  background-color: ${theme.color.gray.w300};
  height: 40px;
`;
const GradientBarItemWrapper = styled.div`
  position: absolute;
  width: 100%;
`;

const GradientBar = styled.div<Gradient>`
  width: ${(props: Gradient) => props.score}%;
  height: 40px;
  border-radius: 99px;
  background: linear-gradient(90deg, #4d6aff 0%, #ff4b6b 100%);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0px ${theme.metrics.m1};
  &.move {
    animation: move 1.5s ease;
    animation-iteration-count: 1;
    @keyframes move {
      from {
        width: 9%;
      }
      to {
        width: ${(props: Gradient) => props.score}%;
      }
    }
  }
`;
const GradientCircle = styled.div`
  width: 34px;
  height: 34px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${theme.fonts.s14_w500};
  color: ${theme.color.primary.purple};
`;

const StockOpinionTextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: ${theme.metrics.m4};
  align-items: center;
`;
const StockOpinionText = styled.div`
  font-size: 1.8rem;
  color: ${theme.color.gray.w700};
  display: flex;
  align-items: center;
`;
const StockOpinionSubText = styled.span`
  color: ${theme.color.chart.up};
  ${theme.fonts.s26_w700};
  font-size: 2.4rem;
`;

const StockOpinionTotalWrapper = styled.div`
  display: flex;
  margin-top: ${theme.metrics.m6};
  flex-direction: column;
  gap: ${theme.metrics.m4};
`;

const StockOpinionTotalItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const StockOpinionItemTitle = styled.div`
  ${theme.fonts.s16_w500};
  margin-bottom: ${theme.metrics.m2};
`;

const StockOpinionItemContents = styled.div`
  width: 100%;
  padding: ${theme.metrics.m4};
  border-radius: 99px;
  background-color: white;
`;

const StockOpinionItemContentsTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const StockOpinionItemContentsTextWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StockOpinionItemContentsTitle = styled.div`
  ${theme.fonts.s14_w500};
  margin-bottom: ${theme.metrics.m2};
`;

const StockOpinionItemContentsText = styled.div`
  padding: ${theme.metrics.m2} ${theme.metrics.m3};
  ${theme.fonts.s14_w400};
  border-radius: 16px;
  color: white;
`;
