import { IVideoDetails } from "@/Models/Youtube";
import { counting } from "@/utils/contants";
import { useCallback, useRef, useEffect } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { IoDownloadOutline } from "react-icons/io5";

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
  const LikesCountRef = useRef<HTMLElement | null>(null);

  return (
    <div className="flex-1 flex md:justify-end gap-3">
      <span className="w-36 h-8 flex justify-between items-center rounded-full overflow-hidden shadow-sm divide-x divide-gray-500 bg-gray-300 dark:bg-zinc-900 capitalize text-black dark:text-white font-semibold">
        <button className="h-full w-2/3 flex-1 flex justify-center items-center gap-2  hover:bg-stone-300 dark:hover:bg-zinc-800 hover:first:text-red-700 dark:hover:first-of-type:!text-red-400">
          <p>
            {isFetched &&
              counting(videoDetailsData?.items?.[0]?.statistics?.likeCount)}
          </p>
          <AiOutlineLike className="leading-3 " />
        </button>
        <button className="h-full w-1/3 flex items-center justify-center rounded-tr-full rounded-br-full hover:bg-stone-300 hover:dark:bg-zinc-800 hover:first-of-type:!text-red-700">
          <AiOutlineDislike className="leading-3 " />
        </button>
      </span>
      <button className="flex justify-center items-center rounded-full shadow-md bg-gray-300 dark:bg-zinc-900 px-4 py-1 gap-2 hover:bg-stone-300 hover:dark:bg-zinc-800 hover:first-of-type:!text-red-700 dark:hover:first-of-type:!text-red-400 capitalize dark:text-white font-semibold">
        <IoDownloadOutline className="leading-3" />
        <small>download</small>
      </button>
    </div>
  );
}

export default VideoReaction;
