import { IYTVideosResponse } from "@/Models/Youtube";
import axios from "axios";

const API_URL: string = "https://youtube-v3-alternative.p.rapidapi.com";
const API_URL_Secondary: string = "https://youtube-v31.p.rapidapi.com";
const ENDPOINTS = {
  captions: "/captions",
  search: "/search",
  videoComments: "/commentThreads",
  videosDetails: "/videos",
  channelDetails: "/channel",
  playlistDetails: "/playlist",
};
const getByCategoryOptions = (query: string, pageNumber: number = 25) => ({
  method: "GET",
  url: `${API_URL}${ENDPOINTS.search}`,
  params: {
    query: query,
    geo: "EG",
    lang: "en",
  },
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    "X-RapidAPI-Host": API_URL.split("https://")[1],
  },
});
const channelEndpointOptions = (channelId: string) => ({
  method: "GET",
  url: `${API_URL}${ENDPOINTS.channelDetails}`,
  params: {
    id: channelId,
  },
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    "X-RapidAPI-Host": API_URL.split("https://")[1],
  },
});

const getChannelVideosOptions = (channelID: string) => ({
  method: "GET",
  url: `${API_URL}${ENDPOINTS.search}`,
  params: {
    channelId: channelID,
    part: "snippet,id",
    order: "date",
    regionCode: "EG",
    maxResults: "25",
  },
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
});
const getVideoDetailsOptions = (videoId: string) => ({
  method: "GET",
  url: `${API_URL}${ENDPOINTS.videosDetails}`,
  params: {
    id: videoId,
  },
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
});
const getRelatedVideosOptions = (videoId: string) => ({
  method: "GET",
  url: `${API_URL}${ENDPOINTS.search}`,
  params: {
    part: "id,snippet",
    id: videoId,
    maxResults: "15",
    regionCode: "EG",
  },
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
});
const playlistVideosOptions = (playlistID: string) => ({
  method: "GET",
  url: `${API_URL}${ENDPOINTS.playlistDetails}`,
  params: {
    id: playlistID,
  },
  headers:{
  "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
  "X-RapidAPI-Host": API_URL.split("https://")[1],
  }

});
// deffinition of fetcher's function's "GETTING FROM API"
const videosByCategoryFetcher = async (
  categoty: string = "New",
  pageNumber?: number
) => {
  try {
    const res = await axios.request(getByCategoryOptions(categoty, pageNumber));
    const data: IYTVideosResponse = await res.data;
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
const getChannelDetails = async (channelId: string) => {
  try {
    const res = await axios.request({ ...channelEndpointOptions(channelId) });
    const data = await res.data;
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
const getChannelVideosFetcher = async (channelId: string) => {
  try {
    const res = await axios.request({ ...getChannelVideosOptions(channelId) });
    const data = await res.data;
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
const getVideoDetailsFetcher = async (videoId: string) => {
  try {
    const res = await axios.request({ ...getVideoDetailsOptions(videoId) });
    const data = await res.data;
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
const getRelatedVideosFetcher = async (videoId: string) => {
  try {
    const res = await axios.request({ ...getRelatedVideosOptions(videoId) });
    const data = await res.data;
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
const getPlaylistFetcher = async (playlistID: string) => {
  try {
    const res = await axios.request({ ...playlistVideosOptions(playlistID) });
    const data = await res.data;
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

// ------------------- exports functions and properties ------------------------

export {
  videosByCategoryFetcher,
  API_URL,
  ENDPOINTS,
  getByCategoryOptions,
  getChannelDetails,
  getChannelVideosFetcher,
  getVideoDetailsFetcher,
  getRelatedVideosFetcher,
  getPlaylistFetcher,
};
