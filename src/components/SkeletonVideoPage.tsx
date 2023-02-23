import React from "react";

function SkeletonVideoPage() {
  return (
    <div className="video-wrapper-loading">
      <figure className="aspect-video bg-gray-600 dark:bg-zinc-900 rounded animate-pulse"></figure>
      <span className="inline-block w-3/4 lg:w-3/5 h-4 mt-4 mb-5 bg-gray-500 dark:bg-zinc-500 rounded-lg animate-pulse"></span>
      <div className="w-full flex">
        <div className="flex w-full gap-3 justify-between lg:items-center flex-col lg:flex-row">
          <div className="lg:w-1/3 flex flex-row gap-2">
            <figure className="aspect-square w-16 h-16 bg-gray-600 dark:bg-zinc-900 rounded-full animate-pulse"></figure>
            <span className="flex flex-col justify-center items-start gap-2 w-[calc(100%-4rem)]">
              <b className="inline-block w-3/5 lg:w-10/12 h-3 bg-gray-400 dark:bg-zinc-400 rounded-lg animate-pulse"></b>
              <b className="inline-block w-1/3 lg:w-2/4 h-6 bg-gray-600 dark:bg-zinc-800 rounded-2xl animate-pulse"></b>
            </span>
          </div>
          <span className="lg:w-4/6 flex items-center lg:justify-end gap-2 mt-2 lg:mt-6">
            <b className="inline-block w-1/4 h-7 bg-gray-600 dark:bg-zinc-800 rounded-2xl animate-pulse"></b>
            <b className="inline-block w-1/4 h-7 bg-gray-600 dark:bg-zinc-800 rounded-2xl animate-pulse"></b>
            <b className="inline-block w-1/4 h-7 bg-gray-600 dark:bg-zinc-800 rounded-2xl animate-pulse"></b>
            <b className="inline-block w-7 h-7 bg-gray-600 dark:bg-zinc-800 rounded-2xl animate-pulse"></b>
          </span>
        </div>
      </div>
      <span className="inline-block w-full h-64 bg-gray-500 dark:bg-zinc-600 mt-3 rounded-lg shadow animate-pulse">
        <p className="w-2/4 h-4 bg-zinc-900 rounded-lg mx-3 mt-4"></p>
        <p className="w-1/4 h-4 bg-zinc-900 rounded-lg mx-3 mt-4"></p>
        <p className="w-1/5 h-4 bg-zinc-900 rounded-lg mx-3 mt-4"></p>
        <p className="w-2/3 h-4 bg-zinc-900 rounded-lg mx-3 mt-4"></p>
        <p className="w-2/5 h-4 bg-zinc-900 rounded-lg mx-3 mt-4"></p>
      </span>
    </div>
  );
}

export default SkeletonVideoPage;
