import { createSlice, PayloadAction, Action } from "@reduxjs/toolkit";
import { TPersonage } from "../types";

export type TFavouriteState = {
  favourites: TPersonage[];
  genders: { male: number; female: number; other: number };
};

//   const storeFromStorage = getFromSessionStorage("state");

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

const favouriteSlice = createSlice({
  name: "favourites",
  initialState: initialState,
  reducers: {
    addFavourite: (state, action: PayloadAction<TPersonage>) => {
      state.favourites.push(action.payload);
      const gender = getGender(action.payload.gender);
      state.genders[gender]++;
    },
    removeFavourite: (state, action: PayloadAction<TPersonage>) => {
      const name = action.payload.name;
      state.favourites = state.favourites.filter(
        (personage) => personage.name !== name
      );
      const gender = getGender(action.payload.gender);
      state.genders[gender]--;
    },
    clearFavourite: (state, action: Action) => {
      state.favourites = [];
      state.genders = { male: 0, female: 0, other: 0 };
    },
  },
  extraReducers(builder) {},
});

export const { addFavourite, removeFavourite, clearFavourite } =
  favouriteSlice.actions;
export default favouriteSlice.reducer;
