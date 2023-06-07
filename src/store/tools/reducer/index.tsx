import {produce} from 'immer';
import {Action} from '@root/store/tools/actions';
import {ActionType} from '@root/store/tools/actions-types';

interface RepositoriesStateInterface {
  toolsLoading: boolean;
  error: string | null;
  toolsData: any;
}

const initialState = {
  toolsLoading: false,
  error: null,
  toolsData: [],
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
      case ActionType.TOOLS_INIT:
        draft.toolsLoading = true;
        draft.error = null;
        draft.toolsData = [];
        return draft;
      case ActionType.TOOLS_GET_SUCCESS:
        draft.toolsLoading = false;
        draft.error = null;

        draft.toolsData = action.payload;
        return draft;
      case ActionType.TOOLS_GET_FAILED:
        draft.toolsLoading = false;
        draft.error = action.payload;
        draft.toolsData = action.payload;
        return draft;
      default:
        return draft;
    }
  });

export default reducer;
