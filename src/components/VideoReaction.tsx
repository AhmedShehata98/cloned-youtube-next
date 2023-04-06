import { IVideoDetails } from "@/Models/Youtube";
import { counting } from "@/utils/contants";
import { useEffect, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineAddToQueue, MdReportProblem } from "react-icons/md";

// import {handleAddToRecents} from '@/utils/historyStorage';
import {
  IoCheckmarkCircleOutline,
  IoDownloadOutline,
  IoShareSocialOutline,
  IoShareSocialSharp,
} from "react-icons/io5";
import Portal from "@/hooks/Portal";
import DownloadWindow from "./downloadWindow/DownloadWindow";

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
  const [isCopeid, setIsCopeid] = useState<boolean>(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState<boolean>(false);
  const [showDownloadWindow, setShowDownloadWindow] = useState<boolean>(false);
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
    <div className="w-full md:w-max flex items-center md:justify-end gap-1 overflow-hidden">
      <span className="reaction-wrapper">
        <button className="like-reaction">
          <p>{counting(likedCount, "")}</p>
          <AiOutlineLike className="leading-3 " />
        </button>
        <button className="dislike-reaction">
          <AiOutlineDislike className="leading-3 " />
        </button>
      </span>
      <button
        className="option-btn"
        onClick={() => setShowDownloadWindow((c) => !c)}
      >
        <IoDownloadOutline className="leading-3" />
        <small>download</small>
      </button>
      <button
        className="hidden lg:flex justify-center items-center rounded-full shadow-md bg-gray-300 dark:bg-zinc-900 px-4 py-1 gap-2 hover:bg-stone-300 hover:dark:bg-zinc-800 hover:first-of-type:!text-red-700 dark:hover:first-of-type:!text-red-400 capitalize dark:text-white font-semibold"
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
      <button
        className="w-8 h-8 p-0 option-btn"
        onClick={(e) => setShowOptionsMenu((curr) => !curr)}
      >
        <BsThreeDots className="text-xl" />
        {showOptionsMenu && (
          <div className="yt-options">
            <ul className="yt-options-list">
              <button type="button" className="yt-option-btn">
                <MdOutlineAddToQueue />
                <p className="text-sm capitalize">watch later</p>
              </button>
              <button
                type="button"
                className="md:hidden yt-option-btn"
                onClick={(e) => shareLink()}
              >
                {isCopeid && (
                  <>
                    <IoShareSocialSharp className="leading-3 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-sm capitalize">copied</p>
                  </>
                )}
                {!isCopeid && (
                  <>
                    <IoShareSocialSharp className="leading-3" />
                    <p className="text-sm capitalize">share</p>
                  </>
                )}
              </button>
              <button type="button" className="yt-option-btn">
                <MdReportProblem />
                <p className="text-sm capitalize">report</p>
              </button>
            </ul>
          </div>
        )}
      </button>
      {showDownloadWindow && (
        <Portal>
          <DownloadWindow
            videoDetailsData={videoDetailsData}
            setShowDownloadWindow={setShowDownloadWindow}
          />
        </Portal>
      )}
    </div>
  );
}

export default VideoReaction;
