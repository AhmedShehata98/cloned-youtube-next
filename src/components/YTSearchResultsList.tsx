import { Iitem, IChannelItem, IYTVideosResponse } from "@/Models/Youtube";
import React from "react";

interface IYTSearchResultsListProps {
  title: string;
  data: IYTVideosResponse;
  ErrorComponent: () => React.ReactNode;
  LoadingIndicator: (idx: string) => React.ReactNode;
  renderChannelItem: (data: Iitem) => React.ReactNode;
  renderPlaylistItem: (data: Iitem) => React.ReactNode;
  renderVideoItem: (data: Iitem) => React.ReactNode;
  isFetched: boolean;
  isLoading: boolean;
  isError: boolean;
}

function YTSearchResultsList({
  title,
  data,
  isFetched,
  isLoading,
  isError,
  ErrorComponent,
  LoadingIndicator,
  renderChannelItem,
  renderVideoItem,
  renderPlaylistItem,
}: IYTSearchResultsListProps) {
  const fakeLaodingDataArr = new Array(10).fill("fake-data");
  if (isFetched && !isLoading) {
    return (
      <div className="px-3 flex flex-col mt-2 mb-8">
        <span className="flex mb-6 mt-3 ">
          <h3 className="font-semibold text-lg uppercase text-red-600 mr-3">
            search about :
          </h3>
          <h3 className="font-semibold text-lg">{title}</h3>
        </span>
        <ul className="w-full grid grid-flow-row gap-4">
          {data.data.map((item) => {
            if (item.type.includes("video")) return renderVideoItem(item);
            if (item.type.includes("playlist")) return renderPlaylistItem(item);
            if (item.type.includes("channel"))
              return (
                <ul>
                  <h3 className="font-medium uppercase text-lg">Channel</h3>
                  {renderChannelItem(item)}
                </ul>
              );
          })}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="mx-2">
        <ul className="grid grid-flow-row gap-3">
          {fakeLaodingDataArr.map((_, idx) => LoadingIndicator(idx.toString()))}
        </ul>
      </div>
    );
  }
}

export default YTSearchResultsList;
