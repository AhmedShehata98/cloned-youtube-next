import ErrorFetchingData from "@/components/ErrorFetchingData";
import PlaylistWrapper from "@/components/PlaylistWrapper";
import { IPlaylist } from "@/Models/Youtube";
import { getPlaylistFetcher } from "@/services/api/youtubeAPI";
import {
  dehydrate,
  isError,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Playlist = () => {
  const {
    query: { listId },
  } = useRouter();

  const {
    data: playlistData,
    isError: isErrorPlatlistData,
    error: errorPlatlistData,
    isLoading: isLoadingPlatlistData,
    isFetched: isFetchedPlatlistData,
  } = useQuery<IPlaylist, Error>(
    ["playlist", listId],
    () => getPlaylistFetcher(listId as string),
    {
      retry: 0,
    }
  );

  if (isErrorPlatlistData) {
    return(
        <>
            <Head>network Error - Cloned YouTube</Head>
            <ErrorFetchingData error={errorPlatlistData?.message} />;
        </>
    )
  }
  return (
    <>
      <Head>
          <title>{playlistData?.meta?.title} - Cloned YouTube</title>
      </Head>
      <article className="w-screen flex flex-col md:flex-row justify-between items-start">
          <div className={"md:w-1/3 w-full min-h-[85vh] border border-red-900 shadow-md rounded-lg overflow-hidden p-4 bg-red-700 dark:bg-red-500 my-5"}>
              <img className={"max-w-full object-center object-cover shadow-2xl mx-auto mb-4"} src={playlistData?.meta.avatar[playlistData?.meta.avatar.length -1].url} alt={"playlist-image"} />
              <div className={"flex flex-col items-start"}>
                  <h3 className={"font-bold text-lg mb-3"}>{playlistData?.meta.title}</h3>
                  <p className={"mb-2 opacity-70"}>{playlistData?.meta.channelTitle}</p>
                  <span className={"flex justify-center gap-4 truncate overflow-hidden mb-7"}>
                      <small>
                          {`${playlistData?.meta.videoCount} video`}
                      </small>
                      <small>
                          {`${playlistData?.meta.viewCount} views`}
                      </small>
                      <small>
                          {`${playlistData?.meta.lastUpdated}  `}
                      </small>
                  </span>
                  <small className={'leading-4 h-48 overflow-hidden'}>{playlistData?.meta.description}</small>
              </div>
          </div>
         <PlaylistWrapper
             playlistVideosData={playlistData?.data!}
             isFetched={isFetchedPlatlistData}
             isLoading={isLoadingPlatlistData}
         />
      </article>
    </>
  );
};

export default Playlist;
