import { TypeRootState } from '@/redux/store';
import { useSelector, TypedUseSelectorHook } from 'react-redux'

// Для типизации useSelector
export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector;