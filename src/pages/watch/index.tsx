import PlayListCard from "@/components/PlayListCard";
import RelatedVideosList from "@/components/RelatedVideosList";
import RelatedVideosCard from "@/components/RelatedVideosCard";
import { IVideoDetails, IYtSuggestVideos } from "@/Models/Youtube";
import {
  getRelatedVideosFetcher,
  getVideoDetailsFetcher,
} from "@/services/api/youtubeAPI";
import { dehydrate, QueryClient, useQueries } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import ReactPlayer from "react-player";
import Head from "next/head";
import SkeletonVideoCard from "@/components/SkeletonVideoCard";
import YtDescriptionBox from "@/components/YtDescriptionBox";
import VideoReaction from "@/components/VideoReaction";
import { IoCheckmarkCircle } from "react-icons/io5";

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
        className={`watch-video-page ${notPages && "!w-full"} mt-4 px-2`}
      >
        <div className="w-full lg:w-[60%]">
          <ReactPlayer
            width={"100%"}
            controls
            url={`https://www.youtube.com/watch?v=${videoDetailsData?.items?.[0].id}`}
          />
          {/* video content wrapper */}
          <div className="video-content-wrapper">
            <h3 className="font-semibold text-lg capitalize">
              {videoDetailsData?.items?.[0].snippet.localized.title}
            </h3>
            <div className="relative max-w-full flex justify-between md:items-center flex-col md:flex-row gap-3 flex-wrap pt-2 pb-3 ">
              {/* channel info box */}
              <div className="channel-info-box">
                <figure className="w-8 md:w-11 h-8 md:h-11 grid place-content-center bg-red-400 rounded-full">
                  <i className="fi fi-sr-screen leading-3 text-xl"></i>
                </figure>
                <div className="flex items-center justify-center gap-2">
                  <b className="opacity-70 leading-5 h-8 overflow-hidden">
                    {videoDetailsData?.items?.[0].snippet.channelTitle}
                  </b>
                  {videoDetailsData?.items?.[0].contentDetails
                    .licensedContent && (
                    <IoCheckmarkCircle className="text-xl text-zinc-500 dark:text-zinc-200 mb-2" />
                  )}
                </div>
              </div>
              <VideoReaction
                videoDetailsData={videoDetailsData}
                likedCount={videoDetailsData.items?.[0].statistics.likeCount}
                isFetched={isFetchedVideoDetails}
                isLoading={isLoadingVideoDetails}
              />
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
