
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import carReducer from '../reducers/carReducer'; 


export interface RootState {
  car: {
    data: FipeData | null; 
  };
}

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

interface FipeData {
  brands: string;
  models: string;
  years: string;
}

const store = configureStore({
  reducer: {
    car: carReducer,
  },
});

export default store;
