import { Iitem } from "@/Models/Youtube";

export const recentVideosLocalStorageKey = "recent-videos";
export const recentvideos: Iitem[] = [];

const isDuplicated = (videoData: Iitem) => {
  return recentvideos.find(
    (video) => video.snippet.title === videoData.snippet.title
  );
};

export const handleAddToRecents = (videoData: Iitem) => {
  if (recentvideos.length >= 0) {
    if (!isDuplicated(videoData)) {
      recentvideos.unshift(videoData);
      window.localStorage.setItem(
        recentVideosLocalStorageKey,
        JSON.stringify(recentvideos)
      );
    }
  }
};

export const handleGetbackVideoRecents = () => {
  if (recentvideos.length === 0) {
    if (window.localStorage.getItem(recentVideosLocalStorageKey)) {
      const parsedRecentVideos = JSON.parse(
        window.localStorage.getItem(recentVideosLocalStorageKey)!
      );
      recentvideos.unshift(...parsedRecentVideos);
    }
  }
};
