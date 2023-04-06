import { css } from '@emotion/react';

export const GlobalStyles = (theme: any) => css`
  html {
    font-size: 10px;
    background-color: #e9ecef;
  }
  body {
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-wrap: break-word;
  }
  * {
    box-sizing: border-box;
    font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
      'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif;
    color: ${theme.color.gray.w900};
    border-spacing: 0;
    list-style: none;
    border-collapse: collapse;
    -webkit-appearence: none;
    appearance: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyles;
