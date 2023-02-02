import { getPlaylistFetcher } from "@/services/api/youtubeAPI";
import { dehydrate, QueryClient, useQueries } from "@tanstack/react-query";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import React from "react";

function PlaylistWrapper(props: any) {
  const {
    query: { list },
  } = useRouter();

  const data = useQueries({
    queries: [
      {
        queryKey: ["list-videos", list],
        queryFn: () => getPlaylistFetcher(list as string),
        // initialData: initialListVideos,
      },
    ],
  });
  console.log(list);
  console.log(props);
  return <ol>PlaylistWrapper</ol>;
}

export default PlaylistWrapper;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const list = context.query;
  const queryClient = new QueryClient();
  console.log(list);
  try {
    await queryClient.prefetchQuery({
      queryKey: ["list-videos", list],
      queryFn: () => getPlaylistFetcher(list.list as string),
    });

    return {
      props: {
        initialListVideosError: false,
        initialListVideos: dehydrate(queryClient),
      },
    };
  } catch (error) {
    return {
      props: {
        initialListVideosError: true,
        initialListVideos: null,
      },
    };
  }
};
