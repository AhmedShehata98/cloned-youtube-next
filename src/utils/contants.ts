import { Iitem } from "@/Models/Youtube";
import { nanoid } from "nanoid";

export const categoryBar = [
  {
    id: nanoid(3),
    icon: "fi-rr-desktop-wallpaper",
    label: "elzero web school",
    link: "/elzero-web-school",
  },
  {
    id: nanoid(3),
    icon: "fi-rr-book-open-cover",
    label: "Quran",
    link: "quran",
  },

  {
    id: nanoid(3),
    icon: "fi-sr-globe",
    label: "sports",
    link: "sports",
  },

  {
    id: nanoid(3),
    icon: "fi-rr-music",
    label: "music",
    link: "music",
  },

  {
    id: nanoid(3),
    icon: "fi-rr-football",
    label: "football",
    link: "football",
  },

  {
    id: nanoid(3),
    icon: "fi-rr-confetti",
    label: "new",
    link: "new",
  },

  {
    id: nanoid(3),
    icon: "fi-rr-film",
    label: "movies",
    link: "movies",
  },
  {
    id: nanoid(3),
    icon: "fi-rr-bowling",
    label: "gaming",
    link: "gaming",
  },
  {
    id: nanoid(3),
    icon: "fi-rr-microphone",
    label: "podcast",
    link: "podcast",
  },
  {
    id: nanoid(3),
    icon: "fi-rr-graduation-cap",
    label: "education",
    link: "education",
  },
  {
    id: nanoid(3),
    icon: "fi-rr-gem",
    label: "Popular",
    link: "popular",
  },
];
export const recentVideosLocalStorageKey = "recent-videos";
export const recentvideos: Iitem[] = [];

export function formatElapsedTime(publishedTime: string) {
  const TimeNow = new Date().getTime();
  const published = new Date(publishedTime).getTime();
  const timeDiff = TimeNow - published;
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (seconds <= 60) return `${seconds} seconds ago`;
  if (seconds >= 60) return `${minutes} minutes ago`;
  if (minutes <= 60) return `${minutes} minutes ago`;
  if (minutes >= 60) return `${hours} hours ago`;
}

export function counting(count: string) {
  const countNumber: number = Number(count);
  if (countNumber <= 99) {
    return `${count} view`;
  } else if (countNumber > 1000) {
    return `${count[0]},${count[1]}${count[2]} K view`;
  } else if (countNumber > 10_000) {
    return `${count[0]}${count[1]},${count[2]}${count[3]} K view`;
  } else if (countNumber > 100_000) {
    return `${count[0]}${count[1]}${count[2]},${count[3]}${count[4]} K view`;
  } else if (countNumber > 1_000_000) {
    return `${count[0]},${count[1]}${count[2]} M view`;
  } else {
    return `${count} view`;
  }
}

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
