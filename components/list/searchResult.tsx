/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import theme from '../../commons/theme';
import { imageLoader } from '../../commons/utils';
import Image from 'next/image';
import { ISearch, INews } from '../../commons/types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import SortBtnArraySelect from '../select/sortBtnArray';
import NewsList from '../../components/list/news';
import Highlighter from 'react-highlight-words';
import { useAppDispatch } from '../../lib/redux/hooks';
import { createSearchKeywordAnalytic } from '../../lib/redux/search';

interface Props {
  searchedResponse: ISearch[];
  searchedNews: INews[];
  inputText: string;
}

export default function SearchResultList({ searchedResponse, searchedNews, inputText }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [btnValue, setBtnValue] = useState('stock');
  const handleBtnValue = (value: string) => {
    setBtnValue(value);
  };

  const stocks = Array.isArray(searchedResponse) ? searchedResponse.filter((item) => item.type === 'stock') : [];
  stocks.sort((a, b) => {
    if (a.stockcode! < b.stockcode!) return -1;
    else if (a.stockcode! > b.stockcode!) return 1;
    else return 0;
  });

  const keywords = Array.isArray(searchedResponse) ? searchedResponse.filter((item) => item.type === 'tag') : [];

  const btnArr = [
    {
      value: 'stock',
      text: `관련종목 ${Array.isArray(stocks) ? stocks.length : 0}`,
    },
    {
      value: 'news',
      text: `뉴스 ${Array.isArray(searchedNews) ? searchedNews.length : 0}`,
    },
    {
      value: 'keyword',
      text: `키워드 ${Array.isArray(keywords) ? keywords.length : 0}`,
    },
  ];

  return (
    <div
      css={css`
        padding: 0 ${theme.metrics.m4} 0 ${theme.metrics.m4};
      `}
    >
      <div
        css={css`
          margin-bottom: ${theme.metrics.m8};
        `}
      >
        <SortBtnArraySelect SortArray={btnArr} btnValue={btnValue} handleBtnValue={handleBtnValue} />
      </div>
      <>
        {btnValue === 'stock' ? (
          stocks.map((data, index) => (
            <div key={index} css={Wrapper}>
              <div
                css={Content}
                onClick={() => {
                  // Elasitc 연동
                  const body = {
                    stockname: data.name,
                    stockcode: data.stockcode,
                  };
                  console.log('createSearchKeywordAnalytic', body);
                  dispatch(createSearchKeywordAnalytic(body));
                  router.push(`/stock/${data.stockcode}`);
                }}
              >
                {data.imageUrl && (
                  <Image
                    css={css`
                      border-radius: 50%;
                    `}
                    loader={imageLoader}
                    src={data.imageUrl}
                    alt="logo image"
                    height={48}
                    width={48}
                  />
                )}
                <div css={StockTag}>
                  <div css={NameCode}>
                    <Highlighter
                      css={css`
                        ${theme.fonts.s16_w700};
                        color: ${theme.color.gray.w900};
                        margin-bottom: ${theme.metrics.m1};
                      `}
                      highlightStyle={{
                        color: theme.color.secondary.blue01,
                        background: 'transparent',
                      }}
                      autoEscape={true}
                      searchWords={[inputText]}
                      textToHighlight={data.name}
                    />
                    <Highlighter
                      css={css`
                        ${theme.fonts.s14_w400};
                        color: ${theme.color.gray.w500};
                      `}
                      highlightStyle={{
                        color: theme.color.secondary.blue01,
                        background: 'transparent',
                      }}
                      unhighlightStyle={{
                        color: theme.color.gray.w500,
                      }}
                      autoEscape={true}
                      searchWords={[inputText]}
                      textToHighlight={data.stockcode!}
                    />
                  </div>
                  <div css={Tags}>
                    {data.tags &&
                      Array.isArray(data.tags) &&
                      data.tags.length > 0 &&
                      data.tags.map(
                        (data, index) =>
                          index < 4 && (
                            <span key={index} css={Tag}>
                              #{data.name}
                            </span>
                          ),
                      )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : btnValue === 'news' ? (
          <NewsList isRound={false} news={searchedNews} loading={'succeeded'} isBorder={true} />
        ) : (
          <div
            css={css`
              padding: ${theme.metrics.m4} ${theme.metrics.m4} 0 ${theme.metrics.m4};
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              gap: ${theme.metrics.m1};
            `}
          >
            {keywords.map((data) => (
              <button
                key={`tag-${data.name}`}
                css={css`
                  border-radius: ${theme.metrics.m2};
                  border: 1px solid ${theme.color.secondary.blue03};
                  background-color: ${theme.color.secondary.blue04};
                  padding: 6px ${theme.metrics.m2} 6px ${theme.metrics.m2};
                  color: ${theme.color.secondary.blue01};
                  margin-right: ${theme.metrics.m1};
                  cursor: pointer;
                `}
                onClick={() => router.push(`/keyword/${data.name}`)}
              >
                <Highlighter
                  css={css`
                    ${theme.fonts.s14_w500};
                  `}
                  unhighlightStyle={{
                    color: theme.color.secondary.blue01,
                  }}
                  highlightStyle={{
                    color: theme.color.secondary.pink01,
                    background: 'transparent',
                  }}
                  autoEscape={true}
                  searchWords={[inputText]}
                  textToHighlight={`#${data.name}`}
                />
              </button>
            ))}
          </div>
        )}
      </>
    </div>
  );
}

const Wrapper = css`
  display: flex;
  width: 100vw;
  cursor: pointer;
  margin: ${theme.metrics.m4} 0 ${theme.metrics.m4} 0;
`;
const Content = css`
  display: flex;
`;
const StockTag = css`
  display: flex;
  flex-direction: column;
  margin: 0 0 0 ${theme.metrics.m2};
  justify-content: center;
`;
const NameCode = css`
  display: flex;
  gap: ${theme.metrics.m1};
  align-items: center;
`;
const StockName = css`
  ${theme.fonts.s16_w700};
  color: ${theme.color.gray.w900};
`;
const StockCode = css`
  ${theme.fonts.s14_w400};
  color: ${theme.color.gray.w500};
`;
const Tags = css`
  margin: ${theme.metrics.m2} 0 0 0;
  max-height: 16px;
`;
const Tag = css`
  ${theme.fonts.s14_w500};
  color: ${theme.color.gray.w600};
  margin: 0 ${theme.metrics.m2} 0 0;
`;
