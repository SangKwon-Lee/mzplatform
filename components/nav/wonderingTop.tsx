import { css } from '@emotion/react';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import theme from '../../commons/theme';
import images from '../../commons/theme/images';
import { wonderingBgColor } from '../../commons/utils';
import BottomSheet from '../card/bottomFeed';
import Slide, { SlideProps } from '@mui/material/Slide';
import { Drawer, Box, IconButton, Snackbar } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

interface Props {
  category: string;
  title: string;
  titleSecond?: string;
  titleThird?: string;
  subTitle?: string;
  create_at: string;
  thumbnailUrl: string;
}

const Icon = styled.img``;

const DrawerStyled = styled('div')`
  .MuiPaper-root > div:nth-of-type(2) {
    padding: 0px !important;
  }
  .MuiPaper-root {
    max-width: 600px;
    margin: 0 auto;
    border-radius: 32px 32px 0px색 0px;
    box-shadow: 0px -3px 24px rgba(0, 0, 0, 0.1);
  }
  .MuiPaper-root .MuiButtonGroup-root {
    position: sticky;
    position: -webkit-sticky;
    bottom: 0;
    margin: 0 auto;
    background: #fff;
    z-index: 2;
  }
  .MuiPaper-root .MuiButtonGroup-root button {
    max-width: 100%;
    padding: 0;
  }

  .MuiPaper-root > div:first-of-type {
    padding: 16px 0px !important;
    background-color: #fff;
    position: -webkit-sticky;
    position: sticky !important;
    width: 100% !important;
    max-width: inherit;
    z-index: 1;
    border-radius: 32px 32px 0 0;
    margin-top: -16px;
  }
`;
const IconButtonStyled = styled(IconButton)`
  width: 24px;
  height: 24px;
  padding: 0;
`;

const CustomSnackbar = styled(Snackbar)`
  max-width: 600px !important;
  width: 100% !important;
  /* min-width: 360px;s */
  .MuiSnackbarContent-root {
    max-width: 600px !important;
    width: 100% !important;
    /* min-width: 360px; */
    margin-right: 16px !important;
    background: rgba(244, 70, 128, 0.8);
    text-align: center;
    border-radius: 24px;
    height: 45px;
  }
  .MuiSnackbarContent-message {
    text-align: center;
    width: 100%;
    color: white;
    ${theme.fonts.s14_w500};
  }
`;

const KAKAO = '5585a5d44f2e15976364bb28f22ed16a';
function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

export default function WonderingTopNav(props: Props) {
  const { category, create_at, subTitle, title, titleSecond, titleThird, thumbnailUrl } = props;
  const [openShare, setOpenShare] = useState(false);
  const [openClipBoard, setOpenClipBoard] = useState(false);
  const handleOpenShare = () => {
    setOpenShare(() => !openShare);
  };
  const [transition, setTransition] = useState<React.ComponentType<TransitionProps> | undefined>(undefined);

  useEffect(() => {
    if (window) {
      //@ts-ignore
      if (!Kakao.isInitialized()) {
        //@ts-ignore
        window.Kakao.init(KAKAO);
      }
    }
  }, []);

  const onClick = () => {
    //@ts-ignore
    const { Kakao, location } = window;
    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: title,
        description: title,
        imageUrl: thumbnailUrl,
        link: {
          mobileWebUrl: location.href,
          webUrl: location.href,
        },
      },
    });
  };

  const handleClick =
    (
      Transition: React.ComponentType<
        TransitionProps & {
          children: React.ReactElement<any, any>;
        }
      >,
    ) =>
    () => {
      //@ts-ignore
      setTransition(Transition);
    };

  const handleCopyClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setOpenShare(false);
      handleClick(SlideTransition);
      setOpenClipBoard(true);
      setTimeout(() => {
        setOpenClipBoard(false);
      }, 2000);
    } catch (e) {
      alert('복사에 실패하였습니다');
    }
  };

  return (
    <WonderingBg
      css={css`
        background-color: ${wonderingBgColor(category)};
      `}
    >
      <WonderingTitleWrapper>
        <WonderingTitle>{title}</WonderingTitle>
        <WonderingTitle>{titleSecond}</WonderingTitle>
        <WonderingTitle>{titleThird}</WonderingTitle>
      </WonderingTitleWrapper>
      <WonderingSubTitle>{subTitle}</WonderingSubTitle>
      <WonderingDateWrapper>
        <WonderingDate>{dayjs(create_at).format('YYYY.MM.DD')}</WonderingDate>
        <Image
          width={15}
          height={15}
          src={images.share}
          onClick={handleOpenShare}
          alt={'share'}
          css={css`
            margin-left: ${theme.metrics.m7};
            cursor: pointer;
          `}
        />
      </WonderingDateWrapper>

      <DrawerStyled>
        <Drawer anchor="bottom" open={openShare} onClose={handleOpenShare} BackdropProps={{ invisible: false }}>
          {/* <Box sx={{ display: 'flex', alignItems: 'center', padding: '16px 16px 16px' }}> */}
          <Box sx={{ display: 'flex', alignItems: 'center', paddingBottom: '24px' }}>
            {title && (
              <p
                style={{
                  fontWeight: 700,
                  fontSize: '18px',
                  lineHeight: '24px',
                  color: '#212529',
                }}
              >
                {'공유하기'}
              </p>
            )}

            <IconButtonStyled sx={{ marginLeft: 'auto' }} onClick={() => setOpenShare(false)}>
              <Icon src={'/images/ico_close.svg'} />
            </IconButtonStyled>
            {/* {Button(buttonType)} */}
          </Box>
          <div style={{ overflowY: 'auto', margin: '0 -16px', overflowX: 'hidden' }}>
            <Box sx={{ maxHeight: 'calc(100vh - 164px)' }}>
              <div className="feed-share">
                <button style={{ cursor: 'pointer' }} type="button" className="feed-share__btn feed-share__btn--kakao" onClick={onClick}>
                  <span className="s-hide">카카오톡 공유하기</span>
                </button>
                <button onClick={handleCopyClipBoard} style={{ cursor: 'pointer' }} type="button" className="feed-share__btn feed-share__btn--url">
                  url
                </button>
              </div>
            </Box>
          </div>
        </Drawer>
      </DrawerStyled>
      <CustomSnackbar
        open={openClipBoard}
        onClose={() => setOpenClipBoard(false)}
        TransitionComponent={transition}
        message="클립보드에 저장했어요"
        autoHideDuration={2000}
        key={'ASD'}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      />
    </WonderingBg>
  );
}

const WonderingBg = styled.div`
  width: 100%;
  height: 300px;
  padding: 80px ${theme.metrics.m4} 0 ${theme.metrics.m4};
`;

const WonderingTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: ${theme.metrics.m4};
`;

const WonderingTitle = styled.div`
  ${theme.fonts.s26_w700}
  color:white;
`;

const WonderingSubTitle = styled.div`
  ${theme.fonts.s16_w400};
  color: white;
  margin-bottom: ${theme.metrics.m4};
`;

const WonderingDateWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const WonderingDate = styled.div`
  ${theme.fonts.s12_w400};
  color: white;
`;
