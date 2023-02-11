import { IVideoDetails } from "@/Models/Youtube";
import { counting } from "@/utils/contants";
import { useEffect, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import {
  IoCheckmarkCircleOutline,
  IoDownloadOutline,
  IoShareSocialOutline,
} from "react-icons/io5";

interface IVideoReactionProps {
  videoDetailsData: IVideoDetails;
  likedCount: string;
  isLoading: boolean;
  isFetched: boolean;
}
function VideoReaction({
  isFetched,
  isLoading,
  likedCount,
  videoDetailsData,
}: IVideoReactionProps) {
  const [isCopeid, setIsCopeid] = useState(false);
  const shareLink = async () => {
    if ("clipboard" in navigator) {
      navigator.clipboard
        .writeText(`https://youtu.be/${videoDetailsData.items[0].id}`)
        .then(() => setIsCopeid(true));
    }
  };

  useEffect(() => {
    let timeout: number;
    if (isCopeid) {
      timeout = +setTimeout(() => {
        setIsCopeid(false);
      }, 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [isCopeid]);

  return (
    <div className="flex-1 flex md:justify-end gap-3">
      <span className="w-36 h-8 flex justify-between items-center rounded-full overflow-hidden shadow-sm divide-x divide-gray-500 bg-gray-300 dark:bg-zinc-900 capitalize text-black dark:text-white font-semibold">
        <button className="h-full w-2/3 flex-1 flex justify-center items-center gap-2  hover:bg-stone-300 dark:hover:bg-zinc-800 hover:first:text-red-700 dark:hover:first-of-type:!text-red-400">
          <p>{counting(likedCount, "")}</p>
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
      <button
        className="flex justify-center items-center rounded-full shadow-md bg-gray-300 dark:bg-zinc-900 px-4 py-1 gap-2 hover:bg-stone-300 hover:dark:bg-zinc-800 hover:first-of-type:!text-red-700 dark:hover:first-of-type:!text-red-400 capitalize dark:text-white font-semibold"
        onClick={(e) => shareLink()}
      >
        {isCopeid && (
          <>
            <IoCheckmarkCircleOutline className="leading-3 text-emerald-600 dark:text-emerald-400" />
            <small>copied</small>
          </>
        )}
        {!isCopeid && (
          <>
            <IoShareSocialOutline className="leading-3" />
            <small>share</small>
          </>
        )}
      </button>
    </div>
  );
}

export default VideoReaction;
