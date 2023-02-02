import { IYTVideosResponse } from "@/Models/Youtube";
import axios from "axios";

const API_URL: string = "https://youtube-v31.p.rapidapi.com";
const ENDPOINTS = {
  suggested: "/search",
  captions: "/captions",
  search: "/search",
  allVideos: "/search",
  videoComments: "/commentThreads",
  videosDetails: "/videos",
  channelDetails: "/channels",
  channelVideos: "/search",
  relatedVideos: "/search",
  platlistVideos: "/playlistItems",
  platlistDetails: "/playlists",
};
const getByCategoryOptions = (query: string) => ({
  method: "GET",
  url: `${API_URL}${ENDPOINTS.allVideos}`,
  params: {
    part: "id,snippet",
    q: query,
    maxResults: "25",
    regionCode: "EG",
    order: "date",
  },
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
});
const channelEndpointOptions = (channelId: string) => ({
  method: "GET",
  url: "https://youtube-v31.p.rapidapi.com/channels",
  params: {
    part: "id,snippet",
    id: channelId,
  },
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
});
const getChannelVideosOptions = (channelID: string) => ({
  method: "GET",
  url: "https://youtube-v31.p.rapidapi.com/search",
  params: {
    channelId: channelID,
    part: "snippet,id",
    order: "date",
    maxResults: "25",
  },
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
});
const getVideoDetailsOptions = (videoId: string) => ({
  method: "GET",
  url: `https://youtube-v31.p.rapidapi.com${ENDPOINTS.videosDetails}`,
  params: {
    part: "contentDetails,snippet,statistics",
    id: videoId,
  },
  headers: {
    "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
});
const getRelatedVideosOptions = (videoId: string) => ({
  method: "GET",
  url: `https://youtube-v31.p.rapidapi.com${ENDPOINTS.relatedVideos}`,
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
  url: "https://youtube-v31.p.rapidapi.com/playlistItems",
  params: {
    part: "snippet",
    maxResults: "30",
    playlistId: playlistID,
  },
  "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  "X-RapidAPI-Key": "c61be3ca42mshf758a4f25e72895p1ca436jsn841782450e33",
});
// deffinition of fetcher's function's "GETTING FROM API"
const videosByCategoryFetcher = async (categoty: string = "New") => {
  const res = await axios.request(getByCategoryOptions(categoty));
  const data: IYTVideosResponse = await res.data;
  return data;
};
const getChannelDetails = async (channelId: string) => {
  const res = await axios.request({ ...channelEndpointOptions(channelId) });
  const data = await res.data;
  return data;
};
const getChannelVideosFetcher = async (channelId: string) => {
  const res = await axios.request({ ...getChannelVideosOptions(channelId) });
  const data = await res.data;
  return data;
};
const getVideoDetailsFetcher = async (videoId: string) => {
  const res = await axios.request({ ...getVideoDetailsOptions(videoId) });
  const data = await res.data;
  return data;
};
const getRelatedVideosFetcher = async (videoId: string) => {
  const res = await axios.request({ ...getRelatedVideosOptions(videoId) });
  const data = await res.data;
  return data;
};
const getPlaylistFetcher = async (playlistID: string) => {
  const res = await axios.request({ ...playlistVideosOptions(playlistID) });
  const data = await res.data;
  return data;
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
