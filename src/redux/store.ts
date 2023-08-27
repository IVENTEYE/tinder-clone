import { genderSlice } from "./slices/genderSlice";
import { profilesSlice } from "./slices/profilesSlice";
import { filterSlice } from "./slices/filterSlice"

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer: {
        gender: genderSlice.reducer,
        profiles: profilesSlice.reducer,
        filters: filterSlice.reducer,
    }
});

export type TypeRootState = ReturnType<typeof store.getState>