import {Dispatch} from 'redux';
import {ActionType} from '@root/store/login/actions-types';
import {Action} from '@root/store/login/actions';
import {apiUri} from '@root/service/apiEndPoints';
import service from '@root/service/axios';
import {setAuthInitalToken} from '../../../service/axios';
import {storeData} from 'storage';
import {LoginResponseInterface} from '../interface';
import {storageConstants} from '../../../storage/storage-constants';
/**
 * @param fn
 */
export const login = (data: any) => {
  console.log('DATA ', JSON.stringify(data));
  return async (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.LOGIN_INIT,
    });
    try {
      const response = await service.post(apiUri.auth.login, data);
      console.log('respo ', JSON.stringify(response));
      setAuthInitalToken(response.data.accessToken);
      await storeData(storageConstants.token, response.data.accessToken);
      dispatch({
        type: ActionType.LOGIN_GET_SUCCESS,
        payload: response.data,
      });
      console.log(JSON.stringify(response));
      return response;
    } catch (e: any) {
      console.log('err ==> ', JSON.stringify(e));
      dispatch({
        type: ActionType.LOGIN_GET_FAILED,
        payload: 'Something went wrong! Please try again later',
      });
    }
  };
};
/*
 */
