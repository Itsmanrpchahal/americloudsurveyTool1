import {produce} from 'immer';
import {Action} from '@root/store/login/actions';
import {ActionType} from '@root/store/login/actions-types';

interface RepositoriesStateInterface {
  loginLoading: boolean;
  error: string | null;
  loginData: any;
}

const initialState = {
  loginLoading: false,
  error: null,
  loginData: {},
};

/**
 * @param state
 * @param action
 */
const reducer = (
  state: RepositoriesStateInterface = initialState,
  action: Action,
): RepositoriesStateInterface =>
  produce(state, draft => {
    switch (action.type) {
      case ActionType.LOGIN_INIT:
        draft.loginLoading = true;
        draft.error = null;
        draft.loginData = {};
        return draft;
      case ActionType.LOGIN_GET_SUCCESS:
        draft.loginLoading = false;
        draft.error = null;

        draft.loginData = action.payload;
        return draft;
      case ActionType.LOGIN_GET_FAILED:
        draft.loginLoading = false;
        draft.error = action.payload;
        draft.loginData = action.payload;
        return draft;
      default:
        return draft;
    }
  });

export default reducer;
