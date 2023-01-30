import { Iitem, IYTVideosResponse } from "@/Models/Youtube";
import { nanoid } from "nanoid";
import React from "react";

interface IYTListWrapperProps {
  data: IYTVideosResponse;
  title: string;
  isFetched: boolean;
  isLoading: boolean;
  isPaused: boolean;
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
  isPaused,
  isError,
  title,
  renderChannelItem,
  renderPlaylistItem,
  LoadingIndicator,
  ErrorComponent,
}: Partial<IYTListWrapperProps>) {
  const dummyArrayofVideos = new Array(20).fill(nanoid(8));
  const notConnection = !isFetched && isError && !isLoading;

  if (isPaused) {
    return <>{ErrorComponent}</>;
  }
  if (isLoading) {
    return (
      <div className="w-full h-fit p-3 mb-3 flex flex-col gap-2">
        <ul
          className={`w-full h-fit ${
            notConnection ? "flex " : "grid"
          }  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2`}
        >
          {dummyArrayofVideos.map((_, idx) =>
            LoadingIndicator!(idx.toString())
          )}
        </ul>
      </div>
    );
  }
  if (isFetched) {
    return (
      <div className="min-w-full h-fit p-3 mb-3 flex flex-col gap-2">
        <h4 className="mb-3 capitalize text-lg font-semibold">{`${title} videos`}</h4>
        <ul className={`min-w-full h-fit flex flex-wrap gap-3`}>
          {data!.items.map((item) => {
            const itemKind = item.id.kind.split("#");
            if (itemKind.includes("video")) {
              return renderVideosItem!(item);
            } else if (itemKind.includes("playlist")) {
              return renderPlaylistItem!(item);
            } else if (itemKind.includes("channel")) {
              return renderChannelItem!(item);
            }
          })}
        </ul>
      </div>
    );
  }
  // default return Elements
  return (
    <div className="w-full h-fit p-3 mb-3 flex flex-col gap-2">
      <ul
        className={`w-full h-fit ${
          notConnection ? "flex " : "grid"
        }  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2`}
      >
        {dummyArrayofVideos.map((_, idx) => LoadingIndicator!(idx.toString()))}
      </ul>
    </div>
  );
}

export default YTListWrapper;

// if (isLoading && !isFetched) {
//   return (
//     <div className="w-full h-fit p-3 mb-3 flex flex-col gap-2">
//       <h4 className="mb-3 capitalize text-lg font-semibold">{`${title} videos`}</h4>
//       <ul
//         className={`w-full h-fit ${
//           notConnection ? "flex " : "grid"
//         }  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2`}
//       >
//         {dummyArrayofVideos.map((_, idx) =>
//           LoadingIndicator!(idx.toString())
//         )}
//       </ul>
//     </div>
//   );
// } else if (isPaused) {
//   return (
//     <div className="w-full h-fit p-3 mb-3 flex flex-col gap-2">
//       <h4 className="mb-3 capitalize text-lg font-semibold">{`${title} videos`}</h4>
//       <ul
//         className={`w-full h-fit ${
//           notConnection ? "flex " : "grid"
//         }  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2`}
//       >
//         {ErrorComponent}
//       </ul>
//     </div>
//   );
// } else {
//   return (
//     <div className="min-w-full h-fit p-3 mb-3 flex flex-col gap-2">
//       <h4 className="mb-3 capitalize text-lg font-semibold">{`${title} videos`}</h4>
//       <ul className={`min-w-full h-fit flex flex-wrap gap-3`}>
//         {data!.items.map((item) => {
//           const itemKind = item.id.kind.split("#");
//           if (itemKind.includes("video")) {
//             return renderVideosItem!(item);
//           } else if (itemKind.includes("playlist")) {
//             return renderPlaylistItem!(item);
//           } else if (itemKind.includes("channel")) {
//             return renderChannelItem!(item);
//           }
//         })}
//       </ul>
//     </div>
//   );
// }
