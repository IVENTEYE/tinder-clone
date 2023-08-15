import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    gender: '',
};

export const genderSlice = createSlice({
    name: 'gender',
    initialState,
    reducers: {
        setGender: (state, action: PayloadAction<string>) => {
            state.gender = action.payload;
        }
    }
});