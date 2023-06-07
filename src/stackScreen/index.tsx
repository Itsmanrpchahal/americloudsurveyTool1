import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LandingPage, NewProjectScreen, AddFrames} from '../screens';
import navigationStrings from '../navigation/index';
import EditProject from '../screens/editProject';

const StackScreen = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          headerStyle: {backgroundColor: '#252525'},
          headerTintColor: 'white',
        }}
        name={navigationStrings.LANDING_PAGE}
        component={LandingPage}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerStyle: {backgroundColor: '#252525'},
          headerTintColor: 'white',
        }}
        name={navigationStrings.NEW_PROJECT}
        component={NewProjectScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerStyle: {backgroundColor: '#252525'},
          headerTintColor: 'white',
        }}
        name={navigationStrings.ADD_FRAME}
        component={AddFrames}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          headerStyle: {backgroundColor: '#252525'},
          headerTintColor: 'white',
        }}
        name={navigationStrings.EDIT_PROJECT}
        component={EditProject}
      />
    </Stack.Navigator>
  );
};

export default StackScreen;
