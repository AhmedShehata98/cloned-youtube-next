import { Iitem } from "./../Models/Youtube";
import { HistoryStorage } from "@/utils/historyStorage";

export const watchLaterVideosLocalStorageKey = "watch-later-videos";
export const watchLatervideosData: Iitem[] = [];

export const watchLatervideo = new HistoryStorage(
  watchLatervideosData,
  watchLaterVideosLocalStorageKey
);
