import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "./authAPI";

const initialState = {
  user: null as null | { id: number; email: string; name?: string },
  token: null as null | string,
  status: "idle",
};

export const registerThunk = createAsyncThunk("auth/register", async (payload: any) => {
  const res = await authAPI.register(payload);
  return res.data;
});
export const loginThunk = createAsyncThunk("auth/login", async (payload: any) => {
  const res = await authAPI.login(payload);
  return res.data;
});

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.user = action.payload.user;
      state.token = action.payload.token;
    });
    builder.addCase(registerThunk.fulfilled, (state) => {
      state.status = "succeeded";
    });
  },
});

export const { setCredentials, logout } = slice.actions;
export default slice.reducer;
