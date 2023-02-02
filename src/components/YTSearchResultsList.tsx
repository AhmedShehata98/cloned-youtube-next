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
  if (isFetched && !isLoading) {
    return (
      <div className="px-3 flex flex-col mt-2">
        <span className="flex mb-6 mt-3 ">
          <h3 className="font-semibold text-lg uppercase text-red-600 mr-3">
            search about :
          </h3>
          <h3 className="font-semibold text-lg">{title}</h3>
        </span>
        <ul className="w-full grid grid-flow-row gap-4">
          {data.items.map((item) => {
            const kindType = item.id.kind.split("#");
            if (kindType.includes("video")) return renderVideoItem(item);
            if (kindType.includes("playlist")) return renderPlaylistItem(item);
            if (kindType.includes("channel"))
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
      <div>
        <ul>loading ...</ul>
      </div>
    );
  }
}

export default YTSearchResultsList;
