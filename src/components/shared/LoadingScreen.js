import React from 'react';
import { LogoLoadingIcon } from '../../icons';
import loading from '../../images/loading.gif';
import styled from 'styled-components';

function LoadingScreen() {
  return (
    <div className='container mx-auto'>
      <LogoLoadingIcon />
    </div>
  );
}

export const LoadingBigIcon = () => {
  return (
    <LoadingBigIconStyles>
      <div className='icon-wrapper'>
        <img className='rounded-full w-16 ' src={loading} alt='Loading...' />
      </div>
    </LoadingBigIconStyles>
  );
};

export default LoadingScreen;

const LoadingBigIconStyles = styled.div`
  .icon-wraper {
    position: absolute;
    top: 50%;
    left: 50%;
  }
`;
