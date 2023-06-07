import React, {useEffect, useState} from 'react';
// @ts-ignore
import styled, {withTheme} from 'styled-components';
import {camera, arrowUp, curve, downarrow} from '../../assets';
import {
  FlatList,
  View,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import Button from '../../components/button';
import navigationStrings from '../../navigation/index';
import Buttonprimary from '../../components/buttonprimary';
import {useActions} from '@root/hooks/useActions';
import {useTypedSelector} from '@root/hooks/useTypedSelector';
import AppLoader from '../../utils/Apploader';
import Collapsible from 'react-native-collapsible';
import {useNetInfo} from '@react-native-community/netinfo';
import {navigationRef} from '../../navigation/RootNavigation';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {PanResponder} from 'react-native';
import {
  Canvas,
  Path,
  Skia,
  ImageSVG,
  RoundedRect,
} from '@shopify/react-native-skia';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {useTheme} from 'styled-components/native';

interface IPath {
  segments: String[];
  color?: string;
}

interface ICircle {
  x: number;
  y: number;
}

interface IHeightWidth {
  width: number;
  height: number;
}

interface IStamp {
  x: number;
  y: number;
  color: string;
}

enum Tools {
  Pencil,
  Stamp,
  Shape,
}

// @ts-ignore
const EditProject = (props: any) => {
  const {width, height} = Dimensions.get('window');

  const paletteColors = ['red', 'green', 'blue', 'yellow'];

  const svgStar =
    '<svg class="star-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/2000/xlink" viewBox="0 0 200 200"><polygon id="star" fill="{{fillColor}}" points="100,0,129.38926261462365,59.54915028125263,195.10565162951536,69.09830056250526,147.55282581475768,115.45084971874736,158.77852522924732,180.90169943749473,100,150,41.2214747707527,180.90169943749476,52.447174185242325,115.45084971874738,4.894348370484636,69.09830056250527,70.61073738537632,59.549150281252636"></polygon></svg>';

  const [activePaletteColorIndex, setActivePaletteColorIndex] = useState(0);
  const [activeTool, setActiveTool] = useState<Tools>(Tools.Pencil);
  const [paths, setPaths] = useState<IPath[]>([]);
  const [circles, setCircles] = useState<ICircle>({
    x: 100,
    y: 100,
  });
  const [shapeStart, setShapeStart] = useState<ICircle>({
    x: 0,
    y: 0,
  });
  const [shapeWidhtHeight, setShapeWidthHeight] = useState<IHeightWidth>({
    width: 30,
    height: 20,
  });
  const [stamps, setStamps] = useState<IStamp[]>([]);

  // When Reanimated is installed, Gesture Handler will try to run on the UI thread
  // We can't do that here because we're accessing the component state, so we need set runOnJS(true)
  const pan = Gesture.Pan()
    .runOnJS(true)
    .onStart(g => {
      if (activeTool === Tools.Pencil) {
        const newPaths = [...paths];
        newPaths[paths.length] = {
          segments: [],
          color: paletteColors[activePaletteColorIndex],
        };
        newPaths[paths.length].segments.push(`M ${g.x} ${g.y}`);
        setPaths(newPaths);
      }
      if (activeTool === 1) {
        setShapeStart({
          x: g.x,
          y: g.y,
        });
      }
    })
    .onUpdate(g => {
      if (activeTool === Tools.Pencil) {
        const index = paths.length - 1;
        const newPaths = [...paths];
        if (newPaths?.[index]?.segments) {
          newPaths[index].segments.push(`L ${g.x} ${g.y}`);
          setPaths(newPaths);
        }
      }
      if (activeTool === 1) {
        setCircles({
          x: g.x,
          y: g.y,
        });

        setShapeWidthHeight({
          height: g.absoluteY - shapeStart.y,
          width: g.x - shapeStart.x,
        });
      }
    })
    .onTouchesUp(g => {
      if (activeTool === Tools.Pencil) {
        const newPaths = [...paths];
        setPaths(newPaths);
      }
      if (activeTool === 1) {
        console.log('end', circles.x - shapeStart.x);
        // setShapeWidthHeight({
        //   height: g.allTouches[0].absoluteY,
        //   width: circles.x - shapeStart.x,
        // });
        // console.log("start", shapeStart.x);
        console.log('touched up', g.allTouches);
      }
    })
    .minDistance(1);

  const clearCanvas = () => {
    setPaths([]);
    // setCircles([]);
    setStamps([]);
  };

  const paletteVisible = useSharedValue(false);
  const animatedPaletteStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(paletteVisible.value ? -275 : -100),
      height: withTiming(paletteVisible.value ? 200 : 50),
      opacity: withTiming(paletteVisible.value ? 100 : 0, {duration: 100}),
    };
  });

  const animatedSwatchStyle = useAnimatedStyle(() => {
    return {
      top: withSpring(paletteVisible.value ? -50 : 0),
      height: paletteVisible.value ? 0 : 50,
      opacity: withTiming(paletteVisible.value ? 0 : 100, {duration: 100}),
    };
  });

  const {getOverlays, getTools} = useActions();
  const [i, setI] = useState(0);
  const [iTools, setITools] = useState(-1);
  const netInfo = useNetInfo();
  const {overlaysData, overlaysLoading} = useTypedSelector(
    state => state.overlaysData,
  );
  const {toolsData, toolsLoading} = useTypedSelector(state => state.toolsData);
  const {colors}: any = useTheme();

  // @ts-ignore
  const [collapsedBlackSearch, setCollaspedBlackSearch] = useState(false);

  useEffect(() => {
    if (netInfo.isInternetReachable === true) {
      Promise.all[(getOverlays(), getTools())];
    }
  }, [netInfo]);

  // @ts-ignore
  // @ts-ignore
  return (
    <MainWrapper>
      {overlaysLoading || toolsLoading ? <AppLoader></AppLoader> : null}
      <ImageCurveView>
        <ImageCurve source={curve} />
      </ImageCurveView>
      <ChildWrapper>
        <ParentWrapper>
          <ContentWrapper>
            <HorizontalWrapper>
              <RelativeRole>
                <ViewWrapper />
                <HeaderLeftText>Overlays</HeaderLeftText>
              </RelativeRole>
            </HorizontalWrapper>

            <ListWrapper>
              <FlatList
                style={{height: '60%'}}
                data={overlaysData && overlaysData}
                renderItem={({item, index}) => {
                  // @ts-ignore
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setI(index);
                      }}>
                      <View>
                        <ListDataWrapper
                          backgroundColor={
                            i === index ? colors.themeColor : colors.darkGary
                          }>
                          <ItemText>{item.title}</ItemText>
                        </ListDataWrapper>
                        <LineWrapper />
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </ListWrapper>
          </ContentWrapper>

          <ContentWrapper1>
            <HorizontalWrapper>
              <RelativeRole>
                <ViewWrapper />
                <HeaderLeftText>Tools</HeaderLeftText>
              </RelativeRole>
            </HorizontalWrapper>

            <ListWrapper>
              <FlatList
                style={{height: '60%'}}
                data={toolsData && toolsData}
                renderItem={({item, index}) => {
                  // @ts-ignore
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setITools(index);
                      }}>
                      <View>
                        <ListDataWrapper
                          backgroundColor={
                            iTools === index
                              ? colors.themeColor
                              : colors.darkGary
                          }>
                          <HorizontalItemWrapper>
                            <ItemText>{item.title}</ItemText>
                            <IconImage
                              source={
                                iTools === index ? arrowUp : downarrow
                              }></IconImage>
                          </HorizontalItemWrapper>
                        </ListDataWrapper>
                        <LineWrapper />
                        {iTools === index ? (
                          <Collapsible collapsed={collapsedBlackSearch}>
                            <FlatList
                              data={item.layers}
                              renderItem={({item, index}) => {
                                return (
                                  <TouchableOpacity
                                    onPress={() => {
                                      // setActiveTool(Tools.Pencil);
                                      {
                                        item.title === 'Concrite'
                                          ? setActiveTool(Tools.Pencil)
                                          : setActiveTool(Tools.Stamp);
                                      }
                                    }}>
                                    <View>
                                      <ListDataWrapper
                                        backgroundColor={colors.darkGary}>
                                        <ItemText>{item.title}</ItemText>
                                      </ListDataWrapper>
                                      <LineWrapper />
                                    </View>
                                  </TouchableOpacity>
                                );
                              }}></FlatList>
                          </Collapsible>
                        ) : null}
                      </View>
                    </TouchableOpacity>
                  );
                }}
              />
            </ListWrapper>
          </ContentWrapper1>
        </ParentWrapper>

        <ParentRightWrapper>
          <HeaderRightText>Ground Floor Map South </HeaderRightText>

          <ImageMain>
            <ImagesWrapper
              source={{uri: props.route.params.item}}></ImagesWrapper>
            <ImagesRole>
              <GestureDetector gesture={pan}>
                <Canvas
                  style={{
                    width: '100%',
                    height: '100%',
                  }}>
                  {/* {activeTool === Tools.Pencil && ( */}

                  {paths.map((p, index) => {
                    return (
                      <Path
                        key={index}
                        path={p.segments.join(' ')}
                        strokeWidth={5}
                        style="stroke"
                        color={p.color}
                      />
                    );
                  })}

                  <RoundedRect
                    x={shapeStart.x}
                    y={shapeStart.y}
                    width={shapeWidhtHeight.width}
                    height={shapeWidhtHeight.height}
                    r={0}
                    color="lightblue"
                  />
                </Canvas>
              </GestureDetector>
            </ImagesRole>
          </ImageMain>
          <ButtonMainWrapper>
            <ButtonWrapper>
              <Button
                btnText={'Change Project'}
                onPress={() => {
                  navigationRef.current.navigate(navigationStrings.ADD_FRAME);
                }}
              />
            </ButtonWrapper>
            <ButtonWrapper>
              <Buttonprimary
                btnText={'SAVE and Close'}
                onPress={() => {
                  // navigation.navigate(navigationStrings.EDIT_PROJECT);
                }}
              />
            </ButtonWrapper>
          </ButtonMainWrapper>
        </ParentRightWrapper>
      </ChildWrapper>
    </MainWrapper>
  );
};

export default withTheme(EditProject);

type ColorProps = {
  backgroundColor: string;
};

const IconImage = styled.Image`
  margin: 10px;
  height: 18px;
  width: 18px;
`;

const HorizontalItemWrapper = styled.View`
  justify-content: space-between;
  width:100%
  flex-direction: row;
`;

// @ts-ignore
const ButtonWrapper = styled.View`
  margin-top: 60px;
  margin-left: 16px;
  margin-right: 16px;
`;
const ButtonMainWrapper = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  align-content: flex-end;
`;

const ImagesWrapper = styled.Image`
  width: 100%;
  height: 100%;
  right: 20px;
  margin-top: 16px;
  background-color: ${({theme}: any) => theme.colors.primary};
  border: 1px;
  border-radius: 5px;
  border-color: ${({theme}: any) => theme.colors.darkGary};
`;

const ImagesRole = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 15px;
  left: -19px;
  border-radius: 5px;
`;

const ImageMain = styled.View`
  position: relative;
  height: 70%;
  margin-right: 20px;
  border-radius: 10px;
`;
const ParentRightWrapper = styled.View`
  width: 70%;
  height: 100%;
  top: 40px;
  margin-right: 16px;
  flex-direction: column;
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

const HeaderLeftText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-left: 16px;
  margin-top: 16px;
  color: ${({theme}: any) => theme.colors.textBlack};
`;

const HeaderRightText = styled.Text`
  margin-right: 16px;
  margin-top: 16px;
  font-weight: bold;
  font-size: 20px;
  color: ${({theme}: any) => theme.colors.textBlack};
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

const RelativeRole = styled.View`
  position: relative;
  //width: 30%;
`;

const ListWrapper = styled.View`
  width: 70%;
  margin-left: 16px;
  margin-top: 16px;
  height: 60%;
  overflow: hidden;
  border-radius: 20px;
  background-color: ${({theme}: any) => theme.colors.darkGary};
`;

const HorizontalWrapper = styled.View`
  flex-direction: row;
  width: 100%;
`;

const ContentWrapper1 = styled.View`
  position: absolute;
  margin-left: 10px;
  height: 60%;
  margin-right: 10px;
  width: 100%;
  top: 50%;
`;
const ContentWrapper = styled.View`
  margin-left: 10px;
  height: 60%;
  top: 40px;
`;

const ImageCurve = styled.Image`
  height: 100%;
`;

const ImageCurveView = styled.View`
  width: 50%;
`;

const ParentWrapper = styled.View`
  width: 30%;
`;

const ChildWrapper = styled.View`
  flex-direction: row;
  width: 100%;
  height: 100%;
  position: absolute;
`;
const MainWrapper = styled.View`
  position: relative;
  background-color: ${({theme}: any) => theme.colors.primary};
  height: 100%;
`;
