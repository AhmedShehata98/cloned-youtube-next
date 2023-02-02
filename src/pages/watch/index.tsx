import PlayListCard from "@/components/PlayListCard";
import RelatedVideosList from "@/components/RelatedVideosList";
import RelatedVideosCard from "@/components/RelatedVideosCard";
import { IVideoDetails, IYtChannel, IYtSuggestVideos } from "@/Models/Youtube";
import {
  getRelatedVideosFetcher,
  getVideoDetailsFetcher,
} from "@/services/api/youtubeAPI";
import { dehydrate, QueryClient, useQueries } from "@tanstack/react-query";
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import ReactPlayer from "react-player";
import Head from "next/head";
import SkeletonVideoCard from "@/components/SkeletonVideoCard";
import YtDescriptionBox from "@/components/YtDescriptionBox";

const VideoDetails: NextPage<{ videoData: IVideoDetails }> = (props) => {
  const {
    pathname,
    query: { vidId },
  } = useRouter();
  const notPages = pathname.includes("/watch");

  const [
    {
      data,
      isFetched: isFetchedVideoDetails,
      isLoading: isLoadingVideoDetails,
      isError,
    },
    {
      data: relatedVideos,
      isLoading: isLoadingRelatedVideos,
      isFetched: isFetchedRelatedVideos,
    },
  ] = useQueries({
    queries: [
      {
        queryKey: ["getVideoDetails", vidId],
        queryFn: () => getVideoDetailsFetcher(vidId as string),
        initialData: props.videoData,
      },
      {
        queryKey: ["getRelatedVideos", vidId],
        queryFn: () => getRelatedVideosFetcher(vidId as string),
      },
    ],
  });
  const videoDetailsData: IVideoDetails = data as IVideoDetails;
  const relatedVideosData: IYtSuggestVideos = relatedVideos as IYtSuggestVideos;

  return (
    <>
      <Head>
        <title>
          {videoDetailsData?.items?.[0].snippet.title} - cloned YouTube
        </title>
      </Head>
      <article
        className={`w-full lg:w-[927px] mx-auto flex gap-3 justify-between flex-wrap ${
          notPages && "!w-full"
        } mt-4`}
      >
        <div className="w-full lg:w-[60%]">
          <ReactPlayer
            width={"100%"}
            controls
            url={`https://www.youtube.com/watch?v=${videoDetailsData?.items?.[0].id}`}
          />
          {/* video content box */}
          <div className="w-full h-fit py-2 flex flex-col gap-2 p-2 mb-3">
            <h3 className="font-semibold text-lg capitalize">
              {videoDetailsData?.items?.[0].snippet.title}
            </h3>
            <div className="w-full flex justify-between items-center gap-3">
              {/* channel info box */}
              <div className="flex gap-2">
                <figure className="w-11 h-11 grid place-content-center bg-red-400 rounded-full">
                  <i className="fi fi-sr-screen leading-3 text-xl"></i>
                </figure>
                <div>
                  <b className="opacity-70 leading-5 h-8 overflow-hidden">
                    {videoDetailsData?.items?.[0].snippet.channelTitle}
                  </b>
                  <span className="flex justify-start items-center gap-2">
                    <b>0000</b>
                    <small>subscribers</small>
                  </span>
                </div>
              </div>
              <div className="flex-1 flex justify-end gap-3">
                <span className="w-36 flex justify-between items-center rounded-full overflow-hidden shadow-md divide-x divide-gray-500 bg-gray-300 capitalize text-black font-semibold">
                  <button className="flex-1 flex justify-center items-center px-2 py-1 gap-2 hover:bg-gray-100">
                    <i className="inline-block rotate-180 leading-3 fi fi-rr-hand"></i>
                    <p>{videoDetailsData?.items?.[0].statistics.likeCount}</p>
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 rounded-tr-full rounded-br-full hover:bg-gray-100">
                    <i className="fi fi-rr-hand leading-3"></i>
                  </button>
                </span>
                <button className="flex justify-center items-center rounded-full shadow-md bg-gray-300 px-4 py-1 gap-2 hover:bg-gray-100 capitalize text-black font-semibold">
                  <i className="fi fi-rr-download leading-3"></i>
                  <small>download</small>
                </button>
              </div>
            </div>
          </div>
          {/* discription box */}
          <YtDescriptionBox
            videoDetailsData={videoDetailsData}
            isFetched={isFetchedVideoDetails}
            isLoading={isLoadingVideoDetails}
          />
        </div>
        <RelatedVideosList
          isLoading={isLoadingRelatedVideos}
          isFetched={isFetchedRelatedVideos}
          relatedVideosData={relatedVideosData}
          renderVideosList={(video) => (
            <RelatedVideosCard relatedVideo={video} />
          )}
          renderPlaylistList={(playlist) => (
            <PlayListCard playListData={playlist} />
          )}
          skeltonLoading={(id) => <SkeletonVideoCard id={id.toString()} />}
        />
      </article>
    </>
  );
};

export default VideoDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { vidId } = context.query;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["getVideoDetails", vidId],
    queryFn: () => getVideoDetailsFetcher(vidId as string),
  });

  return {
    props: {
      videoData: dehydrate(queryClient),
    },
  };
};
