import { counting } from "@/utils/contants";
import React, { MouseEventHandler, useEffect } from "react";
import { MdOutlineExpandMore } from "react-icons/md";

interface IPagginationBarProps {
  onPageChange: MouseEventHandler;
  totalPages: number;
  currentPage?: number;
}
function PagginationBar({
  onPageChange,
  currentPage,
  totalPages,
}: IPagginationBarProps) {
  return (
    <div className="w-11/12 lg:w-full h-fit lg:h-10 flex flex-wrap justify-around items-center mb-24 lg:mb-8 px-3 mx-auto transition-colors divide-y divide-zinc-400 lg:divide-y-0 border dark:border-zinc-600 shadow-md bg-gray-300 dark:bg-zinc-900 hover:bg-gray-400 hover:dark:bg-zinc-800">
      <div className="w-full py-2 lg:p-0 lg:w-1/4 flex items-center justify-center gap-1 px-4">
        <small className="min-w-fit bg-sky-500 px-3 rounded-md !text-blue-900 font-semibold">
          {currentPage}
        </small>
        <small>From</small>
        <small className="min-w-fit bg-sky-500 px-3 rounded-md !text-blue-900 font-semibold">
          {counting(totalPages.toString())}
        </small>
      </div>
      <button
        className="flex-1 w-full h-full flex justify-center items-center gap-3 p-3 lg:p-2 mx-auto"
        type="button"
        title="get more videos"
        onClick={onPageChange}
      >
        <p className="uppercase text-sm lg:text-base hover:text-opacity-80 hover:underline">
          show more
        </p>
        <MdOutlineExpandMore className="text-red-600 dark:text-red-400 text-2xl lg:mr-16" />
      </button>
    </div>
  );
}

export default PagginationBar;
