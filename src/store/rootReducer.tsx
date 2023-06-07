import {combineReducers} from 'redux';
import loginData from '@root/store/login/reducer';
import overlaysData from '@root/store/overlays/reducer';
import toolsData from '@root/store/tools/reducer';
import imagesData from '@root/store/images/reducer';
const reducers = combineReducers({
  loginData,
  overlaysData,
  toolsData,
  imagesData,
});

export default reducers;
export type RootState = ReturnType<typeof reducers>;
