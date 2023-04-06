import 'react-spring-bottom-sheet/dist/style.css';
import { BottomSheet } from 'react-spring-bottom-sheet';
import styled from '@emotion/styled';
import theme from '../../commons/theme';

interface StockBottomSheetNav {
  openSheet: boolean;
  handleOpenSheet: () => void;
  title: string;
  subTitle?: string;
  boldText?: string;
  description: string;
  keyword?: string;
}

export default function StockAIOpinionBottomSheetNav({ handleOpenSheet, openSheet, title, keyword }: StockBottomSheetNav) {
  return (
    <BottomSheet onDismiss={handleOpenSheet} open={openSheet}>
      <BottomSheetWrapper>
        <BottomSheetTitleWrapper>
          <BottomSheetTitle>{title}</BottomSheetTitle>
          <BottomSheetClose onClick={handleOpenSheet} src="/images/close.svg" alt="close" />
        </BottomSheetTitleWrapper>
        <iframe src={`https://oneshot.innofin.co.kr/surprise/${keyword}`} width={'100%'} height={400} style={{ border: 'none' }} />
        {/* <BottmoSheetSubTitle>{subTitle}</BottmoSheetSubTitle>
        <BottomSheetBoldText>{boldText}</BottomSheetBoldText>
        <BottomSheetGrayWrapper>{description}</BottomSheetGrayWrapper> */}
      </BottomSheetWrapper>
    </BottomSheet>
  );
}

const BottomSheetWrapper = styled.div`
  padding: 0px ${theme.metrics.m4} ${theme.metrics.m8} ${theme.metrics.m4};
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
  margin-bottom: ${theme.metrics.m10};
`;

const BottomSheetBoldText = styled.div`
  ${theme.fonts.s20_w500};
  width: 100%;
  text-align: center;
  margin-bottom: ${theme.metrics.m10};
`;

const BottomSheetGrayWrapper = styled.div`
  width: 100%;
  ${theme.fonts.s16_w400};
  background-color: ${theme.color.gray.w100};
  border-radius: 32px;
  padding: ${theme.metrics.m4};
  color: ${theme.color.gray.w600};
  line-height: 1.625rem;
`;
