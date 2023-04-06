/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import 'react-spring-bottom-sheet/dist/style.css';
import { BottomSheet } from 'react-spring-bottom-sheet';
import styled from '@emotion/styled';
import theme from '../../commons/theme';
import Icon from '../../commons/theme/icon';
import images from '../../commons/theme/images';
import Image from 'next/image';
import { imageLoader } from '../../commons/utils';
import { useAppSelector } from '../../lib/redux/hooks';
import Link from 'next/link';
import moment from 'moment';

export default function NewsNav() {
  const { openSheet, handleOpenSheet, title, url, summary, photo, publishDate, media } = useAppSelector((state) => state.bottomSheets.news);
  return (
    <BottomSheet onDismiss={handleOpenSheet} open={openSheet}>
      <div
        css={css`
          padding: 0 ${theme.metrics.m4} ${theme.metrics.m4} ${theme.metrics.m4};
        `}
      >
        <IconWrapper>
          <div
            css={css`
              width: 20px;
              height: 20px;
              display: flex;
              align-self: center;
              justify-content: center;
            `}
            onClick={handleOpenSheet}
          >
            <Icon icon={images.close} width={16} height={16} style={{ cursor: 'pointer' }} />
          </div>
        </IconWrapper>
        <div
          css={css`
            padding: 0;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: row;
              justify-content: start;
              align-items: center;
              margin-bottom: ${theme.metrics.m4};
            `}
          >
            <span
              css={css`
                ${theme.fonts.s12_w500};
                color: ${theme.color.gray.w600};
                margin-right: ${theme.metrics.m2};
              `}
            >
              {media}
            </span>
            <span
              css={css`
                ${theme.fonts.s12_w500};
                color: ${theme.color.gray.w500};
              `}
            >
              {moment(publishDate).add(9, 'hour').fromNow()}
            </span>
          </div>
          <TilteWrapper>
            <Title>{title}</Title>
          </TilteWrapper>
          <SummaryWrapper>
            {photo ? (
              <Image
                css={css`
                  border-radius: 8px;
                  border: 1px solid ${theme.color.gray.w200};
                  margin-right: ${theme.metrics.m3};
                `}
                loader={imageLoader}
                src={photo}
                width={72}
                height={72}
                alt={'newsThumbnail'}
              />
            ) : null}
            <p
              css={css`
                ${theme.fonts.s16_w500}
                line-height: 24px;
                margin: 0;
                padding: 0;
                color: ${theme.color.gray.w600};
              `}
            >
              {summary}
            </p>
          </SummaryWrapper>
        </div>
        <Link
          href={url}
          target={'_blank'}
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            padding: ${theme.metrics.m4} 14px;
            width: 100%;
            background: ${theme.color.primary.purple};
            border-radius: 50px;
            outline: none;
            border: none;
            margin-bottom: ${theme.metrics.m4};
          `}
        >
          <p
            css={css`
              color: #ffffff;
              ${theme.fonts.s16_w400};
              margin: 0;
            `}
          >
            {'전체 기사보기'}
          </p>
        </Link>
      </div>
    </BottomSheet>
  );
}

const SummaryWrapper = styled.div`
  /* height: 150px; */
  display: flex;
  width: 100%;
  padding: ${theme.metrics.m6} 0;
  flex-direction: row;
  align-items: start;
  justify-content: start;
`;

const IconWrapper = styled.div`
  display: flex;
  align-self: end;
  justify-content: end;
`;

const TilteWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0;
  overflow: hidden;
`;

const Title = styled.div`
  ${theme.fonts.s20_w500};
  /* text-align: center; */
  justify-content: center;
  align-items: center;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: ${theme.color.gray.w900};
`;
