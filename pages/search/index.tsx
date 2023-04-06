/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import SearchHeader from '../../components/header/search';
import Image from 'next/image';
import theme from '../../commons/theme';
import { css } from '@emotion/react';
import { ReactElement, useContext, useEffect, useState } from 'react';
import SearchLayout from '../../components/layout/search';
import SearchResultList from '../../components/list/searchResult';
import { useAppDispatch, useAppSelector } from '../../lib/redux/hooks';
import { fetchNewsByKeyword, fetchSearchAuto, fetchSearch, storeSearchedTerm, fetchHotStock } from '../../lib/redux/search';
import type { ISearchModeType, ISearchAuto, ISearch, INews } from '../../commons/types';
import SearchAutocomplete from '../../components/autocomplete/search';
import { useRouter } from 'next/router';
import { cleanNews, cleanResponse } from '../../lib/redux/search';
import { GetServerSideProps } from 'next';
import { apiServer } from '../../lib/api';
import SearchHistoryChip from '../../components/chip/searchHistory';
import MainContainer from '../../components/container/main';
import dayjs from 'dayjs';
import { fetchStockTodayPrice } from '../../lib/redux/stocks';
import PriceContext from '../../contexts/price';
import PopularSearchList from '../../components/list/popularSearch';

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const initialValue = {
    props: {
      ssrSearchedResponse: [],
      ssrSearchedNews: [],
    },
  };
  if (query && typeof query.query === 'string') {
    const keyword = query.query;
    try {
      const searchedResponse = await apiServer.get(`/search/autoComplete/${keyword}`);
      const searchedNews = await apiServer.get(`/news/${keyword}`);

      if (searchedResponse.status === 200 && searchedNews.status === 200) {
        return {
          props: {
            ssrSearchedResponse: searchedResponse.data,
            ssrSearchedNews: searchedNews.data,
          },
        };
      } else {
        return initialValue;
      }
    } catch (error) {
      return initialValue;
    }
  } else {
    return initialValue;
  }
};

interface Props {
  ssrSearchedResponse: ISearch[];
  ssrSearchedNews: INews[];
}

export default function Search({ ssrSearchedNews, ssrSearchedResponse }: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchedResponse = useAppSelector((state) => state.search.response);
  const searchedNews = useAppSelector((state) => state.search.news);
  const { hotStocks, screenLoading } = useAppSelector((state) => state.search);
  const autocompleteResult = useAppSelector((state) => state.search.autocomplete);
  const { history } = useAppSelector((state) => state.history);
  const query = router.query.query && typeof router.query.query === 'string' ? router.query.query : '';
  const [inputText, setInputText] = useState(query || '');
  const [searchMode, setSearchMode] = useState<ISearchModeType>(query ? 'ssr-searched' : 'idle');
  const { connected, registRealtimePrice, unregistRealtimePriceAll } = useContext(PriceContext);

  const onTextChangeHandler = (value: string) => {
    setInputText(value);
  };

  useEffect(() => {
    if (query && typeof query === 'string') {
      setInputText(query);
    }
  }, [query]);

  useEffect(() => {
    const handleAutocomplete = (input: string) => {
      dispatch(fetchSearchAuto(input));
    };

    if (inputText.length === 0) {
      dispatch(cleanResponse());
      dispatch(cleanNews());
      setSearchMode('idle');
      router.push('/search');
    } else if (inputText && inputText.length >= 1) {
      /**
       * ssr-searched는 오직 url에 query 값을 주었을 때만 진입 가능한 상태이다.
       * 이 코드 내부에서는 결코 ssr-searched로 가지 않는다.
       *
       * 이렇게 분기를 하는 이유는, 최초 inputText에 query 값이 입력되었을 때도
       * 이 useEffect가 실행이 되고, inputText가 변하게 되니 autocomplete 모드로
       * 깜빡이며 살짝 진입하기 때문이다.
       *
       * 그래서 최초 진입시는 ssr-searched -> searched 로 모드를 바꿔줘서 깜빡임을 방지하고
       * 향후는 정상적으로 작동하게 한다.
       */
      if (searchMode === 'ssr-searched') {
        setSearchMode('searched');
      } else {
        setSearchMode('autocomplete');
        handleAutocomplete(inputText);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputText, dispatch]);

  const onClickSearchItem = (item: ISearchAuto) => {
    if (item.type === 'tag') {
      if (!history.includes(item.name)) {
        dispatch(storeSearchedTerm(`#${item.name}`));
      }
      router.push(`/keyword/${item.name}`);
    } else if (item.type === 'stock') {
      if (!history.includes(item.name)) {
        dispatch(storeSearchedTerm(item.name));
      }
      // router.push(`/search?query=${item.name}`);
      router.replace(`/search?query=${item.name}`, undefined, { shallow: false });
      dispatch(fetchSearch(item.name));
      dispatch(fetchNewsByKeyword(item.name));
    }
  };

  useEffect(() => {
    if ((searchedResponse && searchedResponse.length > 0) || (searchedNews && searchedNews.length > 0)) {
      if (searchMode !== 'searched') {
        setSearchMode('searched');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedResponse, searchedNews]);

  useEffect(() => {
    if (searchedResponse && searchedResponse.length > 0) {
      const fetchedStocks: string[] = [];
      searchedResponse.forEach((response) => {
        if (response.stockcode) {
          // 검색 결과에서 이미 주가 가격들이 있는 경우
          if (fetchedStocks.find((item) => item === response.stockcode) || !response.stockcode) {
            !response.stockcode ? console.log('Stock code is not found: ', response) : null;
            return;
            ``;
          }
          dispatch(fetchStockTodayPrice(response.stockcode));
          fetchedStocks.push(response.stockcode);
        }
      });
      registRealtimePrice(fetchedStocks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedResponse]);

  useEffect(() => {
    if (hotStocks && hotStocks.stocks && Array.isArray(hotStocks.stocks) && hotStocks.stocks.length > 0) {
      const fetchedStocks: string[] = [];
      hotStocks.stocks.forEach((stock) => {
        // 일정에 포함된 종목들 중 이미 fetch한 경우는 스킵
        if (fetchedStocks.find((item) => item === stock.stockcode) || !stock.stockcode) {
          !stock.stockcode ? console.log('Stock code is not found: ', stock) : null;
          return;
        }
        dispatch(fetchStockTodayPrice(stock.stockcode));
        fetchedStocks.push(stock.stockcode);
      });
      registRealtimePrice(fetchedStocks);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotStocks]);

  useEffect(() => {
    dispatch(fetchHotStock());
    return () => {
      unregistRealtimePriceAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  switch (searchMode) {
    case 'autocomplete':
      return (
        <>
          <SearchHeader onTextChangeHandler={onTextChangeHandler} inputText={inputText} />
          <SearchContainer>
            <SearchAutocomplete autocompleteResult={autocompleteResult} onClickSearchItem={onClickSearchItem} inputText={inputText} />
          </SearchContainer>
        </>
      );
    case 'ssr-searched':
    case 'searched':
      return (
        <>
          <SearchHeader onTextChangeHandler={onTextChangeHandler} inputText={inputText} />
          <SearchContainer>
            <SearchResultList
              searchedResponse={ssrSearchedResponse && ssrSearchedResponse.length > 0 ? ssrSearchedResponse : searchedResponse}
              searchedNews={ssrSearchedNews && ssrSearchedNews.length > 0 ? ssrSearchedNews : searchedNews}
              inputText={inputText}
            />
          </SearchContainer>
        </>
      );
    case 'idle':
    default:
      return (
        <>
          <SearchHeader onTextChangeHandler={onTextChangeHandler} inputText={inputText} />
          <MainContainer>
            <div
              css={css`
                display: flex;
                /* justify-content: center; */
                min-width: 100%;
              `}
            >
              {/* <div
              css={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Image
                loader={imageLoader}
                css={css`
                  margin-top: 50%;
                `}
                src="/images/empty.svg"
                alt="img no content"
                width={343}
                height={132}
              />
            </div> */}
              <div
                css={css`
                  display: flex;
                  flex-wrap: wrap;
                  margin: ${theme.metrics.m6} 0;
                  gap: ${theme.metrics.m2};
                  justify-content: flex-start;
                `}
              >
                {/*
                현재 검색 기록을 어떻게 남길지 몰라서 string[] 형식의 객체를 만들어둠.
                */}
                <SearchHistoryChip history={history} />
              </div>
            </div>
            {screenLoading && (
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  margin: 0 0 80px 0;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: ${theme.metrics.m2} 0 ${theme.metrics.m4} 0;
                  `}
                >
                  <div
                    css={css`
                      color: ${theme.color.gray.w600};
                      ${theme.fonts.s16_w700};
                    `}
                  >
                    인기 검색
                  </div>
                  <div
                    css={css`
                      color: ${theme.color.gray.w500};
                      ${theme.fonts.s12_w400}
                    `}
                  >
                    오늘 {dayjs().format('HH:mm 기준')}
                  </div>
                </div>
                {hotStocks && hotStocks.stocks && Array.isArray(hotStocks.stocks) && hotStocks.stocks.length > 0 ? (
                  <div
                    css={css`
                      display: flex;
                      flex-direction: column;
                      row-gap: ${theme.metrics.m2};
                    `}
                  >
                    <PopularSearchList popular={hotStocks.stocks} />
                  </div>
                ) : (
                  <div
                    css={css`
                      display: flex;
                      height: 300px;
                      justify-content: center;
                      align-items: center;
                      border-radius: 24px;
                    `}
                  >
                    <div
                      css={css`
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                        position: relative;
                        top: 24px;
                      `}
                    >
                      <Image
                        css={css`
                          filter: contrast(0.95);
                          margin: auto;
                          position: rel;
                        `}
                        src={'/images/noContents.svg'}
                        alt={'no-content'}
                        width={145}
                        height={80}
                      />
                      <p
                        css={css`
                          ${theme.fonts.s16_w400};
                          color: ${theme.color.gray.w600};
                        `}
                      >
                        {'인기 검색이 없어요.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </MainContainer>
        </>
      );
  }
}

Search.getLayout = function getLayout(page: ReactElement) {
  const test = page.props;
  return <SearchLayout>{page}</SearchLayout>;
};

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.gray.white};
  width: 100%;
  min-width: 360px;
  max-width: 600px;
  height: 100vh;
  overflow-y: scroll;
  flex-wrap: nowrap;
  padding: ${theme.metrics.m6} 0 0 0;
`;
