import { IHotStock } from '../../commons/types';
import PopularSearchListItem from '../listitem/popularSearch';

interface Props {
  popular: IHotStock[];
}

export default function PopularSearchList({ popular }: Props) {
  return (
    <>
      {popular && Array.isArray(popular) && popular.length > 0
        ? popular.map((data, index) => <PopularSearchListItem key={index} index={index} stockname={data.stockname} stockcode={data.stockcode} />)
        : null}
    </>
  );
}
