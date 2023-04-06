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
import Image from "next/image";

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
          <div className={"md:w-1/3 w-11/12 min-h-[70vh] lg:min-h-[85vh] text-center border border-red-900 shadow-md rounded-lg overflow-hidden p-4 bg-red-700 dark:bg-red-500 mx-auto my-5"}>
              <Image
                  className={"max-w-full object-center object-cover shadow-2xl mx-auto mb-4"}
                  src={playlistData?.meta?.avatar[playlistData?.meta.avatar.length -1].url!}
                  width={playlistData?.meta?.avatar?.[playlistData?.meta.avatar.length -1].width}
                  height={playlistData?.meta?.avatar?.[playlistData?.meta.avatar.length -1].height}
                  alt={"playlist-image"}
              />
              <div className={"flex flex-col items-start"}>
                  <h3 className={"font-bold text-lg mb-3"}>{playlistData?.meta.title}</h3>
                  <p className={"mb-2 opacity-70"}>{playlistData?.meta.channelTitle}</p>
                  <span className={"w-full flex justify-center items-center gap-4 truncate overflow-hidden mb-7"}>
                      <small>
                          {`${playlistData?.meta.videoCount} video`}
                      </small>
                      <small>
                          {`${playlistData?.meta.viewCount}`}
                      </small>
                      <small>
                          {`${playlistData?.meta.lastUpdated}  `}
                      </small>
                  </span>
                  <small className={'text-start leading-4 h-48 overflow-hidden'}>{playlistData?.meta.description}</small>
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
