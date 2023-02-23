import { Iitem, ISuggestVideoItems, IYtSuggestVideos } from "@/Models/Youtube";
import React from "react";

interface IRelatedVideosListProps {
  relatedVideosData: IYtSuggestVideos;
  isLoading: boolean;
  isFetched: boolean;
  renderVideosList: (items: ISuggestVideoItems) => React.ReactNode;
  renderPlaylistList: (items: Iitem) => React.ReactNode;
  skeltonLoading: (id: number) => React.ReactNode;
}

const RelatedVideosList = ({
  relatedVideosData,
  renderPlaylistList,
  renderVideosList,
  skeltonLoading,
  isFetched,
  isLoading,
}: IRelatedVideosListProps) => {
  const dummyVideos = new Array(15).fill(7);
  if (isFetched && !isLoading) {
    return (
      <aside className="w-full lg:w-1/3 mt-12 lg:mt-0">
        <span className="w-full flex justify-center items-center gap-3 capitalize text-lg font-medium border-l-4 border-red-400 bg-zinc-200 dark:bg-zinc-800 px-2 py-1.5 mb-10">
          <h4>realated videos</h4>
          <i className="fi fi-sr-angle-small-down leading-3 dark:text-white"></i>
        </span>
        {relatedVideosData.items.map((item) => {
          return renderVideosList(item);
        })}
      </aside>
    );
  } else {
    return (
      <aside className="w-full lg:w-1/3">
        {dummyVideos.map((_, idx) => skeltonLoading(idx))}
      </aside>
    );
  }
};

export default RelatedVideosList;
