import axios from "axios";

export const getInfo = async (url: string) => {
  const res = await axios.get(`/api/youtube-downloader/info?url=${url}`);
  return await res.data;
};

export const downloadVideo = async (
  url: string,
  itag: number,
  title: string
) => {
  const res = await axios.get(
    `/api/youtube-downloader/download?url=${url}&itag=${itag}&title=${encodeURI(
      title
    )}`
  );
  return await res.data;
};
