import { storeData } from "../utils";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  TPage,
  TPersonage,
  TPlanet,
  TSpecies,
  TFilms,
  TVehicles,
  TStarships,
} from "../types";

export const persStorageKey = "personages";

export type EntityThunkPayload = {
  type: "planets" | "vehicles" | "films" | "species" | "starships";
  link: string;
  data: TPlanet | TSpecies | TFilms | TVehicles | TStarships;
};

//a fetch function for similar fields to get
export const fetchAsyncEntity = createAsyncThunk(
  `personages/fetchAsyncEntity`,
  async ({
    type,
    link,
  }: {
    type: EntityThunkPayload["type"];
    link: EntityThunkPayload["link"];
  }) => {
    let response = await fetch(link);
    const data = response.json().then((data) => ({ data, type, link }));
    return data as Promise<EntityThunkPayload>;
  }
);

export const fetchAsyncPersonages = createAsyncThunk(
  "personages/fetchAsyncPersonages",
  async (link: string) => {
    let response = await fetch(link);
    const data = response.json();
    return data as Promise<TPage>;
  }
);

export type TPersonageState = {
  isLoading: boolean;
  personages: TPersonage[];
  planetsMap: { [link: string]: string };
  speciesMap: { [link: string]: string };
  filmsMap: { [link: string]: string };
  vehiclesMap: { [link: string]: string };
  starshipsMap: { [link: string]: string };
  searched: {
    results: TPersonage[];
    searchQuery: string;
  };
  page: { count: number; next: string | null; previous: string | null };
};

const initialState: TPersonageState = {
  isLoading: false,
  personages: [],
  planetsMap: {},
  speciesMap: {},
  filmsMap: {},
  vehiclesMap: {},
  starshipsMap: {},
  searched: {
    results: [],
    searchQuery: "",
  },
  page: { count: 0, next: "", previous: "" },
};

const personagesSlice = createSlice({
  name: "personages",
  initialState: initialState,
  reducers: {
    setSearched: (state, action: PayloadAction<string>) => {
      const results = state.personages.filter(({ name }) =>
        name.includes(action.payload)
      );

      state.searched = { searchQuery: action.payload, results };
    },
    initPersonageState: (state, action: PayloadAction<TPersonageState>) => {
      state = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchAsyncPersonages.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchAsyncPersonages.fulfilled,
      (state, action: PayloadAction<TPage>) => {
        const { results, count, previous, next } = action.payload;
        state.personages = results;
        state.page = { count, previous, next };
        state.isLoading = false;
        storeData(state, persStorageKey);
      }
    );
    builder.addCase(
      fetchAsyncEntity.fulfilled,
      (state, action: PayloadAction<EntityThunkPayload>) => {
        const { type, link, data } = action.payload;
        if (type === "films") {
          state.filmsMap[link] = (data as TFilms).title;
        } else {
          //adding data to fields with corresponding names
          state[`${type}Map`][link] = (
            data as TPlanet | TSpecies | TVehicles | TStarships
          ).name;
        }
        storeData(state, persStorageKey);
      }
    );
  },
});

export const { setSearched, initPersonageState } = personagesSlice.actions;
export default personagesSlice.reducer;
