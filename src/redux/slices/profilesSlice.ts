import { ICard } from "@/components/Card";
import { createSlice, PayloadAction, createAsyncThunk, AsyncThunk } from "@reduxjs/toolkit";

interface IInitState {
    profiles: any;
    filtredProfiles: any[];
    checkedProfiles: number[];
    favoriteProfiles: any[];
    cardIndex: number;
    loading: boolean;
}

const initialState: IInitState = {
    profiles: [],
    filtredProfiles: [],
    checkedProfiles: [],
    favoriteProfiles: [],
    cardIndex: 0,
    loading: false,
};

const API_TOKEN = "vk1.a.y30RJW4lLwULuxNr4iujQdWHqj9Aci7nxWDrDUiPKKaaHuh7a4RIcrjPsxAT0VMuqbgmBmgKqleRxnTBTLF_cgB6axhMl27Cz_R82hvox474QjtgCGhUYKvKXCUYsbPsy46177-wwotEMK4IzaDVP8R4XCvVb23-I8EgNpaUWeIdtBiy6z9wYOxtemjOEYso067PIkw3rc2D4QaJ1BR5Vw";

export const fetchProfiles = createAsyncThunk<ICard[], number>('profiles/fetchProfiles', async (offset: number) => {
    const response = await fetch(
        `https://api.vk.com/method/groups.getMembers?group_id=91050183&offset=${offset}&fields=sex,city,photo_max_orig,screen_name,bdate&access_token=${API_TOKEN}&v=5.84`,
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return data.response.items;
        });

    return response;
});

export const profilesSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<[]>) {
            state.profiles = action.payload;
        },
        setFilter(state, action: PayloadAction<[]>) {
            // if (state.checkedProfiles.length > 0) {
            //     for (let i = 0; i < state.checkedProfiles.length; i++) {
            //         state.filtredProfiles = action.payload.filter((profile: ICard) => profile.id !== state.checkedProfiles[i]);
            //     }
            // } else {
            //     state.filtredProfiles = action.payload;
            // }
            state.filtredProfiles = action.payload;
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
    },
    extraReducers: builder => {
        builder
            .addCase(fetchProfiles.pending, (state) => {
                state.loading = true;

            })
            .addCase(fetchProfiles.fulfilled, (state, action) => {
                state.profiles = action.payload.sort(() => Math.random() - 0.5);
                state.loading = false;
            })
    }
});