/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import theme from '../../../commons/theme';
import Image from 'next/image';
import { imageLoader } from '../../../commons/utils';
const Tab = styled.div`
  display: flex;
  flex-direction: column;
  padding: 45px 16px 16px;
  background: ${theme.color.primary.purple};
  gap: 8px;
`;
const Content = styled.div`
  ${theme.fonts.s14_w400}
  line-height: 1.4;
  color: ${theme.color.primary.purple05};
  white-space: pre-wrap;
`;
const Header = styled.h1`
  ${theme.fonts.s36_w700};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  margin: 0; //지우면 안됨
  padding: 0; //지우면 안됨
  color: ${theme.color.gray.white};
`;
export default function RankingMainThemestock() {
  const text = 'MZ세대가 가장 많이 검색하고\n인기 많은 종목 종목 순위예요.';
  return (
    <Tab>
      <Header>
        <Image loader={imageLoader} src={'/images/ico_tabbar1.svg'} alt={'ico_tabar1'} width={32} height={32} loading="lazy" />
        TOP 10
      </Header>
      <Content>{text}</Content>
    </Tab>
  );
}
