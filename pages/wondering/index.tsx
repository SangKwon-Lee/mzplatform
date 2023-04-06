/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import WonderingBanners from '../../components/card/wonderingbanners';
import theme from '../../commons/theme';
import WonderingCard from '../../components/card/wondering';
import MainContainer from '../../components/container/main';
import { useState } from 'react';
import Icon from '../../commons/theme/icon';
import images from '../../commons/theme/images';
import WonderingBottomSheetNav from '../../components/nav/wonderingBottomSheet';
import Masonry from 'react-masonry-css';
import { GetServerSideProps } from 'next';
import type { IArticle, IBanner } from '../../commons/types';
import dayjs from 'dayjs';
import axios from 'axios';

export const getServerSideProps: GetServerSideProps = async () => {
  const CMS_HOST = process.env.CMS_HOST;
  const CMS_TOKEN = process.env.CMS_TOKEN;

  const cmsHeaders = {
    Authorization: `Bearer ${CMS_TOKEN}`,
  };

  const cmsServer = axios.create({
    baseURL: CMS_HOST,
    headers: cmsHeaders,
    timeout: 50000,
  });

  const initialValue = {
    props: {
      banners: [],
      articles: [],
    },
  };

  try {
    const responseArticles = await cmsServer.get(`/articles?populate=*&_sort=createdAt:desc&pagination[start]=0&pagination[limit]=100`);
    const responseBanners = await cmsServer.get(`/banners`);

    const CMS_URL = 'https://cms.woorimz.com';
    if (responseArticles.status === 200 && responseBanners.status === 200) {
      const articles = responseArticles.data.data.map((item: any) => ({
        id: item.id,
        ...item.attributes,
        author: {
          id: item.attributes.author.data.id,
          name: item.attributes.author.data.attributes.name,
          position: item.attributes.author.data.attributes.position,
        },
        category: { id: item.attributes.category.data.id, name: item.attributes.category.data.attributes.name },
        thumbnailUrl: item.attributes.thumbnail?.data?.attributes?.url ? `${CMS_URL}/${item.attributes.thumbnail.data.attributes.url}` : null,
      }));
      const banners = responseBanners.data.data.map((item: any) => ({ id: item.id, ...item.attributes }));
      return {
        props: {
          articles,
          banners,
        },
      };
    } else {
      return initialValue;
    }
  } catch (error) {
    return initialValue;
  }
};

interface Props {
  articles: IArticle[];
  banners: IBanner[];
}

export default function Wondering({ articles, banners }: Props) {
  const Filter = css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    ${theme.fonts.s14_w400}
    max-width: 600px;
    margin: ${theme.metrics.m6} 0 0 0;
    color: ${theme.color.gray.w700};
  `;

  const [openSheet, setOpenSheet] = useState(false);
  const [category, setCategory] = useState('전체');
  const handleOpenSheet = () => {
    setOpenSheet(() => !openSheet);
  };

  const handleChangeCategory = (selected: string) => {
    if (selected === category) {
      setCategory('전체');
      setOpenSheet(() => !openSheet);
    } else {
      setCategory(selected);
      setOpenSheet(() => !openSheet);
    }
  };

  const filteredArticles =
    category === '전체'
      ? articles.sort((a, b) => (dayjs(b.createdAt).isAfter(dayjs(a.createdAt)) ? 1 : -1))
      : //@ts-ignore
        articles.sort((a, b) => (dayjs(b.createdAt).isAfter(dayjs(a.createdAt)) ? 1 : -1)).filter((item) => item.category.name === category);
  return (
    <>
      <MainContainer>
        <div css={Filter}>
          <div
            css={css`
              cursor: pointer;
            `}
            onClick={() => {
              if (!openSheet) handleOpenSheet();
            }}
          >
            <span>{category !== '전체' ? category : '카테고리'}</span>
            <Icon icon={images.sortDownArrow} width={10} height={8} style={{ marginLeft: theme.metrics.m2 }} />
          </div>
        </div>
      </MainContainer>
      <Masonry
        css={css`
          padding: ${theme.metrics.m4} 0;
        `}
        breakpointCols={{
          default: 2,
          2000: 4,
          900: 3,
          600: 2,
          360: 2,
        }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {filteredArticles.map((data) => (
          <WonderingCard key={`article-${data.id}`} data={data} />
        ))}
        {banners.map((data) => (
          <WonderingBanners key={`banner-${data.id}`} data={data} />
        ))}
      </Masonry>
      <WonderingBottomSheetNav
        openSheet={openSheet}
        handleOpenSheet={handleOpenSheet}
        handleChangeCategory={handleChangeCategory}
        category={category}
        title="카테고리 선택"
        categories={['전체', '데일리 브리핑', '이슈 PICK', '종목 인사이트', '라이프 NOW', '투자 첫걸음']}
      />
    </>
  );
}
