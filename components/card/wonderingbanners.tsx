/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import theme from '../../commons/theme';
import Image from 'next/image';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import type { IBanner } from '../../commons/types';
import { useRouter } from 'next/router';

const cardAnimationVariants = {
  hidden: { opacity: 0, marginTop: '32px' },
  visible: { opacity: 1, marginTop: '0px', transition: { duration: 0.5 } },
};

interface Props {
  data: IBanner;
}
export default function WonderingBanners({ data }: Props) {
  const { title, backgroundColor, linkUrl, buttonTitle } = data;
  const [ref, inView] = useInView();
  const animationControls = useAnimation();
  const router = useRouter();

  useEffect(() => {
    if (inView) {
      animationControls.start('visible');
    }
  }, [animationControls, inView]);

  const Banner = css`
    cursor: ${linkUrl ? 'pointer' : 'default'};
    padding: 100px ${theme.metrics.m4} ${theme.metrics.m6} ${theme.metrics.m4};
    background-color: ${backgroundColor};
    border-radius: ${theme.metrics.m8};
    margin-bottom: ${theme.metrics.m4};
    width: 100%;
    max-width: 230px;
    min-width: 164px;
    word-break: keep-all;
  `;

  const mainTitle = css`
    font-weight: 700;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: -0.02em;
    color: ${theme.color.gray.white};
    text-align: left;
  `;

  const Button = css`
    border-radius: ${theme.metrics.m6};
    background-color: ${theme.color.gray.white};
    /* display: ${buttonTitle === '' ? 'none' : 'flex'}; */
    display: inline-flex;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.metrics.m2} ${theme.metrics.m3} ${theme.metrics.m2} ${theme.metrics.m4};
    margin-top: ${theme.metrics.m2};
  `;

  const ButtonTitle = css`
    ${theme.fonts.s14_w500};
    line-height: 100%;
    color: ${theme.color.secondary.blue01};
  `;

  useEffect(() => {
    if (inView) {
      animationControls.start('visible');
    }
  }, [animationControls, inView]);
  return (
    <motion.div ref={ref} css={Banner} animate={animationControls} initial="hidden" variants={cardAnimationVariants}>
      <div css={mainTitle}>{title}</div>
      {buttonTitle ? (
        <div css={Button}>
          <div css={ButtonTitle} onClick={() => router.push(linkUrl ? linkUrl : '/wondering')}>
            {buttonTitle}
          </div>
          <Image
            css={css`
              margin: 0 0 0 ${theme.metrics.m2};
            `}
            src="/bannerButtonIcon.svg"
            alt="banner button"
            width={20}
            height={20}
          />
        </div>
      ) : null}
    </motion.div>
  );
}
