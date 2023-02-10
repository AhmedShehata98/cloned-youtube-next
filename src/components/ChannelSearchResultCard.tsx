import { Iitem } from "@/Models/Youtube";
import Link from "next/link";
import React from "react";

interface IChannelSearchResultCardProps {
  channelResultData: Iitem;
}
function ChannelSearchResultCard({
  channelResultData,
}: IChannelSearchResultCardProps) {
  return (
    <Link
      href={{
        pathname: "/channels",
        query: {
          channelId: channelResultData.snippet.channelId,
        },
      }}
      key={channelResultData.id.channelId || channelResultData.id.videoId}
      className="flex items-start justify-start rounded-sm shadow-sm border dark:border-zinc-500 bg-gray-100 dark:bg-zinc-800 mt-8"
    >
      <figure className="w-[35%] flex items-center justify-center py-8 px-2">
        <img
          src={channelResultData.snippet.thumbnails.default.url}
          alt={"channel-logo-img"}
          className="w-28 aspect-square object-cover rounded-full shadow-lg"
        />
      </figure>
      <div className="flex flex-col flex-1 justify-start items-start px-2 py-3">
        <bdi className="font-medium text-base md:text-lg mb-3">
          {channelResultData.snippet.channelTitle}
        </bdi>
        <p className="opacity-80 font-semibold">
          {channelResultData.snippet.description}
        </p>
        <small className="opacity-80">
          {new Date(channelResultData.snippet.publishTime).toDateString()}
        </small>
      </div>
    </Link>
  );
}

export default ChannelSearchResultCard;
