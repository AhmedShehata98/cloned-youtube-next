import { Iitem } from "@/Models/Youtube";
import Link from "next/link";
import React from "react";

interface IPlayListCardProps {
  playListData: Iitem;
}

function PlayListCard({ playListData }: IPlayListCardProps) {
  return (
    <div
      key={playListData.snippet.channelId}
      className="relative yt-card shadow-sm border border-gray-300"
    >
      <div
        className="relative w-full aspect-video"
        title={playListData.snippet.title}
      >
        <span className="absolute top-0 left-0 w-2/5 h-full flex flex-col items-center justify-center bg-zinc-900 bg-opacity-90 text-white p-2">
          <i className="fi fi-rr-list"></i>
          playList
        </span>
        <Link
          href={{
            pathname: "/playlist",
            query: {
              listId: playListData.id.playlistId,
            },
          }}
          className="w-full aspect-video"
        >
          <img
            src={playListData.snippet.thumbnails.medium.url}
            alt="playlist-thumb-img"
            className="w-full h-full object-cover aspect-video"
          />
        </Link>
      </div>
      <div className="w-full flex-1 flex flex-col p-2 bg-gray-100 border-t-4 border-red-400">
        <Link
          href={{
            pathname: "/playlist",
            query: {
              listId: playListData.id.playlistId,
            },
          }}
        >
          <bdi className="inline-block truncate max-w-full">
            {playListData.snippet.title}
          </bdi>
        </Link>
        <small className="font-medium opacity-70">
          {playListData.snippet.channelTitle}
        </small>
      </div>
    </div>
  );
}

export default PlayListCard;
