import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import theme from '../../commons/theme';
interface Props {
  keyword: string;
  backgroundColor: string;
}

export default function KeywordChip(props: Props) {
  const router = useRouter();
  const { keyword, backgroundColor } = props;
  return (
    <ContentsThemeName style={{ backgroundColor: backgroundColor }} onClick={() => router.push(`/keyword/${keyword}`)}>
      # {keyword}
    </ContentsThemeName>
  );
}
const ContentsThemeName = styled(Button)`
  text-align: center;
  display: flex;
  align-items: center;
  ${theme.fonts.s20_w700}
  padding: 4px ${theme.metrics.m6};
  border-radius: 99px;
  color: ${theme.color.gray.white};
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
`;
