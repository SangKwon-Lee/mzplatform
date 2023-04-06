import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import moment from 'moment';
import { css } from '@emotion/react';
import theme from '../../commons/theme';

interface DefaultProps {
  memberId: number;
  nickname: string;
  roleTypeCode: string;
  profileUrl: string;
  selfIntroduction: string;
  createdDatetime: string;
}

const ItemFriend = ({ memberId, nickname, profileUrl, roleTypeCode, selfIntroduction, createdDatetime }: DefaultProps) => {
  const router = useRouter();
  const getAvatar = () => {
    return (
      <div
        css={css`
          cursor: pointer;
        `}
        onClick={() => router.push(`https://stg.woorimz.com/profile/${memberId}`)}
      >
        <div>
          <Avatar alt={profileUrl} src={'https://cdn-stg.woorimz.com' + profileUrl} sx={{ width: 48, height: 48 }} />
        </div>
      </div>
    );
  };
  return (
    <Box
      css={css`
        display: flex;
      `}
    >
      {getAvatar()}
      <Box
        css={css`
          margin-left: ${theme.metrics.m2};
        `}
      >
        <Box
          css={css`
            ${theme.fonts.s16_w700};
            margin-bottom: 6px;
          `}
        >
          {nickname}
        </Box>
        <Box
          css={css`
            ${theme.fonts.s12_w400};
            color: ${theme.color.gray.w500};
          `}
        >
          {moment(createdDatetime).fromNow()}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemFriend;
