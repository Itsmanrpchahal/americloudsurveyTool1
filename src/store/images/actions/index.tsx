import {ActionType} from '@root/store/images/actions-types';

interface ImagesInit {
  type: ActionType.IMAGES_INIT;
}

interface ImagesSuccessAction {
  type: ActionType.IMAGES_GET_SUCCESS;
  payload: number;
}

interface ImagesErrorAction {
  type: ActionType.IMAGES_GET_FAILED;
  payload: string;
}

export type Action = ImagesInit | ImagesSuccessAction | ImagesErrorAction;
