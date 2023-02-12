import VideoCard from "@/components/VideoCard";
import { recentvideos } from "@/features/globalRecentVideosData";
import { Iitem } from "@/Models/Youtube";
import React, { useLayoutEffect, useState } from "react";

const RecentVideosList = () => {
  const [recentVideosState, setRecentVideosState] = useState<Iitem[]>([]);
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      recentvideos.handleGetbackStorage();
      setRecentVideosState(recentvideos.getStorageData);
    }
  }, []);

  return (
    <div className="w-full min-h-screen lg:w-[927px] mx-auto p-3">
      <h3 className="text-lg font-medium capitalize">Recent Vidos</h3>
      <p className="text-sm opacity-50 mb-6">
        in this page you will find your last videos you watched and you can go
        back to watch them
      </p>
      {Boolean(recentVideosState.length) ? (
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {recentVideosState.map((recentvideo, idx) => (
            <VideoCard key={idx} videoData={recentvideo} />
          ))}
        </ul>
      ) : (
        <div className="w-1/2 lg:w-1/3 mx-auto mt-16 lg:mt-28">
          <img src="/no-data-amico.svg" alt="no-data.svg" />
          <p className="opacity-75 text-red-600 dark:text-red-300 font-medium uppercase text-sm text-center">
            Hmmmm its looks like is there is no data yet to show you.
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentVideosList;
