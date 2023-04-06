import Box from '@mui/material/Box';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import _ from 'lodash';
import BottomSheet from './bottomFeed';
import ItemFriend from './feedFriend';
import { contentConverterForList, fillZero, getDDay } from '../../commons/utils';
import { useRouter } from 'next/router';
import { IFeeds } from '../../commons/types';
import { css } from '@emotion/react';
import theme from '../../commons/theme';
import dayjs from 'dayjs';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { Pagination } from 'swiper';
import useResizeObserver from '../../hooks/useResizeObserver';
import { Dialog } from '@mui/material';

interface DefaultProps {
  data: IFeeds;
}

const CustomDialog = styled(Dialog)`
  .MuiPaper-root {
    border-radius: 32px;
    width: 310px;
    padding: 32px 24px 24px;
  }
`;

const NewsImg = styled.img``;
const CustomSwiper = styled(Swiper)`
  .swiper-slide {
    inset: 0px;
    box-sizing: border-box;
    padding: 0px;
    border: none;
    margin: auto;
    display: block;
    min-width: 100%;
    max-width: 100%;
    min-height: 100%;
    max-height: 100%;
  }
`;

const CustomImg = styled.img`
  position: absolute;
  inset: 0px;
  box-sizing: border-box;
  padding: 0px;
  border: none;
  margin: auto;
  display: block;
  width: 0px;
  height: 0px;
  min-width: 100%;
  max-width: 100%;
  min-height: 100%;
  max-height: 100%;
`;
const CardFeed = (props: DefaultProps) => {
  const { data } = props;
  const contentRef = useRef(null);
  const [isShowReadMore, setIsShowReadMore] = useState(false);
  const router = useRouter();
  const [sheetVisible, bottomVisible] = useState(false);
  const handleBottomSheet = (newValue: boolean) => {
    bottomVisible(newValue);
  };
  const handleFunction = (event: any) => {
    bottomVisible(true);
  };
  const [sheet2Visible, bottom2Visible] = useState(false);
  const handle2BottomSheet = (newValue: boolean) => {
    bottom2Visible(newValue);
  };
  const handle2Function = () => {
    bottom2Visible(true);
  };
  const observeCallback = (entries: any) => {
    for (let entry of entries) {
      if (entry.target.scrollHeight > 63) {
        setIsShowReadMore(true);
      } else {
        setIsShowReadMore(false);
      }
    }
  };

  useResizeObserver({ callback: observeCallback, element: contentRef });

  const getCard = () => {
    if (data.pollYn === 'Y') {
      return (
        <div
          onClick={() => router.push(`https://stg.woorimz.com/feed/poll/${data.feedId}`)}
          css={css`
            cursor: pointer !important;
            width: 100%;
            margin-top: ${theme.metrics.m4};
            border: 1px solid ${theme.color.gray.w200};
            border-radius: 24px;
            background-color: ${dayjs(data.pollEndDate).isBefore(dayjs()) ? theme.color.gray.w100 : 'white'};
            padding: ${theme.metrics.m6} ${theme.metrics.m4} ${theme.metrics.m4} ${theme.metrics.m6};
          `}
        >
          <div
            css={css`
              ${theme.fonts.s16_w700};
              color: ${dayjs(data.pollEndDate).isBefore(dayjs()) ? theme.color.gray.w600 : theme.color.gray.w900};
              margin-bottom: ${theme.metrics.m2};
            `}
          >
            {data.title}
          </div>
          <div
            css={css`
              ${theme.fonts.s14_w400};
              color: ${theme.color.gray.w600};
              margin-bottom: ${theme.metrics.m4};
              line-height: 21px;
              display: -webkit-box;
              -webkit-line-clamp: 3;
              -webkit-box-orient: vertical;
              overflow: hidden;
            `}
          >
            {data.contents}
          </div>
          {dayjs(data.pollEndDate).isBefore(dayjs()) && _.sumBy(data.pollItems, 'voteCount') !== 0 ? (
            <div className="card-poll__result">
              <div className="card-poll__ranking">
                <span className="card-poll__ranking-num">1</span>
                <span className="card-poll__ranking-unit">위</span>
              </div>
              <div className="card-poll__value">
                <span className="card-poll__value-name">
                  {Array.isArray(data.pollItems) &&
                    _.maxBy(data.pollItems, 'voteCount')?.voteCount !== 0 &&
                    _.maxBy(data.pollItems, 'voteCount')?.itemName}
                </span>
                <span className="card-poll__value-percent">
                  {(Number(_.maxBy(data.pollItems, 'voteCount')?.voteCount) / _.sumBy(data.pollItems, 'voteCount')) * 100}%
                </span>
              </div>
            </div>
          ) : (
            <></>
          )}
          {!dayjs(data.pollEndDate).isBefore(dayjs()) && (
            <div
              css={css`
                ${theme.fonts.s16_w500};
                color: ${theme.color.gray.white};
                padding: ${theme.metrics.m4};
                border-radius: 32px;
                text-align: center;
                background-color: ${theme.color.primary.purple};
                margin-bottom: ${theme.metrics.m4};
              `}
            >
              투표하기
            </div>
          )}
          <div
            className="card-poll__info"
            css={css`
              cursor: pointer;
            `}
          >
            <span className="card-poll__people">{Array.isArray(data.pollItems) && _.sum(data.pollItems.map((data) => data.voteCount))}명 참여</span>
            <span
              css={css`
                background: ${dayjs(data.pollEndDate).isBefore(dayjs())
                  ? `url(/images/ico/ico-timeGray.svg) no-repeat`
                  : `url(/images/ico-time.svg) no-repeat`};
                color: ${dayjs(data.pollEndDate).isBefore(dayjs()) ? theme.color.gray.w500 : theme.color.primary.purple};
              `}
              className="card-poll__time"
            >
              {dayjs(data.pollEndDate).isBefore(dayjs()) ? '마감' : getDDay(data.pollEndDate)}
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <>
          <div onClick={() => router.push(`https://stg.woorimz.com/feed/${data.feedId}`)}>
            <div
              css={css`
                cursor: pointer;
              `}
            >
              <p
                className="card-feed__tit"
                css={css`
                  cursor: pointer;
                `}
              >
                {data.title}
              </p>
              <div
                css={css`
                  ${theme.fonts.s14_w400};
                  color: ${theme.color.gray.w600};
                  line-height: 21px;
                  display: -webkit-box;
                  -webkit-line-clamp: 3;
                  -webkit-box-orient: vertical;
                  overflow: hidden;
                  word-break: keep-all;
                  margin-bottom: ${theme.metrics.m4};
                  cursor: pointer;
                `}
                ref={contentRef}
                dangerouslySetInnerHTML={{ __html: contentConverterForList(data.contents) }}
              ></div>
              {isShowReadMore && (
                <div
                  css={css`
                    ${theme.fonts.s14_w400};
                    color: ${theme.color.gray.w500};
                    margin: ${theme.metrics.m4} 0;
                    cursor: pointer;
                  `}
                >
                  더 보기
                </div>
              )}
              {Array.isArray(data.files) && data.files.length > 0 && (
                <div className="card-feed__imgs">
                  <CustomSwiper
                    pagination={{
                      type: 'fraction',
                    }}
                    modules={[Pagination]}
                    slidesPerView={1}
                  >
                    {data.files.map((item, index) => (
                      <SwiperSlide
                        key={index}
                        style={
                          {
                            // minWidth: '100%',
                            // minHeight: '450px !important',
                            // maxHeight: '450px !important',
                            // height: '100%',
                          }
                        }
                      >
                        <div
                          css={css`
                            padding-top: calc(86.4407%);
                          `}
                        >
                          <CustomImg src={'https://cdn-stg.woorimz.com' + item.fileUrl} alt={item.fileUrl} />
                        </div>
                      </SwiperSlide>
                    ))}
                  </CustomSwiper>
                </div>
              )}
            </div>
          </div>
          {Array.isArray(data.files) && data.files.length === 0 && data.ogUrl && (
            <>
              <div className="card-link" onClick={() => router.push(`https://stg.woorimz.com/feed/${data.feedId}`)}>
                <div>
                  <a className="card-link__inr" target="_blank">
                    <div className="card-link__thum">
                      <span
                        style={{
                          height: '100%',
                          display: 'inline-block',
                          background: '#e9ecef',
                        }}
                      >
                        <NewsImg
                          className="card-link__img__noNews"
                          src={data.ogImage ? data.ogImage : '/images/__egimnnosw.png'}
                          width="64"
                          height="64"
                          alt="empty_img"
                        />
                      </span>
                    </div>
                    <div
                      css={css`
                        width: 100%;
                      `}
                    >
                      <div className="card-link__tit">{data.ogTitle}</div>
                      <div className="card-link__url">{data.ogUrl}</div>
                    </div>
                  </a>
                </div>
              </div>
            </>
          )}
        </>
      );
    }
  };
  return (
    <Box className={`card-feed ${data.pinDatetime ? 'card-feed--fixed' : ''}`}>
      <Box className="card-feed__inr" css={css``}>
        <Box
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <div
            css={css`
              display: flex;
              width: 100%;
              align-items: center;
              justify-content: space-between;
            `}
          >
            <ItemFriend
              memberId={data.member.memberId}
              nickname={data.member.nickname}
              roleTypeCode={data.member.roleTypeCode}
              profileUrl={data.member.profileUrl}
              selfIntroduction={data.member.selfIntroduction}
              createdDatetime={data.createdDatetime}
            />
            <Image
              onClick={() => router.push(`https://stg.woorimz.com/feed/${data.feedId}`)}
              src={'/images/ico/ico_moreVert.svg'}
              width={17}
              height={17}
              css={css`
                cursor: pointer;
              `}
              alt="mortVert"
            ></Image>
          </div>
        </Box>
        <div>{getCard()}</div>
        <div
          css={css`
            cursor: pointer;
          `}
          className="card-feed__foot"
          onClick={() => router.push(`https://stg.woorimz.com/feed/${data.feedId}`)}
        >
          <div>
            <div
              css={css`
                cursor: pointer;
              `}
              className="card-feed__comment"
              onClick={() => router.push(`https://stg.woorimz.com/feed/${data.feedId}`)}
            >
              {fillZero(2, data.commentCount)}
            </div>
          </div>
          {Array.isArray(data.reacts) && (
            <button
              css={css`
                cursor: pointer;
                background: ${data.reacts.length === 0
                  ? `left center/20px url(/images/ico-emoji-default.svg) no-repeat`
                  : _.maxBy(data.reacts, 'iconTypeCode')?.iconTypeCode === 'HELPED'
                  ? `left center/20px url(/images/ico-emoji-good.svg) no-repeat`
                  : _.maxBy(data.reacts, 'iconTypeCode')?.iconTypeCode === 'DISAGREE'
                  ? `left center/20px url(/images/ico-emoji-bad.svg) no-repeat`
                  : _.maxBy(data.reacts, 'iconTypeCode')?.iconTypeCode === 'FOLLOWUP'
                  ? `left center/20px url(/images/ico-emoji-excellent.svg) no-repeat`
                  : _.maxBy(data.reacts, 'iconTypeCode')?.iconTypeCode === 'SHARP'
                  ? `left center/20px url(/images/ico-emoji-great.svg) no-repeat`
                  : _.maxBy(data.reacts, 'iconTypeCode')?.iconTypeCode === 'AGREE'
                  ? `left center/20px url(/images/ico-emoji-best.svg) no-repeat`
                  : `left center/20px url(/images/ico-emoji-default.svg) no-repeat`};
              `}
              type="button"
              className="card-feed__default"
              onClick={handleFunction}
            >
              {fillZero(2, data.reacts.length)}
            </button>
          )}
          <button
            onClick={() => router.push(`https://stg.woorimz.com/feed/${data.feedId}`)}
            css={css`
              cursor: pointer;
            `}
            type="button"
            className="card-feed__btn-share"
            // onClick={handle2Function}
          >
            <span className="s-hide">공유하기</span>
          </button>
        </div>
      </Box>
      <Box>
        <BottomSheet visible={sheetVisible} title="" callback={handleBottomSheet} noBackDrop={true} buttonType="feedLike">
          <div
            css={css`
              display: flex;
              justify-content: space-between;
            `}
          >
            <div
              css={css`
                cursor: pointer;
              `}
            >
              <div className="feed-like__iconbox">
                <i className="feed-like__icon__good">
                  <span className="s-hide">공감하기</span>
                </i>
                {Array.isArray(data.reacts) && data.reacts.length > 0 && data.reacts.filter((data) => data.iconTypeCode === 'HELPED').length > 0 && (
                  <span className="feed-like__count">{data.reacts.filter((data) => data.iconTypeCode === 'HELPED')[0].count}</span>
                )}
              </div>
              <span className="feed-like__text">도움됐어</span>
            </div>
            <div
              css={css`
                cursor: pointer;
              `}
              className="feed-like__active"
            >
              <div className="feed-like__iconbox">
                <i className="feed-like__icon__bad">
                  <span className="s-hide">공감하기</span>
                </i>
                {Array.isArray(data.reacts) &&
                  data.reacts.length > 0 &&
                  data.reacts.filter((data) => data.iconTypeCode === 'DISAGREE').length > 0 && (
                    <span className="feed-like__count">{data.reacts.filter((data) => data.iconTypeCode === 'DISAGREE')[0].count}</span>
                  )}
              </div>
              <span className="feed-like__text">그건 좀..</span>
            </div>
            <div
              css={css`
                cursor: pointer;
              `}
            >
              <div className="feed-like__iconbox">
                <i className="feed-like__icon__excellent">
                  <span className="s-hide">공감하기</span>
                </i>
                {Array.isArray(data.reacts) &&
                  data.reacts.length > 0 &&
                  data.reacts.filter((data) => data.iconTypeCode === 'FOLLOWUP').length > 0 && (
                    <span className="feed-like__count">{data.reacts.filter((data) => data.iconTypeCode === 'FOLLOWUP')[0].count}</span>
                  )}
              </div>
              <span className="feed-like__text">후속원해</span>
            </div>
            <div
              css={css`
                cursor: pointer;
              `}
            >
              <div className="feed-like__iconbox">
                <i className="feed-like__icon__great">
                  <span className="s-hide">공감하기</span>
                </i>
              </div>
              {Array.isArray(data.reacts) && data.reacts.length > 0 && data.reacts.filter((data) => data.iconTypeCode === 'SHARP').length > 0 && (
                <span className="feed-like__count">{data.reacts.filter((data) => data.iconTypeCode === 'SHARP')[0].count}</span>
              )}
              <span className="feed-like__text">예리한데</span>
            </div>
            <div
              css={css`
                cursor: pointer;
              `}
            >
              <div className="feed-like__iconbox">
                <i className="feed-like__icon__best">
                  <span className="s-hide">공감하기</span>
                </i>
                {Array.isArray(data.reacts) && data.reacts.length > 0 && data.reacts.filter((data) => data.iconTypeCode === 'AGREE').length > 0 && (
                  <span className="feed-like__count">{data.reacts.filter((data) => data.iconTypeCode === 'AGREE')[0].count}</span>
                )}
              </div>
              <span className="feed-like__text">완전공감</span>
            </div>
          </div>
        </BottomSheet>
      </Box>
      <BottomSheet visible={sheet2Visible} title="공유 하기" callback={handle2BottomSheet}>
        <div className="feed-share">
          <button type="button" className="feed-share__btn feed-share__btn--kakao">
            <span className="s-hide">카카오톡 공유하기</span>
          </button>
          <button type="button" className="feed-share__btn feed-share__btn--url">
            url
          </button>
        </div>
      </BottomSheet>
      {/* <Box> */}
      {/* <Modal open={true}> */}
      {/* <CustomDialog open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <Box
            css={css`
              ${theme.fonts.s16_w400};
              color: ${theme.color.gray.w700};
              white-space: pre-line;
              word-break: keep-all;
              text-align: center;
              line-height: 1.5;
            `}
          >
            {'로그인이 필요한 서비스예요. \n 로그인 후 이용해주세요.'}
          </Box>
          <Box
            css={css`
              ${theme.fonts.s16_w400};
              color: ${theme.color.gray.w700};
            `}
          ></Box>
          <Box
            css={css`
              display: flex;
              margin-top: ${theme.metrics.m4};
            `}
          >
            <Box
              css={css`
                ${theme.fonts.s14_w400};
                display: flex;
                width: 90px;
                height: 40px;
                background-color: ${theme.color.gray.w100};
                color: ${theme.color.gray.w600};
                text-align: center;
                justify-content: center;
                align-items: center;
                border-radius: 48px;
                margin-right: ${theme.metrics.m2};
                cursor: pointer;
              `}
              onClick={() => setOpenModal(false)}
            >
              취소
            </Box>
            <Box
              css={css`
                ${theme.fonts.s14_w400};
                display: flex;
                width: 90px;
                height: 40px;
                justify-content: center;
                align-items: center;
                text-align: center;
                background-color: ${theme.color.primary.purple};
                color: white;
                cursor: pointer;
                border-radius: 48px;
              `}
              onClick={() => router.push(`https://stg.woorimz.com/login?landingUrl=/feed`)}
            >
              확인
            </Box>
          </Box>
        </Box>
      </CustomDialog> */}
      {/* </Modal> */}
      {/* </Box> */}
    </Box>
  );
};

export default CardFeed;

CardFeed.defaultProps = {
  fixed: false,
  profile: {
    mentor: false,
    club: '',
    label: '',
    desc: '',
    info: '',
    src: '',
    href: '',
  },
  title: '',
  content: '',
  images: [],
  comment: 0,
  like: 0,
  link: {},
  poll: {},
  commentHref: '',
  detailHref: '',
};
