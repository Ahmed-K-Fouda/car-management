import { createSlice } from "@reduxjs/toolkit";
import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from "../utils/localStorage";

// create car slice to manage states
const carSlice = createSlice({
  name: "cars",
  // to get data if exist
  initialState: getDataFromLocalStorage(),
  reducers: {
    // add new car
    addNewCar(state, action) {
      state.push(action.payload);

      saveDataToLocalStorage(state);
    },
    // update car
    updateCar(state, action) {
      const { index, updateCar } = action.payload;
      state[index] = updateCar;
      saveDataToLocalStorage(state);
    },

    // delete car
    deleteCar(state, action) {
      const newState = state.filter((_, i) => !action.payload.includes(i));
      saveDataToLocalStorage(newState);
      return newState;
    },
  },
});

export const { addNewCar, updateCar, deleteCar } = carSlice.actions;
export default carSlice.reducer;
