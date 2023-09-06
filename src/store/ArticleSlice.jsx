import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { FireToast } from "@/lib/fireToast";
import { closeModal } from "./RootSlice";

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await axios.get("/articles", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`/articles/${item._id}`);
      dispatch(fetchArticles());
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addArticle = createAsyncThunk(
  "articles/addArticle",
  async (item, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/articles", item);
      dispatch(fetchArticles());
      dispatch(closeModal(true));

      return response.data;
    } catch (error) {
      FireToast("error", error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateArticle = createAsyncThunk(
  "articles/updateArticle",
  async ({ item, id }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`/articles/${id}`, item);
      dispatch(fetchArticles());
      dispatch(closeModal(true));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  articles: [],
  loading: false,
  error: null,
  count: 0,
};

const ArticleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload.data;
      state.count = action.payload.count;
      state.loading = false;
    });
    builder.addCase(addArticle.fulfilled, (state, action) => {
      FireToast("success", "Article Added Successfully");
    });
    builder.addCase(updateArticle.fulfilled, (state, action) => {
      FireToast("success", "Article Updated Successfully");
    });
    builder.addCase(deleteArticle.fulfilled, (state, action) => {
      FireToast("warning", "Article Deleted Successfully");
    });
  },
});

export const { startLoading } = ArticleSlice.actions;

export default ArticleSlice.reducer;
