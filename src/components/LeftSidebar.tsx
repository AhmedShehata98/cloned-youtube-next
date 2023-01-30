import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { categoryBar } from "@/utils/contants";

interface ILeftSidebarProps {
  show: boolean;
}
function LeftSidebar({ show }: ILeftSidebarProps) {
  const sidebarRef = useRef<HTMLElement | null>(null);

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
    <aside ref={sidebarRef} className="sidebar-menu">
      <div className="w-2/3 lg:w-full bg-white lg:bg-transparent">
        <ul className="h-fit flex flex-col pl-2 my-2">
          <Link href="/" className="flex gap-4 hover:text-red-500 mb-1 ">
            <span className="grid place-content-center text-xl">
              <i className="fi fi-rr-home leading-3"></i>
            </span>
            <p className="text-base capitalize text-stone-500 hover:text-black">
              home
            </p>
          </Link>
        </ul>
        <ul className="h-fit flex flex-col pb-4">
          <h5 className="font-semibold capitalize text-lg mb-3">explore </h5>
          {categoryBar.map((category) => (
            <Link
              key={category?.id}
              href={{
                pathname: "/explore",
                query: {
                  category: category.label.toLocaleLowerCase(),
                },
              }}
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
      </div>
    </aside>
  );
}

export default LeftSidebar;
