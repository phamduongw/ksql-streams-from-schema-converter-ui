import { createSlice } from '@reduxjs/toolkit';

// Slice
const converterSlice = createSlice({
  name: 'converter',
  initialState: {
    procName: '',
    schemaName: '',
    procType: 'xml',
    blobDelimiter: '',
    etlData: [],
  },
  reducers: {
    setProcName: (state, action) => {
      state.procName = action.payload;
    },
    setSchemaName: (state, action) => {
      state.schemaName = action.payload;
    },
    setProcType: (state, action) => {
      state.procType = action.payload;
    },
    setBlobDelimiter: (state, action) => {
      state.blobDelimiter = action.payload;
    },
    setEtlData: (state, action) => {
      state.etlData = action.payload;
    },
  },
});

// Action
export const {
  setProcName,
  setSchemaName,
  setProcType,
  setBlobDelimiter,
  setEtlData,
} = converterSlice.actions;

// Selector
export const procNameSelector = (state) => state.converter.procName;
export const schemaNameSelector = (state) => state.converter.schemaName;
export const procTypeSelector = (state) => state.converter.procType;
export const blobDelimiterSelector = (state) => state.converter.blobDelimiter;
export const etlDataSelector = (state) => state.converter.etlData;

// Reducer
export default converterSlice.reducer;
