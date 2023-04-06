/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import theme from '../../commons/theme';
import Image from 'next/image';
import dayjs from 'dayjs';
import { imageLoader } from '../../commons/utils';
import { useRouter } from 'next/router';
import { useAnimation, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import type { IArticle } from '../../commons/types';

const cardAnimationVariants = {
  hidden: { opacity: 0, marginTop: '32px' },
  visible: { opacity: 1, marginTop: '0px', transition: { duration: 0.5 } },
};

interface Props {
  data: IArticle;
}
export default function WonderingCard({ data }: Props) {
  const { title, category, datetime, imageUrl, linkUrl, thumbnailUrl, publishedAt, author } = data;
  const realImageUrl = imageUrl || thumbnailUrl ? imageUrl || thumbnailUrl : '';
  const cardColor = (categoryName: string) => {
    switch (categoryName) {
      case '데일리 브리핑':
        return theme.color.learn_random.turquoise;
      case '이슈 PICK':
        return theme.color.learn_random.pink;
      case '종목 인사이트':
        return theme.color.learn_random.blue;
      case '라이프 NOW':
        return theme.color.learn_random.brown;
      case '투자 첫걸음':
        return theme.color.learn_random.indigo;
    }
  };

  const [ref, inView] = useInView();
  const animationControls = useAnimation();
  const router = useRouter();

  const Card = css`
    border-radius: ${theme.metrics.m8};
    background-color: ${realImageUrl === '' ? cardColor(category.name) : 'transparent'};
    margin-bottom: ${theme.metrics.m4};
    margin-top: 0px;
    padding: 0;
    min-width: 150px;
    max-width: 230px;
    cursor: pointer;
  `;

  const CardImgFarm = css`
    position: relative;
    min-height: 164px;
  `;

  const CardImg = css`
    border-radius: ${theme.metrics.m8} ${theme.metrics.m8} 0px 0px;
    width: 100%;
    height: 220px;
    object-fit: cover;
    display: ${realImageUrl === '' ? 'none' : 'block'};
    filter: brightness(80%);
  `;

  const Date = css`
    position: absolute;
    top: ${theme.metrics.m6};
    right: ${theme.metrics.m4};
  `;

  const YearMonth = css`
    font-size: 11px;
    color: ${theme.color.gray.white};
  `;

  const Day = css`
    font-weight: 700;
    font-size: 30px;
    color: ${theme.color.gray.white};
    text-align: center;
  `;

  const TitleFrame = css`
    padding: ${theme.metrics.m4} ${theme.metrics.m4} ${theme.metrics.m6};
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    background-color: ${realImageUrl === '' ? theme.color.learn_random.indigo : theme.color.gray.white};
    row-gap: ${theme.metrics.m2};
    border-radius: 0 0 32px 32px;
  `;

  const CardCategory = css`
    ${theme.fonts.s12_w400};
    line-height: 130%;
    color: ${realImageUrl === '' ? theme.color.gray.white : theme.color.gray.w700};
    padding-bottom: ${theme.metrics.m1};
    border-bottom: 1px solid ${realImageUrl === '' ? theme.color.gray.white : theme.color.gray.w600};
  `;

  const MainTitle = css`
    ${theme.fonts.s16_w700}
    line-height: 130%;
    color: ${realImageUrl === '' ? theme.color.gray.white : theme.color.gray.w900};
  `;

  const AuthorContainer = css`
    display: flex;
    flex-direction: column;
    row-gap: ${theme.metrics.m1};
  `;
  const Author = css`
    ${theme.fonts.s12_w400}
    line-height: 120%;
    color: ${realImageUrl === '' ? theme.color.gray.white : theme.color.gray.w700};
    display: ${author ? 'block' : 'none'};
  `;

  const Position = css`
    ${theme.fonts.s12_w400}
    line-height: 120%;
    color: ${realImageUrl === '' ? theme.color.gray.white : theme.color.gray.w700};
    display: ${author && author.position ? 'block' : 'none'};
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 128px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

  const onClickCard = () => {
    router.push(`/wondering/feed/${data.id}`);
  };

  useEffect(() => {
    if (inView) {
      animationControls.start('visible');
    }
  }, [animationControls, inView]);

  return (
    <motion.div ref={ref} css={Card} onClick={onClickCard} animate={animationControls} initial="hidden" variants={cardAnimationVariants}>
      <div css={CardImgFarm}>
        {realImageUrl ? (
          <Image loader={imageLoader} css={CardImg} src={realImageUrl} alt={realImageUrl} width={100} height={100} />
        ) : (
          <Image loader={imageLoader} css={CardImg} src={''} alt={'no img'} width={100} height={100} />
        )}
        <div css={Date}>
          <div css={YearMonth}>{dayjs(datetime).format('YYYY.MM')}</div>
          <div css={Day}>{dayjs(datetime).format('DD')}</div>
        </div>
      </div>
      <div css={TitleFrame}>
        <div css={CardCategory}>{category.name}</div>
        <div css={MainTitle}>{title}</div>
        {author ? (
          <div css={AuthorContainer}>
            <div css={Author}>{author.name}</div>
            <div css={Position}>{author.position}</div>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
