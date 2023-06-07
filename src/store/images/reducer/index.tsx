import {produce} from 'immer';
import {Action} from '@root/store/images/actions';
import {ActionType} from '@root/store/images/actions-types';

interface RepositoriesStateInterface {
  imagesLoading: boolean;
  error: string | null;
  imagesData: any;
}

const initialState = {
  imagesLoading: false,
  error: null,
  imagesData: [],
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
      case ActionType.IMAGES_INIT:
        draft.imagesLoading = true;
        draft.error = null;
        return draft;
      case ActionType.IMAGES_GET_SUCCESS:
        draft.imagesLoading = false;
        draft.imagesData.push(action.payload);
        draft.error = null;

        return draft;
      case ActionType.IMAGES_GET_FAILED:
        draft.imagesLoading = false;
        draft.error = action.payload;
        draft.imagesData = [];
        // draft.imagesData = action.payload;
        return draft;
      default:
        return draft;
    }
  });

export default reducer;
