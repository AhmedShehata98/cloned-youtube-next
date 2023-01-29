import { nanoid } from "nanoid";

export const categoryBar = [
  {
    id: nanoid(3),
    icon: "fi-rr-desktop-wallpaper",
    label: "elzero-web-school",
  },
  {
    id: nanoid(3),
    icon: "fi-rr-book-open-cover",
    label: "Quran",
  },

  {
    id: nanoid(3),
    icon: "fi-sr-globe",
    label: "sports",
  },

  {
    id: nanoid(3),
    icon: "fi-rr-music",
    label: "music",
  },

  {
    id: nanoid(3),
    icon: "fi-rr-football",
    label: "football",
  },

  {
    id: nanoid(3),
    icon: "fi-rr-confetti",
    label: "new",
  },

  {
    id: nanoid(3),
    icon: "fi-rr-film",
    label: "movies",
  },
  {
    id: nanoid(3),
    icon: "fi-rr-bowling",
    label: "gaming",
  },
  {
    id: nanoid(3),
    icon: "fi-rr-microphone",
    label: "podcast",
  },
  {
    id: nanoid(3),
    icon: "fi-rr-graduation-cap",
    label: "education",
  },
  {
    id: nanoid(3),
    icon: "fi-rr-gem",
    label: "Popular",
  },
];

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
