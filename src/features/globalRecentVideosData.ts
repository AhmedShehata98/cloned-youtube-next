import { Iitem } from "./../Models/Youtube";
import { HistoryStorage } from "@/utils/historyStorage";
const recentVideosLocalStorageKey = "recent-videos";
const recentvideosData: Iitem[] = [];

export const recentvideos = new HistoryStorage(
  recentvideosData,
  recentVideosLocalStorageKey
);
