import React from "react";
import noNetwork from "@/assets/No-connection.svg";
import Image from "next/image";

function ErrorFetchingData() {
  return (
    <div className="w-full h-screen flex flex-col justify-end pb-28 pt-3">
      <Image
        src={noNetwork}
        alt="no-network.svg"
        className="w-48 mx-auto drop-shadow-md"
      />
      <span className=" w-full text-center mt-5">
        <h2 className="bg-inherit text-red-500 text-2xl font-bold">Oops !</h2>
        <h4 className="font-medium opacity-90 mt-1 capitalize">
          its Looks like you have not internet connection
        </h4>
      </span>
    </div>
  );
}

export default ErrorFetchingData;
