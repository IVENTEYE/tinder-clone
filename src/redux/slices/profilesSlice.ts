import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    profiles: [],
    filtredProfiles: [],
    checkedProfiles: [],
    cardIndex: 0,
};

export const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<[]>) {
            state.profiles = action.payload;
        },
        setFilter(state, action: PayloadAction<[]>) {
            state.filtredProfiles = action.payload;
        },
        setIndex(state, action: PayloadAction<number>) {
            state.cardIndex = action.payload;
        },
        // setCheck(state, action: PayloadAction) {
        //     state.checkedProfiles.push(action.payload);
        // }
    }
});