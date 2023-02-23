import Link from "next/link";
import React from "react";
import { Url } from "url";

interface ISidebarLinkProps {
  key: string | number;
  isActive?: boolean;
  icon: string;
  href?: Partial<Url>;
  label: string;
}
function SidebarLink({
  label,
  icon,
  isActive,

  href,
  key,
}: ISidebarLinkProps) {
  return (
    <Link
      key={key}
      href={{ ...href }}
      className={`${
        isActive ? "sidebar-link sidebar-link-active as" : "sidebar-link "
      }`}
    >
      <span className="grid place-content-center text-lg dark:text-white">
        <i className={`fi ${icon} leading-3`}></i>
      </span>
      <p className="text-base capitalize opacity-75 ">{label}</p>
    </Link>
  );
}

export default SidebarLink;
