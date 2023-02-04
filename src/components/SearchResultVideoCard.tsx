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
    <div
      key={videoId}
      className="flex flex-col md:flex-row gap-2 bg-zinc-100 dark:bg-zinc-800 border border-gray-400 dark:border-gray-500 rounded overflow-hidden"
    >
      <Link
        href={{
          pathname: "/watch",
          query: { vidId: videoId },
        }}
        className="relative w-full aspect-video md:max-w-[35%] md:min-w-[35%] h-1/2 md:h-auto overflow-hidden transition-all grid place-content-center place-items-center bg-gray-100"
      >
        <img
          className="min-w-full aspect-video object-cover object-center"
          src={snippet.thumbnails.high.url}
          alt={snippet.channelId + "-img"}
        />
      </Link>
      <div className="lg:flex-1 flex flex-col justify-between px-4 md:px-0 py-2">
        <Link
          href={{
            pathname: "/watch",
            query: { vidId: videoId },
          }}
          className="leading-5 h-10 overflow-hidden font-medium text-lg dark:text-white mb-1"
        >
          {snippet.title}
        </Link>
        <small className="opacity-70 font-medium">
          {formatElapsedTime(snippet.publishTime)}
        </small>
        <span className="flex justify-start items-center gap-2">
          <i className="fi fi-rr-desktop-wallpaper leading-3 bg-slate-900 text-red-400 p-2 rounded-full aspect-square inline-block"></i>
          <Link
            href={{
              pathname: "/channels",
              query: {
                channelId: snippet.channelId,
              },
            }}
            className="uppercase font-semibold opacity-80 dark:text-white text-sm"
            title={`Go to ${snippet.channelTitle} channel`}
          >
            {snippet.channelTitle}
          </Link>
        </span>
        <small>{snippet.description}</small>
      </div>
    </div>
  );
}

export default SearchResultVideoCard;
