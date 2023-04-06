import { css } from '@emotion/react';
import theme from '../../commons/theme';
import Image from 'next/image';
import { useAppDispatch } from '../../lib/redux/hooks';
import { removeSearchedTerm } from '../../lib/redux/search';
import { useRouter } from 'next/router';

interface Props {
  history: string[];
}

export default function SearchHistoryChip({ history }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const Container = css`
    display: flex;
    padding: ${theme.metrics.m1} ${theme.metrics.m2};
    gap: ${theme.metrics.m2};
    border-radius: ${theme.metrics.m2};
    background-color: ${theme.color.secondary.blue04};
    border: 1px solid ${theme.color.secondary.blue03};
    align-items: center;
    cursor: pointer;
  `;
  const Word = css`
    ${theme.fonts.s12_w500};
    color: ${theme.color.secondary.blue01};
    line-height: 100%;
  `;
  const DeleteBtn = css`
    cursor: pointer;
  `;

  return (
    <>
      {history && Array.isArray(history) && history.length > 0
        ? history.map((data, index) => (
            <div onClick={() => router.push(`/search?query=${data}`)} key={index} css={Container}>
              <div css={Word}>{data}</div>
              <Image
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(removeSearchedTerm(index));
                }}
                css={DeleteBtn}
                src="/images/history_delete.svg"
                alt="delete history"
                width={16}
                height={16}
              />
            </div>
          ))
        : null}
    </>
  );
}
