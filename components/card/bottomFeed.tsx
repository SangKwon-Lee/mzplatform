import React from 'react';
import styled from '@emotion/styled';
import { Drawer, Box, IconButton } from '@mui/material';
import { SwipeableDrawer } from '@mui/material';
import theme from '../../commons/theme';

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

const SwipeableDrawerCustom = styled(SwipeableDrawer)`
  .MuiDrawer-root {
    width: 100% !important;
  }
  .MuiDrawer-modal {
    /* width: 200px !important; */
  }
  .MuiDrawer-paperAnchorBottom {
    /* width: 200px !important; */
    /* border: 1px solid ${theme.color.primary.purple} !important; */
  }
`;

const IconButtonStyled = styled(IconButton)`
  width: 24px;
  height: 24px;
  padding: 0;
`;

interface ComponentProps {
  visible: boolean;
  title: string;
  children: React.ReactNode;
  customPadding?: string;
  customMargin?: string;
  noBackDrop?: boolean;
  buttonType: string;
  callback?: (param: boolean) => void;
}

const BottomSheet = ({ visible, title, children, customPadding, customMargin, noBackDrop, buttonType, callback }: ComponentProps) => {
  const handleToggle = (open: boolean) => () => {
    if (callback) {
      callback(open);
    }
  };
  return (
    <React.Fragment key={'bottom'}>
      <DrawerStyled>
        {buttonType == 'close' && (
          <Drawer anchor="bottom" open={visible} onClose={handleToggle(false)} BackdropProps={{ invisible: noBackDrop }}>
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
                  {title}
                </p>
              )}

              <IconButtonStyled sx={{ marginLeft: 'auto' }} onClick={handleToggle(false)}>
                <Icon src={'/images/ico_close.svg'} />
              </IconButtonStyled>
              {/* {Button(buttonType)} */}
            </Box>
            <div style={{ overflowY: 'auto', margin: '0 -16px', overflowX: 'hidden' }}>
              <Box sx={{ padding: customPadding, maxHeight: 'calc(100vh - 164px)', margin: customMargin }}>{children}</Box>
            </div>
          </Drawer>
        )}
        {buttonType == 'dropbar' && (
          <SwipeableDrawer
            transitionDuration={{
              appear: 0,
              enter: 0,
              exit: 0,
            }}
            anchor="bottom"
            open={visible}
            onOpen={handleToggle(true)}
            onClose={handleToggle(false)}
            BackdropProps={{ invisible: noBackDrop }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div className="dropbar" onClick={handleToggle(false)}></div>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', padding: '0 16px 0 16px' }}>
              {title && (
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: '18px',
                    lineHeight: '24px',
                    color: '#212529',
                  }}
                >
                  {title}
                </p>
              )}
              {/* {Button(buttonType)} */}
            </Box>
            <div style={{ overflowY: 'auto', margin: '0 -16px', overflowX: 'hidden' }}>
              <Box sx={{ padding: customPadding, maxHeight: 'calc(100vh - 164px)', margin: customMargin }}>{children}</Box>
            </div>
          </SwipeableDrawer>
        )}
        {buttonType == 'feedLike' && (
          <SwipeableDrawerCustom
            transitionDuration={{
              appear: 0,
              enter: 0,
              exit: 0,
            }}
            anchor="bottom"
            open={visible}
            onOpen={handleToggle(true)}
            onClose={handleToggle(false)}
            BackdropProps={{ invisible: noBackDrop }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <div className="dropbar" onClick={handleToggle(false)}></div>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', padding: '0 16px 0 16px' }}>
              {title && (
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: '18px',
                    lineHeight: '24px',
                    color: '#212529',
                  }}
                >
                  {title}
                </p>
              )}
            </Box>
            <div style={{ overflowY: 'auto', margin: '0 -16px', overflowX: 'hidden' }}>
              <Box sx={{ padding: customPadding, maxHeight: 'calc(100vh - 164px)', margin: customMargin }}>{children}</Box>
            </div>
          </SwipeableDrawerCustom>
        )}
      </DrawerStyled>
    </React.Fragment>
  );
};

export default BottomSheet;

BottomSheet.defaultProps = {
  visible: false,
  title: '',
  customPadding: '16px',
  customMargin: '0px',
  backDrop: false,
  buttonType: 'close',
};
