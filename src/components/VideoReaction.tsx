import { IVideoDetails } from "@/Models/Youtube";
import React from "react";

interface IVideoReactionProps {
  videoDetailsData: IVideoDetails;
  isLoading: boolean;
  isFetched: boolean;
}
function VideoReaction({
  isFetched,
  isLoading,
  videoDetailsData,
}: IVideoReactionProps) {
  return (
    <div className="flex-1 flex md:justify-end gap-3">
      <span className="w-36 h-8 flex justify-between items-center rounded-full overflow-hidden shadow-sm divide-x divide-gray-500 bg-gray-300 dark:bg-zinc-900 capitalize text-black dark:text-white font-semibold">
        <button className="h-full w-2/3 flex-1 flex justify-center items-center gap-2  hover:bg-stone-300 dark:hover:bg-zinc-800 hover:first:text-red-700 dark:hover:first-of-type:!text-red-400">
          <i className="inline-block rotate-180  leading-3 fi fi-rr-hand"></i>
          <p>{videoDetailsData?.items?.[0].statistics.likeCount}</p>
        </button>
        <button className="h-full w-1/3 flex items-center justify-center rounded-tr-full rounded-br-full hover:bg-stone-300 hover:dark:bg-zinc-800 hover:first-of-type:!text-red-700">
          <i className="fi fi-rr-hand leading-3 "></i>
        </button>
      </span>
      <button className="flex justify-center items-center rounded-full shadow-md bg-gray-300 dark:bg-zinc-900 px-4 py-1 gap-2 hover:bg-stone-300 hover:dark:bg-zinc-800 hover:first-of-type:!text-red-700 dark:hover:first-of-type:!text-red-400 capitalize dark:text-white font-semibold">
        <i className="fi fi-rr-download leading-3 "></i>
        <small>download</small>
      </button>
    </div>
  );
}

export default VideoReaction;
