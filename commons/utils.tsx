// @todo: typescript로 변환
// params를 각각의 변수가 아닌 하나의 object로 받기
import regexifyString from 'regexify-string';
import theme from './theme';
import { IKeyword } from '../commons/types';
import moment from 'moment';
import { CDN_URL } from './theme/images';
import axios from 'axios';

interface RatioFormatProps {
  value: number;
  digit: number;
  sign: boolean;
  fixed: number;
}

export function ratioFormat({ value, digit, sign, fixed }: RatioFormatProps) {
  try {
    let regexp = null;
    if (digit === 4) {
      regexp = /\B(?=(\d{4})+(?!\d))/g;
    } else {
      regexp = /\B(?=(\d{3})+(?!\d))/g;
    }
    return (sign ? (value > 0 ? '+' : '') : '') + value.toFixed(fixed).toString().replace(regexp, ',');
  } catch (err) {
    return value;
  }
}

export const tagFormat = (tags: IKeyword[]) => {
  const sortedTags = tags.sort((a, b) => moment(b.updated_at).diff(a.updated_at));
  const filteredTags = sortedTags.filter((item, index) => index < 5);
  return filteredTags;
};

export const numberColorFormat = (value: number) => {
  let numberColor = theme.color.gray.w900;
  if (value) {
    numberColor = value > 0 ? theme.color.chart.up : value < 0 ? theme.color.chart.down : theme.color.gray.w900;
  }
  return numberColor;
};

export const arrowFormat = (value: number) => {
  let arrow = '';
  if (value) {
    arrow = value > 0 ? '▲ ' : value < 0 ? '▼ ' : '';
  }
  return arrow;
};

export const signFormat = (value: number) => {
  let sign = '';
  if (value) {
    sign = value > 0 ? '+' : value < 0 ? '' : '';
  }
  return sign;
};

export function priceToString(price?: any) {
  return String(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const randomColorFormat = (id: number) => {
  switch (id) {
    case 1: {
      return theme.color.learn_random.blue;
    }
    case 2: {
      return theme.color.learn_random.brown;
    }
    case 3: {
      return theme.color.learn_random.green;
    }
    case 4: {
      return theme.color.learn_random.indigo;
    }
    case 5: {
      return theme.color.learn_random.olive;
    }
    case 6: {
      return theme.color.learn_random.orange;
    }
    case 7: {
      return theme.color.learn_random.pink;
    }
    case 8: {
      return theme.color.learn_random.purple;
    }
    case 9: {
      return theme.color.learn_random.red;
    }
    case 10: {
      return theme.color.learn_random.turquoise;
    }
  }
};

export function elapsedTime(date: string) {
  const today = new Date();
  const timeValue = new Date(date);

  const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
  if (betweenTime < 1) return '방금전';
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
}

export const textColor = (data: string | number) => {
  if (!data) {
    return theme.color.chart.up;
  }
  if (Number(data) >= 0) {
    return theme.color.chart.up;
  } else {
    return theme.color.chart.down;
  }
};

export const imageLoader = ({ src }: { src: string }) => {
  return `${src}`;
};

export const cdnStockLogoUrl = (stockCode: string | number) => {
  let code = String(stockCode).replaceAll('A', '');
  if (Number(code[code.length - 1]) >= 5) {
    code = code.slice(0, code.length - 1) + '0';
  }
  return `${CDN_URL}ci/${code}@160.png`;
};

interface GetNewPriceDataProps {
  newPrice: number;
  oldPrice: number;
  oldDiff: number;
  oldRatio: number;
}

export const getNewPriceData = ({ newPrice, oldPrice, oldDiff, oldRatio }: GetNewPriceDataProps) => {
  const newDiff = Number((oldDiff + (newPrice - oldPrice)).toFixed(2));
  const beforePrice = oldPrice / (oldRatio / 100 + 1);
  const newRatio = Number(((newPrice / beforePrice - 1) * 100).toFixed(2));
  return { newDiff, newRatio };
};

export const wonderingBgColor = (category: string) => {
  if (category === '데일리 브리핑') {
    return theme.color.learn_random.turquoise;
  } else if (category === '이슈 PICK') {
    return theme.color.learn_random.pink;
  } else if (category === '종목 인사이트') {
    return theme.color.learn_random.blue;
  } else if (category === '라이프 NOW') {
    return theme.color.learn_random.orange;
  } else if (category === '투자 첫걸음') {
    return theme.color.learn_random.indigo;
  } else if (category === '추가1') {
    return theme.color.learn_random.green;
  } else if (category === '추가2') {
    return theme.color.learn_random.red;
  } else {
    return theme.color.learn_random.olive;
  }
};

export const opinionBgColor = (data: string | number) => {
  if (data === '매도') {
    return theme.color.chart.down;
  } else if (data === '중립') {
    return theme.color.gray.w600;
  } else if (data === '매수') {
    return theme.color.chart.up;
  } else if (data === '측정불가') {
    return theme.color.gray.w600;
  } else if (data === '유출 추세') {
    return theme.color.chart.up;
  } else if (data === '감소 추세') {
    return theme.color.chart.down;
  } else if (data === '보통') {
    return theme.color.gray.w600;
  } else if (data === '양호') {
    return theme.color.chart.up;
  } else if (data === '부진') {
    return theme.color.chart.down;
  } else if (data >= 0) {
    return theme.color.chart.up;
  } else if (data < 0) {
    return theme.color.chart.down;
  } else {
    return theme.color.gray.w600;
  }
};

export const contentConverterForList = (contents: string): string => {
  if (!contents) return '';
  const friendConverter = regexifyString({
    pattern: /\@\[__.*?\_\_\]/gim,
    decorator: (match: string) => {
      return `<span className='card-feed__tag' style='color:#0085ff'> ${match.replace(/\[__|\_\_\]/g, '')} </span>`;
    },
    input: contents,
  })
    .join('')
    .replace(/\(memberId\:\_\_.*?\_\_\)/gim, '');

  const stockConverter = regexifyString({
    pattern: /\$\[__.*?\_\_\]/gim,
    decorator: (match: string) => {
      return `<span className='card-feed__tag' style='color:#0085ff'> ${match.replace(/\[__|\_\_\]/g, '')} </span>`;
    },
    input: friendConverter,
  })
    .join('')
    .replace(/\(stockId\:\_\_.*?\_\_\)/gim, '');

  const urlConverter = regexifyString({
    pattern: /\[__url__\]\(url\:\_\_.*?\_\_\)/gim,
    decorator: (match: string) => {
      return `<span className='card-feed__tag' style='color:#0085ff'> ${match.replace(/\[__url__\]\(url\:\_\_|\_\_\)/g, '')}</span>`;
    },
    input: stockConverter,
  }).join('');

  const hashTagConverter = urlConverter
    .replace(/\r\n/gim, ' \r\n ')
    .replace(/\n/gim, ' \n ')
    .split(' ')
    .map((splitTxt: string) => {
      return splitTxt.substring(0, 1) === '#' && splitTxt.length > 1
        ? `<span className='card-feed__tag' style='color:#0085ff'> ` + splitTxt + `</span>`
        : ` ` + splitTxt;
    })
    .join('')
    .replace(/(?:\r\n|\r|\n)/gim, '<br />');

  return hashTagConverter;
};

export const numberWithCommas = (input: string | number): string => {
  if (typeof input === 'number') {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    return input.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
};

export const fillZero = (width: number, str: string | number) => {
  return str.toString().length >= width ? str : new Array(width - str.toString().length + 1).join('') + str;
};

export const getDDay = (Dday: string) => {
  // D-Day 날짜 지정
  const setDate = new Date(Dday);
  // D-day 날짜의 연,월,일 구하기
  const setDateYear = setDate.getFullYear();
  // getMonth 메서드는 0부터 세기 때문에 +1 해준다.
  const setDateMonth = setDate.getMonth() + 1;
  const setDateDay = setDate.getDate();

  // 현재 날짜를 new 연산자를 사용해서 Date 객체를 생성
  const now = new Date();

  // D-Day 날짜에서 현재 날짜의 차이를 getTime 메서드를 사용해서 밀리초의 값으로 가져온다.
  const distance = setDate.getTime() - now.getTime();

  // Math.floor 함수를 이용해서 근접한 정수값을 가져온다.
  // 밀리초 값이기 때문에 1000을 곱한다.
  // 1000*60 => 60초(1분)*60 => 60분(1시간)*24 = 24시간(하루)
  // 나머지 연산자(%)를 이용해서 시/분/초를 구한다.
  const day = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  // D-Day 날짜를 가져오고,
  if (day !== 0) {
    return `${day}일 남음`;
  } else if (day === 0 && hours > 0) {
    return `${hours}시간 남음`;
  } else if (day === 0 && hours === 0 && minutes > 0) {
    return `${minutes}분 남음`;
  } else {
    return '마감';
  }
};

function numberFormat(x: any) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function numberToKorean(price: any) {
  let number = Number(price.replaceAll(',', ''));
  var inputNumber = number < 0 ? 0 : number;
  var unitWords = ['억', '조', '경'];
  var splitUnit = 10000;
  var splitCount = unitWords.length;
  var resultArray = [];
  var resultString = '';

  for (var i = 0; i < splitCount; i++) {
    var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }

  for (var i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(numberFormat(resultArray[i])) + unitWords[i] + ' ' + resultString;
  }
  return resultString.trim();
}

export function geKoreanNumber(number: number | string) {
  let koreanUnits = ['천', '만', '억', '조'];
  let newNumber = 0;
  let unit = 10000;
  if (Math.abs(Number(number)) > 1000000000000) {
    newNumber = Math.floor(Math.abs(Number(number)) / 1000000000000) * 1000000000000;
  } else {
    newNumber = Math.floor(Math.abs(Number(number)) / 10000000000) * 10000000000;
  }
  let answer = '';
  let index = 0;
  let division = Math.pow(unit, index);
  if (number > 0) {
    while (Math.floor(newNumber / division) > 0) {
      const mod = Math.floor((newNumber % (division * unit)) / division);
      if (mod) {
        const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        answer = `${modToString}${koreanUnits[index]} ` + answer;
      }
      division = Math.pow(unit, ++index);
    }
  } else {
    while (Math.floor(Math.abs(newNumber) / division) > 0) {
      const mod = Math.floor((newNumber % (division * unit)) / division);
      if (mod) {
        const modToString = mod.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        answer = `-${modToString}${koreanUnits[index]} ` + answer;
      }

      division = Math.pow(unit, ++index);
    }
  }

  return answer;
}
