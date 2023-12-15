import { configureStore, combineReducers } from '@reduxjs/toolkit';
import converterSlice from './converterSlice';

const reducer = combineReducers({
  converter: converterSlice,
});

const store = configureStore({
  reducer,
});

export default store;
