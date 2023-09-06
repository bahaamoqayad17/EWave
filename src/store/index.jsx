import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./RootSlice";
import ArticleSlice from "./ArticleSlice";
import CategorySlice from "./CategorySlice";
import VideoSlice from "./VideoSlice";
import SettingSlice from "./SettingSlice";
import UserSlice from "./UserSlice";
import RecommendationSlice from "./RecommendationSlice";
import AuthSlice from "./AuthSlice";

export const store = configureStore({
  reducer: {
    root: RootReducer,
    articles: ArticleSlice,
    categories: CategorySlice,
    videos: VideoSlice,
    settings: SettingSlice,
    users: UserSlice,
    recommendations: RecommendationSlice,
    auth: AuthSlice,
  },
});
