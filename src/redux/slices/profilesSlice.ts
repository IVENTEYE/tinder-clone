import { ICard } from "@/components/Card";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface IInitState {
    profiles: any;
    filtredProfiles: any[];
    checkedProfiles: number[];
    favoriteProfiles: any[];
    cardIndex: number;
}

const initialState: IInitState = {
    profiles: [],
    filtredProfiles: [],
    checkedProfiles: [],
    favoriteProfiles: [],
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
            if (state.checkedProfiles.length > 0) {
                for (let i = 0; i < state.checkedProfiles.length; i++) {
                    state.filtredProfiles = action.payload.filter((profile: ICard) => profile.id !== state.checkedProfiles[i]);
                }
            } else {
                state.filtredProfiles = action.payload;
            }
        },
        setIndex(state, action: PayloadAction<number>) {
            state.cardIndex = action.payload;
        },
        setCheck(state, action: PayloadAction<number>) {
            state.checkedProfiles.push(action.payload);
        },
        setFavorites(state, action: PayloadAction<[]>) {
            state.favoriteProfiles.push(action.payload);
        },
        loadFavorites(state, action: PayloadAction<{}[]>) {
            state.favoriteProfiles = action.payload;
        },
        filterFavorites(state, action) {
            state.favoriteProfiles = state.favoriteProfiles.filter((item: ICard) => item.id !== action.payload);
        },
    }
});