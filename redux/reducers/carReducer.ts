// src/redux/reducers/carReducer.ts
import { createReducer } from '@reduxjs/toolkit';
import { setCarData } from '../actions/carActions';

export interface FipeData {
  marca: string;
  modelo: string;
  ano: string;

}

export interface CarState {
  data: FipeData | null;

}

const initialState: CarState = {
  data: null,

};

const carReducer = createReducer(initialState, (builder) => {
  builder.addCase(setCarData, (state, action) => {
    state.data = action.payload;
  });

});

export default carReducer;
