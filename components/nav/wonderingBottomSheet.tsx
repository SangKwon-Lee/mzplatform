import 'react-spring-bottom-sheet/dist/style.css';
import { BottomSheet } from 'react-spring-bottom-sheet';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import theme from '../../commons/theme';
import { Dialog } from '@mui/material';
import { BrowserView, MobileView } from 'react-device-detect';

interface Props {
  openSheet: boolean;
  handleOpenSheet: () => void;
  title: string;
  category: string;
  categories: string[];
  handleChangeCategory: (selected: string) => void;
}

export default function WonderingBottomSheetNav({ openSheet, handleOpenSheet, title, category, categories, handleChangeCategory }: Props) {
  return (
    <>
      <MobileView>
        <BottomSheet onDismiss={handleOpenSheet} open={openSheet}>
          <BottomSheetWrapper>
            <BottomSheetTitleWrapper>
              <BottomSheetTitle>{title}</BottomSheetTitle>
              <BottomSheetClose onClick={handleOpenSheet} src="/images/close.svg" alt="close" />
            </BottomSheetTitleWrapper>
            {categories &&
              Array.isArray(categories) &&
              categories.length > 0 &&
              categories.map((data, index) => (
                <BottmoSheetSubTitle selected={category == data} onClick={() => handleChangeCategory(data)} key={index}>
                  {data}
                </BottmoSheetSubTitle>
              ))}
          </BottomSheetWrapper>
        </BottomSheet>
      </MobileView>
      <BrowserView>
        <Dialog sx={{ '.MuiPaper-root': { borderRadius: '32px !important' } }} onClose={handleOpenSheet} open={openSheet}>
          <BottomSheetWrapper
            css={css`
              width: 400px;
              padding: 32px !important;
            `}
          >
            <BottomSheetTitleWrapper>
              <BottomSheetTitle>{title}</BottomSheetTitle>
              <BottomSheetClose onClick={handleOpenSheet} src="/images/close.svg" alt="close" />
            </BottomSheetTitleWrapper>
            {categories &&
              Array.isArray(categories) &&
              categories.length > 0 &&
              categories.map((data, index) => (
                <BottmoSheetSubTitle selected={category == data} onClick={() => handleChangeCategory(data)} key={index}>
                  {data}
                </BottmoSheetSubTitle>
              ))}
          </BottomSheetWrapper>
        </Dialog>
      </BrowserView>
    </>
  );
}
const BottomSheetWrapper = styled.div`
  padding: 0px ${theme.metrics.m4} ${theme.metrics.m8} ${theme.metrics.m4};
  min-width: 300px;
`;

const BottomSheetTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.metrics.m8};
`;

const BottomSheetClose = styled.img`
  cursor: pointer;
`;

const BottomSheetTitle = styled.div`
  font-weight: 700;
  font-size: 1.8rem;
`;

const BottmoSheetSubTitle = styled.div<{ selected: boolean }>`
  min-height: 30px;
  cursor: pointer;
  ${(props) => (props.selected ? theme.fonts.s16_w700 : theme.fonts.s16_w400)}
  color: ${(props) => (props.selected ? theme.color.primary.purple : theme.color.gray.w600)};
  margin-bottom: ${theme.metrics.m4};
`;
