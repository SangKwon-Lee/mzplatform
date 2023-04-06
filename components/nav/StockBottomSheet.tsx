import 'react-spring-bottom-sheet/dist/style.css';
import styled from '@emotion/styled';
import theme from '../../commons/theme';
import { css } from '@emotion/react';
import { Drawer } from '@mui/material';

interface StockBottomSheetNav {
  openSheet: boolean;
  handleOpenSheet: () => void;
  title: string;
  subTitle?: string;
  subText?: string;
  boldText?: string;
  description?: {
    style: string;
    text: string;
  }[];
  bgColor?: string;
}

const CustomDrawer = styled(Drawer)`
  .MuiPaper-root {
    max-width: ${theme.metrics.m4} ${theme.metrics.m6};
    @media (max-width: 584px) {
      max-height: 375px;
      padding: ${theme.metrics.m4};
      padding-bottom: calc(env(safe-area-inset-bottom));
    }
  }
  .MuiPaper-root {
    max-width: 600px;

    margin: 0 auto;
    border-radius: 32px 32px 0px색 0px;
    box-shadow: 0px -3px 24px rgba(0, 0, 0, 0.1);
  }

  .MuiDrawer-paperAnchorBottom {
    max-width: 400px !important;
    @media (max-width: 584px) {
      max-width: 600px !important;
    }
  }
`;

export default function StockBottomSheetNav({
  boldText,
  description,
  handleOpenSheet,
  openSheet,
  subTitle,
  title,
  subText,
  bgColor,
}: StockBottomSheetNav) {
  return (
    <CustomDrawer
      open={openSheet}
      anchor="bottom"
      onClose={handleOpenSheet}
      transitionDuration={{
        appear: 0,
        enter: 0,
        exit: 0,
      }}
    >
      <BottomSheetWrapper>
        <BottomSheetTitleWrapper>
          <BottomSheetTitle>{title}</BottomSheetTitle>
          <BottomSheetClose onClick={handleOpenSheet} src="/images/close.svg" alt="close" />
        </BottomSheetTitleWrapper>
        <BottmoSheetSubTitle>{subTitle}</BottmoSheetSubTitle>
        {subText && <BottmoSheetSubText>{subText}</BottmoSheetSubText>}
        {boldText && <BottomSheetBoldText>{boldText}</BottomSheetBoldText>}
        {Array.isArray(description) && description.length > 0 && (
          <BottomSheetGrayWrapper
            css={css`
              background-color: ${bgColor};
            `}
          >
            {Array.isArray(description) &&
              description.length > 0 &&
              description.map((data) => {
                if (data.style === '16') {
                  return <BottomSheetGrayText key={data.text}>{data.text}</BottomSheetGrayText>;
                } else {
                  return <BottomSheetGraySubText key={data.text}>{data.text}</BottomSheetGraySubText>;
                }
              })}
          </BottomSheetGrayWrapper>
        )}
      </BottomSheetWrapper>
    </CustomDrawer>
  );
}

const BottomSheetWrapper = styled.div`
  max-height: 450px;
  width: 100%;
  overflow: auto;
`;

const BottomSheetTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.metrics.m4};
`;

const BottomSheetClose = styled.img`
  cursor: pointer;
`;

const BottomSheetTitle = styled.div`
  font-weight: 700;
  font-size: 1.8rem;
`;

const BottmoSheetSubTitle = styled.div`
  ${theme.fonts.s16_w400};
  color: ${theme.color.gray.w600};
`;
const BottmoSheetSubText = styled.div`
  ${theme.fonts.s16_w500};
  text-align: center;
  margin-top: ${theme.metrics.m10};
  margin-bottom: ${theme.metrics.m6};
`;

const BottomSheetBoldText = styled.div`
  ${theme.fonts.s20_w500};
  color: ${theme.color.primary.purple};
  width: 100%;
  text-align: center;
  margin-bottom: ${theme.metrics.m10};
  white-space: pre-wrap;
  line-height: 2.6rem;
`;

const BottomSheetGrayWrapper = styled.div`
  width: 100%;
  border-radius: 32px;
  padding: ${theme.metrics.m4};
  color: ${theme.color.gray.w600};
  gap: ${theme.metrics.m2};
  display: flex;
  flex-direction: column;
`;

const BottomSheetGrayText = styled.div`
  ${theme.fonts.s16_w400}
  color:${theme.color.gray.w600};
  line-height: 2.6rem;
  /* margin-bottom: ${theme.metrics.m2}; */
`;

const BottomSheetGraySubText = styled.div`
  ${theme.fonts.s14_w400}
  color:${theme.color.gray.w500};
  line-height: 2rem;
  margin-bottom: ${theme.metrics.m2};
`;
