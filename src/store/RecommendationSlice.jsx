import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { FireToast } from "@/lib/fireToast";
import { closeModal } from "./RootSlice";

export const fetchPaid = createAsyncThunk(
  "recommendations/fetchPaid",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await axios.get("/recommendations/paid", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUnPaid = createAsyncThunk(
  "recommendations/fetchUnPaid",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await axios.get("/recommendations", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteRecommendation = createAsyncThunk(
  "recommendations/deleteRecommendation",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`/recommendations/${item._id}`);
      if (item.is_paid == 1) {
        dispatch(fetchPaid());
      } else {
        dispatch(fetchUnPaid());
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addRecommendation = createAsyncThunk(
  "recommendations/addRecommendation",
  async ({ formData, is_paid }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/recommendations", formData);
      if (is_paid == 1) {
        dispatch(fetchPaid());
      } else {
        dispatch(fetchUnPaid());
      }
      dispatch(closeModal(true));

      return response.data;
    } catch (error) {
      FireToast("error", error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateRecommendation = createAsyncThunk(
  "recommendations/updateRecommendation",
  async (item, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`/recommendations/${item._id}`, item);
      if (item.is_paid == 1) {
        dispatch(fetchPaid());
      } else {
        dispatch(fetchUnPaid());
      }
      dispatch(closeModal(true));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  recommendations: [],
  loading: false,
  error: null,
  count: 0,
};

const Recommendationslice = createSlice({
  name: "recommendations",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPaid.fulfilled, (state, action) => {
      state.recommendations = action.payload.data;
      state.count = action.payload.count;
      state.loading = false;
    });
    builder.addCase(fetchUnPaid.fulfilled, (state, action) => {
      state.recommendations = action.payload.data;
      state.count = action.payload.count;
      state.loading = false;
    });
    builder.addCase(addRecommendation.fulfilled, (state, action) => {
      FireToast("success", "Recommedation Added Successfully");
    });
    builder.addCase(updateRecommendation.fulfilled, (state, action) => {
      FireToast("success", "Recommedation Updated Successfully");
    });
    builder.addCase(deleteRecommendation.fulfilled, (state, action) => {
      FireToast("warning", "Recommedation Deleted Successfully");
    });
  },
});

export const { startLoading } = Recommendationslice.actions;

export default Recommendationslice.reducer;
