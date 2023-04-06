import { ILoadingType, INews } from '../../commons/types';
import { useAppDispatch } from '../../lib/redux/hooks';
import { setNewsBottomSheet, closeNewsBottomSheet } from '../../lib/redux/bottomSheets';
import NewsListItem from '../listitem/news';

interface Props {
  news: INews[];
  isRound: boolean;
  isBorder?: boolean;
  loading?: ILoadingType;
}

export default function NewsList(props: Props) {
  const { news, isRound, loading, isBorder } = props;
  const dispatch = useAppDispatch();

  const handleOpenSheet = () => {
    dispatch(closeNewsBottomSheet());
  };

  const onClickNewsItem = (news: INews) => {
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
      {news.map((data) => (
        <NewsListItem key={`news-item-${data.id}`} news={data} isRound={isRound} onClickNewsItem={onClickNewsItem} isBorder={isBorder} />
      ))}
    </>
  );
}
