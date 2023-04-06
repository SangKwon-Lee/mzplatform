import { createTheme } from '@mui/material';

import fonts, { FontsType } from './fonts';
import metrics, { MetricsType } from './metrics';
import palette, { PaletteType } from './palette';
import images, { ImagesType } from './images';

declare module '@mui/material/styles' {
  interface ThemeOptions {
    fonts: FontsType;
    metrics: MetricsType;
    images: ImagesType;
    color: PaletteType;
  }
}

declare module '@emotion/react' {
  export interface Theme {
    fonts: FontsType;
    metrics: MetricsType;
    color: PaletteType;
    images: ImagesType;
  }
}
interface ThemeType {
  fonts: FontsType;
  metrics: MetricsType;
  color: PaletteType;
  images: ImagesType;
}

export const muiTheme = createTheme({
  fonts: fonts,
  metrics: metrics,
  color: palette,
  images: images,
});

const theme: ThemeType = {
  color: palette,
  fonts,
  images,
  metrics,
};

export default theme;
