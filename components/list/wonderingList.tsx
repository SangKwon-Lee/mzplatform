/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import theme from '../../commons/theme';
import { imageLoader } from '../../commons/utils';
import Image from 'next/image';
import test2 from '../../public/images/test2.png';

const Frame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
`;

const HeaderMainWrapper = styled.div`
  background-color: ${theme.color.gray.white};
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 80px 16px 40px;
  gap: 16px;
  flex: none;
  order: 0;
  flex-grow: 0;
  background-color: ${theme.color.learn_random.turquoise};
`;

const NewsHeader = styled.div`
  ${theme.fonts.s26_w700};
  display: flex;
  align-items: center;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: ${theme.color.gray.white};
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  white-space: pre-wrap;
`;

const HeaderContent = styled.div`
  ${theme.fonts.s16_w400};
  display: flex;
  align-items: center;
  color: ${theme.color.gray.white};
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;
  white-space: pre-wrap;
`;

const Tit = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 4px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const Headerdate = styled.div`
  ${theme.fonts.s12_w400};
  color: ${theme.color.gray.white};
  display: flex;
  align-items: center;
  flex: none;
  order: 2;
  flex-grow: 0;
`;

const Dot = styled.div`
  ${theme.fonts.s16_w400};
  ${theme.color.gray.w900};
  display: flex;
  align-items: center;
  flex: none;
  order: 0;
  flex-grow: 0;
`;
const Maincontent = styled.div`
  ${theme.fonts.s16_w400};
  color: ${theme.color.gray.w800};
  display: flex;
  align-items: center;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const SubHeader = styled.div`
  ${theme.fonts.s20_w700};
  color: ${theme.color.gray.w900};
  display: flex;
  align-items: center;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const H2 = styled.div`
  ${theme.fonts.s16_w500};
  display: flex;
  align-items: center;
  color: ${theme.color.gray.w900};
  flex: none;
  order: 1;
  flex-grow: 1;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 32px 16px 24px;
  gap: 40px;
  flex: none;
  order: 2;
  flex-grow: 0;
`;

const text = '경제 뉴스,\n이렇게 다양했다고?';
const text1 =
  '‘경제 뉴스’란 무엇일까요? 그냥 경제에 대해 다루는 뉴스일까요? 이것은 반은 맞고 반은 틀렸어요. 경제에 대해 다루는 뉴스이긴 하지만, 여기서 말하는 ‘경제’가 지칭하는 범위는 폭이 꽤 넓기 때문이죠. 우리는 경제 기사를 간단히 뭉뚱그려 생각하기 쉽지만, 언론사 경제 뉴스는 생각보다 다양해요. 언론사의 각 부서별 담당 영역을 알아두면 앞으로 분야별 경제 뉴스를 파악하는 데 도움이 될 거예요. 일반적으로 언론사에 있는 경제 관련 뉴스 부서는 다음과 같이 나뉘어요.';
const text3 = '[경제 뉴스 독해법] 거시경제, 산업, 금융, 부동산 등 살\n피는 분야 다양해';

export default function WonderingList() {
  return (
    <Frame>
      <HeaderMainWrapper>
        <Text>
          <Maincontent>{text1}</Maincontent>
          <SubHeader>왜 지금일까?</SubHeader>
          <Maincontent>{text1}</Maincontent>
          <Tit>
            <Dot>•</Dot>
            <H2>배터리 재활용(리사이클링) 개념도</H2>
          </Tit>
          <Image loader={imageLoader} src={test2} alt={'test2'} layout="responsive" objectFit="contain" />
          <SubHeader>왜 지금일까?</SubHeader>
          <Maincontent>{text1}</Maincontent>
        </Text>
      </HeaderMainWrapper>
    </Frame>
  );
}
