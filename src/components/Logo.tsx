import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={"/"} className="flex justify-center items-center gap-1">
      <img className="w-9" src="/youtube-logo-png-2075.png" alt="logo-yt.png" />
      <h4 className="font-medium hidden md:flex">YouTube</h4>
    </Link>
  );
}
