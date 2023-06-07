import React from 'react';
import styled from 'styled-components/native';
import {SkypeIndicator} from 'react-native-indicators';
import {useTypedSelector} from '../hooks/useTypedSelector';

const AppLoader = () => {
  return (
    <MainParentWrapper>
      <OverLay background={'#fff'}></OverLay>
      <SkypeIndicator color={'black'}></SkypeIndicator>
    </MainParentWrapper>
  );
};

export default AppLoader;

type ModeProps = {
  background: string;
};

const MainParentWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;
`;
const OverLay = styled.View<ModeProps>`
  background: ${({background}: any) => background};
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
