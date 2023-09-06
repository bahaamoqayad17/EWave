import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import { FireToast } from "@/lib/fireToast";
import { closeModal } from "./RootSlice";

export const fetchVideos = createAsyncThunk(
  "Videos/fetchVideos",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const response = await axios.get("/videos", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteVideo = createAsyncThunk(
  "Videos/deleteVideo",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.delete(`/videos/${item._id}`);
      dispatch(fetchVideos());
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addVideo = createAsyncThunk(
  "Videos/addVideo",
  async (item, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/videos", item);
      dispatch(fetchVideos());
      dispatch(closeModal(true));

      return response.data;
    } catch (error) {
      FireToast("error", error.response.data.message);
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateVideo = createAsyncThunk(
  "Videos/updateVideo",
  async (item, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.put(`/videos/${item._id}`, item);
      dispatch(fetchVideos());
      dispatch(closeModal(true));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  videos: [],
  loading: false,
  error: null,
  count: 0,
};

const VideoSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchVideos.fulfilled, (state, action) => {
      state.videos = action.payload.data;
      state.count = action.payload.count;
      state.loading = false;
    });
    builder.addCase(addVideo.fulfilled, (state, action) => {
      FireToast("success", "Video Added Successfully");
    });
    builder.addCase(updateVideo.fulfilled, (state, action) => {
      FireToast("success", "Video Updated Successfully");
    });
    builder.addCase(deleteVideo.fulfilled, (state, action) => {
      FireToast("warning", "Video Deleted Successfully");
    });
  },
});

export const { startLoading } = VideoSlice.actions;

export default VideoSlice.reducer;
