import {Dispatch} from 'redux';
import {ActionType} from '@root/store/tools/actions-types';
import {Action} from '@root/store/tools/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';

/**
 * @param fn
 */
export const getTools = (data: any) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.TOOLS_INIT,
    });
    try {
      const response = await service.get(apiUri.auth.tools);
      console.log('Data ==> ', JSON.stringify(response.data));
      dispatch({
        type: ActionType.TOOLS_GET_SUCCESS,
        payload: response.data,
      });

      return response;
    } catch (e: any) {
      dispatch({
        type: ActionType.TOOLS_GET_FAILED,
        payload: 'Something went wrong! Please try again later',
      });
    }
  };
};
/*
 */
