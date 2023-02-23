import Image from "next/image";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import React from "react";

const NotFound = () => {
  const { back } = useRouter();

  return (
    <div className="w-full h-screen flex flex-col mt-8 lg:mt-0 lg:justify-center items-center">
      <Image
        src={"/page-not-found.svg"}
        width={280}
        height={400}
        alt="page-not-found.svg"
      />
      <h1 className="!text-red-500 dark:!text-red-400 text-xl uppercase mt-2">
        Page Not Found
      </h1>
      <p className="text-center opacity-60 capitalize text-sm max-w-[70%]">
        Ooops &#33; it&#39;s looks like you tried to open page is not available
        or under development
      </p>
      <button
        className="w-11/12 md:w-1/3 h-10 flex gap-4 justify-center items-center capitalize my-4 text-black font-semibold border-sky-400 dark:bg-sky-600 bg-sky-500 hover:bg-sky-500 hover:dark:bg-sky-500"
        onClick={() => back()}
      >
        <AiOutlineArrowLeft className="text-xl" />
        <p>go back</p>
      </button>
    </div>
  );
};

export default NotFound;
