import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { categoryBar } from "@/utils/contants";
import { useRouter } from "next/router";
import SidebarLink from "./SidebarLink";

interface ILeftSidebarProps {
  show: boolean;
}
function LeftSidebar({ show }: ILeftSidebarProps) {
  const sidebarRef = useRef<HTMLElement | null>(null);

  const { query, pathname } = useRouter();
  // const notPages = pathname.includes("/watch");

  useEffect(() => {
    if (show) {
      sidebarRef.current?.classList.add("show-sidebar");
      sidebarRef.current?.firstElementChild?.classList.add(
        "show-category-list"
      );
    } else {
      sidebarRef.current?.classList.remove("show-sidebar");
      sidebarRef.current?.firstElementChild?.classList.remove(
        "show-category-list"
      );
    }
    if (sidebarRef.current?.classList.contains("show-sidebar")) {
      window.document.body.classList.add("prevent-scroll");
    } else {
      window.document.body.classList.remove("prevent-scroll");
    }
  }, [show]);

  return (
    <aside ref={sidebarRef} className={`sidebar-menu`}>
      <div className="side-category-bar">
        <ul className="h-fit flex flex-col pb-4 md:ml-0 gap-2">
          <SidebarLink
            href={{ pathname: "/" }}
            icon="fi-rr-home"
            label="home"
            key={"home"}
            isActive={pathname === "/"}
          />
          <SidebarLink
            href={{ pathname: "/recent" }}
            icon="fi-rr-time-forward"
            label="recent"
            key={"recent"}
            isActive={pathname === "/recent"}
          />
        </ul>
        <ul className="h-fit flex flex-col pb-4 ml-3 md:ml-0 gap-2">
          <h5 className="font-semibold capitalize text-lg mb-3 ">explore</h5>
          {categoryBar.map((category, idx) => {
            const isActive = query.category === category.link;
            return (
              <SidebarLink
                label={category.label}
                icon={category.icon}
                key={category.icon}
                isActive={isActive}
                href={{
                  pathname: "/explore",
                  query: { category: category.link },
                }}
              />
            );
          })}
        </ul>
      </div>
    </aside>
  );
}

export default LeftSidebar;
