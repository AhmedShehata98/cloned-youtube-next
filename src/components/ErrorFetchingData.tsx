import React from "react";
import noNetwork from "@/assets/No-connection.svg";
import Image from "next/image";

function ErrorFetchingData() {
  return (
    <div className="w-full h-screen ">
      <Image
        src={noNetwork}
        alt="no-network.svg"
        className="w-52 mx-auto mt-14 drop-shadow-md"
      />
      <span className=" w-full text-center">
        <h4 className="font-medium opacity-70 mt-8">
          <mark className="bg-inherit text-red-500 font-bold">Oops !</mark> its
          Looks like you have not internet connection
        </h4>
      </span>
    </div>
  );
}

export default ErrorFetchingData;
