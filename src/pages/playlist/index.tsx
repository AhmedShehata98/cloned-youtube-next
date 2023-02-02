import PlaylistWrapper from "@/components/PlaylistWrapper";
import Head from "next/head";
import React from "react";

function index() {
  return (
    <>
      <Head>- Cloned YouTube</Head>
      <div className="w-full flex items-start">
        <PlaylistWrapper />
      </div>
    </>
  );
}

export default index;
