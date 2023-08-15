import { genderSlice } from "./slices/genderSlice";
import { profilesSlice } from "./slices/profilesSlice";

const { configureStore } = require("@reduxjs/toolkit");

export const store = configureStore({
    reducer: {
        gender: genderSlice.reducer,
        profiles: profilesSlice.reducer,
    }
});

export type TypeRootState = ReturnType<typeof store.getState>