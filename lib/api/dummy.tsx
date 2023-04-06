import dayjs from 'dayjs';
import theme from '../../commons/theme';
const keywords = [
  '항공',
  '미디어',
  'SNS',
  '주류',
  '게임',
  '영화',
  '여행',
  '무선충전기술',
  '해운',
  '카지노',
  '제대혈',
  '코로나19(카모스타트)',
  '탈모치료 관련주',
  '치매',
  '구충제(펜벤다졸, 이버멘틱 등)',
  '저가 항공사(LCC)',
  '백신',
  '코로나',
  '스마트폰',
  'TV',
  '모니터',
  '가구',
  '전자',
  '전기',
  '반도체',
  '선박',
  '약품',
  '의류',
  '닌텐도',
  '축구',
];
const stocks = [
  '삼성전자',
  'NAVER',
  '카카오뱅크',
  '피코그램',
  'IHQ',
  '두산에너지빌리티',
  '쿠팡',
  '이노핀',
  '토스',
  '요기요',
  '다음',
  '한화생명',
  '카카오톡',
  'NEXON',
  'NCSOFT',
  'SK하이닉스',
  'LG화학',
  '현대차',
  'LG에너지솔루션',
  '삼성SDI',
  'KB금융',
  '신한지주',
  '우리금융지주',
  'HMM',
  '삼성생명',
  '삼성물산',
  '현대모비스',
  '고려아연',
  '셀트리온',
  '기아',
  '현대중공업',
];

const newsComp = ['데일리안', '서울경제', '비즈니스워치', '뉴시스', '연합뉴스', 'DART'];

const newsTitle = [
  "[특징주] 삼성전자, 장거리 5G 시험서 '전송 거리, 다운로드 속도' 신기록에 멈춰버렸다",
  "[시그널] 삼성전자, 6년만에 임시주총서 확인한 '주주파워'",
  '삼성전자, 브랜드 가치 세계 5위 수성',
  '[e공시 눈에 띄네] 삼성전자, 허은녕, 유명희 사외이사 선임 등 (오후 종합)',
  '[이태원 참사] 삼성전자, 재해구호협회에 40억원 기부',
  '동일인등출자계열회사와의상품, 용역거래변경',
  '임원, 주요주주특정증권등 소유상황보고서',
];

const randomNumber = (number: number) => {
  return Math.floor(Math.random() * number);
};

export function dummyNews() {
  const data = [
    {
      title: '[특징주] 카카오뱅크, 3분기 사상 최대실적 달성에 강세',
      source: '파이낸셜뉴스',
      time: '15분전',
      imageUrl: '/images/sampleThumbnail1.png',
      stocks: [
        { stockname: '대한항공', stockRatio: 13.31 },
        { stockname: '대한항공', stockRatio: 13.31 },
        { stockname: '대한항공', stockRatio: 13.31 },
      ],
    },
    {
      title: '[특징주] 카카오뱅크, 3분기 사상 최대실적 달성에 강세',
      source: '파이낸셜뉴스',
      time: '15분전',
      logoUrl: '/images/sampleThumbnail.png',
      // stocks: [
      //   { stockname: "대한항공", stockRatio: 13.31 },
      //   { stockname: "대한항공", stockRatio: 13.31 },
      //   { stockname: "대한항공", stockRatio: 13.31 },
      //   { stockname: "대한항공", stockRatio: 13.31 },
      // ],
    },
    {
      title:
        '[특징주] 카카오뱅크, 3분기 사상 최대실적 달성에 강세 카카오뱅크, 3분기 사상 최대실적 달성에 강세 카카오뱅크, 3분기 사상 최대실적 달성에 강세',
      source: '파이낸셜뉴스',
      time: '15분전',
      // imageUrl: "/images/sampleThumbnail1.png",
      stocks: [
        { stockname: '대한항공', stockRatio: 13.31 },
        { stockname: '대한항공', stockRatio: 13.31 },
        { stockname: '대한항공', stockRatio: 13.31 },
        { stockname: '대한항공', stockRatio: 13.31 },
        { stockname: '대한항공', stockRatio: 13.31 },
        { stockname: '대한항공', stockRatio: 13.31 },
        { stockname: '대한항공', stockRatio: 13.31 },
        { stockname: '대한항공', stockRatio: 13.31 },
        { stockname: '대한항공', stockRatio: 13.31 },
      ],
    },
  ];
  return data;
}

export function dummySchedule() {
  const data = [
    {
      tags: ['테마이슈', '실적발표', '종목이슈'],
      title:
        '[스튜디오드래곤] 분기 최대 영업이익 달성했다! 2분기 매출 1,575억원 분기 최대 영업이익 달성했다! 2분기 매출 1,575억원 분기 최대 영업이익 달성했다! 2분기 매출 1,575억원',
      keyword: '영상 콘텐츠',
      keywordRatio: 1.03,
      stockname: '스튜디오드래곤',
      stockRatio: 13.31,
      comment:
        '[스튜디오드래곤] 분기 최대 영업이익 달성했다! 2[스튜디오드래곤] \n분기 최대 영업이익 달성했다! 2분기 매출 1,575억원, 영[스튜디오드래곤] 분기 최대 영업이익 달성했다! 2분기 매출 1,575억원, 영...',
    },
    {
      tags: ['주요행사', '종목이슈'],
      title: '미국신장학회(ASN 2022) 개최',
      stockname: '압타바이오',
      stockRatio: -1.09,
      comment: null,
    },
    {
      tags: ['중국지표'],
      title: '중) 10월 차이신 서비스업 PMI',
      keyword: '중국기업',
      keywordRatio: 1.35,
      comment: null,
    },
  ];
  return data;
}

export function dummyIndex() {
  const data = {
    ratio: Number((Math.random() * 99).toFixed(2)),
    percent: Number((Math.random() * 99).toFixed(2)),
    price: Number((Math.random() * 999).toFixed(2)),
  };
  return data;
}

export function dummyIndexCollection() {
  const data = [
    { name: '전일', value: 2155.49 },
    { name: '시가', value: 2155.49 },
    { name: '고가', value: 2155.49 },
    { name: '저가', value: 2155.49 },
    { name: '거래량(천주)', value: 848393 },
    { name: '거래대금(백만원)', value: 8736349 },
  ];
  return data;
}

export function dummyKeywordCard() {
  const data = {
    keyword: keywords[randomNumber(keywords.length)],
    ratio: Number((Math.random() * 99).toFixed(2)),
    percent: Number((Math.random() * 99).toFixed(2)),
    price: Number((Math.random() * 999).toFixed(2)),
    stock: [
      {
        name: stocks[Math.floor(Math.random() * stocks.length)],
        percent: Number((Math.random() * 99).toFixed(2)),
      },
      {
        name: stocks[Math.floor(Math.random() * stocks.length)],
        percent: Number((Math.random() * 99).toFixed(2)),
      },
      {
        name: stocks[Math.floor(Math.random() * stocks.length)],
        percent: Number((Math.random() * 99).toFixed(2)),
      },
      {
        name: stocks[Math.floor(Math.random() * stocks.length)],
        percent: Number((Math.random() * 99).toFixed(2)),
      },
    ],
  };

  return data;
}

export function dummyTopRankingCard() {
  const data = [
    {
      keyword: keywords[randomNumber(keywords.length)],
      percent: Number((Math.random() * 99).toFixed(2)),
    },
    {
      keyword: keywords[randomNumber(keywords.length)],
      percent: Number((Math.random() * 99).toFixed(2)),
    },
    {
      keyword: keywords[randomNumber(keywords.length)],
      percent: Number((Math.random() * 99).toFixed(2)),
    },
    {
      keyword: keywords[randomNumber(keywords.length)],
      percent: Number((Math.random() * 99).toFixed(2)),
    },
    {
      keyword: keywords[randomNumber(keywords.length)],
      percent: Number((Math.random() * 99).toFixed(2)),
    },
  ];
  return data;
}

export function dummyDownTopRankingCard() {
  const data = [
    {
      keyword: keywords[randomNumber(keywords.length)],
      percent: Number(-(Math.random() * 99).toFixed(2)),
    },
    {
      keyword: keywords[randomNumber(keywords.length)],
      percent: Number(-(Math.random() * 99).toFixed(2)),
    },
    {
      keyword: keywords[randomNumber(keywords.length)],
      percent: Number(-(Math.random() * 99).toFixed(2)),
    },
    {
      keyword: keywords[randomNumber(keywords.length)],
      percent: Number(-(Math.random() * 99).toFixed(2)),
    },
    {
      keyword: keywords[randomNumber(keywords.length)],
      percent: Number(-(Math.random() * 99).toFixed(2)),
    },
  ];
  return data;
}

export function dummyMostViewCard() {
  const data = [
    {
      stock: stocks[randomNumber(stocks.length)],
      percent: Number((Math.random() * 99).toFixed(2)),
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      percent: Number((Math.random() * 99).toFixed(2)),
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      percent: Number(-(Math.random() * 99).toFixed(2)),
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      percent: Number((Math.random() * 99).toFixed(2)),
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      percent: Number(-(Math.random() * 99).toFixed(2)),
    },
  ];
  return data;
}

export function dummyStockRankingCard() {
  const data = [
    {
      stock: stocks[randomNumber(stocks.length)],
      price: Number((Math.random() * 99999).toFixed(2)),
      percent: Number((Math.random() * 99).toFixed(2)),
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      price: Number((Math.random() * 99999).toFixed(2)),
      percent: Number((Math.random() * 99).toFixed(2)),
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      price: Number((Math.random() * 99999).toFixed(2)),
      percent: Number(-(Math.random() * 99).toFixed(2)),
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      price: Number((Math.random() * 99999).toFixed(2)),
      percent: Number((Math.random() * 99).toFixed(2)),
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      price: Number((Math.random() * 99999).toFixed(2)),
      percent: Number(-(Math.random() * 99).toFixed(2)),
    },
  ];
  return data;
}
export function dummyStockList() {
  const data = [
    {
      stock: stocks[randomNumber(stocks.length)],
      price: Number((Math.random() * 99999).toFixed(2)),
      percent: Number((Math.random() * 99).toFixed(2)),
      ratio: Number((Math.random() * 9999).toFixed(2)),
      keywords: keywords,
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      price: Number((Math.random() * 99999).toFixed(2)),
      percent: Number((Math.random() * 99).toFixed(2)),
      ratio: Number((Math.random() * 9999).toFixed(2)),
      keywords: keywords,
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      price: Number((Math.random() * 99999).toFixed(2)),
      percent: Number(-(Math.random() * 99).toFixed(2)),
      ratio: Number((Math.random() * 9999).toFixed(2)),
      keywords: keywords,
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      price: Number((Math.random() * 99999).toFixed(2)),
      percent: Number((Math.random() * 99).toFixed(2)),
      ratio: Number((Math.random() * 9999).toFixed(2)),
      keywords: keywords,
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      price: Number((Math.random() * 99999).toFixed(2)),
      percent: Number(-(Math.random() * 99).toFixed(2)),
      ratio: Number((Math.random() * 9999).toFixed(2)),
      keywords: keywords,
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      price: Number((Math.random() * 99999).toFixed(2)),
      percent: Number(-(Math.random() * 99).toFixed(2)),
      ratio: Number((Math.random() * 9999).toFixed(2)),
      keywords: keywords,
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      price: Number((Math.random() * 99999).toFixed(2)),
      percent: Number(-(Math.random() * 99).toFixed(2)),
      ratio: Number((Math.random() * 9999).toFixed(2)),
      keywords: keywords,
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      price: Number((Math.random() * 99999).toFixed(2)),
      percent: Number(-(Math.random() * 99).toFixed(2)),
      ratio: Number((Math.random() * 9999).toFixed(2)),
      keywords: keywords,
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      price: Number((Math.random() * 99999).toFixed(2)),
      percent: Number(-(Math.random() * 99).toFixed(2)),
      ratio: Number((Math.random() * 9999).toFixed(2)),
      keywords: keywords,
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      price: Number((Math.random() * 99999).toFixed(2)),
      percent: Number(-(Math.random() * 99).toFixed(2)),
      ratio: Number((Math.random() * 9999).toFixed(2)),
      keywords: keywords,
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      price: Number((Math.random() * 99999).toFixed(2)),
      percent: Number(-(Math.random() * 99).toFixed(2)),
      ratio: Number((Math.random() * 9999).toFixed(2)),
      keywords: keywords,
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      price: Number((Math.random() * 99999).toFixed(2)),
      percent: Number(-(Math.random() * 99).toFixed(2)),
      ratio: Number((Math.random() * 9999).toFixed(2)),
      keywords: keywords,
    },
    {
      stock: stocks[randomNumber(stocks.length)],
      price: Number((Math.random() * 99999).toFixed(2)),
      percent: Number(-(Math.random() * 99).toFixed(2)),
      ratio: Number((Math.random() * 9999).toFixed(2)),
      keywords: keywords,
    },
  ];
  return data;
}

export const dummyStockOpinion = () => {
  const data = Math.floor(Math.random() * 100);
  if (data < 9) {
    return 9;
  }
  return data;
};

export const dummyStockNewsList = () => {
  const data = [
    {
      title: newsTitle[randomNumber(newsTitle.length)],
      comp: newsComp[randomNumber(newsComp.length)],
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 100000000))).format('YYYY-MM-DD HH:mm:ss'),
      url: 'https://www.yna.co.kr/view/AKR20221215014551007?input=1195m',
    },
    {
      title: newsTitle[randomNumber(newsTitle.length)],
      comp: newsComp[randomNumber(newsComp.length)],
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 100000000))).format('YYYY-MM-DD HH:mm:ss'),
      url: 'https://www.yna.co.kr/view/AKR20221215014551007?input=1195m',
    },
    {
      title: newsTitle[randomNumber(newsTitle.length)],
      comp: newsComp[randomNumber(newsComp.length)],
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 100000000))).format('YYYY-MM-DD HH:mm:ss'),
      url: 'https://www.yna.co.kr/view/AKR20221215014551007?input=1195m',
    },
    {
      title: newsTitle[randomNumber(newsTitle.length)],
      comp: newsComp[randomNumber(newsComp.length)],
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 100000000))).format('YYYY-MM-DD HH:mm:ss'),
      url: 'https://www.yna.co.kr/view/AKR20221215014551007?input=1195m',
    },
    {
      title: newsTitle[randomNumber(newsTitle.length)],
      comp: newsComp[randomNumber(newsComp.length)],
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 100000000))).format('YYYY-MM-DD HH:mm:ss'),
      url: 'https://www.yna.co.kr/view/AKR20221215014551007?input=1195m',
    },
    {
      title: newsTitle[randomNumber(newsTitle.length)],
      comp: newsComp[randomNumber(newsComp.length)],
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 100000000))).format('YYYY-MM-DD HH:mm:ss'),
      url: 'https://www.yna.co.kr/view/AKR20221215014551007?input=1195m',
    },
    {
      title: newsTitle[randomNumber(newsTitle.length)],
      comp: newsComp[randomNumber(newsComp.length)],
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 100000000))).format('YYYY-MM-DD HH:mm:ss'),
      url: 'https://www.yna.co.kr/view/AKR20221215014551007?input=1195m',
    },
    {
      title: newsTitle[randomNumber(newsTitle.length)],
      comp: newsComp[randomNumber(newsComp.length)],
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 100000000))).format('YYYY-MM-DD HH:mm:ss'),
      url: 'https://www.yna.co.kr/view/AKR20221215014551007?input=1195m',
    },
    {
      title: newsTitle[randomNumber(newsTitle.length)],
      comp: newsComp[randomNumber(newsComp.length)],
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 100000000))).format('YYYY-MM-DD HH:mm:ss'),
      url: 'https://www.yna.co.kr/view/AKR20221215014551007?input=1195m',
    },
    {
      title: newsTitle[randomNumber(newsTitle.length)],
      comp: newsComp[randomNumber(newsComp.length)],
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 100000000))).format('YYYY-MM-DD HH:mm:ss'),
      url: 'https://www.yna.co.kr/view/AKR20221215014551007?input=1195m',
    },
    {
      title: newsTitle[randomNumber(newsTitle.length)],
      comp: newsComp[randomNumber(newsComp.length)],
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 100000000))).format('YYYY-MM-DD HH:mm:ss'),
      url: 'https://www.yna.co.kr/view/AKR20221215014551007?input=1195m',
    },
    {
      title: newsTitle[randomNumber(newsTitle.length)],
      comp: newsComp[randomNumber(newsComp.length)],
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 100000000))).format('YYYY-MM-DD HH:mm:ss'),
      url: 'https://www.yna.co.kr/view/AKR20221215014551007?input=1195m',
    },
    {
      title: newsTitle[randomNumber(newsTitle.length)],
      comp: newsComp[randomNumber(newsComp.length)],
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 100000000))).format('YYYY-MM-DD HH:mm:ss'),
      url: 'https://www.yna.co.kr/view/AKR20221215014551007?input=1195m',
    },
  ];

  return data;
};
export const dummyStockInvertment = () => {
  const data = {
    indicators: {
      per: Number((Math.random() * 999).toFixed(2)),
      pbr: Number((Math.random() * 999).toFixed(2)),
      roe: Number((Math.random() * 999).toFixed(2)),
    },
    allocation: {
      dividend: Number((Math.random() * 9999).toFixed(0)),
      percent: Number((Math.random() * 99).toFixed(2)),
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 100000000))).format('YYYY-MM-DD'),
      cycle: Number((Math.random() * 4).toFixed(0)),
    },
  };
  return data;
};
export function dummyWondering() {
  const data = [
    {
      Title: '국내 시총 상위기업 털어보기 : 이마트',
      Category: '데일리 브리핑',
      DateTime: '2022-11-28',
      LinkUrl: '',
      ImageUrl: '/wondering1.svg',
      AuthorName: '',
      AuthorPosition: '',
    },
    {
      Title: '뉴욕탐방기 : 낙관적인 컨센서스, 그곳에서 찾는 투자아이디',
      Category: '이슈 PICK',
      DateTime: '2022-11-19',
      LinkUrl: '',
      ImageUrl: '/wondering2.svg',
      AuthorName: '',
      AuthorPosition: '',
    },
    {
      Title: '친구들과 함께 시장 이슈에 대한 생각을 공유해보세요',
      BackgroundColor: theme.color.secondary.blue01,
      LinkUrl: '',
      ButtonTitle: '투표하러 가기',
    },

    {
      Title: '뉴욕탐방기 : 낙관적인 컨센서스, 그곳에서 찾는 투자아이디',
      Category: '라이프 NOW',
      DateTime: '2022-10-02',
      LinkUrl: '',
      ImageUrl: '/wondering3.svg',
      AuthorName: '',
      AuthorPosition: '',
    },
    {
      Title: '글로벌 태양광, 돋보일 줄 알았지만 이만큼일 줄 몰랐다!',
      Category: '투자 첫걸음',
      DateTime: '2022-11-25',
      LinkUrl: '',
      ImageUrl: '/wondering4.svg',
      AuthorName: '',
      AuthorPosition: '',
    },
    {
      Title: '여유로운 삶과 지혜로운 설계를 위한 프리미엄 경제 정보',
      BackgroundColor: theme.color.secondary.orange,
      LinkUrl: '',
      ButtonTitle: '',
    },

    {
      Title: '추세적 금리 하락 기대? 아직 이르다!',
      Category: '데일리 브리핑',
      DateTime: '2022-10-07',
      LinkUrl: '',
      ImageUrl: '/wondering5.svg',
      AuthorName: '박형중',
      AuthorPosition: '우리은행 투자전략팀장',
    },
    {
      Title: '추세적 금리 하락 기대? 아직 이르다!',
      Category: '종목 인사이트',
      DateTime: '2022-09-29',
      LinkUrl: '',
      ImageUrl: '',
      AuthorName: '',
      AuthorPosition: '우리은행 투자전략팀장전략팀장전략팀장',
    },
  ];
  return data;
}

export const dummyStockTimeList = () => {
  const data = [
    {
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 1000000000))).format('MM-DD'),
      price: Math.floor(Math.random() * 100000),
      percent: Math.floor(Math.random() * 99),
      total: Math.floor(Math.random() * 99),
    },
    {
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 1000000000))).format('MM-DD'),
      price: Math.floor(Math.random() * 100000),
      percent: Math.floor(Math.random() * 99),
      total: Math.floor(Math.random() * 99),
    },
    {
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 1000000000))).format('MM-DD'),
      price: Math.floor(Math.random() * 100000),
      percent: Math.floor(Math.random() * 99),
      total: Math.floor(Math.random() * 99),
    },
    {
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 1000000000))).format('MM-DD'),
      price: Math.floor(Math.random() * 100000),
      percent: Math.floor(Math.random() * 99),
      total: Math.floor(Math.random() * 99),
    },
    {
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 1000000000))).format('MM-DD'),
      price: Math.floor(Math.random() * 100000),
      percent: Math.floor(Math.random() * 99),
      total: Math.floor(Math.random() * 99),
    },
    {
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 1000000000))).format('MM-DD'),
      price: Math.floor(Math.random() * 100000),
      percent: Math.floor(Math.random() * 99),
      total: Math.floor(Math.random() * 99),
    },
    {
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 1000000000))).format('MM-DD'),
      price: Math.floor(Math.random() * 100000),
      percent: Math.floor(Math.random() * 99),
      total: Math.floor(Math.random() * 99),
    },
    {
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 1000000000))).format('MM-DD'),
      price: Math.floor(Math.random() * 100000),
      percent: Math.floor(Math.random() * 99),
      total: Math.floor(Math.random() * 99),
    },
    {
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 1000000000))).format('MM-DD'),
      price: Math.floor(Math.random() * 100000),
      percent: Math.floor(Math.random() * 99),
      total: Math.floor(Math.random() * 99),
    },
    {
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 1000000000))).format('MM-DD'),
      price: Math.floor(Math.random() * 100000),
      percent: Math.floor(Math.random() * 99),
      total: Math.floor(Math.random() * 99),
    },
    {
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 1000000000))).format('MM-DD'),
      price: Math.floor(Math.random() * 100000),
      percent: Math.floor(Math.random() * 99),
      total: Math.floor(Math.random() * 99),
    },
    {
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 1000000000))).format('MM-DD'),
      price: Math.floor(Math.random() * 100000),
      percent: Math.floor(Math.random() * 99),
      total: Math.floor(Math.random() * 99),
    },
    {
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 1000000000))).format('MM-DD'),
      price: Math.floor(Math.random() * 100000),
      percent: Math.floor(Math.random() * 99),
      total: Math.floor(Math.random() * 99),
    },
    {
      time: dayjs(new Date(new Date().getTime() - Math.floor(Math.random() * 1000000000))).format('MM-DD'),
      price: Math.floor(Math.random() * 100000),
      percent: Math.floor(Math.random() * 99),
      total: Math.floor(Math.random() * 99),
    },
  ];
  return data;
};

export const dummyLineChart = () => {
  const data = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
  return data;
};

export const dummyBarChart = () => {
  const data = [
    Math.floor(Math.random() * 1000000),
    Math.floor(Math.random() * 1000000),
    Math.floor(Math.random() * 1000000),
    Math.floor(Math.random() * 1000000),
  ];
  return data;
};

export const dummyTableData = () => {
  const data = [
    {
      title: '',
      item: [
        {
          year: '2019',
          percent: Math.floor(Math.random() * 100),
          sales: Math.floor(Math.random() * 10000),
        },
        {
          year: '2020',
          percent: Math.floor(Math.random() * 100),
          sales: Math.floor(Math.random() * 10000),
        },
        {
          year: '2021',
          percent: Math.floor(Math.random() * 100),
          sales: Math.floor(Math.random() * 10000),
        },
        {
          year: '2022',
          percent: Math.floor(Math.random() * 100),
          sales: Math.floor(Math.random() * 10000),
        },
      ],
    },
  ];
  return data;
};

export const dummyTableData2 = () => {
  const data = [
    {
      title: '매출액',
      item: [
        {
          year: '2019',
          percent: Math.floor(Math.random() * 100),
          sales: Math.floor(Math.random() * 10000),
        },
        {
          year: '2020',
          percent: Math.floor(Math.random() * 100),
          sales: Math.floor(Math.random() * 10000),
        },
        {
          year: '2021',
          percent: Math.floor(Math.random() * 100),
          sales: Math.floor(Math.random() * 10000),
        },
        {
          year: '2022',
          percent: Math.floor(Math.random() * 100),
          sales: Math.floor(Math.random() * 10000),
        },
      ],
    },
    {
      title: '영업이익',
      item: [
        {
          year: '2019',
          percent: Math.floor(Math.random() * 100),
          sales: Math.floor(Math.random() * 10000),
        },
        {
          year: '2020',
          percent: Math.floor(Math.random() * 100),
          sales: Math.floor(Math.random() * 10000),
        },
        {
          year: '2021',
          percent: Math.floor(Math.random() * 100),
          sales: Math.floor(Math.random() * 10000),
        },
        {
          year: '2022',
          percent: Math.floor(Math.random() * 100),
          sales: Math.floor(Math.random() * 10000),
        },
      ],
    },
  ];
  return data;
};
