import { IVideoDetails } from "@/Models/Youtube";
import React, { useEffect, useState } from "react";
import { counting } from "@/utils/contants";

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
      <div className="yt-description-box">
        <span className="flex gap-3 p-2 w-full">
          <p className="font-semibold capitalize text-sm">
            {isFetched && counting("1000000000")}
          </p>
          -
          <p className="font-semibold capitalize text-sm">
            {isFetched &&
              Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
                formatMatcher: "best fit",
                timeStyle: "medium",
              }).format(
                new Date(videoDetailsData.items?.[0].snippet.publishedAt)
              )}
          </p>
        </span>
        <span className={`description-text ${showMore ? "h-auto" : "h-16"} `}>
          {filteredYtDescriptionsArr &&
            filteredYtDescriptionsArr.map((text) => {
              const isLink = text.includes("https") || text.includes("http");
              const theLink = text.slice(text.indexOf("http"));

              return isLink ? (
                <span className="flex flex-col justify-start items-start">
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
          className="showmore-description-btn"
          onClick={() => setShowMore((show) => !show)}
        >
          <p className="text-xs font-semibold capitalize mb-0">show more</p>
          <i
            className={`fi fi-sr-${
              showMore ? "caret-up" : "caret-down"
            } leading-3 text-sm dark:text-white`}
          ></i>
        </button>
      </div>
    );
  }
}

export default YtDescriptionBox;
