import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';
import theme from '../../commons/theme';
import images from '../../commons/theme/images';
import { imageLoader, signFormat, textColor } from '../../commons/utils';
import { useIntersectionObserver } from '../../hooks';
import NoContentsImage from '../image/noContentsImage';

interface TopThemeStockProps {
  title: string;
  mode: Mode;
  topRankingData?: {
    id: number;
    ratio: number;
    name: string;
  }[];
}
interface topFive {
  id: number;
  ratio: number;
  name: string;
}
[];

interface StyleProps {
  mode: Mode;
}

type Mode = 'up' | 'down';

export default function TopRanking({ mode, title, topRankingData }: TopThemeStockProps) {
  const router = useRouter();

  // * 화면에 들어왔을 때 애니메이션 시작
  const ref = useRef(null);
  const isInViewport = useIntersectionObserver(ref);

  // const [topRankingData, setTopRankingData] = useState<topFive[]>([]);

  // const handleGetTopFive = async () => {
  //   try {
  //     const { data, status } = await apiServer.get(`/keywords/ranking?limit=5`);
  //     if (status === 200) {
  //       if (mode === 'up') {
  //         setTopRankingData(data.up);
  //       } else {
  //         setTopRankingData(data.down);
  //       }
  //     }
  //   } catch (e) {
  //     setTopRankingData([]);
  //   }
  // };

  // useEffect(() => {
  //   handleGetTopFive();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <TopContainer ref={ref} style={{ alignItems: mode === 'up' ? 'flex-start' : 'flex-end' }}>
      <TopTitle>{title}</TopTitle>
      <TopContentsBoxWrapper style={{ justifyContent: mode === 'up' ? 'flex-start' : 'flex-end' }}>
        <TopContentsWrapper className={isInViewport ? 'fadeup' : ''} mode={mode}>
          {Array.isArray(topRankingData) && topRankingData.length > 0 ? (
            topRankingData
              .sort((a, b) => (mode === 'up' ? b.ratio - a.ratio : a.ratio - b.ratio))
              .slice(0, 5)
              .map((data, index) => (
                <TopContentsBox onClick={() => router.push(`/keyword/${data.name}`)} key={data.name + index}>
                  <TopContentsTitle>{data.name}</TopContentsTitle>
                  <TopContentsRatio
                    style={{
                      color: textColor(data.ratio),
                    }}
                  >
                    {signFormat(data.ratio)}
                    {data.ratio ? data.ratio.toFixed(2) : 0}%
                  </TopContentsRatio>
                </TopContentsBox>
              ))
          ) : (
            // <div style={{ height: '264px' }}></div>
            <NoContentsImage text="종목이 없어요." />
          )}
        </TopContentsWrapper>
        {Array.isArray(topRankingData) && topRankingData.length > 0 ? (
          <>
            {mode === 'up' ? (
              <>
                <Image
                  ref={ref}
                  className={isInViewport ? 'fadeup' : ''}
                  src={images.topFiveUp}
                  alt="up"
                  width={130}
                  loader={imageLoader}
                  height={330}
                  loading="lazy"
                  css={css`
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    transform: translateY(+50px);
                    opacity: 0;
                    transition-duration: 0.5s;
                    transition-property: transform, opacity;
                    transition-timing-function: linear;
                    &.fadeup {
                      transform: translateY(0px);
                      opacity: 1;
                      transition-property: transform, opacity;
                      transition-duration: 0.5s;
                      transition-timing-function: linear;
                    }
                  `}
                  style={{
                    position: 'absolute',
                    right: 2,
                  }}
                />
              </>
            ) : (
              <>
                <Image
                  ref={ref}
                  className={isInViewport ? 'fadeup' : ''}
                  src={images.topFiveDown}
                  alt="down"
                  width={130}
                  loader={imageLoader}
                  height={330}
                  loading="lazy"
                  css={css`
                    position: absolute;
                    left: 0;
                    bottom: 0px;
                    transform: translateY(-50px);
                    opacity: 0;
                    transition-property: transform, opacity;
                    transition-duration: 0.5s;
                    transition-timing-function: linear;
                    &.fadeup {
                      transform: translateY(0px);
                      opacity: 1;
                      transition-property: transform, opacity;
                      transition-duration: 0.5s;
                      transition-timing-function: linear;
                    }
                  `}
                  style={{
                    position: 'absolute',
                    right: 2,
                  }}
                />
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </TopContentsBoxWrapper>
    </TopContainer>
  );
}

const TopContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TopTitle = styled.div`
  ${theme.fonts.s26_w700}
  font-size:2.4rem;
  color: ${theme.color.gray.w900};
`;

const TopContentsBoxWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

const TopContentsWrapper = styled.div<StyleProps>`
  display: flex;
  margin-top: ${theme.metrics.m6};
  flex-direction: column;
  z-index: 1;
  align-items: ${({ mode }) => (mode === 'up' ? 'start' : 'end')};
  transform: ${({ mode }) => (mode === 'up' ? 'translateY(+50px)' : 'translateY(-50px)')};
  opacity: 0;
  transition-property: transform, opacity;
  transition-duration: 0.5s;
  transition-timing-function: linear;
  &.fadeup {
    transform: translateY(0px);
    opacity: 1;
    transition-property: transform, opacity;
    transition-duration: 0.5s;
    transition-timing-function: linear;
  }
  z-index: 0 !important ;
`;

const TopContentsBox = styled(Button)`
  padding: ${theme.metrics.m4} ${theme.metrics.m6};
  background-color: ${theme.color.gray.white};
  border-radius: 32px;
  display: flex;
  margin-bottom: 2px;
  width: max-content;
  justify-content: space-between;
  cursor: pointer;
`;

const TopContentsTitle = styled.span`
  color: ${theme.color.gray.w900};
  ${theme.fonts.s14_w500}
  max-width: 214px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const TopContentsRatio = styled.span`
  color: ${theme.color.secondary.red};
  ${theme.fonts.s14_w400}
  margin-left: ${theme.metrics.m3};
`;
