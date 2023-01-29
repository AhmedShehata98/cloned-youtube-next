import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import LeftSidebar from "@/components/LeftSidebar";
import VideoCard from "@/components/VideoCard";
import { nanoid } from "nanoid";
import Head from "next/head";
import { IYTVideosResponse } from "@/Models/Youtube";
import { videosByCategoryFetcher } from "@/services/api/youtubeAPI";
import SkeletonVideoCard from "@/components/SkeletonVideoCard";
import { GetStaticProps } from "next";
import ErrorFetchingData from "@/components/ErrorFetchingData";
import YTListWrapper from "@/components/YTListWrapper";
import ChannelCard from "@/components/ChannelCard";
import PlayListCard from "@/components/PlayListCard";

export default function Home(props: any) {
  const videosStaticProps: IYTVideosResponse = props.queries?.[0]?.state?.data;

  const { data, isFetched, isLoading, isSuccess, isError, status } =
    useQuery<IYTVideosResponse>({
      queryKey: [`categoryVideos`],
      queryFn: () => videosByCategoryFetcher("New"),
      retry: 2,
      initialData: videosStaticProps,
    });

  return (
    <>
      <Head>
        <title>Youtube Cloned | Home</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/youtube-logo-png-2075.png" />
      </Head>
      <main className="min-h-screen w-full flex justify-center items-center bg-gray-200">
        <section className="yt-container flex flex-row items-start justify-start">
          <LeftSidebar />
          <div className="w-full lg:w-[927px] mx-auto">
            <YTListWrapper
              title={"recommended"}
              data={data}
              isFetched={isFetched}
              isLoading={isLoading}
              isSuccess={isSuccess}
              isError={isError}
              renderVideosItem={(video) => (
                <VideoCard key={nanoid(6)} videoData={video} />
              )}
              renderPlaylistItem={(playlist) => (
                <PlayListCard playListData={playlist} />
              )}
              renderChannelItem={(channel) => <ChannelCard channel={channel} />}
              LoadingIndicator={(id) => <SkeletonVideoCard id={id} />}
              ErrorComponent={<ErrorFetchingData />}
            />
          </div>
        </section>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context: any) => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery([`categoryVideos`], () =>
    videosByCategoryFetcher("New")
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
