import React from "react";
import { Iitem } from "@/Models/Youtube";
import { formatElapsedTime } from "@/utils/contants";
import Link from "next/link";
interface ISearchResultVideoCardProps {
  SearchResultData: Iitem;
}

function SearchResultVideoCard({
  SearchResultData: {
    id: { videoId },
    snippet,
  },
}: ISearchResultVideoCardProps) {
  return (
    <Link
      href={{
        pathname: "/watch",
        query: { vidId: videoId },
      }}
      className="flex flex-col md:flex-row gap-2 shadow bg-zinc-50 border border-gray-300 rounded overflow-hidden"
    >
      <figure className="relative w-full aspect-video sm:py-3 lg:py-0 md:w-[30%] flex items-center justify-center bg-gray-100">
        <img
          className="max-w-full aspect-video object-cover"
          src={snippet.thumbnails.high.url}
          alt={snippet.channelId + "-img"}
        />
      </figure>
      <div className="w-[65%] flex flex-col justify-between px-4 md:px-0">
        <h4 className="font-medium text-lg mb-3">{snippet.title}</h4>
        <small className="opacity-70 font-medium">
          {formatElapsedTime(snippet.publishTime)}
        </small>
        <span className="flex justify-start items-center gap-2">
          <i className="fi fi-rr-desktop-wallpaper leading-3 bg-slate-900 text-red-400 p-2 rounded-full aspect-square inline-block"></i>
          <p className="capitalize font-semibold opacity-80 text-sm">
            {snippet.channelTitle}
          </p>
        </span>
        <small>{snippet.description}</small>
      </div>
    </Link>
  );
}

export default SearchResultVideoCard;
