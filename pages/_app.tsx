import { ReactElement, ReactNode, useEffect } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Global } from '@emotion/react';
import { ThemeProvider } from '@mui/material';
import theme, { muiTheme } from '../commons/theme';
import GlobalStyles from '../styles/global';
import store, { persistor } from '../lib/redux/store';
import { Provider } from 'react-redux';
import { PriceProvider } from '../contexts/price';
import moment from 'moment';
import Layout from '../components/layout/main';
import { Analytics } from '@vercel/analytics/react';
import Head from 'next/head';

import '../styles/notion.css';
import '../styles/Calendar.css';
import '../styles/carousel.css';
import '../styles/mansonry.css';
import '../styles/cloudChart.css';
import '../styles/bottomSheet.css';
import '../styles/flipNumber.css';
import 'react-notion-x/src/styles.css';
import '../styles/publish/global.scss';
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-tomorrow.css';
// used for rendering equations (optional)
import 'katex/dist/katex.min.css';
import { PersistGate } from 'redux-persist/integration/react';

let koLocale = require('moment/locale/ko');
moment.updateLocale('ko', koLocale);

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, viewport-fit=cover" />
        <script defer src="https://developers.kakao.com/sdk/js/kakao.min.js"></script>
      </Head>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <PriceProvider>
            <ThemeProvider theme={muiTheme}>
              <link rel="stylesheet" as="style" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css" />
              <Global styles={GlobalStyles(theme)} />
              {getLayout(<Component {...pageProps} />)}
              <Analytics />
            </ThemeProvider>
          </PriceProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
