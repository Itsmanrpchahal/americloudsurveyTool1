import React, {useEffect, useState} from 'react';
// @ts-ignore
import styled, {withTheme} from 'styled-components/native';
import {camera, curve, gallery} from '../../assets';
import {
  FlatList,
  Touchable,
  TouchableOpacity,
  View,
  Text,
  Image,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Button from '../../components/button';
import navigationStrings from '../../navigation';
import Buttonprimary from '../../components/buttonprimary';
import AwesomeAlert from 'react-native-awesome-alerts';
import ImagePickerPage from '../../components/ImagePicker';
import ImagePicker from 'react-native-image-crop-picker';
import {useTheme} from 'styled-components';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import {useActions} from '@root/hooks/useActions';

// @ts-ignore
const AddFrames = ({navigation}) => {
  const {getImages} = useActions();

  const {imagesData, imagesLoading} = useTypedSelector(
    state => state.imagesData,
  );

  const images = [];
  const [selectedImages, setSelectedImages] = useState<any>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [i, setI] = useState(0);
  const {colors}: any = useTheme();
  const [currentImage, setCurrentImage] = useState('');

  const showAlertMessage = () => {
    setShowAlert(true);
  };

  const hideAlertMessage = () => {
    setShowAlert(false);
  };

  const GalleryImages = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    })
      .then(response => {
        const selected = response.map(image => ({
          uri: image.path,
          width: image.width,
          height: image.height,
        }));
        setSelectedImages(selected);
        selected &&
          selected.map((item, index) => {
            return getImages(item.uri);
          });
      })
      .catch(error => {
        console.log('ImagePicker Error: ', error);
      });
  };

  useEffect(() => {}, [selectedImages]);

  useEffect(() => {
    setCurrentImage(imagesData[0]);
  }, [imagesData]);

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <MainWrapper>
      <ParentWrapper>
        <ImageCurveView>
          <ImageCurve source={curve} />
        </ImageCurveView>
      </ParentWrapper>
      <ContentWrapper>
        <TitleText>Project Name</TitleText>

        <HorizontalWrapper>
          <RelativeRole>
            <ViewWrapper />
            <HeaderLeftText>Select Image below</HeaderLeftText>
          </RelativeRole>
          <TouchableOpacity
            onPress={async () => {
              // We need to ask permission for Android only
              if (Platform.OS === 'android') {
                // Calling the permission function
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.CAMERA,
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                  // Permission Granted
                  GalleryImages();
                } else {
                  // Permission Denied
                  alert('CAMERA Permission Denied');
                }
              } else {
                GalleryImages();
              }
            }}>
            <HeaderRightText>Add More Images</HeaderRightText>
          </TouchableOpacity>
        </HorizontalWrapper>
        <HorizontalWrapper>
          <ListWrapper>
            <FlatList
              style={{height: '60%'}}
              data={imagesData}
              renderItem={({item, index}) => {
                // @ts-ignore
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setI(index);
                      setCurrentImage(item);
                    }}>
                    <View>
                      <ListDataWrapper
                        backgroundColor={
                          i === index ? colors.themeColor : colors.darkGary
                        }>
                        <ItemText numberOfLines={1}>{item}</ItemText>
                      </ListDataWrapper>
                      <LineWrapper />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </ListWrapper>
          {imagesData && imagesData.length > 0 && (
            <ImagesWrapper source={{uri: currentImage}}></ImagesWrapper>
          )}
        </HorizontalWrapper>

        <ButtonMainWrapper>
          <ButtonWrapper>
            <Button
              btnText={'Back'}
              onPress={() => {
                navigation.navigate(navigationStrings.NEW_PROJECT);
              }}
            />
          </ButtonWrapper>
          <ButtonWrapper>
            <Buttonprimary
              btnText={'Next'}
              onPress={() => {
                navigation.navigate(navigationStrings.EDIT_PROJECT, {
                  item: currentImage,
                });
              }}
            />
          </ButtonWrapper>
        </ButtonMainWrapper>
      </ContentWrapper>
    </MainWrapper>
  );
};

// @ts-ignore
export default withTheme(AddFrames);

// @ts-ignore

type ColorProps = {
  backgroundColor: string;
};

const ButtonWrapper = styled.View`
  margin-top: 60px;
  margin-left: 16px;
  margin-right: 16px;
`;

const ButtonMainWrapper = styled.View`
  flex-direction: row;
  margin-right: 16px;
  justify-content: flex-end;
  align-items: flex-end;
`;
const ImagesWrapper = styled.Image`
  width: 70%;
  height: 100%;
  margin-top: 16px;
  margin-left:20px
  margin-right:30px;
  background-color: ${({theme}: any) => theme.colors.primary};
  border: 2px;
  border-radius: 16px;
  border-color: ${({theme}: any) => theme.colors.darkGary};
`;

const RelativeRole = styled.View`
  position: relative;
`;
const ViewWrapper = styled.View`
  width: 40px;
  height: 40px;
  top: 8px;
  left: 4px;
  border-radius: 50px;
  position: absolute;
  background-color: ${({theme}: any) => theme.colors.themeColor};
`;

const LineWrapper = styled.View`
  height: 1px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: ${({theme}: any) => theme.colors.primary};
`;
const ItemText = styled.Text`
  padding: 10px;
  color: ${({theme}: any) => theme.colors.textBlack};
  margin-left: 10px;
  margin-right: 10px;
`;
const ListDataWrapper = styled.View<ColorProps>`
  flex-direction: row;
  background-color: ${({backgroundColor}: any) => backgroundColor};
`;
const ListWrapper = styled.View`
  width: 20%;
  height: 100%;
  margin-left: 16px;
  margin-top: 16px;
  overflow: hidden;
  border-radius: 20px;
  background-color: ${({theme}: any) => theme.colors.darkGary};
`;

const HeaderRightText = styled.Text`
  margin-right: 16px;
  margin-top: 16px;
  font-weight: bold;
  font-size: 14px;
  text-decoration: underline;
  color: ${({theme}: any) => theme.colors.textBlack};
`;

const HeaderLeftText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-left: 16px;
  margin-top: 16px;
  color: ${({theme}: any) => theme.colors.textBlack};
`;

const HorizontalWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
`;

const TitleText = styled.Text`
  color: ${({theme}: any) => theme.colors.textBlack};
  font-size: 34px;
  font-weight: bold;
  text-align: center;
`;

const ContentWrapper = styled.View`
  position: absolute;
  margin-left: 10px;
  margin-right: 10px;
  height: 100%;
  width: 100%;
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
  height: 100%;
`;
