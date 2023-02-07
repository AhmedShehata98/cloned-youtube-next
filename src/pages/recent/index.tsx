import VideoCard from "@/components/VideoCard";
import { Iitem } from "@/Models/Youtube";
import { recentvideos } from "@/utils/contants";
import React, { useLayoutEffect, useState } from "react";

interface IRecentVideosListProps {
  recentVideos: Iitem;
}
const RecentVideosList = ({}: IRecentVideosListProps) => {
  console.log(recentvideos);
  return (
    <div className="w-full min-h-screen lg:w-[927px] mx-auto p-3">
      <h3 className="text-lg font-medium capitalize">Recent Vidos</h3>
      <p className="text-sm opacity-50 mb-6">
        in this page you will find your last videos you watched and you can go
        back to watch them
      </p>
      <ul className="w-full h-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {recentvideos &&
          recentvideos.map((recentvideo) => (
            <VideoCard videoData={recentvideo} />
          ))}
      </ul>
    </div>
  );
};

export default RecentVideosList;
