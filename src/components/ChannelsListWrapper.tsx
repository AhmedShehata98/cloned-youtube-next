import { IYtChannel, IYTVideosResponse } from "@/Models/Youtube";
import React from "react";

interface IChannelsListWrapperProps {
  title: string;
  data: IYTVideosResponse;
  isFetched: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  renderChannelItem: (channel: IYtChannel) => React.ReactNode;
  LoadingIndicator: React.ReactNode;
  ErrorComponent: React.ReactNode;
}
function ChannelsListWrapper({
  title,
  data,
  ErrorComponent,
  LoadingIndicator,
  isError,
  isFetched,
  isLoading,
  isSuccess,
  renderChannelItem,
}: IChannelsListWrapperProps) {
  const channels = fitlerDataGetChannels(data);

  function fitlerDataGetChannels(data: IYTVideosResponse) {
    const channels =
      isFetched && !isError && data.data.filter((item) => item?.channelId);

    return channels;
  }
  console.log(channels);
  return (
    <div className="w-full h-fit divide-y divide-gray-400">
      <ul></ul>
    </div>
  );
}

export default ChannelsListWrapper;
