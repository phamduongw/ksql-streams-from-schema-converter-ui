import { createSlice } from '@reduxjs/toolkit';

// Slice
const converterSlice = createSlice({
  name: 'converter',
  initialState: {
    procName: '',
    schemaName: '',
    procType: 'XML',
    blobDelim: '',
    procData: [],
    copyOfProcData: [],
    sqlStatement: '',
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
      state.blobDelim = action.payload;
    },
    setProcData: (state, action) => {
      state.procData = action.payload;
    },
    updateProcData: (state, action) => {
      const index = action.payload.index;
      const field = action.payload.field;
      const value = action.payload.value;

      if (field == 'aliases') {
        state.procData[index][field][0] = value;
      } else if (field == 'type') {
        state.procData[index][field][1] = value;
      } else {
        state.procData[index][field] = value;
      }
    },
    setCopyOfProcData: (state) => {
      state.copyOfProcData = state.procData;
    },
    setSqlStatement: (state, action) => {
      state.sqlStatement = action.payload;
    },
  },
});

// Action
export const {
  setProcName,
  setSchemaName,
  setProcType,
  setBlobDelimiter,
  setProcData,
  setCopyOfProcData,
  updateProcData,
  setSqlStatement,
} = converterSlice.actions;

// Selector
export const procNameSelector = (state) => state.converter.procName;
export const schemaNameSelector = (state) => state.converter.schemaName;
export const procTypeSelector = (state) => state.converter.procType;
export const blobDelimSelector = (state) => state.converter.blobDelim;
export const procDataSelector = (state) => state.converter.procData;
export const copyOfProcDataSelector = (state) => state.converter.copyOfProcData;
export const sqlStatementSelector = (state) => state.converter.sqlStatement;

// Reducer
export default converterSlice.reducer;
