import {LogBox} from 'react-native';
import React from 'react';
import {ThemeProvider} from 'styled-components';
import {navigationTheme} from './src/theme/theme';
import Routes from './src/navigation/Routes';
import {useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import {store} from '@root/store/store';

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const App = () => {
  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();

  const colorScheme = useColorScheme();
  return (
    <ThemeProvider theme={navigationTheme.light}>
      <Routes
        scheme={
          colorScheme === 'light'
            ? navigationTheme.light
            : navigationTheme.light
        }
      />
    </ThemeProvider>
  );
};

export default AppWrapper;
