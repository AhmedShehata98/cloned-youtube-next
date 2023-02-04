import LeftSidebar from "@/components/LeftSidebar";
import YTListWrapper from "@/components/YTListWrapper";
import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { videosByCategoryFetcher } from "@/services/api/youtubeAPI";
import ChannelCard from "@/components/ChannelCard";
import PlayListCard from "@/components/PlayListCard";
import SearchResultVideoCard from "@/components/SearchResultVideoCard";
import ErrorFetchingData from "@/components/ErrorFetchingData";
import SkeletonVideoCard from "@/components/SkeletonVideoCard";
import YTSearchResultsList from "@/components/YTSearchResultsList";
import { GetServerSideProps } from "next";
import { IYTVideosResponse } from "@/Models/Youtube";
import PlayListSearchResultCard from "@/components/PlayListSearchResultCard";
import ChannelSearchResultCard from "@/components/ChannelSearchResultCard";

interface ISearchResultsProps {
  searchQueryInitialData: IYTVideosResponse;
}
const SearchResults = ({ searchQueryInitialData }: ISearchResultsProps) => {
  const {
    query: { search_query },
  } = useRouter();

  const {
    data: searchResults,
    isFetched,
    isError,
    isLoading,
    isPaused,
  } = useQuery({
    queryKey: ["search_results", search_query],
    queryFn: () => videosByCategoryFetcher(search_query as string),
    initialData: searchQueryInitialData,
  });

  return (
    <>
      <Head>
        <title>{search_query} - YouTube Cloned </title>
      </Head>

      <div className="w-full lg:w-[927px] mx-auto">
        <YTSearchResultsList
          title={`${search_query}`}
          data={searchResults}
          ErrorComponent={() => <ErrorFetchingData />}
          LoadingIndicator={(id) => <SkeletonVideoCard id={id} layout="row" />}
          isError={isError}
          isFetched={isFetched}
          isLoading={isLoading}
          renderChannelItem={(channel) => (
            <ChannelSearchResultCard channelResultData={channel} />
          )}
          renderPlaylistItem={(playlist) => (
            <PlayListSearchResultCard playListData={playlist} />
          )}
          renderVideoItem={(video) => (
            <SearchResultVideoCard SearchResultData={video} />
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
