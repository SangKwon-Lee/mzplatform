import styled from '@emotion/styled';
import Image from 'next/image';
import { useRouter } from 'next/router';
import theme from '../../commons/theme';
import { imageLoader } from '../../commons/utils';

export default function AskingPriceCard() {
  const router = useRouter();
  const { stockcode } = router.query;

  return (
    <AskingPriceContainer>
      <AskingPriceWrapper>
        <div>
          <AskingPriceTitle onClick={() => router.push(`/stock/${stockcode}/time`)}>
            일별/시간별 보기
            <Image loader={imageLoader} src="/images/rightArrow.svg" width={12} height={14} alt="rightArrow" style={{ marginLeft: '8px' }} />
          </AskingPriceTitle>
        </div>
      </AskingPriceWrapper>
    </AskingPriceContainer>
  );
}

const AskingPriceContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.gray.white};
`;

const AskingPriceWrapper = styled.div`
  width: 100%;
  padding: ${theme.metrics.m3} ${theme.metrics.m4} ${theme.metrics.m8} ${theme.metrics.m4};
  display: flex;
  flex-direction: column;
`;

const AskingPriceTitle = styled.div`
  ${theme.fonts.s20_w500}
  display: inline-block;
  align-items: center;
  cursor: pointer;
`;

const AskingPriceBarWrapper = styled.div`
  width: 100%;
  margin-top: ${theme.metrics.m4};
  border-radius: 16px;
  height: 66px;
  display: flex;
  margin-bottom: ${theme.metrics.m8};
`;

const AskingPriceBarLeft = styled.div`
  flex: 1;
  margin-right: 1px;
  border-top-left-radius: 16px;
  border-bottom-left-radius: 16px;
  padding: ${theme.metrics.m4};
  display: flex;
  flex-direction: column;
  background-color: ${theme.color.chart.down20};
`;
const AskingPriceBarRight = styled.div`
  flex: 1;
  margin-left: 1px;
  border-top-right-radius: 16px;
  padding: ${theme.metrics.m4};
  border-bottom-right-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  background-color: ${theme.color.chart.up20};
`;

const AskingPriceBarTitle = styled.div`
  ${theme.fonts.s14_w400}
  margin-bottom: 4px;
`;

const AskingPriceBarTotal = styled.div`
  ${theme.fonts.s16_w500}
  font-weight: 500;
`;
