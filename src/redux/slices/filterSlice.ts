import { PayloadAction, createSlice } from "@reduxjs/toolkit"


const initialState = {
    city: 'омск',
    age: 34
}

export const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCity(state, action: PayloadAction<string>) {
            state.city = action.payload.toLowerCase();
        },
        setFilterAge(state, action: PayloadAction<number[]>) {
            state.age = action.payload[0];
        }
    }
});