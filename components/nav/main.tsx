/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import theme from '../../commons/theme';
import Link from 'next/link';
import { useAnimation, motion } from 'framer-motion';
import { Button } from '@mui/material';

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  padding: ${theme.metrics.m2} 0;
  min-width: 360px;
`;

const TabWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 600px;
  min-width: 360px;
  column-gap: 0.5rem;
  padding-left: ${theme.metrics.m4};
`;

const navAnimationVariants = {
  hidden: { opacity: 1, background: 'white' },
  visible: { opacity: 1, background: theme.color.gradient, transition: { duration: 1 } },
};

interface Props {
  location: string;
}

export default function MainNav(props: Props) {
  const { location } = props;
  const [scrollPosition, setScrollPosition] = useState(0);
  const animationControls = useAnimation();
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener('scroll', updateScroll);
  }, []);

  const tabs = [
    { key: 'market', value: '시장' },
    { key: 'themestock', value: '테마/종목' },
    { key: 'wondering', value: '원더링M' },
  ];

  useEffect(() => {
    animationControls.start('visible');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <TabContainer
      css={{
        backgroundColor: scrollPosition > 155 ? `${theme.color.gray.white}` : 'transparent',
        boxShadow: scrollPosition > 155 ? `0px 2px 4px rgba(0, 0, 0, 0.06)` : 'none',
        transition: 'all 0.3s',
        zIndex: 3,
      }}
    >
      <TabWrapper>
        {tabs.map((data, index) => {
          const focused = data.key === location;
          return (
            <Link key={index} href={`/${data.key}`}>
              {focused ? (
                <Button
                  css={css`
                    border-radius: 24px;
                    padding: 0;
                    margin: 0;
                    min-width: 0;
                  `}
                >
                  <motion.div
                    css={css`
                      color: ${theme.color.gray.white};
                      ${theme.fonts.s16_w700};
                      line-height: 100%;
                      text-align: center;

                      border-radius: 24px;
                      padding: ${theme.metrics.m3} ${theme.metrics.m4};
                      background: ${theme.color.gradient};
                    `}
                    animate={animationControls}
                    initial="hidden"
                    variants={navAnimationVariants}
                  >
                    {data.value}
                  </motion.div>
                </Button>
              ) : (
                <Button
                  css={css`
                    ${theme.fonts.s16_w500};
                    line-height: 100%;
                    text-align: center;
                    color: ${theme.color.gray.w900};
                    border-radius: 24px;
                    padding: ${theme.metrics.m3} ${theme.metrics.m4};
                    background: ${theme.color.gray.white};
                  `}
                >
                  {data.value}
                </Button>
              )}
            </Link>
          );
        })}
      </TabWrapper>
    </TabContainer>
    // </div>
  );
}
