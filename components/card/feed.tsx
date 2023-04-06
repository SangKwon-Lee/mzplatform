import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import theme from '../../commons/theme';
import { wooriMZServer } from '../../lib/api';
import { IFeeds } from '../../commons/types';
import CardFeed from './feeds';
import images from '../../commons/theme/images';
import NoContentsImage from '../image/noContentsImage';
import { useRouter } from 'next/router';

export default function FeedCard() {
  const [totalCount, setTotalCount] = useState(0);
  const [feeds, setFeeds] = useState<IFeeds[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (router.query.stockcode) {
      handleGetFeeds();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetFeeds = async () => {
    try {
      const { data } = await wooriMZServer.get(`/v1/feeds?sectorId=${router.query.stockcode}`);
      if (Array.isArray(data.data.list) && data.data.list.length > 0) {
        setFeeds(data.data.list);

        setTotalCount(data.data.totalCount);
      }
    } catch (e) {}
  };
  return (
    <FeedContainer id="피드">
      <FeedTitle>
        관련 피드
        <FeedCount>{totalCount}</FeedCount>
      </FeedTitle>
      <FeedWrapper>
        {Array.isArray(feeds) && feeds.length > 0 ? (
          feeds.map((data, index) => <CardFeed data={data} key={index} />)
        ) : (
          <NoContentsImage text="피드가 없어요." src={images.noFeed}></NoContentsImage>
        )}
      </FeedWrapper>
    </FeedContainer>
  );
}

const FeedContainer = styled.div`
  width: 100%;
  padding: ${theme.metrics.m8} ${theme.metrics.m4};
  display: flex;
  flex-direction: column;
`;

const FeedTitle = styled.div`
  ${theme.fonts.s20_w500};
  color: ${theme.color.gray.w800};
  display: flex;
  align-items: center;
`;

const FeedCount = styled.span`
  ${theme.fonts.s16_w400};
  margin-left: ${theme.metrics.m1};
  color: ${theme.color.primary.purple};
`;

const FeedWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin-top: ${theme.metrics.m4};
  gap: ${theme.metrics.m2};
`;
