import { combineReducers } from "@reduxjs/toolkit";
import personagesReducer from "./personagesSlice";
import favouriteReducer from "./favouriteSlice";

const rootReducer = combineReducers({
  personages: personagesReducer,
  favourite: favouriteReducer,
});

export default rootReducer;
