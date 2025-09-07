import { combineReducers } from "@reduxjs/toolkit";
import planetsReducer from "@home/slice/planetsSlice";
import peopleReducer from "@home/slice/peopleSlice";
import filmReducer from "@home/slice/filmSlice";
import starshipReducer from "@home/slice/starshipSlice";

export const rootReducer = combineReducers({
  planets: planetsReducer,
  people: peopleReducer,
  films: filmReducer,
  starships: starshipReducer,
});
