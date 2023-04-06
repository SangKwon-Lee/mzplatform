import styled from '@emotion/styled';
import theme from '../../commons/theme';

interface Props {
  keyword: {
    summary: string;
    description: string;
  };
}

export default function KeywordDescription(props: Props) {
  const { keyword } = props;
  return (
    <KeywordTextWrapper>
      {keyword?.summary && <KeywordTextTitle>{keyword?.summary}</KeywordTextTitle>}
      {keyword?.description && <KeywordTextSub>{keyword?.description}</KeywordTextSub>}
    </KeywordTextWrapper>
  );
}

const KeywordTextWrapper = styled.div`
  width: 100%;
  padding: 0 ${theme.metrics.m4};
`;

const KeywordTextTitle = styled.div`
  ${theme.fonts.s20_w700};
  color: ${theme.color.gray.w800};
  margin-bottom: ${theme.metrics.m6};
  word-break: keep-all;
  line-height: 30px;
`;

const KeywordTextSub = styled.div`
  ${theme.fonts.s16_w400};
  word-break: keep-all;
  color: ${theme.color.gray.w800};
  line-height: 26px;
  margin-bottom: ${theme.metrics.m8};
`;
