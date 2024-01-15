// src/redux/reducers/carReducer.ts
import { createReducer } from '@reduxjs/toolkit';
import { setCarData } from '../actions/carActions';

export interface FipeData {
  brand: string;
  models: string;
  years: string;
}

export interface CarState {
  data: FipeData | null;
}

const initialState: CarState = {
  data: null,
};

const carReducer = createReducer(initialState, (builder) => {
  builder.addCase(setCarData, (state, action) => {
    if (state.data) {
      state.data.brand = action.payload.brands;
      state.data.models = action.payload.models;
      state.data.years = action.payload.years;
    }
  });
});

export default carReducer;
