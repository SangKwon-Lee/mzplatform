/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import theme from '../../commons/theme';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { imageLoader } from '../../commons/utils';

const Wrapper = css`
  display: flex;
  align-items: center;
  background-color: ${theme.color.gray.white};
  padding: ${theme.metrics.m2};
  width: 100%;
  border-bottom: 1px solid ${theme.color.gray.w200};
  max-width: 600px;
`;

interface Props {
  onTextChangeHandler: (value: string) => void;
  inputText: string;
}

export default function SearchHeader({ onTextChangeHandler, inputText }: Props) {
  const router = useRouter();
  return (
    <div css={Wrapper}>
      <div
        onClick={() => router.back()}
        css={css`
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;
          display: flex;
          cursor: pointer;
          position: relative;
        `}
      >
        <Image loader={imageLoader} src="/images/leftArrow.svg" alt="left arrow" height={16} width={16} />
      </div>
      <input
        css={css`
          border: none;
          width: 85%;
          ${theme.fonts.s20_w400};
          ::placeholder {
            text-align: left;
            color: ${theme.color.gray.w500};
          }
          min-height: 28px;
          background-color: ${theme.color.gray.white};
          &:focus {
            outline: none;
          }
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          ::-webkit-search-cancel-button {
            display: none;
          }
        `}
        onChange={(e) => {
          onTextChangeHandler(e.target.value);
        }}
        placeholder="종목명, 종목코드로 찾아 보세요."
        value={inputText}
        type="search"
      />
      <Image
        loader={imageLoader}
        css={css`
          cursor: pointer;
          margin: 0 ${theme.metrics.m4} 0 0;
          display: ${inputText === '' && 'none'};
        `}
        src="/images/inputDelete.svg"
        alt="input delete"
        width={20}
        height={20}
        onClick={() => {
          onTextChangeHandler('');
          router.push('/search');
        }}
      />
      <Image loader={imageLoader} css={{ margin: `0 ${theme.metrics.m2} 0 0` }} src="/images/search.svg" alt="search btn" width={22} height={22} />
    </div>
  );
}
