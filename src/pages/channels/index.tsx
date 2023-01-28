import { IYtChannel } from "@/Models/Youtube";
import {
  getChannelDetails,
  getChannelVideosFetcher,
} from "@/services/api/youtubeAPI";
import { dehydrate, QueryClient, useQueries } from "@tanstack/react-query";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import LeftSidebar from "@/components/LeftSidebar";
import YTListWrapper from "@/components/YTListWrapper";
import Head from "next/head";
import VideoCard from "@/components/VideoCard";
import { nanoid } from "nanoid";
import ErrorFetchingData from "@/components/ErrorFetchingData";
import SkeletonVideoCard from "@/components/SkeletonVideoCard";

const ChannelDetails: NextPage<{ channelDetails: IYtChannel }> = (props) => {
  const initialChannelDetails = props?.channelDetails;
  const {
    query: { channelId },
  } = useRouter();

  const [
    { data: channelDetailsData, isFetched, isError, isLoading },
    {
      data: channelVideos,
      isFetched: isFetchedChannelVideos,
      isError: isErrorChannelVideos,
      isLoading: isLoadingChannelVideos,
      isSuccess: isSuccessChannelVideos,
    },
  ] = useQueries({
    queries: [
      {
        queryKey: ["channel-details", channelId?.toString()],
        queryFn: () => getChannelDetails(channelId as string),
        retry: 2,
        initialData: initialChannelDetails,
      },
      {
        queryKey: ["channel-videos", channelId?.toString()],
        queryFn: () => getChannelVideosFetcher(channelId as string),
        retry: 3,
      },
    ],
  });

  return (
    <>
      <Head>
        <title>
          YouTube Clone | {channelDetailsData?.items[0].snippet.title}
        </title>
      </Head>
      <main className="relative min-h-screen w-full flex justify-center items-center bg-gray-100">
        <section className="yt-container flex flex-row items-start justify-start">
          <LeftSidebar />
          <div style={{ width: "calc(100% - 11.4rem)" }}>
            <figure
              className="w-full h-52 overflow-hidden bg-no-repeat bg-cover bg-center aspect-video border border-b-0 border-slate-400"
              style={{
                backgroundImage: `url(${channelDetailsData?.items[0].brandingSettings?.image?.bannerExternalUrl})`,
              }}
            ></figure>
            <div className="py-2 px-3 bg-gray-300 border border-t-0 border-slate-400">
              <span className="flex gap-2">
                <figure className="w-20 aspect-square rounded-full overflow-hidden">
                  <img
                    src={
                      channelDetailsData?.items[0].snippet.thumbnails.default
                        .url
                    }
                    alt="channel-avatar"
                    className="max-w-full aspect-square object-cover"
                  />
                </figure>
                <span>
                  <b className="mb-2 inline-block">
                    {channelDetailsData?.items[0].snippet.title}
                  </b>
                  <p className="mb-0 opacity-70 font-medium capitalize leading-3">
                    {channelDetailsData?.items[0].snippet.customUrl}
                  </p>
                  <small>
                    {channelDetailsData?.items[0].statistics.subscriberCount}{" "}
                    subscriber
                  </small>
                </span>
              </span>
            </div>
            <YTListWrapper
              title={`${channelDetailsData?.items[0].snippet.title} videos`}
              data={channelVideos}
              isFetched={isFetchedChannelVideos}
              isLoading={isLoadingChannelVideos}
              isSuccess={isSuccessChannelVideos}
              isError={isErrorChannelVideos}
              renderVideosItem={(video) => (
                <VideoCard key={nanoid(6)} videoData={video} />
              )}
              renderChannelItem={() => <div>asd</div>}
              LoadingIndicator={(id) => <SkeletonVideoCard id={id} />}
              ErrorComponent={<ErrorFetchingData />}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default ChannelDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { channelId } = context.query;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["channel-details", channelId],
    queryFn: () => getChannelDetails(channelId as string),
  });

  return {
    props: {
      channelDetails: dehydrate(queryClient).queries[0].state.data,
    },
  };
};
