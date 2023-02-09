import VideoCard from "@/components/VideoCard";
import { handleGetbackVideoRecents, recentvideos } from "@/utils/contants";
import React, { useEffect } from "react";

const RecentVideosList = () => {
  useEffect(() => {
    if (recentvideos.length >= 0) {
      handleGetbackVideoRecents();
    }
  }, []);

  return (
    <div className="w-full min-h-screen lg:w-[927px] mx-auto p-3">
      <h3 className="text-lg font-medium capitalize">Recent Vidos</h3>
      <p className="text-sm opacity-50 mb-6">
        in this page you will find your last videos you watched and you can go
        back to watch them
      </p>
      {recentvideos.length <= 0 ? (
        <div className="w-2/3 lg:w-1/3 mx-auto mt-28">
          <img src="/no-data.svg" alt="no-data.svg" />
          <p className="opacity-75 text-red-600 dark:text-red-300 font-medium uppercase text-sm text-center">
            Hmmmm its looks like is there is no data yet to show you.
          </p>
        </div>
      ) : (
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {Array.isArray(recentvideos) &&
            recentvideos.map((recentvideo) => (
              <VideoCard videoData={recentvideo} />
            ))}
        </ul>
      )}
    </div>
  );
};

export default RecentVideosList;
