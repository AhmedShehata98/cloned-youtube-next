import React from "react";
import {IPlayListVideos} from "@/Models/Youtube";


import PlaylistVideoCard from "@/components/PlaylistVideoCard";
interface IPlaylistWrapperProps {
  playlistVideosData : IPlayListVideos[];
  isFetched: boolean,
  isLoading : boolean,
}

function PlaylistWrapper({playlistVideosData,isFetched,isLoading}: IPlaylistWrapperProps) {
  if(isLoading){
    return  (<div>
      <h2>Loading Data ..</h2>
    </div>)
  }
  return (
      <ol className={"w-full lg:w-2/3 list-decimal max-h-[85vh] overflow-y-auto mx-auto my-1 mb-16 lg:my-5 px-3 divide-y-2 divide-zinc-500"}>
        {
            isFetched && playlistVideosData.map((video)=>(
                <PlaylistVideoCard key={video.index} videoData={video}/>
            ))
        }
      </ol>
);
}


export default PlaylistWrapper;