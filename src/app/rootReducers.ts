import { combineReducers } from "@reduxjs/toolkit";
import planetsReducer from "@home/slice/planetsSlice";

export const rootReducer = combineReducers({
  planets: planetsReducer,
});
