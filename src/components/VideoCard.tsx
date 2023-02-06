import { IThumbnailProps, IThumbnailTypes, Iitem } from "@/Models/Youtube";
import Link from "next/link";
import React from "react";

interface IVideoCardProps {
  videoData: Iitem;
}
function VideoCard({ videoData }: IVideoCardProps) {
  return (
    <div key={videoData?.snippet.title} className="yt-card">
      <Link
        href={{
          query: {
            vidId: videoData.id.videoId,
          },
          pathname: "/watch",
        }}
        title={`Go to video ${videoData.snippet.title}`}
        className="w-full h-fit aspect-video flex items-center justify-center rounded-sm"
      >
        <img
          src={videoData?.snippet?.thumbnails.medium.url}
          alt={videoData?.snippet?.title}
          className="w-full aspect-video object-cover object-center rounded-sm "
        />
      </Link>
      <div className="yt-videocard-details">
        <span className="w-[18%] aspect-square bg-red-300 rounded-full flex justify-center items-center">
          <i className="fi fi-rr-desktop-wallpaper leading-3 text-slate-900"></i>
        </span>
        <div className="w-4/5 flex flex-col">
          <Link
            href={{
              query: {
                vidId: videoData.id.videoId,
              },
              pathname: "/watch",
            }}
          >
            <bdi className="inline-block font-semibold text-sm leading-4 h-8 overflow-hidden mb-2">
              {videoData?.snippet?.title}
            </bdi>
          </Link>
          <Link
            href={{
              pathname: "/channels",
              query: { channelId: videoData.snippet.channelId },
            }}
            title={"Go To This Channel"}
          >
            <bdi className="inline-block max-w-full text-slate-600 capitalize font-medium text-sm truncate leading-3 overflow-hidden">
              {videoData?.snippet?.channelTitle}
            </bdi>
          </Link>
          <small className="opacity-60">
            {Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
              formatMatcher: "best fit",
              timeStyle: "medium",
            }).format(new Date(videoData?.snippet?.publishTime))}
          </small>
        </div>
      </div>
    </div>
  );
}

export default VideoCard;
