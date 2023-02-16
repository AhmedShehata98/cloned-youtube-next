import { Iitem } from "@/Models/Youtube";

// const isDuplicated = (videoData: Iitem) => {
//   return recentvideos.find(
//     (video) => video.snippet.title === videoData.snippet.title
//   );
// };

// export const handleAddToRecents = (videoData: Iitem) => {
//   if (recentvideos.length >= 0) {
//     if (!isDuplicated(videoData)) {
//       recentvideos.unshift(videoData);
//       window.localStorage.setItem(
//         recentVideosLocalStorageKey,
//         JSON.stringify(recentvideos)
//       );
//     }
//   }
// };

// export const handleGetbackVideoRecents = () => {
//   if (recentvideos.length === 0) {
//     if (window.localStorage.getItem(recentVideosLocalStorageKey)) {
//       const parsedRecentVideos = JSON.parse(
//         window.localStorage.getItem(recentVideosLocalStorageKey)!
//       );
//       recentvideos.unshift(...parsedRecentVideos);
//     }
//   }
// };

export class HistoryStorage {
  constructor(private storage: Iitem[], private STORAGE_KEY_NAME: string) {}

  get getStorageData() {
    return this.storage;
  }

  isDuplicated(videoData: Iitem) {
    return this.storage.find((video) => video.videoId === videoData.videoId);
  }

  handleAddToStorage(item: Iitem) {
    if (this.storage.length >= 0) {
      if (!this.isDuplicated(item)) {
        this.storage.unshift(item);
        window.localStorage.setItem(
          this.STORAGE_KEY_NAME,
          JSON.stringify(this.storage)
        );
      }
    }
  }

  handleGetbackStorage() {
    if (!Boolean(this.storage.length)) {
      if (Boolean(window.localStorage.getItem(this.STORAGE_KEY_NAME))) {
        const parsedLocalStorageData = JSON.parse(
          window.localStorage.getItem(this.STORAGE_KEY_NAME)!
        );
        this.storage.unshift(...parsedLocalStorageData);
      }
    }
  }
}
