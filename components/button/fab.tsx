import { Box, SpeedDial, Typography } from '@mui/material';
import theme from '../../commons/theme';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import styled from '@emotion/styled';
import Image from 'next/image';
import { isIOS, isMobile } from 'react-device-detect';
import { useState } from 'react';
import { css } from '@emotion/react';

const actions = [
  {
    icon: (
      <Image
        onClick={() => {
          setTimeout(function () {
            if (isIOS) {
              document.location.href = 'itms-apps://itunes.apple.com/kr/app/id1570370057?mt=8';
            } else {
              document.location.href = 'market://details?id=com.kiwoom.heromts';
            }
          }, 3000);
          if (isIOS) {
            document.location.href = "heromts://applink?code=''&menu=''&from=";
          } else {
            document.location.href =
              "intent://heromtshost?menu=''&code=''&from=External#Intent;scheme=heromts;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;launchFlags=0x30000000;package=com.kiwoom.heromts;end";
          }
        }}
        src={theme.images.kiwoomLogo}
        width={32}
        height={32}
        alt="logo"
      ></Image>
    ),
    name: '키움',
  },
  {
    icon: (
      <Image
        onClick={() => {
          window.open('https://smpib.wooribank.com/mpb/woori?withyou=NPCNT0064&target=/mpb/woori?withyou=NPFNS0074');
        }}
        src={theme.images.wonLogo}
        width={32}
        height={32}
        alt="logo"
      ></Image>
    ),
    name: '우리',
  },
];

const CustomIcon = styled(SpeedDialIcon)`
  .MuiSpeedDialIcon-icon {
    width: 24px;
    height: 24px;
    color: white;
    fill: white;
  }
`;
export default function FloatingActionButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {isMobile && (
        <Box
          sx={{
            zIndex: 999,
            right: 0,
            height: '52px',
            margin: '0px auto',
            display: 'flex',
            paddingRight: '16px',
            alignItems: 'flex-end',
            bottom: '80px',
            position: 'fixed',
            flexDirection: 'column-reverse',
          }}
        >
          <SpeedDial
            open={open}
            onClick={() => setOpen(() => !open)}
            sx={{
              '& .MuiSpeedDial-fab': {
                width: '52px',
                heigth: '52px',
                minWidth: '52px',
                minHeight: '52px',
                maxWidth: '52px',
                maxHeight: '52px',
                backgroundColor: theme.color.primary.purple,
                ':hover': {
                  backgroundColor: theme.color.primary.purple,
                },
              },
              '& .ohncnb': {
                color: 'white !important',
                backgroundColor: theme.color.primary.purple,
                ':hover': {
                  backgroundColor: theme.color.primary.purple,
                },
              },
              '& .MuiSpeedDialIcon-icon': {
                fontSize: '24px',
                color: 'white !important',
                fill: 'white !important',
              },
            }}
            ariaLabel="SpeedDial basic example"
            icon={
              <Box>
                <Typography
                  css={css`
                    ${theme.fonts.s14_w500};
                    color: white;
                  `}
                >
                  BUY
                </Typography>
                <Box
                  css={css`
                    border-top: 1px solid white;
                    margin: 2px 0;
                  `}
                ></Box>
                <Typography
                  css={css`
                    ${theme.fonts.s14_w500};
                    color: white;
                  `}
                >
                  SELL
                </Typography>
              </Box>
            }
          >
            {actions.map((action) => (
              <SpeedDialAction
                onClick={() => {}}
                sx={{ width: '52px', heigth: '52px', minWidth: '52px', minHeight: '52px', maxWidth: '52px', maxHeight: '52px' }}
                key={action.name}
                icon={action.icon}
              />
            ))}
          </SpeedDial>
          {/* <Fab
        sx={{
          width: '52px',
          heigth: '52px',
          backgroundColor: theme.color.primary.purple,
        }}
        css={css`
          :hover {
            background-color: ${theme.color.primary.purple};
          }
        `}
      >
        <AddIcon
          sx={{
            width: 24,
            height: 24,
            color: '#fff',
            fill: '#fff',
          }}
        />
      </Fab> */}
        </Box>
      )}
    </>
  );
}
