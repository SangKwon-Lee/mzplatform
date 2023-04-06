/** @jsxImportSource @emotion/react */
import theme from '../../../commons/theme';
import { useRouter } from 'next/router';
import ViewerLayout from '../../../components/layout/viewer';
import { ReactElement, useEffect } from 'react';
import { IArticle, IKeyword } from '../../../commons/types';
import SubMainContainer from '../../../components/container/subMain';
import WonderingTopNav from '../../../components/nav/wonderingTop';
import { apiServer } from '../../../lib/api';
import ActivityIndicator from '../../../components/indicator/activity';
//* React-notion-x
import dynamic from 'next/dynamic';
import * as notion from '../../../lib/notion/notion';
import { NotionRenderer } from 'react-notion-x';
import axios from 'axios';

//* React-notion-x 공식 문서에 적힌 Next.js에서의 사용법
const Code = dynamic(() => import('react-notion-x/build/third-party/code').then((m) => m.Code));
const Collection = dynamic(() => import('react-notion-x/build/third-party/collection').then((m) => m.Collection));
const Equation = dynamic(() => import('react-notion-x/build/third-party/equation').then((m) => m.Equation));
const Pdf = dynamic(() => import('react-notion-x/build/third-party/pdf').then((m) => m.Pdf), {
  ssr: false,
});
const Modal = dynamic(() => import('react-notion-x/build/third-party/modal').then((m) => m.Modal), {
  ssr: false,
});

export const getServerSideProps = async (context: any) => {
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

  context.res.setHeader('Cache-Control', 'no-cache');
  const articleId = String(context.params.articleId);
  const initialValue = {
    props: {
      articles: [],
      notionData: [],
      error: false,
    },
  };
  let articles = {};
  let notionData = {};
  let notionUrl = '';
  try {
    const { data, status } = await cmsServer.get(`/articles/${articleId}?populate=*`, {
      headers: {
        'Cache-Control': 'no-cache',
        Pragma: 'no-cache',
        Expires: '0',
      },
    });
    const CMS_URL = 'https://cms.woorimz.com';
    if (status === 200) {
      articles = {
        id: data.data.id,
        ...data.data.attributes,
        author: {
          id: data.data.attributes.author.data.id,
          name: data.data.attributes.author.data.attributes.name,
          position: data.data.attributes.author.data.attributes.position,
        },
        category: { id: data.data.attributes.category.data.id, name: data.data.attributes.category.data.attributes.name },
        thumbnailUrl: data.data.attributes.thumbnail?.data?.attributes?.url
          ? `${CMS_URL}/${data.data.attributes.thumbnail.data.attributes.url}`
          : null,
      };
      notionUrl = data.data.attributes.linkUrl;
      //* 노션 페이지의 고유 url을 받아와 react-notion-x를 이용하여 노션에서 보는 것과 똑같이 만들어 주는 곳입니다.
      if (notionUrl.length > 0) {
        try {
          const recordMap = await notion.getPage(notionUrl);
          notionData = recordMap;
          return {
            props: {
              articles,
              notionData,
              error: false,
            },
          };
        } catch (e) {
          return initialValue;
        }
      }
    }
  } catch (e) {
    return initialValue;
  }
};

interface Props {
  articles: IArticle;
  notionData: any;
  error: boolean;
  title?: string;
  Ikeyword: IKeyword[];
}
export default function WonderingFeedViewer(props: Props) {
  const router = useRouter();
  const { error, articles, notionData } = props;
  useEffect(() => {
    if (error) {
      router.push(`/wondering`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (document) {
      let details = document.getElementsByTagName('details');
      let code = document.getElementsByTagName('code');
      for (let i = 0; i < details.length; i++) {
        //@ts-ignore
        details[i].setAttribute('open', true);
      }

      for (let i = 0; i < code.length; i++) {
        //@ts-ignore
        if (code[i].innerText.includes('$')) {
          code[i].innerText = code[i].innerText.replace(/\-$/g, '').replace(/[`~'!’@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
        }
      }

      for (let i = 0; i < code.length; i++) {
        code[i].addEventListener('click', function (e: any) {
          if (e.target.innerText) {
            if (e.target.innerText.includes('#')) {
              router.push(`/keyword/${String(e.target.innerText).trim().replaceAll('#', '')}`);
            } else {
              const stockName = e.target.innerText
                .replace(/\-$/g, '')
                // .replace(/\s/g, '')
                .replace(/[`~'!’@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, '');
              handleSearchStock(stockName);
              // router.push(`/stock/${String(e.target.innerText).replaceAll('$', '').trim().replace(/\-$/g, '')}`);
            }
          }
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const handleSearchStock = async (stockName: string) => {
    try {
      const { data, status } = await apiServer.get(`/search/autoComplete/${stockName}?`);
      if (status === 200) {
        if (Array.isArray(data) && data.length > 0) {
          router.push(`/stock/${data[0].stockcode}`);
        }
        if (Array.isArray(data) && data.length === 0) {
          router.push(`/search?query=${stockName}`);
        }
      }
    } catch (e) {
      router.push(`/search?query=${stockName}`);
    }
  };
  return (
    <>
      <SubMainContainer>
        {articles?.id && notionData ? (
          <>
            <WonderingTopNav
              title={articles.title}
              category={articles?.category.name}
              create_at={articles?.createdAt}
              thumbnailUrl={articles?.thumbnailUrl || ''}
            ></WonderingTopNav>
            <div style={{ backgroundColor: 'white', padding: theme.metrics.m4 }}>
              {/* 브라우저에 노션을 렌더링 하는 곳 */}
              <NotionRenderer
                fullPage={true}
                //@ts-ignore
                recordMap={notionData}
                components={{
                  Code,
                  Collection,
                  Equation,
                  Modal,
                  Pdf,
                }}
                hideBlockId
                pageHeader={false}
                pageCover={false}
                pageAside={false}
                pageFooter={false}
                pageTitle={false}
                disableHeader
              />
            </div>
          </>
        ) : (
          <ActivityIndicator containerHeight={100} />
        )}
      </SubMainContainer>
    </>
  );
}

WonderingFeedViewer.getLayout = function getLayout(page: ReactElement) {
  if (page.props?.articles?.id) {
    return <ViewerLayout title={page.props.articles?.category?.name}>{page}</ViewerLayout>;
  } else {
    return <ViewerLayout title="Wondering">{page}</ViewerLayout>;
  }
};
