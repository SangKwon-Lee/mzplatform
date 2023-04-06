import styled from '@emotion/styled';
import { Button } from '@mui/material';
import theme from '../../commons/theme';
import { css } from '@emotion/react';

interface SortBtnSelectProps {
  SortArray: {
    value: string;
    text: string;
  }[];
  btnValue: string;
  handleBtnValue: (value: string) => void;
}

export default function SortBtnArraySelect({ SortArray, btnValue, handleBtnValue }: SortBtnSelectProps) {
  return (
    <RankingSortWrapper>
      {Array.isArray(SortArray) && SortArray.length > 0 ? (
        SortArray.map((data) => (
          <RankingSortBtn
            onClick={() => handleBtnValue(data.value)}
            key={data.value}
            css={css`
              background-color: ${btnValue === data.value ? theme.color.primary.purple05 : 'transparent'};
              border: ${btnValue === data.value ? `1px solid ${theme.color.primary.purple}` : `1px solid ${theme.color.gray.w500}`};
              color: ${btnValue === data.value ? theme.color.primary.purple_dark : theme.color.gray.w500};
            `}
          >
            {data.text}
          </RankingSortBtn>
        ))
      ) : (
        <></>
      )}
    </RankingSortWrapper>
  );
}

const RankingSortWrapper = styled.div`
  display: flex;
  overflow: auto;
  flex-wrap: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  white-space: nowrap;
`;

const RankingSortBtn = styled(Button)`
  ${theme.fonts.s14_w400}
  border-radius: 24px;
  cursor: pointer;
  padding: ${theme.metrics.m2} ${theme.metrics.m4};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: ${theme.metrics.m2};
`;
