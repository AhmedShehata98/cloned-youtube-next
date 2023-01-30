import React, { useEffect, useRef } from "react";

function LoadingSpinner({ isLoading }: { isLoading: boolean }) {
  const loadingScreenRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (isLoading) {
      loadingScreenRef.current?.classList.remove("hide-loading-screen");
    } else {
      loadingScreenRef.current?.classList.add("hide-loading-screen");
    }
  }, [isLoading]);

  return (
    <div
      ref={loadingScreenRef}
      className="absolute z-50 top-0 w-full h-screen bg-white flex flex-col items-center justify-center"
    >
      <div className="w-full lg:w-1/2 h-1/2 flex flex-col items-center justify-center gap-4">
        <span className="w-10 h-10 border-4 rounded-full border-blue-600 border-b-transparent animate-spin"></span>
        <b className="uppercase">loading please wait ..</b>
      </div>
    </div>
  );
}

export default LoadingSpinner;
