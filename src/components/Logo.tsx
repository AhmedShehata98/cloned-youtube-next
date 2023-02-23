import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={"/"} className="flex justify-center items-center gap-2">
      <i className="inline-block text-3xl leading-3 text-red-500 fi fi-brands-youtube"></i>
      <h4 className="font-medium ">YouTube</h4>
    </Link>
  );
}
