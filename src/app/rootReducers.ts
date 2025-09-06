import { combineReducers } from "@reduxjs/toolkit";
import planetsReducer from "@home/slice/planetsSlice";
import peopleReducer from "@home/slice/peopleSlice";

export const rootReducer = combineReducers({
  planets: planetsReducer,
  people: peopleReducer,
});
