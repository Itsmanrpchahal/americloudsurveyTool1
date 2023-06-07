import React, {useState} from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import {withTheme} from 'styled-components';
import {curve} from '../../assets';
import TextField from '../../components/textField';
import Button from '../../components/button';
import navigationStrings from '../../navigation/index';
import {Formik} from 'formik';
import Buttonprimary from '../../components/buttonprimary';
import {View, KeyboardAvoidingView, ScrollView} from 'react-native';
import {NEW_PROJECT_SCHEMA} from './helpers';
import {Platform} from 'react-native';
// @ts-ignore
const NewProjectScreen = ({navigation}) => {
  const [title, setTitle] = useState();
  // @ts-ignore
  // @ts-ignore
  return (
    <MainWrapper>
      <View>
        <ParentWrapper>
          <ImageCurveView>
            <ImageCurve source={curve} />
          </ImageCurveView>
        </ParentWrapper>

        <ContentWrapper>
          <TitleText>New Project</TitleText>
          <TextWrapper>
            <Formik
              validationSchema={NEW_PROJECT_SCHEMA}
              initialValues={{
                title: '',
                venueTitle: '',
                survey: '',
              }}
              onSubmit={values => {
                navigation.navigate(navigationStrings.ADD_FRAME);
              }}>
              {({setFieldValue, handleSubmit, errors}) => (
                <View style={{width: '100%', alignItems: 'center'}}>
                  <TextWrapper>
                    <TextField
                      placeholder="Project Title"
                      keyboardType={'default'}
                      autoCapitalize={'none'}
                      onChangeText={(value: any) =>
                        setFieldValue('title', value)
                      }
                      error={errors ? errors.title : null}
                    />

                    <TextField
                      placeholder="Venue Title"
                      keyboardType={'default'}
                      autoCapitalize={'none'}
                      onChangeText={(value: any) =>
                        setFieldValue('venueTitle', value)
                      }
                      error={errors ? errors.venueTitle : null}
                    />

                    <TextField
                      placeholder="Survey Conducted By"
                      keyboardType={'default'}
                      autoCapitalize={'none'}
                      onChangeText={(value: any) =>
                        setFieldValue('survey', value)
                      }
                      error={errors ? errors.survey : null}
                    />
                  </TextWrapper>

                  <HorizontalWrapper>
                    <ButtonWrapper>
                      <Button
                        btnText={'Back'}
                        onPress={() => {
                          navigation.navigate(navigationStrings.LANDING_PAGE);
                        }}
                      />
                    </ButtonWrapper>
                    <ButtonWrapper>
                      <Buttonprimary btnText={'Next'} onPress={handleSubmit} />
                    </ButtonWrapper>
                  </HorizontalWrapper>
                </View>
              )}
            </Formik>
          </TextWrapper>
        </ContentWrapper>
      </View>
    </MainWrapper>
  );
};

// @ts-ignore
export default withTheme(NewProjectScreen);

// @ts-ignore
const ButtonWrapper = styled.View`
  margin-top: 60px;
  margin-left: 16px;
  margin-right: 16px;
`;

const HorizontalWrapper = styled.View`
  flex-direction: row;
`;

const TextWrapper = styled.View`
  margin-top: 40px;
  width: 100%;
  align-items: center;
`;
const TitleText = styled.Text`
  color: ${({theme}: any) => theme.colors.textBlack};
  font-size: 34px;
  font-weight: bold;
`;

const ContentWrapper = styled.View`
  position: absolute;
  left: 10px;
  height: 100%;
  width: 100%;
  align-items: center;
  top: 40px;
`;

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
