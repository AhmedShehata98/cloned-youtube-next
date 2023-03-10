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

export const upperbarCategories = [
  {
    id: nanoid(4),
    label: "all",
    link: "/all",
  },
  {
    id: nanoid(4),
    label: "music",
    link: "/music",
  },
  {
    id: nanoid(4),
    label: "sheikh",
    link: "/sheikh",
  },
  {
    id: nanoid(4),
    label: "animated films",
    link: "/animated-films",
  },
  {
    id: nanoid(4),
    label: "gaming",
    link: "/gaming",
  },
  {
    id: nanoid(4),
    label: "comedy",
    link: "/comedy",
  },
  {
    id: nanoid(4),
    label: "eating",
    link: "/eating",
  },
  {
    id: nanoid(4),
    label: "recently updated",
    link: "/recently-updated",
  },
  {
    id: nanoid(4),
    label: "pop music",
    link: "/pop-music",
  },
  {
    id: nanoid(4),
    label: "alahly",
    link: "/alahly",
  },
];
export function formatStampTime(publishedTime: string) {
  const dateNow = Date.now();
  const deff = dateNow - new Date(publishedTime).getTime();
  const seconds = Math.floor(deff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  //
  if (years >= 1) {
    return `${years} years ago`;
  }
  if (months >= 1 && months <= 12) {
    return `${months} months ago`;
  }
  if (days >= 1 && days <= 31) {
    return `${days} days ago`;
  }
  if (hours >= 1 && hours <= 24) {
    return `${hours} hours ago`;
  }
  if (minutes >= 1 && minutes <= 60) {
    return `${minutes} minutes ago`;
  }
  if (seconds <= 60) {
    return `${seconds} second`;
  }
}

export function counting(count: string, label: string = "") {
  if (Number(count) >= 1_000_000) {
    return `${count.toString().slice(0, 1)},${count
      .toString()
      .slice(1, 3)} M ${label}`;
  }
  if (Number(count) >= 1000 && Number(count) <= 999_999) {
    return `${count.toString().slice(0, 3)} K ${label}`;
  }
  if (Number(count) >= 999) {
    return `${count} ${label}`;
  }
}
