import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {navigationRef} from '../navigation/RootNavigation';
import StackScreen from '../stackScreen';

type RouteProps = {
  scheme: any;
};

const Routes: React.FC<RouteProps> = ({scheme}) => {
  return (
    <NavigationContainer ref={navigationRef} theme={scheme}>
      <StackScreen />
    </NavigationContainer>
  );
};
export default Routes;
