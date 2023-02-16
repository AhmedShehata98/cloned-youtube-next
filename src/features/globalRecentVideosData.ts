import { Iitem } from "./../Models/Youtube";
import { HistoryStorage } from "@/utils/historyStorage";
export const recentVideosLocalStorageKey = "recent-videos";
const recentvideosData: Iitem[] = [];

export const recentvideos = new HistoryStorage(
  recentvideosData,
  recentVideosLocalStorageKey
);
