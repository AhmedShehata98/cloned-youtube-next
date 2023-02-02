import { IYtChannel, Iitem } from "@/Models/Youtube";
import { Query, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect } from "react";
import { getChannelDetails } from "@/services/api/youtubeAPI";
import { formatCount } from "@/utils/contants";
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
      className="flex items-start justify-start rounded-sm shadow-sm border bg-gray-100 mt-8"
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
