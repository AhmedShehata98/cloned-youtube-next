import { IThumbnailProps, IThumbnailTypes, Iitem } from "@/Models/Youtube";
import Link from "next/link";
import React from "react";

interface IVideoCardProps {
  videoData: Iitem;
}
function VideoCard({ videoData }: IVideoCardProps) {
  const gettingVideoTime = (puplishTime: string) => {
    const timeNow = new Date().getTime();
    const videoTime = new Date(puplishTime).getTime();
    const paste = timeNow - videoTime;
    return Math.floor(new Date(paste).getDay());
  };

  return (
    <Link
      href={{
        query: {
          vidId: videoData.id.videoId,
        },
        pathname: "/watch",
      }}
      key={videoData?.snippet.title}
      className="yt-card"
      title={videoData?.snippet.title}
    >
      <figure className="w-full h-fit aspect-video flex items-center justify-center rounded-sm">
        <img
          src={videoData?.snippet?.thumbnails.medium.url}
          alt={videoData?.snippet?.title}
          className="w-full aspect-video object-cover object-center rounded-sm "
        />
      </figure>
      <div className="flex justify-start items-start rounded-sm px-1 py-2 bg-gray-100 gap-1">
        <span className="w-[18%] aspect-square bg-red-300 rounded-full flex justify-center items-center">
          <i className="fi fi-rr-desktop-wallpaper leading-3 text-slate-900"></i>
        </span>
        <div className="w-4/5 flex flex-col">
          <b className="inline-block mb-2 text-sm leading-4 h-8 overflow-hidden">
            {videoData?.snippet?.title}
          </b>
          <p className="text-slate-600 capitalize font-medium">
            {videoData?.snippet?.channelTitle}
          </p>
          <small className="text-gray-500">
            {videoData?.snippet?.publishTime}
          </small>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
