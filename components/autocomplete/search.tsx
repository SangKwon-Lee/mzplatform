/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import theme from '../../commons/theme';
import { imageLoader } from '../../commons/utils';
import Image from 'next/image';
import { ISearchAuto } from '../../commons/types';
import Highlighter from 'react-highlight-words';

interface Props {
  autocompleteResult: ISearchAuto[];
  onClickSearchItem: (item: ISearchAuto) => void;
  inputText: string;
}

export default function SearchAutocomplete({ autocompleteResult, onClickSearchItem, inputText }: Props) {
  const renderAutoCompleteKeyword = (data: ISearchAuto) => {
    return (
      <button
        css={css`
          border-radius: ${theme.metrics.m2};
          border: 1px solid ${theme.color.secondary.blue03};
          background-color: ${theme.color.secondary.blue04};
          padding: 6px ${theme.metrics.m2} 6px ${theme.metrics.m2};
          color: ${theme.color.secondary.blue01};
          margin-right: ${theme.metrics.m1};
          cursor: pointer;
        `}
        onClick={() => onClickSearchItem(data)}
      >
        <Highlighter
          css={css`
            ${theme.fonts.s14_w500};
          `}
          unhighlightStyle={{
            color: theme.color.secondary.blue01,
          }}
          highlightStyle={{
            color: theme.color.secondary.pink01,
            background: 'transparent',
          }}
          autoEscape={true}
          searchWords={[inputText]}
          textToHighlight={`#${data.name}`}
        />
      </button>
    );
  };

  const renderAutoCompleteStock = (data: ISearchAuto) => {
    return (
      <div
        css={css`
          display: flex;
          cursor: pointer;
          flex-direction: row;
          align-items: center;
          margin: ${theme.metrics.m2} 0 ${theme.metrics.m2} 0;
        `}
        onClick={() => onClickSearchItem(data)}
      >
        {data.imageUrl && (
          <Image
            css={css`
              border-radius: 50%;
            `}
            loader={imageLoader}
            src={data.imageUrl}
            alt="logo image"
            height={48}
            width={48}
          />
        )}
        <div
          css={css`
            display: flex;
            flex-direction: column;
            margin-left: ${theme.metrics.m2};
          `}
        >
          <Highlighter
            css={css`
              ${theme.fonts.s16_w700};
              color: ${theme.color.gray.w900};
              margin-bottom: ${theme.metrics.m1};
            `}
            highlightStyle={{
              color: theme.color.secondary.blue01,
              background: 'transparent',
            }}
            autoEscape={true}
            searchWords={[inputText]}
            textToHighlight={data.name}
          />
          <Highlighter
            css={css`
              ${theme.fonts.s14_w400};
              color: ${theme.color.gray.w500};
            `}
            highlightStyle={{
              color: theme.color.secondary.blue01,
              background: 'transparent',
            }}
            unhighlightStyle={{
              color: theme.color.gray.w500,
            }}
            autoEscape={true}
            searchWords={[inputText]}
            textToHighlight={data.stockcode!}
          />
        </div>
      </div>
    );
  };

  const stockResult = autocompleteResult
    .filter((item) => item.type === 'stock')
    .sort((a, b) => {
      if (a.stockcode! < b.stockcode!) return -1;
      else if (a.stockcode! > b.stockcode!) return 1;
      else return 0;
    });
  const keywordResult = autocompleteResult.filter((item) => item.type === 'tag');
  return (
    <div
      css={css`
        margin: 0 0 ${theme.metrics.m4} 0;
      `}
    >
      {stockResult.length === 0 && keywordResult.length === 0 ? (
        <div
          css={css`
            display: flex;
            height: 400px;
            justify-content: center;
            align-items: center;
            border-radius: 24px;
          `}
        >
          <div
            css={css`
              display: flex;
              justify-content: center;
              align-items: center;
              flex-direction: column;
              position: relative;
              top: 24px;
            `}
          >
            <Image
              css={css`
                filter: contrast(0.95);
                margin: auto;
                position: rel;
              `}
              src={'/images/noContents.svg'}
              alt={'no-content'}
              width={145}
              height={80}
            />
            <p
              css={css`
                ${theme.fonts.s16_w400};
                color: ${theme.color.gray.w600};
              `}
            >
              {'검색 결과가 없어요.'}
            </p>
          </div>
        </div>
      ) : (
        <>
          {stockResult.length > 0 ? (
            <div
              css={css`
                padding: 0 ${theme.metrics.m4} 0 ${theme.metrics.m4};
                display: flex;
                flex-direction: column;
              `}
            >
              {stockResult.map((data, index) => index < 10 && <div key={`searchAuto-stock-${data.stockcode}`}>{renderAutoCompleteStock(data)}</div>)}
            </div>
          ) : null}
          {keywordResult.length > 0 ? (
            <div
              css={css`
                padding: ${theme.metrics.m4} ${theme.metrics.m4} 0 ${theme.metrics.m4};
                display: flex;
                flex-direction: row;
                border-top: ${stockResult.length > 0 ? 'solid' : 'none'};
                border-width: 1px;
                border-color: ${theme.color.gray.w200};
                flex-wrap: wrap;
                gap: ${theme.metrics.m1};
              `}
            >
              {keywordResult.map((data) => (
                <div key={`searchAuto-keyword-${data.name}`}>{renderAutoCompleteKeyword(data)}</div>
              ))}
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
