import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { useMemo } from 'react';
import { genderSlice } from '@/redux/slices/genderSlice';
import { profilesSlice } from '@/redux/slices/profilesSlice';

const AllActions = {
    ...genderSlice.actions,
    ...profilesSlice.actions,
}

const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() => bindActionCreators(AllActions, dispatch), [dispatch])
    // bindActionCreators(genderSlice.actions, dispatch), [dispatch]
}

export default useActions;