import { createSlice, createAction } from "@reduxjs/toolkit";

type initialStateType = {
  loader: boolean;
};

const initialState: initialStateType = {
  loader: false,
};

export const setLoader = createAction<{ loader: boolean }>("loader/set");

const index = createSlice({
  name: "loader",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setLoader, (state, action) => {
      state.loader = action.payload.loader;
    });
  },
});

export default index.reducer;
