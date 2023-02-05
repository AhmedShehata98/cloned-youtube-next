import React from "react";
import { dehydrate, QueryClient, useQueries } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { nanoid } from "nanoid";
import {
  getChannelDetails,
  getChannelVideosFetcher,
} from "@/services/api/youtubeAPI";
import { IYtChannel } from "@/Models/Youtube";
import YTListWrapper from "@/components/YTListWrapper";
import VideoCard from "@/components/VideoCard";
import ErrorFetchingData from "@/components/ErrorFetchingData";
import SkeletonVideoCard from "@/components/SkeletonVideoCard";

const ChannelDetails = ({
  inintialchannelDetails,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    query: { channelId },
  } = useRouter();

  const [
    { data: channelDetailsData, isFetched, isError, isLoading, isPaused },
    {
      data: channelVideos,
      isFetched: isFetchedChannelVideos,
      isError: isErrorChannelVideos,
      isLoading: isLoadingChannelVideos,
      isStale: isPausedChannelVideos,
    },
  ] = useQueries({
    queries: [
      {
        queryKey: ["channel-details", channelId?.toString()],
        queryFn: () => getChannelDetails(channelId as string),
        retry: 2,
        initialData: inintialchannelDetails.queries[0]?.state.data,
        enabled: inintialchannelDetails.queries[0] ? true : false,
      },
      {
        queryKey: ["channel-videos", channelId?.toString()],
        queryFn: () => getChannelVideosFetcher(channelId as string),
        retry: 2,
        enabled: inintialchannelDetails.queries[0] ? true : false,
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

      <div className="w-full lg:w-[927px] mx-auto">
        <figure
          className="channel-cover"
          style={{
            backgroundImage: `url(${channelDetailsData?.items[0].brandingSettings?.image?.bannerExternalUrl})`,
          }}
        ></figure>
        <div className="channel-details">
          <span className="flex gap-2">
            <figure className="w-16 my-1 lg:m-0 lg:w-20 aspect-square rounded-full overflow-hidden">
              <img
                src={
                  channelDetailsData?.items[0].snippet.thumbnails.default.url
                }
                alt="channel-avatar"
                className="max-w-full object-cover"
              />
            </figure>
            <span>
              <b className="mb-2 inline-block text-sm md:text-base">
                {channelDetailsData?.items[0].snippet.title}
              </b>
              <p className="mb-0 opacity-70  capitalize leading-3 text-sm md:text-base">
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
          isPaused={isPaused && isPausedChannelVideos}
          isError={isErrorChannelVideos}
          renderVideosItem={(video) => (
            <VideoCard key={nanoid(6)} videoData={video} />
          )}
          renderChannelItem={() => <div>asd</div>}
          LoadingIndicator={(id) => <SkeletonVideoCard id={id} />}
          ErrorComponent={<ErrorFetchingData />}
        />
      </div>
    </>
  );
};

export default ChannelDetails;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { channelId } = context.query;
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["channel-details", channelId],
      queryFn: () => getChannelDetails(channelId as string),
    });
    return {
      props: {
        isInintialDataError: false,
        inintialchannelDetails: dehydrate(queryClient),
      },
    };
  } catch (error) {
    return {
      props: {
        isInintialDataError: true,
        inintialchannelDetails: dehydrate(queryClient),
      },
    };
  }
};
