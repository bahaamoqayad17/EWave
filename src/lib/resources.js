import { deleteArticle } from "@/store/ArticleSlice";
import { deleteCategory } from "@/store/CategorySlice";
import { deleteRecommendation } from "@/store/RecommendationSlice";
import { deleteVideo } from "@/store/VideoSlice";

export const resources = {
  recommendations: {
    headers: ["name", "action", "opening time"],
    fields: ["name", "action", "opening_time"],
    remove: deleteRecommendation,
  },
  articles: {
    headers: ["title", "image"],
    fields: ["title", "image"],
    remove: deleteArticle,
  },
  payments: {},
  users: {
    headers: ["name", "email", "phone", "Is Paid"],
    fields: ["name", "email", "mobile_number", "is_paid"],
  },
  videos: {
    headers: ["link", "title"],
    fields: ["url", "title"],
    remove: deleteVideo,
  },
  categories: {
    headers: ["name", "image"],
    fields: ["name", "image"],
    remove: deleteCategory,
  },
};
