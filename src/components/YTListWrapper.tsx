import { Iitem, IYTVideosResponse } from "@/Models/Youtube";
import React from "react";

interface IYTListWrapperProps {
  data: IYTVideosResponse;
  title: string;
  isFetched: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  renderVideosItem: (data: Iitem) => React.ReactNode;
  renderChannelItem: (data: Iitem) => React.ReactNode;
  renderPlaylistItem: (data: Iitem) => React.ReactNode;
  LoadingIndicator: (id: string) => React.ReactNode;
  ErrorComponent: React.ReactNode;
}
function YTListWrapper({
  data,
  renderVideosItem,
  isFetched,
  isLoading,
  isSuccess,
  isError,
  title,
  renderChannelItem,
  renderPlaylistItem,
  LoadingIndicator,
  ErrorComponent,
}: IYTListWrapperProps) {
  const dummyArrayofVideos = new Array(20).fill("dummyVideoArray");
  const notConnection = !isFetched && isError && !isLoading;

  if (isFetched) {
    data.items.forEach((item) =>
      item.id.kind.split("#").includes("playlist") ? console.log(item) : ""
    );
  }

  if (isLoading && !isFetched && !isSuccess) {
    return (
      <div className="w-full h-fit p-3 mb-3 flex flex-col gap-2">
        <h4 className="mb-3 capitalize text-lg font-semibold">{`${title} videos`}</h4>
        <ul
          className={`w-full h-fit ${
            notConnection ? "flex " : "grid"
          }  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2`}
        >
          {dummyArrayofVideos.map((vid) => LoadingIndicator(vid.id))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="w-full h-fit p-3 mb-3 flex flex-col gap-2">
        <h4 className="mb-3 capitalize text-lg font-semibold">{`${title} videos`}</h4>
        <ul
          className={`w-full h-fit ${
            notConnection ? "flex " : "grid"
          }  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}
        >
          {data.items.map((item) => {
            if (item.id.kind.split("#").includes("video")) {
              return renderVideosItem(item);
            } else if (item.id.kind.split("#").includes("playlist")) {
              return renderPlaylistItem(item);
            } else if (item.id.kind.split("#").includes("channel")) {
              return renderChannelItem(item);
            }
          })}
        </ul>
      </div>
    );
  }
}

export default YTListWrapper;

// {isLoading &&
//   dummyArrayofVideos.map(() => isLoading && LoadingIndicator)}
// {notConnection && ErrorComponent}
// {isFetched &&
//   data &&
//   data.items.map((item) => {
//     if (isSuccess && isFetched) {
//       if (item.id.kind?.includes("video")) {
//         return renderVideosItem(item);
//       } else if (item.id.kind?.includes("channel")) {
//         return renderChannelItem!(item);
//       } else {
//         return renderVideosItem(item);
//       }
//     }
//   })}
