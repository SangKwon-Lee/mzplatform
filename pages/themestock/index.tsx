import TopRanking from '../../components/list/topRanking';
import MostViewList from '../../components/list/mostView';
import RankingThemeStock from '../../components/list/stockranking';
import KeywordCard from '../../components/card/keyword';
import theme from '../../commons/theme';
import MainContainer from '../../components/container/main';
import styled from '@emotion/styled';
import { GetServerSideProps } from 'next';
import { ThemeStockServerSideProps } from '../../commons/types';
import CloudChart from '../../components/chart/cloud';
import { apiServer } from '../../lib/api';
import { useContext, useEffect, useState } from 'react';
import NoContentsImage from '../../components/image/noContentsImage';
import { css } from '@emotion/react';
import PriceContext from '../../contexts/price';
import FloatingActionButton from '../../components/button/fab';

export const getServerSideProps: GetServerSideProps = async () => {
  let resultKeywordRanking = {
    up: [],
    down: [],
  };

  // try {
  //   const { data, status } = await apiServer.get(`/analytics/todayKeyword`);
  //   if (status === 200) {
  //     resultTodayKeyeword = data;
  //     const result = await Promise.all([
  //       apiServer.get(`keywords/${data.keyword1}`),
  //       apiServer.get(`keywords/${data.keyword2}`),
  //       apiServer.get(`keywords/${data.keyword3}`),
  //       apiServer.get(`keywords/${data.keyword4}`),
  //       apiServer.get(`keywords/${data.keyword5}`),
  //       apiServer.get(`keywords/${data.keyword6}`),
  //       apiServer.get(`keywords/${data.keyword7}`),
  //       apiServer.get(`keywords/${data.keyword8}`),
  //       apiServer.get(`keywords/${data.keyword9}`),
  //       apiServer.get(`keywords/${data.keyword10}`),
  //     ]);
  //     if (Array.isArray(result) && result.length > 0) {
  //       resultKeywordRatio = result.map((data) => data.data);
  //     }
  //   }
  // } catch (e) {
  //   resultTodayKeyeword = emptyTodayKeyword;
  //   resultKeywordRatio = [];
  // }

  try {
    const { data, status } = await apiServer.get(`/keywords/ranking?limit=10`);
    if (status === 200) {
      resultKeywordRanking = data;
    }
  } catch (e) {
    resultKeywordRanking = {
      up: [],
      down: [],
    };
  }

  // Pass data to the page via props
  return {
    props: {
      keywordRainking: resultKeywordRanking,
    },
  };
};

const backgroundColors = [
  theme.color.learn_random.turquoise,
  theme.color.learn_random.blue,
  theme.color.learn_random.green,
  theme.color.learn_random.indigo,
  theme.color.learn_random.pink,
  theme.color.learn_random.olive,
  theme.color.learn_random.orange,
  theme.color.learn_random.purple,
  theme.color.learn_random.red,
  theme.color.learn_random.brown,
];

export default function ThemeStock(props: ThemeStockServerSideProps) {
  const { keywordRainking } = props;
  const [keyword, setKeyword] = useState('');
  const [backgroundColor, setBackgroundColor] = useState(theme.color.learn_random.turquoise);
  const { unregistRealtimePriceAll } = useContext(PriceContext);
  useEffect(() => {
    if (Array.isArray(keywordRainking.up) && keywordRainking.up.length > 0) {
      setKeyword(keywordRainking.up[0].name);
    }
  }, [keywordRainking]);

  const handleKeyword = (data: string, index: number) => {
    setKeyword(data);
    const indexs = index % backgroundColors.length;
    const color = backgroundColors[indexs];
    setBackgroundColor(color);
  };

  useEffect(() => {
    return () => {
      unregistRealtimePriceAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MainContainer>
        <div style={{ margin: `0 ${theme.metrics.m1} 0 ${theme.metrics.m1}` }}>
          {Array.isArray(keywordRainking.up) && keywordRainking.up.length > 0 ? (
            <CloudChart todayKeyword={keywordRainking.up} handleKeyword={handleKeyword} />
          ) : (
            <NoContentsImage text="키워드 정보가 없어요." height={'270px'} />
          )}
        </div>
        <ColumnMarginWrapper style={{ marginTop: theme.metrics.m6 }}>
          {Array.isArray(keywordRainking.up) && keywordRainking.up.length > 0 ? (
            <KeywordCard keyword={keyword} backgroundColor={backgroundColor} />
          ) : (
            <div
              css={css`
                background-color: white;
                border-radius: 32px;
              `}
            >
              <NoContentsImage text="키워드 정보가 없어요." />
            </div>
          )}
        </ColumnMarginWrapper>
        <ColumnMarginWrapper>
          <TopRanking title="상승률 상위 5" mode={'up'} topRankingData={keywordRainking.up} />
        </ColumnMarginWrapper>
        <ColumnMarginWrapper>
          <TopRanking title="하락률 상위 5" mode={'down'} topRankingData={keywordRainking.down} />
        </ColumnMarginWrapper>
        <ColumnMarginWrapper>
          <MostViewList />
        </ColumnMarginWrapper>
        <ColumnMarginWrapper>
          <RankingThemeStock />
        </ColumnMarginWrapper>
        <FloatingActionButton />
      </MainContainer>
    </>
  );
}

const ColumnMarginWrapper = styled.div`
  margin: ${theme.metrics.m10} 0;
`;
