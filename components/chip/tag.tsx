/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import theme from '../../commons/theme';
import { useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';
import { IKeyword } from '../../commons/types';
import { useRouter } from 'next/router';

interface Props {
  Tags: IKeyword[];
  size?: number;
  isForSchedule?: boolean;
}

export default function TagChip({ Tags, size, isForSchedule }: Props) {
  const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
  const { events } = useDraggable(ref);
  const router = useRouter();
  return (
    <>
      {Array.isArray(Tags) && Tags.length > 0 ? (
        <TagWrapper ref={ref} {...events}>
          {Tags.map((data, index) => (
            // <Button key={`tag-${tagName}`}># {tagName}</Button>
            <button
              css={css`
                ${size === 14 ? theme.fonts.s14_w500 : theme.fonts.s12_w500};
                border-radius: ${theme.metrics.m2};
                border: 1px solid ${theme.color.secondary.blue03};
                background-color: ${theme.color.secondary.blue04};
                padding: 6px ${theme.metrics.m2} 6px ${theme.metrics.m2};
                color: ${theme.color.secondary.blue01};
                margin-left: ${index === 0 ? theme.metrics.m4 : theme.metrics.m1};
                cursor: pointer;
                margin-right: ${index + 1 === Tags.length ? theme.metrics.m4 : theme.metrics.m1};
                margin-left: ${isForSchedule && 0};
                :hover {
                  background-color: ${theme.color.secondary.blue04};
                  opacity: 0.8;
                }
              `}
              onClick={() => router.push(`/keyword/${data.name}`)}
              key={`tag-${data.id}` + index}
            >
              #{data.name}
            </button>
          ))}
        </TagWrapper>
      ) : (
        <></>
      )}
    </>
  );
}

const TagWrapper = styled.div`
  display: flex;
  /* width: 100%; */
  overflow: auto;
  flex-wrap: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  white-space: nowrap;
  margin-top: ${theme.metrics.m6};
`;

// const Button = styled.button`
//   ${theme.fonts.s12_w500};
//   border-radius: ${theme.metrics.m2};
//   border: 1px solid ${theme.color.secondary.blue03};
//   background-color: ${theme.color.secondary.blue04};
//   padding: 6px ${theme.metrics.m2} 6px ${theme.metrics.m2};
//   color: ${theme.color.secondary.blue01};
//   margin-right: ${theme.metrics.m1};
// `;
