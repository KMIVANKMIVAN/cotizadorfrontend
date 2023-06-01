import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  parametro1: null,
  parametro2: null,
  parametro3: null,
};

const parametrosSlice = createSlice({
  name: 'parametros',
  initialState,
  reducers: {
    setParametros: (state, action) => {
      const { parametro1, parametro2, parametro3 } = action.payload;
      state.parametro1 = parametro1;
      state.parametro2 = parametro2;
      state.parametro3 = parametro3;
    },
  },
});

export const { setParametros } = parametrosSlice.actions;

export default parametrosSlice.reducer;