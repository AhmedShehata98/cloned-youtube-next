import React from "react";
import Link from "next/link";
import { categoryBar } from "@/utils/contants";

function LeftSidebar() {
  return (
    <aside className="w-56 h-screen max-h-screen flex flex-col items-start justify-start gap-3  border-r p-3">
      <ul className="w-full h-fit flex flex-col pl-2 mb-4">
        <Link href="/" className="flex gap-4 hover:text-red-500 mb-1 ">
          <span className="grid place-content-center text-xl">
            <i className="fi fi-rr-home leading-3"></i>
          </span>
          <p className="text-base capitalize text-stone-500 hover:text-black">
            home
          </p>
        </Link>
      </ul>
      <ul className="w-full h-fit flex flex-col mb-4">
        <h5 className="font-semibold capitalize text-lg mb-3">explore </h5>
        {categoryBar.map((category) => (
          <Link
            key={category?.id}
            // href={`/explore/${category?.label}`}
            href={{
              pathname: "/explore",
              query: {
                category: category.label.toLocaleLowerCase(),
              },
            }}
            // replace
            id="dasdasd"
            className="flex gap-4 hover:text-red-500 mb-3 pl-2"
          >
            <span className="grid place-content-center text-lg">
              <i className={`fi ${category?.icon}`}></i>
            </span>
            <p className="text-base capitalize text-stone-500 hover:text-black">
              {category?.label}
            </p>
          </Link>
        ))}
      </ul>
    </aside>
  );
}

export default LeftSidebar;
