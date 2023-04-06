/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import * as React from 'react';
import { useRef } from 'react';

import styled from '@emotion/styled';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Router from 'next/router';

import IconClub from '/public/images/ico_club.svg';
import IconClubActive from '/public/images/ico_club_active.svg';
import IconFeed from '/public/images/ico_feed.svg';
import IconFeedActive from '/public/images/ico_feed_active.svg';
import IconLearn from '/public/images/ico_learn.svg';
import IconLearnActive from '/public/images/ico_learn_active.svg';
import IconMy from '/public/images/ico_my.svg';
import IconMyActive from '/public/images/ico_my_active.svg';
import { useAppSelector } from '../../lib/redux/hooks';

const NavigationStyled = styled('div')`
  position: fixed;
  bottom: 0px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  max-width: 600px;
  width: 100%;
  color: rgb(38, 38, 38);
  z-index: 100;
  overflow: visible;
  filter: drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.16));

  .MuiBottomNavigation-root {
    padding: 0 16px;
  }

  .MuiButtonBase-root {
    font-size: 28px;
    svg {
      width: 1em;
      height: 1em;
    }
  }

  .MuiBottomNavigationAction-label {
    margin-top: 2px;
    font-size: 12px;
    color: #ced4da;
  }

  .Mui-selected > span.Mui-selected {
    height: 70px;
    width: 70px;
    background: linear-gradient(142.78deg, #6f6ce8 34.2%, #f865f2 83.48%);
    border: 8px solid #fff;
    border-radius: 50%;
    margin-top: -30px;
    padding: 30px 0px 0px 0px;
    font-size: 12px;
    color: #fff;
    font-weight: 600;
    transition: all 0.3s ease;
  }

  .Mui-selected {
    svg {
      position: absolute;
      bottom: 70%;
    }
  }
`;
interface DefaultProps {
  value: string;
}

const FooterNav = ({ value }: DefaultProps) => {
  const [page, setPage] = React.useState(value);
  const userId = useAppSelector((state) => state.user.userId);
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setPage(newValue);
    switch (newValue) {
      case 'learn':
        Router.replace('/market');
        break;
      case 'feed':
        Router.push('https://stg.woorimz.com/feed');
        break;
      case 'club':
        Router.push('https://stg.woorimz.com/club');
        break;
      case 'my':
        if (userId !== undefined) {
          Router.push(`https://stg.woorimz.com/profile/${userId}`);
        } else {
          Router.push(`https://stg.woorimz.com/login`);
        }
        break;
    }
  };

  const selectedNavComp = useRef<any>(null);

  return (
    <div
      css={css`
        max-width: 600px;
        margin: auto;
      `}
    >
      <NavigationStyled
        css={css`
          padding-bottom: calc(constant(safe-area-inset-bottom));
          padding-bottom: calc(env(safe-area-inset-bottom));
          background-color: white;
        `}
      >
        <BottomNavigation showLabels sx={{ width: 600 }} value={page} onChange={handleChange}>
          {value === 'learn' ? (
            <BottomNavigationAction value="learn" label="LEARN" icon={<IconLearnActive />} />
          ) : (
            <BottomNavigationAction value="learn" label="LEARN" icon={<IconLearn />} />
          )}
          {value === 'feed' ? (
            <BottomNavigationAction value="feed" label="FEED" icon={<IconFeedActive />} />
          ) : (
            <BottomNavigationAction value="feed" label="FEED" icon={<IconFeed />} />
          )}
          {value === 'club' ? (
            <BottomNavigationAction value="club" label="CLUB" icon={<IconClubActive />} />
          ) : (
            <BottomNavigationAction value="club" label="CLUB" icon={<IconClub />} />
          )}
          {value === 'my' ? (
            <BottomNavigationAction value="my" label="MY" icon={<IconMyActive />} />
          ) : (
            <BottomNavigationAction value="my" label="MY" icon={<IconMy />} />
          )}
        </BottomNavigation>
      </NavigationStyled>
    </div>
  );
};

export default FooterNav;
