// @ts-ignore
import styled from 'styled-components/native';
import React, {useEffect} from 'react';
// @ts-ignore
import {Text} from 'react-native';
import {withTheme} from 'styled-components/native';
import {curve, vector} from '@root/assets';
import Button from '../../components/button';
import Buttonprimary from '@root/components/buttonprimary';
import navigationStrings from '../../navigation/index';
import {useActions} from '@root/hooks/useActions';
import {useTypedSelector} from '@root/hooks/useTypedSelector';
import AppLoader from '../../utils/Apploader';
import {useNetInfo} from '@react-native-community/netinfo';

// @ts-ignore
const LandingPage = ({navigation}) => {
  const {login, getOverlays} = useActions();
  const {loginData, loginLoading} = useTypedSelector(state => state.loginData);
  const {overlaysData, overlaysLoading} = useTypedSelector(
    state => state.overlaysData,
  );
  const netInfo = useNetInfo();

  useEffect(() => {
    if (netInfo.isInternetReachable === true) {
      login({
        email: 'preet@gmail.com',
        password: 'Admin@12345',
      });
    }
  }, [netInfo]);

  return (
    <MainWrapper>
      {loginLoading ? <AppLoader></AppLoader> : null}
      <ParentWrapper>
        <ImageCurveView>
          <ImageCurve source={curve} />
        </ImageCurveView>
        <ImageVectorView>
          <ImageVector source={vector} />
        </ImageVectorView>
      </ParentWrapper>
      <ContentWrapper>
        <TitleText>every contractor loves.</TitleText>
        <SubTitleText>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard.
        </SubTitleText>
        <HorizontalWrapper>
          <ButtonWrapper>
            <Button
              btnText={'Next'}
              onPress={() => {
                navigation.navigate(navigationStrings.NEW_PROJECT);
              }}
            />
          </ButtonWrapper>
          <ButtonWrapper>
            <Buttonprimary btnText={'Open Project'} onPress={() => {}} />
          </ButtonWrapper>
        </HorizontalWrapper>
      </ContentWrapper>
    </MainWrapper>
  );
};

export default withTheme(LandingPage);

// @ts-ignore
const ButtonWrapper = styled.View`
  margin-top: 60px;
  margin-left: 16px;
  margin-right: 16px;
`;

const HorizontalWrapper = styled.View`
  flex-direction: row;
`;

const SubTitleText = styled.Text`
  color: ${({theme}: any) => theme.colors.textBlack};
  font-size: 18px;
  margin-top: 16px;
`;

const TitleText = styled.Text`
  color: ${({theme}: any) => theme.colors.textWhite};
  font-size: 34px;
`;

const ContentWrapper = styled.View`
  position: absolute;
  top: 0px;
  left: 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  width: 40%;
`;

const ImageVector = styled.Image`
  margin-right: 20px;
`;

const ImageVectorView = styled.View``;

const ImageCurve = styled.Image`
  width: auto;
  height: 100%;
`;

const ImageCurveView = styled.View`
  width: 40%;
`;
const ParentWrapper = styled.View`
  flex-direction: row;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MainWrapper = styled.View`
  background-color: ${({theme}: any) => theme.colors.primary};
  width: 100%;
  position: relative;
`;
