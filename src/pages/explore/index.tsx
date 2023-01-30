import React from "react";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { InferGetServerSidePropsType, GetServerSideProps } from "next/types";
import { IYTVideosResponse } from "@/Models/Youtube";
import { videosByCategoryFetcher } from "@/services/api/youtubeAPI";
import ChannelCard from "@/components/ChannelCard";
import ErrorFetchingData from "@/components/ErrorFetchingData";
import PlayListCard from "@/components/PlayListCard";
import SkeletonVideoCard from "@/components/SkeletonVideoCard";
import VideoCard from "@/components/VideoCard";
import YTListWrapper from "@/components/YTListWrapper";

const VideosList = ({
  InitialVideosData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    query: { category },
  } = useRouter();

  const {
    data: categoryVideos,
    isFetched,
    isLoading,
    isError,
    isPaused,
  } = useQuery<IYTVideosResponse>({
    queryKey: [`categoryVideos`, category],
    queryFn: () => videosByCategoryFetcher(category?.toString()),
    retry: 2,
    initialData: InitialVideosData.queries[0]?.state.data,
    enabled: InitialVideosData.queries[0] ? true : false,
  });

  return (
    <>
      <Head>
        <title>Cloned Youtube | {category}</title>
      </Head>
      <div className="w-full lg:w-[927px] mx-auto">
        <YTListWrapper
          title={category as string}
          data={categoryVideos!}
          isFetched={isFetched}
          isLoading={isLoading}
          isError={isError}
          isPaused={isPaused}
          renderPlaylistItem={(playlist) => (
            <PlayListCard playListData={playlist} />
          )}
          renderVideosItem={(video) => <VideoCard videoData={video} />}
          renderChannelItem={(channel) => <ChannelCard channel={channel} />}
          LoadingIndicator={(id) => <SkeletonVideoCard id={id} />}
          ErrorComponent={<ErrorFetchingData />}
        />
      </div>
    </>
  );
};

export default VideosList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { category } = context.query;

  const queryClient = new QueryClient();
  try {
    await queryClient.prefetchQuery([`explore-categories`, category], () =>
      videosByCategoryFetcher(category as string)
    );
    queryClient.invalidateQueries(["explore-categories", category]);
    return {
      props: {
        initialVideosError: false,
        InitialVideosData: dehydrate(queryClient),
      },
    };
  } catch (error) {
    return {
      props: {
        initialVideosError: true,
        InitialVideosData: dehydrate(queryClient),
      },
    };
  }
};
