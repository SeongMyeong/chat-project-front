/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import styled from 'styled-components';
import { ClassicSpinner } from 'react-spinners-kit';

type LoadingProps = {
  loading: boolean;
  size: number;
  color: string;
};

const St = {
  LoadingWrapper: styled.div`
    width: 100%;
    height: 100%;
  `,
  Loading: styled.div`
    display: flex;
    justify-content: center;
  `
};
const Loading = ({ loading, size = 30, color = '#686769' }: LoadingProps) => {
  return (
    <St.LoadingWrapper>
      <St.Loading>
        <ClassicSpinner size={size} color={color} loading={loading} />
      </St.Loading>
    </St.LoadingWrapper>
  );
};

export default Loading;
