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
}: IYTSearchResultsListProps) {
  if (isFetched && !isLoading) {
    return (
      <div>
        <h3 className="font-semibold text-lg uppercase mb-6 mt-3">{title}</h3>
        <ul className="w-full grid grid-flow-row gap-3">
          {data.items.map((item) => {
            return renderVideoItem(item);
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
