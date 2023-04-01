import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
import { TPersonage } from "../types";
import { storeData } from "../utils";

export type TFavouriteState = {
  favourites: TPersonage[];
  genders: { male: number; female: number; other: number };
};

const initialState: TFavouriteState = {
  favourites: [],
  genders: { male: 0, female: 0, other: 0 },
};

const getGender = (payload: string) => {
  const gender =
    payload !== "male" && payload !== "female"
      ? "other"
      : (payload as "other" | "male" | "female");
  return gender;
};

export const favStorageKey = "favourites";

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<TPersonage>) => {
      state.favourites.push(action.payload);
      const gender = getGender(action.payload.gender);
      state.genders[gender]++;
      storeData(state, favStorageKey);
    },
    removeFavourite: (state, action: PayloadAction<TPersonage>) => {
      const name = action.payload.name;
      state.favourites = state.favourites.filter(
        (personage) => personage.name !== name
      );
      const gender = getGender(action.payload.gender);
      state.genders[gender]--;
      storeData(state, favStorageKey);
    },
    clearFavourite: (state, action: Action) => {
      state.favourites = [];
      state.genders = { male: 0, female: 0, other: 0 };
      storeData(state, favStorageKey);
    },
    initFavouriteState: (state, action: PayloadAction<TFavouriteState>) => {
      state.favourites = action.payload.favourites;
      state.genders = action.payload.genders;
    },
  },
});

export const {
  addFavourite,
  removeFavourite,
  clearFavourite,
  initFavouriteState,
} = favouriteSlice.actions;
export default favouriteSlice.reducer;
