import LeftSidebar from "@/components/LeftSidebar";
import VideoCard from "@/components/VideoCard";
import VideosListWrapper from "@/components/YTListWrapper";
import { IYTVideosResponse } from "@/Models/Youtube";
import { videosByCategoryFetcher } from "@/services/api/youtubeAPI";
import { categoryBar } from "@/utils/contants";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import React from "react";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";

import Head from "next/head";
import SkeletonVideoCard from "@/components/SkeletonVideoCard";
import YTListWrapper from "@/components/YTListWrapper";

export default function ExploreVideosList(props: any) {
  const {
    asPath,
    query: { exploreCategoryName },
  } = useRouter();

  const videosStaticProps: IYTVideosResponse = props;
  const { data, isFetched, isInitialLoading, isSuccess } =
    useQuery<IYTVideosResponse>({
      queryKey: [`categoryVideos`, exploreCategoryName],
      queryFn: () => videosByCategoryFetcher(exploreCategoryName as string),
      // initialData: videosStaticProps,
    });

  return (
    <>
      <Head>
        <title>Cloned Youtube | {exploreCategoryName}</title>
      </Head>
      <main className="min-h-screen w-full flex justify-center items-center bg-gray-100">
        <section className="yt-container flex items-start justify-center">
          <LeftSidebar />
          <div style={{ width: "calc(100% - 11.4rem)" }}>
            <YTListWrapper
              title={exploreCategoryName?.toString() as string}
              data={data!}
              isFetched={isFetched}
              isLoading={isInitialLoading}
              renderVideosItem={(video) => <VideoCard videoData={video} />}
              LoadingIndicator={<SkeletonVideoCard />}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export async function getStaticProps(context: any) {
  const { exploreCategoryName } = context.params;

  return {
    props: {
      some: dehydrate(queryClient).queries[0].state.data,
    },
  };
}
export async function getStaticPaths() {
  return {
    paths: categoryBar.map((category) => ({
      params: { exploreCategoryName: category.label },
    })),
    fallback: false,
  };
}
