import { IThumbnailProps, IThumbnailTypes, Iitem } from "@/Models/Youtube";
import Link from "next/link";
import React from "react";
import { IoTvSharp } from "react-icons/io5";
import { counting, formatStampTime } from "@/utils/contants";
import { recentvideos } from "@/features/globalRecentVideosData";
export const COLLECTED_VIDEO_DATA_LS_KEY = "collected-video-data";

interface IVideoCardProps {
  videoData: Iitem;
  layout?: "column" | "row";
}
function VideoCard({ videoData, layout }: IVideoCardProps) {
  if (layout === "row" || layout === undefined) {
    return (
      <div key={videoData?.videoId} className="yt-card">
        <Link
          href={{
            query: {
              vidId: videoData.videoId,
            },
            pathname: "/watch",
          }}
          title={`Go to video ${videoData?.title}`}
          className="w-full h-fit aspect-video flex items-center justify-center rounded-sm"
          onClick={() => {
            recentvideos.handleAddToStorage(videoData);
          }}
        >
          <img
            src={videoData?.thumbnail?.[0]?.url}
            alt={videoData?.title}
            className="w-full aspect-video object-cover object-center rounded-sm "
          />
        </Link>
        <div className="yt-videocard-details">
          <Link
            href={{
              pathname: "/channels",
              query: {
                channelId: videoData.channelId,
              },
            }}
            title={`Go to channel ${videoData?.channelTitle}`}
            className="w-1/5 aspect-square rounded-full flex justify-center items-center"
          >
            <img
              src={videoData.channelThumbnail?.[0]?.url}
              alt="channel-image"
              className="rounded-full object-cover object-center aspect-square"
            />
          </Link>
          <div className="w-4/5 flex flex-col">
            <Link
              href={{
                query: {
                  vidId: videoData.videoId,
                },
                pathname: "/watch",
              }}
            >
              <bdi className="inline-block font-semibold text-sm leading-4 h-8 overflow-hidden mb-2">
                {videoData?.title}
              </bdi>
            </Link>
            <Link
              href={{
                pathname: "/channels",
                query: { channelId: videoData.channelId },
              }}
              title={"Go To This Channel"}
            >
              <bdi className="inline-block max-w-full text-slate-600 capitalize font-medium text-sm truncate leading-3 overflow-hidden">
                {videoData?.channelTitle}
              </bdi>
            </Link>
            <small className="opacity-60">{videoData.publishedText}</small>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        key={videoData.videoId}
        className="flex flex-col md:flex-row gap-2 bg-zinc-100 dark:bg-zinc-800 border border-gray-400 dark:border-gray-500 rounded overflow-hidden"
      >
        <Link
          href={{
            pathname: "/watch",
            query: { vidId: videoData.videoId },
          }}
          className="relative w-full aspect-video md:max-w-[35%] md:min-w-[35%] h-1/2 md:h-auto overflow-hidden transition-all grid place-content-center place-items-center bg-gray-100"
        >
          <img
            className="min-w-full aspect-video object-cover object-center"
            src={videoData.thumbnail?.[0].url}
            alt={videoData.channelId + "-img"}
          />
        </Link>
        <div className="lg:flex-1 flex flex-col justify-between px-4 md:px-0 py-2">
          <Link
            href={{
              pathname: "/watch",
              query: { vidId: videoData.videoId },
            }}
            className="leading-5 h-10 overflow-hidden font-medium text-lg dark:text-white"
          >
            {videoData.title}
          </Link>
          <span className="flex items-center justify-start gap-3 my-2">
            <small className="font-bold">{counting(videoData.viewCount)}</small>
            <small className="opacity-70 font-medium">
              {videoData.publishedText}
            </small>
          </span>
          <Link
            href={{
              pathname: "/channels",
              query: {
                channelId: videoData.channelId,
              },
            }}
            className="flex justify-start items-center gap-2 my-auto"
            title={`Go to ${videoData.channelTitle} channel`}
          >
            <img
              src={videoData.channelThumbnail?.[0].url}
              alt="channel-image"
              className="rounded-full object-cover object-center aspect-square w-9"
            />
            <bdi className="uppercase font-semibold opacity-80 dark:text-white text-sm">
              {videoData.channelTitle}
            </bdi>
          </Link>
          <small>{videoData.description}</small>
        </div>
      </div>
    );
  }
}

export default VideoCard;
