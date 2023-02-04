import VideoCard from "@/components/VideoCard";
import { IRecentVideos } from "@/Models/Youtube";
import React, { useLayoutEffect, useState } from "react";

interface IRecentVideosListProps {
  recentVideos: IRecentVideos;
}
const RecentVideosList = ({}: IRecentVideosListProps) => {
  const [recentVideos, setRecentVideos] = useState<IRecentVideos>();
  useLayoutEffect(() => {
    if (window.localStorage.getItem("recentVideos")) {
      const parsedRecentVideos: IRecentVideos = JSON.parse(
        window.localStorage.getItem("recentVideos")!
      );
      setRecentVideos(parsedRecentVideos);
    }
  }, []);
  return (
    <div className="w-full min-h-screen lg:w-[927px] mx-auto">
      <h3>Recent View</h3>
      <ul className="w-full h-fit grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2"></ul>
    </div>
  );
};

export default RecentVideosList;
