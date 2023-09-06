import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  closeAllModals: false,
};

export const RootSlice = createSlice({
  name: "Root",
  initialState,
  reducers: {
    closeModal: (state, action) => {
      state.closeAllModals = action.payload;
    },
  },
});

export const { closeModal } = RootSlice.actions;
export default RootSlice.reducer;
