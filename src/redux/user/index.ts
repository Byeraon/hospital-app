import { createSlice, createAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

type initialStateType = {
  data: User | null;
  medCard: medicalCard | null;
  loading: boolean;
};

const user = localStorage.getItem("user") || null;

const initialState: initialStateType = {
  data: user ? JSON.parse(user) : null,
  medCard: null,
  loading: false,
};

export const setUser = createAction<{ data: User | null; loading: boolean }>(
  "user/set"
);

export const setUserCard = createAction<{
  medCard: medicalCard | null;
  loading: boolean;
}>("user/setCard");

const index = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(setUser, (state, action) => {
      state.data = action.payload.data;
      state.loading = action.payload.loading;
    });
    builder.addCase(setUserCard, (state, action) => {
      state.medCard = action.payload.medCard;
      state.loading = action.payload.loading;
    });
  },
});

export default index.reducer;
