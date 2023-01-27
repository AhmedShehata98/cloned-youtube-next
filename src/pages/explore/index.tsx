import ChannelCard from "@/components/ChannelCard";
import ErrorFetchingData from "@/components/ErrorFetchingData";
import LeftSidebar from "@/components/LeftSidebar";
import PlayListCard from "@/components/PlayListCard";
import SkeletonVideoCard from "@/components/SkeletonVideoCard";
import VideoCard from "@/components/VideoCard";
import YTListWrapper from "@/components/YTListWrapper";
import { IYTVideosResponse } from "@/Models/Youtube";
import { videosByCategoryFetcher } from "@/services/api/youtubeAPI";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const VideosList: NextPage = (props) => {
  const {
    query: { category },
  } = useRouter();

  const { data, isFetched, isLoading, isSuccess, isError } =
    useQuery<IYTVideosResponse>({
      queryKey: [`categoryVideos`, category],
      queryFn: () => videosByCategoryFetcher(category?.toString()),
      retry: 2,
    });

  return (
    <>
      <Head>
        <title>Cloned Youtube | {category}</title>
      </Head>
      <main className="min-h-screen w-full flex justify-center items-center bg-gray-100">
        <section className="yt-container flex items-start justify-center">
          <LeftSidebar />
          <div style={{ width: "calc(100% - 11.4rem)" }}>
            <YTListWrapper
              title={category as string}
              data={data!}
              isFetched={isFetched}
              isLoading={isLoading}
              isError={isError}
              isSuccess={isSuccess}
              renderPlaylistItem={(playlist) => (
                <PlayListCard playListData={playlist} />
              )}
              renderVideosItem={(video) => <VideoCard videoData={video} />}
              renderChannelItem={(channel) => <ChannelCard channel={channel} />}
              LoadingIndicator={(id) => <SkeletonVideoCard id={id} />}
              ErrorComponent={<ErrorFetchingData />}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default VideosList;

export const getServerSide: GetServerSideProps = async (context) => {
  const { category } = context.query;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([`explore-categories`, category], () =>
    videosByCategoryFetcher(category as string)
  );
  queryClient.invalidateQueries(["explore-categories", category]);

  return {
    props: {
      videosStaticProps: dehydrate(queryClient),
    },
  };
};
