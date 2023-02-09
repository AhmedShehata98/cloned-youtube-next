import React, { MouseEventHandler, useEffect } from "react";
import { MdOutlineExpandMore } from "react-icons/md";

interface IPagginationBarProps {
  onPageChange: MouseEventHandler;
  totalPages?: number;
  currentPage?: number;
}
function PagginationBar({
  onPageChange,
  currentPage,
  totalPages,
}: IPagginationBarProps) {
  useEffect(() => {
    if (currentPage) {
    }
    window.scroll({
      behavior: "smooth",
      top: window.document.body.scrollHeight,
    });
  }, [currentPage, onPageChange]);
  return (
    <div className="w-full h-10 flex justify-around items-center mb-24 lg:mb-8 px-3 transition-colors border dark:border-zinc-600 shadow-md bg-gray-300 dark:bg-zinc-900 hover:bg-gray-400 hover:dark:bg-zinc-800">
      <div className="flex gap-1 px-4">
        <small className="min-w-fit bg-sky-500 px-3 rounded-md !text-black font-medium">
          {currentPage}
        </small>
        <small>From</small>
        <small className="bg-sky-500 px-3 rounded-md !text-black font-medium">
          {totalPages}
        </small>
      </div>
      <button
        className="flex-1 w-full h-full flex justify-center items-center gap-3 p-2 mx-auto"
        type="button"
        title="get more videos"
        onClick={onPageChange}
      >
        <p className="uppercase hover:text-opacity-80">show more</p>
        <MdOutlineExpandMore className="text-red-600 dark:text-red-400 text-2xl mr-16" />
      </button>
    </div>
  );
}

export default PagginationBar;
