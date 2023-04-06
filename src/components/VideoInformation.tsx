import { recentVideosLocalStorageKey } from "@/features/globalRecentVideosData";
import { Iitem, IVideoDetails } from "@/Models/Youtube";
import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";

interface IVideoInformationProps {
  videoDetailsData: IVideoDetails;
}
function VideoInformation({ videoDetailsData }: IVideoInformationProps) {
  const [channelImage, setChannelImage] = React.useState("");
  React.useEffect(() => {
    const lsVideoData = JSON.parse(
      localStorage.getItem(recentVideosLocalStorageKey)!
    )?.slice(0, 1) as Iitem[];
    if (lsVideoData) {
      setChannelImage(lsVideoData?.[0].channelThumbnail?.[0]?.url);
    }
  }, []);

  return (
    <div className="flex w-max gap-2 mb-3 lg:mb-0">
      <img
        className="aspect-square rounded-full shadow-sm"
        src={channelImage}
        alt="channel-img"
      />
      <span className="flex flex-col items-start justify-center gap-2">
        <span className="flex items-center justify-center">
          <b className="px-2">
            {videoDetailsData.items?.[0].snippet.channelTitle}
          </b>
          {videoDetailsData.items?.[0].contentDetails.licensedContent && (
            <BsCheckCircleFill className="text-sm text-zinc-500 dark:text-zinc-300" />
          )}
        </span>
        <button className="option-btn shadow-sm text-sm ml-2">
          <p>subscribe</p>
        </button>
      </span>
    </div>
  );
}

export default VideoInformation;
