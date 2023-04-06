/** @jsxImportSource @emotion/react */
import Head from 'next/head';
import React from 'react';
import styled from '@emotion/styled';
import theme from '../../commons/theme';
import { useRouter } from 'next/router';
import ViewerNav from '../nav/viewer';
import FooterNav from '../nav/footer';
export const siteTitle = 'MZ Platform';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  background-color: #e9ecef;
  margin: 0 auto;
  padding-bottom: ${theme.metrics.m4};
`;

interface Props {
  children: React.ReactNode;
  title: string;
}

export default function ViewerLayout({ children, title }: Props) {
  const router = useRouter();
  //@ts-ignore

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="MZ Platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ViewerNav title={title} />
      <Wrapper>{children}</Wrapper>
      <FooterNav value={'learn'} />
    </>
  );
}
