import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { ReactElement } from 'react';
import { IKeywordNews } from '../../../../commons/types';
import SubMainContainer from '../../../../components/container/subMain';
import TitleLayout from '../../../../components/layout/title';
import StockNewsList from '../../../../components/list/stock-news';
import { apiServer } from '../../../../lib/api';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const keyword = query.keyword;
  let keywordNews;
  try {
    const { data, status } = await apiServer.get(`/news/${keyword}?_sort=publishDate:DESC&_limit=30`);
    if (status === 200) {
      keywordNews = data;
    }
  } catch (e) {
    keywordNews = [];
  }
  // Pass data to the page via props
  return {
    props: {
      data: {
        keywordNews: keywordNews,
      },
    },
  };
};

export default function NewsKeyword(props: IKeywordNews) {
  const { data } = props;
  const { keywordNews } = data;
  return (
    <>
      <SubMainContainer>
        <StockNewsList stockNews={keywordNews} />
      </SubMainContainer>
    </>
  );
}
NewsKeyword.getLayout = function getLayout(page: ReactElement) {
  return (
    <TitleLayout isTitle={true} title={'키워드 소식'} isWhite={true}>
      {page}
    </TitleLayout>
  );
};
