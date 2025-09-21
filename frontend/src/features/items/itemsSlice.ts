import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as itemsAPI from "./itemsAPI";

export const fetchItemsThunk = createAsyncThunk("items/fetchAll", async () => {
  const res = await itemsAPI.fetchItems();
  return res.data;
});
export const createItemThunk = createAsyncThunk("items/create", async (payload: any) => {
  const res = await itemsAPI.createItem(payload);
  return res.data;
});
// update and delete similar if needed

const slice = createSlice({
  name: "items",
  initialState: { items: [] as any[], status: "idle" },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchItemsThunk.fulfilled, (state, action) => {
      state.items = action.payload;
    });
    builder.addCase(createItemThunk.fulfilled, (state, action) => {
      state.items.unshift(action.payload);
    });
  },
});

export default slice.reducer;
