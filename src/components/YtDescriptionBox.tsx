import { IVideoDetails } from "@/Models/Youtube";
import React, { useEffect, useState } from "react";

interface IYtDescriptionBoxProps {
  videoDetailsData: IVideoDetails;
  isLoading: boolean;
  isFetched: boolean;
}
function YtDescriptionBox({
  videoDetailsData,
  isLoading,
  isFetched,
}: IYtDescriptionBoxProps) {
  const [showMore, setShowMore] = useState<boolean>(false);
  const filteredYtDescriptionsArr =
    videoDetailsData?.items?.[0].snippet.localized.description.split("\n");

  const localDate = new Date(
    videoDetailsData.items?.[0].snippet.publishedAt
  ).toLocaleDateString();

  useEffect(() => {
    if (!showMore) {
      window.scrollTo({ behavior: "smooth", top: 0 });
      console.log("scrolled");
    }
  }, [showMore]);

  if (isLoading) {
    return (
      <div className="w-full h-28">
        <span className="w-6 h-6 border border-red-500 border-l-transparent animate-spin"></span>
      </div>
    );
  } else {
    return (
      <div className="shadow-md rounded-xl m-1 bg-gray-300 overflow-hidden">
        <span className="flex gap-3 p-2 w-full">
          <p className="font-semibold capitalize text-sm">
            {videoDetailsData.items?.[0].statistics.viewCount + " views"}
          </p>
          -
          <p className="font-semibold capitalize text-sm">
            {"at " + videoDetailsData.items?.[0].snippet.publishedAt}
          </p>
        </span>
        <span
          className={`inline-block px-3 mb-3 overflow-hidden ${
            showMore ? "h-auto" : "h-16"
          } `}
        >
          {filteredYtDescriptionsArr &&
            filteredYtDescriptionsArr.map((text) => {
              const isLinks = text.startsWith("http");
              return isLinks ? (
                <>
                  <a
                    className="text-sm text-sky-600"
                    href={text}
                    target={"_blank"}
                    referrerPolicy="no-referrer"
                  >
                    {text}
                  </a>
                  <br />
                </>
              ) : (
                <>
                  <small className="opacity-90">{text}</small>
                  <br />
                </>
              );
            })}
        </span>
        <button
          className="flex justify-center items-center gap-2 w-full bg-gray-400 p-1.5"
          onClick={() => setShowMore((show) => !show)}
        >
          <p className="text-xs font-semibold capitalize mb-0">show more</p>
          <i
            className={`fi fi-sr-${
              showMore ? "caret-up" : "caret-down"
            } leading-3 text-sm`}
          ></i>
        </button>
      </div>
    );
  }
}

export default YtDescriptionBox;