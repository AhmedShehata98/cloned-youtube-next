import { Iitem, IChannelDetails } from "@/Models/Youtube";
import { getChannelDetails } from "@/services/api/youtubeAPI";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface IChannelCardProps {
  channel: Iitem;
}
function ChannelCard({ channel }: IChannelCardProps) {
  return (
    <Link
      href={{
        pathname: "/channels",
        query: { channelId: channel.id.channelId },
      }}
      className="flex max-h justify-start items-start flex-col bg-gray-200 shadow-sm border border-gray-300"
    >
      <div className="w-full flex flex-col items-center justify-start gap-2 p-2 bg-gray-100 border-t-4  border-red-500">
        <figure className="w-16 rounded-full aspect-square overflow-hidden ">
          <img
            src={channel?.snippet.thumbnails.default.url}
            alt="channel-thumb.jpg"
            className="w-full aspect-square"
          />
        </figure>
        <span className="flex flex-col border-b-2">
          <b className="text-sm text-center mb-1">
            {channel?.snippet.channelTitle}
          </b>
          <small className="font-mediums opacity-80">
            {channel?.snippet?.channelId}
          </small>
        </span>
      </div>
      <div className="flex flex-col px-3 py-2">
        <p className="font-normal text-sm capitalize opacity-80">
          {channel?.snippet.description}
        </p>
      </div>
    </Link>
  );
}

export default ChannelCard;
