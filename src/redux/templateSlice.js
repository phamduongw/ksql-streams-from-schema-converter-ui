import { createSlice } from '@reduxjs/toolkit';

// Slice
const templateSlice = createSlice({
  name: 'template',
  initialState: {
    templateData: [],
    copyOfTemplateData: [],
  },
  reducers: {
    setTemplateData: (state, action) => {
      state.templateData = action.payload;
    },
    updateTemplateData: (state, action) => {
      const index = action.payload.index;
      const field = action.payload.field;
      const value = action.payload.value;
      state.templateData[index][field] = value;
    },
    addTemplateData: (state) => {
      state.templateData.push({
        template: '',
        template_data: '',
      });
      state.copyOfTemplateData = state.templateData;
    },
    setCopyOfTemplateData: (state) => {
      state.copyOfTemplateData = state.templateData;
    },
  },
});

// Action
export const {
  setTemplateData,
  updateTemplateData,
  addTemplateData,
  setCopyOfTemplateData,
} = templateSlice.actions;

// Selector
export const templateDataSelector = (state) => state.template.templateData;
export const copyOfTemplateDataSelector = (state) =>
  state.template.copyOfTemplateData;

// Reducer
export default templateSlice.reducer;
