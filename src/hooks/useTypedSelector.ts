import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {RootState} from '@root/store';

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
