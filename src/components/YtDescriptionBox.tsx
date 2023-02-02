import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
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

  TimeAgo.addDefaultLocale(en);
  const timeago = new TimeAgo("en-US");

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
            {isFetched &&
              timeago.format(
                new Date(
                  videoDetailsData.items?.[0].snippet.publishedAt
                ).getTime()
              )}
          </p>
        </span>
        <span
          className={`inline-block px-3 mb-3 overflow-hidden ${
            showMore ? "h-auto" : "h-16"
          } `}
        >
          {filteredYtDescriptionsArr &&
            filteredYtDescriptionsArr.map((text) => {
              const isLink = text.includes("https") || text.includes("http");
              const theLink = text.slice(text.indexOf("http"));

              return isLink ? (
                <span className="flex gap-1 justify-start items-center">
                  <small className="opacity-90">{text}</small>
                  <a
                    className="text-sm text-sky-600"
                    href={theLink}
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    {theLink}
                  </a>
                  <br />
                </span>
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
