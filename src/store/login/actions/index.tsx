import {ActionType} from '@root/store/login/actions-types';

interface LoginInit {
  type: ActionType.LOGIN_INIT;
}

interface LoginSuccessAction {
  type: ActionType.LOGIN_GET_SUCCESS;
  payload: number;
}

interface LoginErrorAction {
  type: ActionType.LOGIN_GET_FAILED;
  payload: string;
}

export type Action = LoginInit | LoginSuccessAction | LoginErrorAction;
