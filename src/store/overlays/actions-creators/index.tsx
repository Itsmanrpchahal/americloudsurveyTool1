import {Dispatch} from 'redux';
import {ActionType} from '@root/store/overlays/actions-types';
import {Action} from '@root/store/overlays/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const getOverlays = (data: any) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.OVERLAYS_INIT,
    });
    try {
      const response = await service.get(apiUri.auth.overlays);
      // console.log(JSON.stringify('test' + response));

      dispatch({
        type: ActionType.OVERLAYS_GET_SUCCESS,
        payload: response.data,
      });

      return response;
    } catch (e: any) {
      dispatch({
        type: ActionType.OVERLAYS_GET_FAILED,
        payload: 'Something went wrong! Please try again later',
      });
    }
  };
};
/*
 */
