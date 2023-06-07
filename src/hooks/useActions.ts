import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {login, getOverlays, getTools, getImages} from '@root/store';

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(
    Object.assign({}, login, getOverlays, getTools, getImages),
    dispatch,
  );
};
