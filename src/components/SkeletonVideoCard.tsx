import React from "react";

interface ISkeletonVideoCardProps {
  id: string;
}
export default function SkeletonVideoCard({ id }: ISkeletonVideoCardProps) {
  return (
    <div key={id} className="rounded-sm shadow-md overflow-hidden mb-2">
      <figure className="aspect-video rounded w-full bg-zinc-500 "></figure>
      <div className="flex flex-col gap-2 bg-gray-100 w-full px-3 pb-4">
        <span className="flex bg-gray-300 w-full h-3 animate-pulse mt-4"></span>
        <span className="flex bg-gray-300 w-1/2 h-2 animate-pulse"></span>
        <span className="flex bg-gray-300 w-1/4 h-2 animate-pulse"></span>
      </div>
    </div>
  );
}
