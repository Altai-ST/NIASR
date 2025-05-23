import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './language/languageSlice';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: {
    language: languageReducer,
     [apiSlice.reducerPath]: apiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;