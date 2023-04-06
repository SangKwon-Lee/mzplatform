import styled from '@emotion/styled';
import theme from '../../commons/theme';

type btnProps = {
  isBtnValue?: boolean;
};

interface ActiveBtnSelectProps {
  ActiveArray: {
    value: string;
    text: string;
  }[];
  color?: string;
  btnValue: string;
  handleBtnValue: (value: string) => void;
}

const ActiveButton = styled.div`
  display: flex;
  gap: 8px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Btn = styled.button<btnProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  gap: 8px;
  border: ${(props) => (props.isBtnValue ? `none` : `1px solid white`)};
  border-radius: 24px;
  flex: none;
  cursor: pointer;
  ${theme.fonts.s14_w500};
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: ${(props) => (props.isBtnValue ? `${props.color}` : `white`)};
  background-color: ${(props) => (props.isBtnValue ? `${theme.color.gray.white}` : 'transparent')};
`;

export default function ActiveBtnArraySelect({ ActiveArray, btnValue, handleBtnValue, color }: ActiveBtnSelectProps) {
  return (
    <ActiveButton>
      {Array.isArray(ActiveArray) && ActiveArray.length > 0 ? (
        ActiveArray.map((data) => (
          <Btn onClick={() => handleBtnValue(data.value)} key={data.value} isBtnValue={btnValue === data.value} color={color}>
            {data.text}
          </Btn>
        ))
      ) : (
        <></>
      )}
    </ActiveButton>
  );
}
