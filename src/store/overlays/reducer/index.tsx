import {produce} from 'immer';
import {Action} from '@root/store/overlays/actions';
import {ActionType} from '@root/store/overlays/actions-types';

interface RepositoriesStateInterface {
  overlaysLoading: boolean;
  error: string | null;
  overlaysData: any;
}

const initialState = {
  overlaysLoading: false,
  error: null,
  overlaysData: [],
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
      case ActionType.OVERLAYS_INIT:
        draft.overlaysLoading = true;
        draft.error = null;
        return draft;
      case ActionType.OVERLAYS_GET_SUCCESS:
        draft.overlaysLoading = false;
        draft.error = null;

        draft.overlaysData = action.payload;
        return draft;
      case ActionType.OVERLAYS_GET_FAILED:
        draft.overlaysLoading = false;
        draft.error = action.payload;
        draft.overlaysData = action.payload;
        return draft;
      default:
        return draft;
    }
  });

export default reducer;
