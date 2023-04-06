/* eslint-disable react/no-unescaped-entities */
import styled from '@emotion/styled';
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import theme from '../../../commons/theme';
import Image from 'next/image';
import ActiveBtnArraySelect from '../../select/ActiveBtnArray';
import { imageLoader } from '../../../commons/utils';

const proverbs = [
  {
    id: 1,
    text: ['눈에 띄는 종목이 없다면', '일단 팔짱을 끼고 기다려라.', '공연히 차선책을 사면 꼭 후회하게 된다.'],
    Another: '존 네프',
    isFirstBold: 2,
    bg: theme.color.learn_random.turquoise,
  },
  {
    id: 2,
    text: ['인생에서 투기하지 말아야 할 때가 두 번 있다.', '한 번은 감당할 수 없을 때,', '그리고 감당할 수 있을 때다.'],
    Another: '마크 트웨인',
    isFirstBold: 0,
    bg: theme.color.learn_random.brown,
  },
  {
    id: 3,
    text: ['세계적인 우량주를 사들인 다음 ', '약국에서 수면제를 사서 먹고 몇 년간 푹 자라.', ''],
    Another: '앙드레 코스톨라니',
    isFirstBold: 1,
    bg: theme.color.learn_random.monaco,
  },
  {
    id: 4,
    text: ['투자에 성공하려면', '건전한 사고방식과 감정 조절 능력을 지녀야 한다.', ''],
    Another: '워런 버핏',
    isFirstBold: 1,
    bg: theme.color.learn_random.mustard,
  },
  {
    id: 5,
    text: ['바닥 근처에서 매수하고 싶다면 3~4회에 나눠 사라.', '소위 ‘정액매입법’으로 자금을 몇 등분해', '주가가 내려갈수록 매수 수량을 늘려라.'],
    Another: '사와카미 아쓰토',
    isFirstBold: 0,
    bg: theme.color.learn_random.purple,
  },
  {
    id: 6,
    text: ['남들은 소질이 있고', '당신은 소질이 없는 게임을 하면 질 수밖에 없다.', ''],
    Another: '찰리 밍거',
    isFirstBold: 1,
    bg: theme.color.learn_random.mauve,
  },
  {
    id: 7,
    text: ['주가가 얼마만큼 오를지', '미리 한계를 정해서는 안 된다.', ''],
    Another: '피터 린치',
    isFirstBold: 1,
    bg: theme.color.learn_random.dustyBlue,
  },
  {
    id: 8,
    text: ['적당한 기업을 훌륭한 가격에 사는 것보다는', '훌륭한 회사를 적당한 가격에 사는 게 훨씬 낫다.', ''],
    Another: '워런 버핏',
    isFirstBold: 1,
    bg: theme.color.learn_random.olive,
  },
  {
    id: 9,
    text: ['모든 일에는 상반된 주장이 있을 수 있다.', '그러나 증시에서는 한 가지 주장만 의미가 있다.', '강세론도 약세론도 아닌 ‘맞는 주장’이다'],
    Another: '제시 리버모어',
    isFirstBold: 2,
    bg: theme.color.learn_random.blush,
  },
  {
    id: 10,
    text: ['남의 조언에 의지해야 하는 사람이라면,', '함부로 상상력을 동원하지 말고', '반드시 보수적인 투자 방식을 고수해야 한다.'],
    Another: '벤저민 그레이엄',
    isFirstBold: 2,
    bg: theme.color.learn_random.indigo,
  },
];

const RandomText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Text = styled.div<any>`
  font-weight: ${(props) => (props.isFirstBold ? 700 : 400)};
  font-size: 1.6rem;
  line-height: 130%;
  color: ${theme.color.gray.white};
`;

const RandomName = styled.div`
  padding: 4px 0px;
  gap: 8px;
  margin-top: 4px;
  ${theme.fonts.s14_w400};
  color: white;
`;

const ActiveButton = styled.div`
  display: flex;
  gap: 8px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 16px 16px;
  gap: 22px;
`;

interface Props {
  btnArr: {
    value: string;
    text: string;
  }[];
  setBg: Dispatch<SetStateAction<string>>;
  btnValue: string;
  handelBtnValue: (value: string) => void;
}

export default function RandomNavThemestock(props: Props) {
  const { btnArr, btnValue, handelBtnValue, setBg } = props;
  const [randomText, setRandomText] = useState({
    id: 0,
    text: [''],
    Another: '',
    isFirstBold: 0,
    bg: '',
  });

  useEffect(() => {
    const randomNumber = Math.floor(Math.random() * proverbs.length);
    setRandomText(proverbs[randomNumber]);
    setBg(proverbs[randomNumber].bg);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tab style={{ backgroundColor: randomText.bg }}>
      <Image loader={imageLoader} src={'/images/Union.svg'} alt={'UNION'} width={32} height={35} />
      <div>
        <RandomText>
          {randomText.text.map((data, index) => (
            <Text isFirstBold={randomText.isFirstBold === index} key={data}>
              {data}
            </Text>
          ))}
        </RandomText>
        <RandomName>- {randomText.Another}</RandomName>
      </div>
      <ActiveButton>
        <ActiveBtnArraySelect color={randomText.bg} ActiveArray={btnArr} btnValue={btnValue} handleBtnValue={handelBtnValue} />
      </ActiveButton>
    </Tab>
  );
}
