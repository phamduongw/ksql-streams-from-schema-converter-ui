import { configureStore, combineReducers } from '@reduxjs/toolkit';
import converterSlice from './converterSlice';
import templateSlice from './templateSlice';

const reducer = combineReducers({
  converter: converterSlice,
  template: templateSlice,
});

const store = configureStore({
  reducer,
});

export default store;
