export interface PaletteType {
  gradient: string;
  gray: {
    white: string;
    w100: string;
    w200: string;
    w300: string;
    w400: string;
    w500: string;
    w600: string;
    w700: string;
    w800: string;
    w900: string;
  };
  primary: {
    purple: string;
    purple_dark: string;
    purple01: string;
    purple02: string;
    purple03: string;
    purple04: string;
    purple05: string;
    purple06: string;
    purple07: string;
  };
  secondary: {
    red: string;
    orange: string;
    green: string;
    pink01: string;
    pink02: string;
    pink03: string;
    blue01: string;
    blue02: string;
    blue03: string;
    blue04: string;
  };
  chart: {
    up: string;
    up10: string;
    up20: string;
    down: string;
    down10: string;
    down20: string;
  };
  learn_random: {
    turquoise: string;
    green: string;
    purple: string;
    blue: string;
    indigo: string;
    pink: string;
    brown: string;
    orange: string;
    red: string;
    olive: string;
    monaco: string;
    mustard: string;
    mauve: string;
    dustyBlue: string;
    blush: string;
  };
}

const palette: PaletteType = {
  gradient: 'linear-gradient(142.78deg, #6F6CE8 34.2%, #F865F2 83.48%)',
  gray: {
    white: 'white',
    w100: '#F8F9FA',
    w200: '#E9ECEF',
    w300: '#DEE2E6',
    w400: '#CED4DA',
    w500: '#ADB5BD',
    w600: '#6C757D',
    w700: '#495057',
    w800: '#343A40',
    w900: '#212529',
  },
  primary: {
    purple: '#6F6CE8',
    purple_dark: '#6A58D6',
    purple01: '#8481EF',
    purple02: '#A2A5F9',
    purple03: '#B8BFFF',
    purple04: '#C9CEFF',
    purple05: '#DADBFF',
    purple06: '#EEF0FF',
    purple07: '#FAFAFF',
  },
  secondary: {
    red: '#FF4B4B',
    orange: '#FF9600',
    green: '#58CC02',
    pink01: '#F44680',
    pink02: '#FBC1D4',
    pink03: '#FFF0F5',
    blue01: '#1CB0F6',
    blue02: '#74CCF6',
    blue03: '#ACDEF6',
    blue04: '#F2F9FC',
  },
  chart: {
    up: '#FF4770',
    up10: '#FFF4F6',
    up20: '#FFDFE5',
    down: '#4D6AFF',
    down10: '#F0F2FF',
    down20: '#DBE5FF',
  },
  learn_random: {
    turquoise: '#66CEDE',
    green: '#68CCC4',
    purple: '#A769D8',
    blue: '#74A3E1',
    indigo: '#97A3F3',
    pink: '#EF8BB6',
    brown: '#E28073',
    orange: '#EEAD4C',
    red: '#D15C70',
    olive: '#CFD21C',
    blush: '#EF8BB6',
    dustyBlue: '#74A3E1',
    mauve: '#D15C70',
    mustard: '#EEAD4C',
    monaco: '#68CCC4',
  },
};

export default palette;
