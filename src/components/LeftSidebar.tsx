import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { categoryBar } from "@/utils/contants";
import { useRouter } from "next/router";

interface ILeftSidebarProps {
  show: boolean;
}
function LeftSidebar({ show }: ILeftSidebarProps) {
  const sidebarRef = useRef<HTMLElement | null>(null);

  const { query } = useRouter();
  // const notPages = pathname.includes("/watch");

  useEffect(() => {
    if (show) {
      sidebarRef.current?.classList.add("show-category-list");
    } else {
      sidebarRef.current?.classList.remove("show-category-list");
    }
    if (sidebarRef.current?.classList.contains("show-category-list")) {
      window.document.body.classList.add("prevent-scroll");
    } else {
      window.document.body.classList.remove("prevent-scroll");
    }
  }, [show]);

  return (
    <aside ref={sidebarRef} className={`sidebar-menu`}>
      <div className="w-2/3 lg:w-full h-screen lg:h-auto bg-white dark:bg-zinc-700 lg:bg-transparent">
        <ul className="h-fit flex flex-col gap-2 pl-2 mt-2 mb-6 ml-3 md:ml-0">
          <Link
            href="/"
            className="flex gap-4 hover:text-red-500 dark:hover:text-red-400 mb-1"
          >
            <span className="grid place-content-center text-xl text-white">
              <i className="fi fi-rr-home leading-3"></i>
            </span>
            <p className="text-base capitalize text-stone-500">home</p>
          </Link>
          {/* <Link
            href={{
              pathname: "/recent",
            }}
            className="flex gap-4 hover:text-red-500 mb-1 dark:hover:text-red-400"
          >
            <span className="grid place-content-center text-xl text-white">
              <i className="fi fi-rr-time-forward leading-3"></i>
            </span>
            <p className="text-base capitalize text-stone-500">recent videos</p>
          </Link> */}
        </ul>
        <ul className="h-fit flex flex-col pb-4 ml-3 md:ml-0">
          <h5 className="font-semibold capitalize text-lg mb-3 ">explore</h5>
          {categoryBar.map((category) => {
            const isActive = query.category === category.label;
            return (
              <Link
                key={category?.id}
                href={{
                  pathname: "/explore",
                  query: {
                    category: category.label.toLocaleLowerCase(),
                  },
                }}
                className={`${
                  isActive
                    ? "sidebar-link sidebar-link-active as"
                    : "sidebar-link "
                }`}
              >
                <span className="grid place-content-center text-lg text-white">
                  <i className={`fi ${category?.icon} leading-3`}></i>
                </span>
                <p className="text-base capitalize opacity-75 ">
                  {category.label}
                </p>
              </Link>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default LeftSidebar;
