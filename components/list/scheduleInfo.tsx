/** @jsxImportSource @emotion/react */

import styled from '@emotion/styled';
import { useState } from 'react';
import theme from '../../commons/theme';
import StockChip from '../chip/stock';
import { css } from '@emotion/react';
import { ISchedule } from '../../commons/types';
import TagChip from '../chip/tag';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 ${theme.metrics.m2} 0;
`;

const ScheduleContainer = styled.div<{ isWhite: boolean }>`
  background-color: ${(props) => (!props.isWhite ? theme.color.gray.white : theme.color.gray.w100)};
  border-radius: 24px;
  padding: ${theme.metrics.m6} ${theme.metrics.m6} ${theme.metrics.m6} ${theme.metrics.m6};
`;

const ScheduleChipContainer = styled.div<{ isTag: boolean }>`
  display: flex;
  flex-wrap: wrap;
  margin: ${(props) => (!props.isTag ? `0 0 ${theme.metrics.m2} 0` : `-${theme.metrics.m6} 0 ${theme.metrics.m2} 0`)};
`;

const TitleNStockContainer = styled.div`
  display: flex;
  cursor: pointer;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Title = styled.div<{ isClicked: boolean; maxChar: number }>`
  /* margin: 0 0 ${theme.metrics.m4} 0; */
  ${theme.fonts.s16_w500}
  color: ${theme.color.gray.w900};
  display: ${(props) => !props.isClicked && '-webkit-box'};
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: ${(props) => (!props.isClicked ? 'hidden' : 'display')};
`;

const StockContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.metrics.m2};
`;

const KeywordRatioContainer = styled.div`
  display: flex;
`;

interface Props {
  schedule: ISchedule;
  viewWidth: number;
  isWhite: boolean;
}

export default function ScheduleInfoList({ schedule, viewWidth, isWhite }: Props) {
  const [showDetail, setShowDetail] = useState(false);
  let maxChar = Math.floor(viewWidth / 15);

  return (
    <Wrapper>
      {schedule.comment ? (
        <ScheduleContainer isWhite={isWhite}>
          <ScheduleChipContainer isTag={Array.isArray(schedule.keywords) && schedule.keywords.length > 0}>
            {schedule && Array.isArray(schedule.keywords) && schedule.keywords.length > 0 && (
              <TagChip isForSchedule={true} size={12} Tags={schedule.keywords} />
            )}
          </ScheduleChipContainer>
          <Accordion sx={{ boxShadow: 'none', '::before': { display: 'none' }, margin: '0 0 !important', backgroundColor: 'transparent' }}>
            <AccordionSummary
              sx={{
                boxShadow: 'white',
                padding: '0',
                border: 'none',
                minHeight: '0px !important',
                margin: '0 0 !important',
                '.MuiAccordionSummary-content': {
                  margin: '0 !important',
                },
              }}
            >
              <TitleNStockContainer onClick={() => setShowDetail(!showDetail)}>
                <Title
                  maxChar={maxChar}
                  isClicked={showDetail}
                  css={css`
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -khtml-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                  `}
                >
                  {schedule.title}
                </Title>
              </TitleNStockContainer>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0' }}>
              <div
                css={css`
                  ${theme.fonts.s14_w400};
                  line-height: 24px;
                  color: ${theme.color.gray.w600};
                  margin: 0 0 ${theme.metrics.m5} 0;
                  white-space: pre-word;
                  width: 100%;
                `}
              >
                {schedule.comment}
              </div>
            </AccordionDetails>
          </Accordion>
          <StockContainer>
            {schedule &&
              Array.isArray(schedule.stocks) &&
              schedule.stocks.length > 0 &&
              schedule.stocks.map((stock) => (
                <StockChip key={`stockChip-${stock.code}`} isWhite={isWhite} stockname={stock.name} stockcode={stock.code} />
              ))}
          </StockContainer>
        </ScheduleContainer>
      ) : (
        <ScheduleContainer isWhite={isWhite}>
          <ScheduleChipContainer isTag={Array.isArray(schedule.keywords) && schedule.keywords.length > 0}>
            {schedule && Array.isArray(schedule.keywords) && schedule.keywords.length > 0 && (
              <TagChip isForSchedule={true} size={12} Tags={schedule.keywords} />
            )}
          </ScheduleChipContainer>
          <TitleNStockContainer onClick={() => setShowDetail(!showDetail)}>
            <Title
              maxChar={maxChar}
              isClicked={showDetail}
              css={css`
                -webkit-touch-callout: none;
                -webkit-user-select: none;
                -khtml-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
              `}
            >
              {schedule.title}
            </Title>
          </TitleNStockContainer>
          <StockContainer>
            {schedule &&
              Array.isArray(schedule.stocks) &&
              schedule.stocks.length > 0 &&
              schedule.stocks.map((stock) => (
                <StockChip key={`stockChip-${stock.code}`} isWhite={isWhite} stockname={stock.name} stockcode={stock.code} />
              ))}
          </StockContainer>
        </ScheduleContainer>
      )}
    </Wrapper>
  );
}
