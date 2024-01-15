// No arquivo carSlice.ts (ou algo similar)

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store/configureStore';
import axios from 'axios';

interface FipeData {
  brands: string;
  models: string;
  years: string;
}

interface CarState {
  data: FipeData | null;
}

const initialState: CarState = {
  data: null,
  // ... outras propriedades do estado, se houver
};

const carSlice = createSlice({
  name: 'car',
  initialState,
  reducers: {
    setCarData: (state, action: PayloadAction<FipeData>) => {
      console.log('Reducer setCarData:', action.payload);
      state.data = action.payload;
    },
  },
});

export const { setCarData } = carSlice.actions;
export default carSlice.reducer;

export const fetchCarData = (apiUrl: any): AppThunk => async (dispatch) => {
  try {
    const response = await axios.get<FipeData>(apiUrl);
    const carData = response.data;
    console.log('Car data:', carData);
    dispatch(setCarData(carData));
  } catch (error) {
    console.error('Error fetching car data:', error);
  }
};

