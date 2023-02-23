import React from "react";
import {
  dehydrate,
  QueryClient,
  useQueries,
  useQuery,
} from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { nanoid } from "nanoid";
import { getChannelDetails } from "@/services/api/youtubeAPI";
import { Iitem, IYtChannel } from "@/Models/Youtube";
import VideoCard from "@/components/VideoCard";
import ErrorFetchingData from "@/components/ErrorFetchingData";
import SkeletonVideoCard from "@/components/SkeletonVideoCard";

import YTChannelVideosList from "@/components/YTChannelVideosList";

const ChannelDetails = ({
  inintialchannelDetails,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const {
    query: { channelId },
  } = useRouter();

  const {
    data: channelDetails,
    isError: isErrorChannelDetails,
    isLoading: isLoadingChannelDetails,
    isFetched: isFetchedChannelDetails,
  } = useQuery<IYtChannel>(["channel-details", channelId], () =>
    getChannelDetails(channelId as string)
  );

  // const [
  //   { data: channelDetailsData, isPaused },
  //   {
  //     data: channelVideos,
  //     isFetched: isFetchedChannelVideos,
  //     isError: isErrorChannelVideos,
  //     isLoading: isLoadingChannelVideos,
  //     isStale: isPausedChannelVideos,
  //   },
  // ] = useQueries({
  //   queries: [
  //     {
  //       queryKey: ["channel-details", channelId?.toString()],
  //       queryFn: () => getChannelDetails(channelId as string),
  //       retry: 2,
  //       initialData: inintialchannelDetails.queries[0]?.state.data,
  //       enabled: inintialchannelDetails.queries[0] ? true : false,
  //     },
  //     {
  //       queryKey: ["channel-videos", channelId?.toString()],
  //       queryFn: () => getChannelVideosFetcher(channelId as string),
  //       retry: 2,
  //       enabled: inintialchannelDetails.queries[0] ? true : false,
  //     },
  //   ],
  // });

  return (
    <>
      <Head>
        <title>YouTube Clone | {channelDetails?.meta.title}</title>
      </Head>

      <div className="w-full lg:w-[927px] mx-auto">
        <figure
          className="channel-cover"
          style={{
            backgroundImage: `url(${channelDetails?.meta.image.banner?.[0].url})`,
          }}
        ></figure>
        <div className="channel-details">
          <span className="flex gap-2">
            <figure className="w-14 my-1 lg:m-0 lg:w-20 aspect-square rounded-full overflow-hidden">
              <img
                src={
                  channelDetails?.meta.thumbnail?.[
                    channelDetails?.meta.thumbnail.length - 1 || 0
                  ].url
                }
                alt="channel-avatar"
                className="max-w-full object-cover object-center aspect-square"
              />
            </figure>
            <span className="flex flex-col items-start justify-center">
              <b className="mb-0 inline-block text-sm md:text-base">
                {channelDetails?.meta.title}
              </b>
              <p className="mb-0 opacity-60 capitalize leading-3 text-sm md:text-base">
                {`@${channelId}`}
              </p>
              <small className="leading-3 m-0 opacity-75 mt-2">
                {`${channelDetails?.meta.subscriberCount} subscribers`}
              </small>
            </span>
          </span>
        </div>
        <YTChannelVideosList
          title={`${channelDetails?.meta.title} videos`}
          data={channelDetails?.data as Iitem[]}
          isFetched={isFetchedChannelDetails}
          isLoading={isLoadingChannelDetails}
          renderVideosItem={(video) => (
            <VideoCard key={nanoid(6)} videoData={video} />
          )}
          LoadingIndicator={(id) => <SkeletonVideoCard id={id} />}
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
