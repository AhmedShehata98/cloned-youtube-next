import { categoryBar } from "@/utils/contants";
import Link from "next/link";
import React from "react";

interface IAppDrawerProps {
  showing: boolean;
}
function AppDrawer({ showing }: IAppDrawerProps) {
  return (
    <div
      className={`fixed z-20 inset-0 w-full h-screen hidden items-start bg-zinc-700 bg-opacity-50 ${
        showing && "flex"
      }`}
    >
      <div className="w-1/5 h-full bg-gray-100 mt-14 px-3 py-2">
        <ul className="h-fit flex flex-col">
          <Link
            href="/"
            className="flex gap-4 w-full px-5 py-2 rounded-full hover:bg-zinc-300 hover:shadow-sm hover:first:text-red-600 mb-1"
          >
            <span className="grid place-content-center text-xl">
              <i className="fi fi-rr-home leading-3"></i>
            </span>
            <p className="text-base capitalize text-stone-500 hover:text-black">
              home
            </p>
          </Link>
        </ul>
        <ul className="h-fit flex flex-col mt-4">
          <h3 className="font-medium text-lg capitalize ml-2">explore</h3>
          {categoryBar.map((category) => (
            <Link
              href={{
                pathname: "/explore",
                query: { category: category.label.toLowerCase() },
              }}
              key={category.id}
              className="flex gap-4 w-full px-5 py-2 rounded-full hover:bg-zinc-300 hover:shadow-sm hover:first:text-red-600 mb-1"
            >
              <span className="grid place-content-center text-xl">
                <i className={`fi ${category.icon}`}></i>
              </span>
              <p className="text-base capitalize text-stone-500 hover:text-black">
                {category.label}
              </p>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AppDrawer;
