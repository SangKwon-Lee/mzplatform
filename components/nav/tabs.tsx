import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import theme from '../../commons/theme';
import { Link } from 'react-scroll';
import { css } from '@emotion/react';
import _ from 'lodash';

interface TabProps {
  isTab: boolean;
}

interface TabNavProps {
  Tabs: string[];
  initValue: string;
}

export default function TabsNav({ Tabs, initValue }: TabNavProps) {
  const [tab, setTab] = useState(initValue);
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = _.debounce(() => {
    // setScrollPosition(window.scrollY || document.documentElement.scrollTop);
    if (document) {
      if (window.scrollY >= 0) {
        setTab('기업정보');
      }
      //@ts-ignore
      if (window.scrollY >= document.getElementById('투자정보')?.offsetTop - 120) {
        setTab('투자정보');
      }
      //@ts-ignore
      if (window.scrollY >= document.getElementById('AI의견')?.offsetTop - 120) {
        setTab('AI의견');
      }
      //@ts-ignore
      if (window.scrollY >= document.getElementById('회사소식')?.offsetTop - 120) {
        setTab('회사소식');
      }
      //@ts-ignore
      if (window.scrollY >= document.getElementById('피드')?.offsetTop - 120) {
        setTab('피드');
      }
    }
  }, 300);

  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <StockContentsTabsContainer>
      {Tabs.map((data) => (
        // <StockContentsTab
        //   key={data}
        //   isTab={tab === data}
        //   onClick={() => {
        //     setTab(data);
        //   }}
        // >
        <Link
          key={data}
          css={css`
            ${theme.fonts.s16_w500};
            flex: 1;
            height: 100;
            padding: ${tab === data ? `16px 0px 14px 0px` : `16px 0px`};
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: ${tab === data ? 700 : 500};
            color: ${tab === data ? `${theme.color.primary.purple}` : `${theme.color.gray.w600}`};
            border-bottom: ${tab === data ? `2px solid ${theme.color.primary.purple}` : 'none'};
            :hover {
              background-color: ${theme.color.gray.w100};
            }
          `}
          onClick={() => {
            setTab(data);
          }}
          to={data}
          isDynamic
          spy={true}
          smooth={true}
          duration={500}
          offset={-100}
        >
          {data}
        </Link>
        // </StockContentsTab>
      ))}
    </StockContentsTabsContainer>
  );
}

const StockContentsTabsContainer = styled.div`
  background-color: ${theme.color.gray.white};
  width: 100%;
  display: flex;
  position: -webkit-sticky;
  position: sticky;
  top: 63px;
  z-index: 3;
`;
const StockContentsTabsWrapper = styled.div``;

const Test = styled(Link)<TabProps>`
  border: 1px solid red;
  flex: 1;
  padding: ${({ isTab }) => (isTab ? `16px 0px 14px 0px` : `16px 0px`)};
  border-bottom: ${({ isTab }) => (isTab ? `2px solid ${theme.color.primary.purple}` : 'none')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ isTab }) => (isTab ? `${theme.color.primary.purple}` : `${theme.color.gray.w600}`)};
  ${theme.fonts.s16_w500}
  font-weight: ${({ isTab }) => (isTab ? `${700}` : `${500}`)};
  cursor: pointer;
`;

const StockContentsTab = styled.div<TabProps>`
  border: 1px solid red;
  flex: 1;
  padding: ${({ isTab }) => (isTab ? `16px 0px 14px 0px` : `16px 0px`)};
  border-bottom: ${({ isTab }) => (isTab ? `2px solid ${theme.color.primary.purple}` : 'none')};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ isTab }) => (isTab ? `${theme.color.primary.purple}` : `${theme.color.gray.w600}`)};
  ${theme.fonts.s16_w500}
  font-weight: ${({ isTab }) => (isTab ? `${700}` : `${500}`)};
  cursor: pointer;
  height: 100%;
`;
