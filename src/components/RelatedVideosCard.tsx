import { ISuggestVideoItems } from "@/Models/Youtube";
import React from "react";
import Link from "next/link";

interface IRelatedVideosCardProps {
  relatedVideo: ISuggestVideoItems;
}
function RelatedVideosCard({
  relatedVideo: { id, snippet },
}: IRelatedVideosCardProps) {
  return (
    <Link
      href={{
        pathname: "/watch",
        query: {
          vidId: id.videoId,
        },
      }}
      key={snippet.channelId}
      title={snippet.title}
      className="w-full flex flex-row gap-1 mb-4"
    >
      <figure className="w-2/5 aspect-video">
        <img
          src={snippet.thumbnails.medium.url}
          alt={snippet.title}
          className="aspect-video max-w-full"
        />
      </figure>
      <div className="w-[60%] flex flex-col">
        <b className="max-w-full truncate mb-4">{snippet.title}</b>
        <small className="leading-3 mb-2 opacity-70 font-medium">
          {snippet.channelTitle}
        </small>
        <p className="leading-3">
          {new Date(snippet.publishedAt).toLocaleDateString()}
        </p>
      </div>
    </Link>
  );
}

export default RelatedVideosCard;
