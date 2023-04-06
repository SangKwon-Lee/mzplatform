import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ReactElement } from 'react';
import { useAppDispatch, useAppSelector } from '../lib/redux/hooks';
import { setUserId } from '../lib/redux/user';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import CryptoJS from 'crypto-js';

interface HomeServerSideProps {
  userId: string;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const token = query.token && typeof query.token === 'string' ? query.token : '';

  const HASH_KEY = process.env.HASH_KEY;

  let userId = '';
  if (token && HASH_KEY) {
    const tokenString = token.replace(' ', '+');
    userId = CryptoJS.AES.decrypt(tokenString, HASH_KEY).toString(CryptoJS.enc.Utf8);
  }

  return {
    props: {
      userId,
    },
  };
};

export default function Home({ userId }: HomeServerSideProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [replaced, setReplaced] = useState(false);
  const oldUserId = useAppSelector((state) => state.user.userId);

  useEffect(() => {
    if (userId !== '') {
      if (oldUserId !== userId) dispatch(setUserId(userId));
    }

    if (!replaced) {
      setReplaced(true);
      router.replace('/market', undefined, { shallow: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return <></>;
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};
