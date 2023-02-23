import { Iitem } from "@/Models/Youtube";
import Link from "next/link";
import React from "react";

interface IPlayListCardProps {
  playListData: Iitem;
  layout?: "column" | "row";
}

function PlayListCard({ playListData, layout }: IPlayListCardProps) {
  if (layout === "row" || layout === undefined) {
    return (
      <div
        key={playListData.playlistId}
        className="relative yt-card shadow-sm border border-gray-300 dark:border-gray-400"
      >
        <div
          className="relative w-full aspect-video"
          title={playListData.title}
        >
          <span className="absolute top-0 left-0 w-2/5 h-full flex flex-col items-center justify-center bg-zinc-900 bg-opacity-90 text-white p-2">
            <i className="fi fi-rr-list"></i>
            playList
          </span>
          <Link
            href={{
              pathname: "/playlist",
              query: {
                listId: playListData.playlistId,
              },
            }}
            className="w-full aspect-video"
          >
            <img
              src={playListData.thumbnail?.[0].url}
              alt="playlist-thumb-img"
              className="w-full h-full object-cover aspect-video"
            />
          </Link>
        </div>
        <div className="w-full flex-1 flex flex-col p-2 bg-gray-100 dark:bg-zinc-800 border-t-4 border-red-400">
          <Link
            href={{
              pathname: "/playlist",
              query: {
                listId: playListData?.playlistId,
              },
            }}
          >
            <bdi className="inline-block truncate max-w-full">
              {playListData.title}
            </bdi>
          </Link>
          <small className="font-medium opacity-70">
            {playListData.channelTitle}
          </small>
        </div>
      </div>
    );
  } else {
    return (
      <div
        key={playListData.playlistId || playListData.videoId}
        className="yt-playlist-search"
      >
        <Link
          href={{
            pathname: "/playlist",
            query: {
              listId: playListData.playlistId,
            },
          }}
          className="relative w-full md:w-[35%]"
        >
          <img
            src={playListData.thumbnail?.[0].url}
            alt={"max-w-full aspect-video object-cover object-center"}
            className={"aspect-video min-w-full object-cover object-center"}
          />
          <span className="absolute top-0 left-0 w-2/5 h-full bg-zinc-900 bg-opacity-80 text-white flex flex-col gap-1 justify-center items-center hover:bg-slate-900">
            <small className="uppercase font-medium pointer-events-none">
              playlist
            </small>
            <i className="fi fi-sr-list leading-3 text-3xl pointer-events-none"></i>
          </span>
        </Link>
        <div className="lg:flex-1 h-full flex flex-col justify-between px-4 md:px-0 py-2">
          <bdi className="leading-7 h-8 overflow-hidden text-lg font-medium capitalize">
            {playListData.title}
          </bdi>
          <span className="flex justify-start items-center gap-2">
            <i className="fi fi-rr-desktop-wallpaper leading-3 bg-slate-900 text-red-400 p-2 rounded-full aspect-square inline-block"></i>
            <Link
              href={{
                pathname: "/channels",
                query: {
                  channelId: playListData.channelId,
                },
              }}
              className="uppercase font-semibold opacity-80 text-sm text-black dark:text-white"
              title={`Go to ${playListData.channelTitle} channel`}
            >
              {playListData.channelTitle}
            </Link>
          </span>
          <Link
            href={{
              pathname: "/playlist",
              query: { listId: playListData.playlistId },
            }}
            className="inline-block text-sm capitalize mt-auto text-black dark:text-white"
          >
            view full playlist videos
          </Link>
        </div>
      </div>
    );
  }
}

export default PlayListCard;
