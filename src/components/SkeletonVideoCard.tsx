import { nanoid } from "nanoid";
import React from "react";

interface ISkeletonVideoCardProps {
  id: string;
  layout?: "col" | "row";
}
export default function SkeletonVideoCard({
  id,
  layout,
}: ISkeletonVideoCardProps) {
  if (layout === undefined || layout === "col") {
    return (
      <div
        key={nanoid(8)}
        className="rounded-sm shadow-md overflow-hidden mb-2 mt-4"
      >
        <figure className="aspect-video rounded w-full bg-zinc-500 dark:bg-black"></figure>
        <div className="flex flex-col gap-2 bg-gray-100 dark:bg-zinc-800 w-full px-3 pb-4">
          <span className="flex bg-gray-300 dark:bg-zinc-400 w-full h-3 animate-pulse mt-4"></span>
          <span className="flex bg-gray-300 dark:bg-zinc-400 w-1/2 h-2 animate-pulse"></span>
          <span className="flex bg-gray-300 dark:bg-zinc-400 w-1/4 h-2 animate-pulse"></span>
        </div>
      </div>
    );
  } else {
    return (
      <div
        key={nanoid(8)}
        className="h-32 flex items-center justify-start rounded-sm shadow-md overflow-hidden mb-2"
      >
        <figure className="aspect-square rounded w-2/5 md:w-1/4 bg-zinc-500 dark:bg-black"></figure>
        <div className="w-3/5 md:w-3/4 min-h-full flex flex-col justify-start gap-2 bg-gray-100 dark:bg-zinc-800 px-3 py-4">
          <span className="flex bg-gray-300 dark:bg-zinc-400 w-full h-3 animate-pulse"></span>
          <span className="flex bg-gray-300 dark:bg-zinc-400 w-1/2 h-2 animate-pulse mt-4"></span>
          <span className="flex bg-gray-300 dark:bg-zinc-400 w-1/4 h-2 animate-pulse"></span>
        </div>
      </div>
    );
  }
}
