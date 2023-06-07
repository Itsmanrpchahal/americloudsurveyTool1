import {ActionType} from '@root/store/tools/actions-types';

interface ToolsInit {
  type: ActionType.TOOLS_INIT;
}

interface ToolsSuccessAction {
  type: ActionType.TOOLS_GET_SUCCESS;
  payload: number;
}

interface ToolsErrorAction {
  type: ActionType.TOOLS_GET_FAILED;
  payload: string;
}

export type Action = ToolsInit | ToolsSuccessAction | ToolsErrorAction;
