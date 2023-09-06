import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { FireToast } from "@/lib/fireToast";
import { closeModal } from "./RootSlice";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await axios.get("/categories", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deletecategory",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`/categories/${item._id}`);
      dispatch(fetchCategories());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/addcategory",
  async (item, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/categories", item);
      dispatch(fetchCategories());
      dispatch(closeModal(true));

      return response.data;
    } catch (error) {
      FireToast("error", error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ item, id }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`/categories/${id}`, item);
      dispatch(fetchCategories());
      dispatch(closeModal(true));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  categories: [],
  loading: false,
  error: null,
  count: 0,
};

const Categoryslice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data;
      state.count = action.payload.count;
      state.loading = false;
    });
    builder.addCase(addCategory.fulfilled, (state, action) => {
      FireToast("success", "Market Added Successfully");
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      FireToast("success", "Market Updated Successfully");
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      FireToast("warning", "Market Deleted Successfully");
    });
  },
});

export const { startLoading } = Categoryslice.actions;

export default Categoryslice.reducer;
