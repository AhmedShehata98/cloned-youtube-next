import { Iitem } from "@/Models/Youtube";
import Link from "next/link";
import React from "react";

interface IPlayListSearchResultCardProps {
  playListData: Iitem;
}
function PlayListSearchResultCard({
  playListData,
}: IPlayListSearchResultCardProps) {
  return (
    <div
      key={playListData.id.playlistId || playListData.id.videoId}
      className="yt-playlist-search"
    >
      <Link
        href={{
          pathname: "/playlist",
          query: {
            list: playListData.id.playlistId,
          },
        }}
        className="relative w-full md:w-[35%]"
      >
        <img
          src={playListData.snippet.thumbnails.medium.url}
          alt={"max-w-full aspect-video object-cover object-center"}
          className={"aspect-video min-w-full object-cover object-center"}
        />
        <span className="absolute top-0 left-0 w-2/5 h-full bg-zinc-900 bg-opacity-80 text-white flex flex-col gap-1 justify-center items-center hover:bg-slate-900">
          <small className="uppercase font-medium pointer-events-none">
            playlist{" "}
          </small>
          <i className="fi fi-sr-list leading-3 text-3xl pointer-events-none"></i>
        </span>
      </Link>
      <div className="lg:flex-1 h-full flex flex-col justify-between px-4 md:px-0 py-2">
        <bdi className="leading-7 h-8 overflow-hidden text-lg font-medium capitalize">
          {playListData.snippet.title}
        </bdi>
        <span className="flex justify-start items-center gap-2">
          <i className="fi fi-rr-desktop-wallpaper leading-3 bg-slate-900 text-red-400 p-2 rounded-full aspect-square inline-block"></i>
          <Link
            href={{
              pathname: "/channels",
              query: {
                channelId: playListData.snippet.channelId,
              },
            }}
            className="uppercase font-semibold opacity-80 text-sm text-black dark:text-white"
            title={`Go to ${playListData.snippet.channelTitle} channel`}
          >
            {playListData.snippet.channelTitle}
          </Link>
        </span>
        <Link
          href={{
            pathname: "/playlist",
            query: { list: playListData.id.playlistId },
          }}
          className="inline-block text-sm capitalize mt-auto text-black dark:text-white"
        >
          view full playlist videos
        </Link>
      </div>
    </div>
  );
}

export default PlayListSearchResultCard;
