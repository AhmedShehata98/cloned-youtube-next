import PlayListCard from "@/components/PlayListCard";
import RelatedVideosList from "@/components/RelatedVideosList";
import RelatedVideosCard from "@/components/RelatedVideosCard";
import { IVideoDetails, IYtSuggestVideos } from "@/Models/Youtube";
import {
  getRelatedVideosFetcher,
  getVideoDetailsFetcher,
} from "@/services/api/youtubeAPI";
import {
  dehydrate,
  isError,
  QueryClient,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import Head from "next/head";
import SkeletonVideoCard from "@/components/SkeletonVideoCard";
import YtDescriptionBox from "@/components/YtDescriptionBox";
import VideoReaction from "@/components/VideoReaction";
import VideoInformation from "@/components/VideoInformation";
import SkeletonVideoPage from "@/components/SkeletonVideoPage";
import ErrorFetchingData from "@/components/ErrorFetchingData";

const VideoDetails: NextPage<{ videoData: IVideoDetails }> = (props) => {
  const {
    pathname,
    query: { vidId },
  } = useRouter();
  const [relatedVideosData, setRelatedVideosData] =
    useState<IYtSuggestVideos>();
  const [isLoadingRelatedVideos, setIsLoadingRelatedVideos] = useState(true);
  const [isFetchedRelatedVideos, setIsFetchedRelatedVideos] = useState(false);
  const notPages = pathname.includes("/watch");

  // {
  //   data: relatedVideos,
  //   isLoading: isLoadingRelatedVideos,
  //   isFetched: isFetchedRelatedVideos,
  // },
  // {
  //   queryKey: ["getVideoDetails", vidId],
  //   queryFn: () => getVideoDetailsFetcher(vidId as string),
  //   initialData: props.videoData,
  // },
  const {
    data: videoDetailsData,
    isFetched: isFetchedVideoDetails,
    isLoading: isLoadingVideoDetails,
    isError: isErrorVideoDetails,
  } = useQuery<string, unknown, IVideoDetails, string[]>({
    queryKey: ["getVideoDetails", vidId as string],
    queryFn: () => getVideoDetailsFetcher(vidId as string),
  });

  useEffect(() => {
    if (isFetchedVideoDetails) {
      getRelatedVideosFetcher(vidId as string)
        .then((res) => setRelatedVideosData(res))
        .finally(() => {
          setIsFetchedRelatedVideos(true);
          setIsLoadingRelatedVideos(false);
        });
    }
  }, [videoDetailsData, isFetchedVideoDetails]);
  // const videoDetailsData: IVideoDetails = data as IVideoDetails;
  // const relatedVideosData: IYtSuggestVideos = relatedVideos as IYtSuggestVideos;

  if (isLoadingVideoDetails && !isFetchedRelatedVideos) {
    return <SkeletonVideoPage />;
  }
  return (
    <>
      <Head>
        <title>
          {isFetchedVideoDetails
            ? `${videoDetailsData?.items?.[0].snippet.title} - cloned YouTube`
            : "cloned YouTube"}
        </title>
      </Head>
      <article
        className={`watch-video-page ${notPages && "!w-full"} mt-4 px-2`}
      >
        <div className="video-wrapper">
          <ReactPlayer
            width={"100%"}
            controls
            url={`https://www.youtube.com/watch?v=${videoDetailsData?.items?.[0].id}`}
          />
          <bdi className="inline-block text-xl font-medium mt-3 mb-1 pl-3">
            {videoDetailsData?.items?.[0]?.snippet.localized.title}
          </bdi>
          {/* video content wrapper */}
          <div className="video-content-wrapper">
            <VideoInformation videoDetailsData={videoDetailsData!} />
            <VideoReaction
              videoDetailsData={videoDetailsData!}
              likedCount={videoDetailsData?.items?.[0].statistics.likeCount!}
              isFetched={isFetchedVideoDetails}
              isLoading={isLoadingVideoDetails}
            />
          </div>
          {/* discription box */}
          <YtDescriptionBox
            videoDetailsData={videoDetailsData!}
            isFetched={isFetchedVideoDetails}
            isLoading={isLoadingVideoDetails}
          />
        </div>
        {isErrorVideoDetails ? (
          <ErrorFetchingData />
        ) : (
          <RelatedVideosList
            isLoading={isLoadingRelatedVideos}
            isFetched={isFetchedRelatedVideos}
            relatedVideosData={relatedVideosData!}
            renderVideosList={(video) => (
              <RelatedVideosCard relatedVideo={video} />
            )}
            renderPlaylistList={(playlist) => (
              <PlayListCard playListData={playlist} layout="column" />
            )}
            skeltonLoading={(id) => (
              <SkeletonVideoCard id={id.toString()} layout="row" />
            )}
          />
        )}
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
