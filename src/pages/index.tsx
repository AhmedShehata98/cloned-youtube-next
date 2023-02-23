import {
  dehydrate,
  DehydratedState,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { nanoid } from "nanoid";
import Head from "next/head";
import { videosByCategoryFetcher } from "@/services/api/youtubeAPI";
import { IYTVideosResponse } from "@/Models/Youtube";
import LeftSidebar from "@/components/LeftSidebar";
import VideoCard from "@/components/VideoCard";
import SkeletonVideoCard from "@/components/SkeletonVideoCard";
import ErrorFetchingData from "@/components/ErrorFetchingData";
import YTListWrapper from "@/components/YTListWrapper";
import ChannelCard from "@/components/ChannelCard";
import PlayListCard from "@/components/PlayListCard";
import CategoriesUpperbar from "@/components/CategoriesUpperbar";
import { useState } from "react";

const Home = ({
  initialHomeData,
  isErrorInitialHomeData,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [pageNumber, setPageNumber] = useState<number>(26);
  const { data, isFetched, isLoading, isError, isPaused } =
    useQuery<IYTVideosResponse>({
      queryKey: ["categoryVideos", pageNumber],
      queryFn: () => videosByCategoryFetcher("popular in egypt", pageNumber),
      retry: 2,
      initialData: initialHomeData.queries[0]?.state.data,
      enabled: initialHomeData.queries[0] ? true : false,
      keepPreviousData: true,
    });

  if (isError) {
    return (
      <>
        <Head>
          <title>Youtube Cloned | Home</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/youtube-logo-png-2075.png" />
        </Head>
        <ErrorFetchingData />
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Youtube Cloned | Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/youtube-logo-png-2075.png" />
      </Head>
      <div className="w-full lg:w-[calc(100%-17rem)] mx-auto ">
        <CategoriesUpperbar
          categoriesData={data?.refinements as Array<string>}
        />
        <YTListWrapper
          title={"recommended"}
          data={data}
          isFetched={isFetched}
          isLoading={isLoading}
          renderVideosItem={(video) => (
            <VideoCard key={nanoid(6)} videoData={video} />
          )}
          renderPlaylistItem={(playlist) => (
            <PlayListCard playListData={playlist} />
          )}
          renderChannelItem={(channel) => <ChannelCard channel={channel} />}
          LoadingIndicator={(id) => <SkeletonVideoCard id={id} />}
        />
      </div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: [`categoryVideos`],
      queryFn: () => videosByCategoryFetcher("popular in egypt"),
    });
    return {
      props: {
        isErrorInitialHomeData: false,
        initialHomeData: dehydrate(queryClient),
      },
    };
  } catch (error) {
    return {
      props: {
        isErrorInitialHomeData: true,
        initialHomeData: dehydrate(queryClient),
      },
    };
  }
};
