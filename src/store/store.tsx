import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import reducers from './rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import {persistStore, persistReducer} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['loginData', 'overlaysData', 'toolsData', 'imagesData'],
};

const middlewares = [thunk];

const persistedReducer = persistReducer(persistConfig, reducers);
let store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

let persistor = persistStore(store);

export {store, persistor};
