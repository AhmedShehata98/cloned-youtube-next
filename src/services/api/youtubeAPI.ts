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
  },
  headers: {
    "X-RapidAPI-Key": "c61be3ca42mshf758a4f25e72895p1ca436jsn841782450e33",
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
    "X-RapidAPI-Key": "c61be3ca42mshf758a4f25e72895p1ca436jsn841782450e33",
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
    "X-RapidAPI-Key": "c61be3ca42mshf758a4f25e72895p1ca436jsn841782450e33",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
});
// deffinition of fetcher's function's "GETTING FROM API"
const videosByCategoryFetcher = async (
  categoty: string = "New"
): Promise<IYTVideosResponse> => {
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

// ------------------- exports functions and properties ------------------------

export {
  videosByCategoryFetcher,
  API_URL,
  ENDPOINTS,
  getByCategoryOptions,
  getChannelDetails,
  getChannelVideosFetcher,
};
