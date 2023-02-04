import React, { useEffect, useRef } from "react";

function LoadingSpinner({ isLoading }: { isLoading: boolean }) {
  const loadingScreenRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (isLoading) {
      loadingScreenRef.current?.classList.remove("hide-loading-screen");
      window.document.body.classList.add("prevent-scroll");
    } else {
      loadingScreenRef.current?.classList.add("hide-loading-screen");
      window.document.body.classList.remove("prevent-scroll");
    }
  }, [isLoading]);

  return (
    <div
      ref={loadingScreenRef}
      className="absolute z-50 top-0 w-full h-screen bg-white dark:bg-zinc-900 flex flex-col items-center justify-center"
    >
      <div className="h-1/2 w-full flex flex-col justify-center">
        <span className="flex justify-center items-center gap-2">
          <i className="inline-block text-3xl leading-3 text-red-500 fi fi-brands-youtube"></i>
          <h4 className="font-medium text-lg">YouTube</h4>
        </span>
      </div>
      <div className="w-full lg:w-1/2 h-1/2 flex flex-col items-center  gap-4">
        <span className="w-8 h-8 border-4 rounded-full border-blue-600 border-b-transparent animate-spin"></span>
        <b className="uppercase text-sm"> please wait ..</b>
      </div>
    </div>
  );
}

export default LoadingSpinner;
