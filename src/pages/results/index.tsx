import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { videosByCategoryFetcher } from "@/services/api/youtubeAPI";
import ErrorFetchingData from "@/components/ErrorFetchingData";
import SkeletonVideoCard from "@/components/SkeletonVideoCard";
import YTSearchResultsList from "@/components/YTSearchResultsList";
import { GetServerSideProps } from "next";
import { IYTVideosResponse } from "@/Models/Youtube";
import ChannelSearchResultCard from "@/components/ChannelSearchResultCard";
import VideoCard from "@/components/VideoCard";
import PlayListCard from "@/components/PlayListCard";

interface ISearchResultsProps {
  searchQueryInitialData: IYTVideosResponse;
}
const SearchResults = ({ searchQueryInitialData }: ISearchResultsProps) => {
  const [pageNumber, setPageNumber] = React.useState(25);
  const {
    query: { search_query },
  } = useRouter();

  const {
    data: searchResults,
    isFetched,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["search_results", search_query, pageNumber],
    queryFn: () => videosByCategoryFetcher(search_query as string, pageNumber),
    initialData: searchQueryInitialData,
    keepPreviousData: true,
  });

  if (isError) {
    return (
      <>
        <Head>
          <title>{search_query} - YouTube Cloned </title>
        </Head>
        <ErrorFetchingData />
      </>
    );
  }
  return (
    <>
      <Head>
        <title>{search_query} - YouTube Cloned </title>
      </Head>
      <div className="w-full lg:w-[calc(100%-14.5rem)] mx-auto">
        <YTSearchResultsList
          title={`${search_query}`}
          data={searchResults}
          ErrorComponent={() => <ErrorFetchingData />}
          LoadingIndicator={(id) => <SkeletonVideoCard id={id} layout="row" />}
          isError={isError}
          isFetched={isFetched}
          isLoading={isLoading}
          renderChannelItem={(channel) => (
            <ChannelSearchResultCard
              channelResultData={channel}
              key={channel.channelId}
            />
          )}
          renderPlaylistItem={(playlist) => (
            <PlayListCard
              key={playlist.playlistId}
              playListData={playlist}
              layout="column"
            />
          )}
          renderVideoItem={(video) => (
            <VideoCard key={video.videoId} videoData={video} layout="column" />
          )}
        />
      </div>
    </>
  );
};

export default SearchResults;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search_query } = context.query;
  const queryClient = new QueryClient();
  queryClient.prefetchQuery({
    queryKey: ["search_results", search_query],
    queryFn: () => videosByCategoryFetcher(search_query as string),
  });

  return {
    props: {
      searchQueryInitialData: dehydrate(queryClient),
    },
  };
};
