import {ActionType} from '@root/store/overlays/actions-types';

interface OverlaysInit {
  type: ActionType.OVERLAYS_INIT;
}

interface OverlaysSuccessAction {
  type: ActionType.OVERLAYS_GET_SUCCESS;
  payload: number;
}

interface OverlaysErrorAction {
  type: ActionType.OVERLAYS_GET_FAILED;
  payload: string;
}

export type Action = OverlaysInit | OverlaysSuccessAction | OverlaysErrorAction;
