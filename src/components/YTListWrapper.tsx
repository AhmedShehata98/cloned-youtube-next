import { Iitem, IYTVideosResponse } from "@/Models/Youtube";
import { nanoid } from "nanoid";
import React from "react";

interface IYTListWrapperProps {
  data: IYTVideosResponse;
  title: string;
  isFetched: boolean;
  isLoading: boolean;
  renderVideosItem: (data: Iitem) => React.ReactNode;
  renderChannelItem: (data: Iitem) => React.ReactNode;
  renderPlaylistItem: (data: Iitem) => React.ReactNode;
  LoadingIndicator: (id: string) => React.ReactNode;
}
function YTListWrapper({
  data,
  renderVideosItem,
  isFetched,
  isLoading,
  title,
  renderChannelItem,
  renderPlaylistItem,
  LoadingIndicator,
}: Partial<IYTListWrapperProps>) {
  const dummyArrayofVideos = new Array(20).fill(nanoid(8));

  if (isLoading) {
    return (
      <div className="w-full h-fit p-3 mb-3 flex flex-col gap-2">
        <ul
          className={`w-full h-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2`}
        >
          {dummyArrayofVideos.map((_, idx) =>
            LoadingIndicator!(idx.toString())
          )}
        </ul>
      </div>
    );
  }
  return (
    <div className="min-w-full h-fit p-3 mb-3 flex flex-col gap-2">
      <h4 className="mb-3 capitalize text-lg font-semibold">{`${title} videos`}</h4>
      <ul className={`min-w-full h-fit flex flex-wrap gap-3`}>
        {data?.data.map((item) => {
          if (item.type.includes("video")) {
            return renderVideosItem!(item);
          } else if (item.type.includes("playlist")) {
            return renderPlaylistItem!(item);
          } else if (item.type.includes("channel")) {
            return renderChannelItem!(item);
          }
        })}
      </ul>
    </div>
  );
}

export default YTListWrapper;
