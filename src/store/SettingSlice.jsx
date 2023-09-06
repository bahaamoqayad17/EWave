import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";

export const fetchSetting = createAsyncThunk(
  "Settings/fetchSetting",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get("/settings/5c8a1d5b0190b214360dc007");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSetting = createAsyncThunk(
  "Settings/updateSetting",
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.put("/settings/5c8a1d5b0190b214360dc007");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const pushNotification = createAsyncThunk(
  "Settings/updateSetting",
  async (item, { rejectWithValue }) => {
    try {
      const response = await axios.post("/settings/pushNotification", item);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const success = createAsyncThunk(
  "Payment/setpayment",
  async (item, { rejectWithValue }) => {
    try {
      const response = await axios.post("/payment/success", item);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  settings: [],
  privacy: "",
  loading: false,
  error: null,
  count: 0,
};

const SettingSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSetting.fulfilled, (state, action) => {
      state.privacy = action.payload.data;
      state.loading = false;
    });

    builder.addCase(updateSetting.fulfilled, (state, action) => {
      FireToast("success", "Settings Updated Successfully");
    });
  },
});

export const { startLoading } = SettingSlice.actions;

export default SettingSlice.reducer;
