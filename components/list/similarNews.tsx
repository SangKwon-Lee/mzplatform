import { ILoadingType, ISimilarNews } from '../../commons/types';
import { useAppDispatch } from '../../lib/redux/hooks';
import { setNewsBottomSheet, closeNewsBottomSheet } from '../../lib/redux/bottomSheets';
import SimilarNewsListItem from '../listitem/similarNews';

interface Props {
  similarNews: ISimilarNews[];
  isRound: boolean;
  isBorder?: boolean;
  loading: ILoadingType;
}

export default function SimilarNewsList(props: Props) {
  const { similarNews, isRound, loading, isBorder } = props;
  const dispatch = useAppDispatch();

  const handleOpenSheet = () => {
    dispatch(closeNewsBottomSheet());
  };

  const onClickNewsItem = (news: ISimilarNews) => {
    dispatch(
      setNewsBottomSheet({
        title: news.title,
        summary: news.summarized,
        openSheet: true,
        handleOpenSheet: handleOpenSheet,
        url: news.url,
        photo: news.photo || '',
        publishDate: news.publishDate,
        media: news.mediaName,
      }),
    );
  };

  return (
    <>
      {loading &&
        similarNews &&
        Array.isArray(similarNews) &&
        similarNews.length > 0 &&
        similarNews.map((data) => (
          <SimilarNewsListItem
            key={`news-item-${data.id}`}
            similarNews={data}
            isRound={isRound}
            onClickNewsItem={onClickNewsItem}
            isBorder={isBorder}
          />
        ))}
    </>
  );
}
