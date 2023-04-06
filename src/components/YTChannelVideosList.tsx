import { Iitem } from "@/Models/Youtube";
import { nanoid } from "nanoid";
import React from "react";

interface IYTChannelVideosListProps {
  data: Array<Iitem>;
  title: string;
  isFetched: boolean;
  isLoading: boolean;
  renderVideosItem: (data: Iitem) => React.ReactNode;
  //   renderPlaylistItem: (data: Iitem) => React.ReactNode;
  LoadingIndicator: (id: string) => React.ReactNode;
}
function YTChannelVideosList({
  LoadingIndicator,
  data,
  isFetched,
  isLoading,
  //   renderPlaylistItem,
  renderVideosItem,
  title,
}: IYTChannelVideosListProps) {
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
    <div className="min-w-full h-fit py-4 mb-3 flex flex-col gap-2">
      <h4 className="mb-3 capitalize text-lg font-semibold">{`${title} videos`}</h4>
      <ul
        className={`min-w-full h-fit flex flex-wrap justify-between items-center gap-3`}
      >
        {data?.map((item) => renderVideosItem!(item))}
      </ul>
    </div>
  );
}

export default YTChannelVideosList;
