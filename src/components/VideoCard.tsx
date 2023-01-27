import { IThumbnailProps, IThumbnailTypes, Iitem } from "@/Models/Youtube";
import { nanoid } from "nanoid";
import Link from "next/link";
import React from "react";

interface IVideoCardProps {
  videoData: Iitem;
}
function VideoCard({ videoData }: IVideoCardProps) {
  const getValidVideoURL = (thumbnails: IThumbnailTypes): IThumbnailProps => {
    if (thumbnails.default) {
      return thumbnails.default;
    } else if (thumbnails.medium) {
      return thumbnails.medium;
    } else if (thumbnails.high) {
      return thumbnails.high;
    } else {
      thumbnails.default;
    }
    return thumbnails.default;
  };
  const gettingVideoTime = (puplishTime: string) => {
    const timeNow = new Date().getTime();
    const videoTime = new Date(puplishTime).getTime();
    const paste = timeNow - videoTime;
    return Math.floor(new Date(paste).getDay());
  };
  if (videoData) {
    console.log(videoData?.id.kind);
  }
  return (
    <Link
      href={{
        href: `/explore/watch`,
        query: {
          videoId: videoData.id.videoId,
        },
        pathname: "/explore/watch",
      }}
      key={videoData?.snippet.title}
      className="rounded-md max-h-fit lg:max-h-52 shadow-md overflow-hidden"
      title={videoData?.snippet.title}
    >
      <figure className="w-full h-fit aspect-video flex items-center justify-center rounded-sm">
        <img
          src={videoData?.snippet?.thumbnails.medium.url}
          alt={videoData?.snippet?.title}
          className="w-full aspect-video object-cover object-center rounded-sm "
        />
      </figure>
      <div className="rounded-sm px-3 py-2 bg-gray-100">
        <b className="inline-block mb-2 max-w-full truncate overflow-hidden text-ellipsis">
          {videoData?.snippet?.title}
        </b>
        <div>
          <span className="flex items-center justify-start gap-2">
            {videoData?.kind && (
              <i className="fi fi-sr-badge-check leading-3 text-slate-500"></i>
            )}
            <small className="text-slate-600 capitalize font-medium">
              {videoData?.snippet?.channelTitle}
            </small>
          </span>
          <span className="flex justify-between">
            {/* <small className="font-medium text-gray-400">
              {`${videoData?.snippet.} views`}
            </small> */}
            <small className="text-gray-500">
              {gettingVideoTime(videoData?.snippet?.publishTime) +
                " " +
                "days ago"}
            </small>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
