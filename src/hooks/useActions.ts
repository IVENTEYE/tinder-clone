import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useMemo } from 'react';
import { genderSlice } from '@/redux/slices/genderSlice';
import { profilesSlice } from '@/redux/slices/profilesSlice';
import { filterSlice } from '@/redux/slices/filterSlice';

const AllActions = {
    ...genderSlice.actions,
    ...profilesSlice.actions,
    ...filterSlice.actions,
}

const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(AllActions, dispatch), [dispatch])
    // bindActionCreators(genderSlice.actions, dispatch), [dispatch]
}

export default useActions;