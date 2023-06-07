import {Dispatch} from 'redux';
import {ActionType} from '@root/store/images/actions-types';
import {Action} from '@root/store/images/actions';

/**
 * @param fn
 */
export const getImages = (fn: any) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.IMAGES_INIT,
    });

    try {
      dispatch({
        type: ActionType.IMAGES_GET_SUCCESS,
        payload: fn,
      });
      return fn;
    } catch (e: any) {
      dispatch({
        type: ActionType.IMAGES_GET_FAILED,
        payload: 'Something went wrong! Please try again later',
      });
    }
  };
};
/*
 */
