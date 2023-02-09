import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { IoHome, IoBookmark, IoTimer } from "react-icons/io5";

function NavigationBtns() {
  const { asPath } = useRouter();
  return (
    <div className="navbar-btns">
      <nav className="w-full flex justify-around">
        <Link
          href={"/"}
          className={`navbar-btn-link ${
            asPath.endsWith("/") ? "navbar-btn-link-active" : ""
          }`}
          title="home"
        >
          <IoHome />
        </Link>
        <Link href={"/recent"} title="Recents" className={`navbar-btn-link`}>
          <IoTimer />
        </Link>
        <Link href={"/"} title="saved" className={`navbar-btn-link`}>
          <IoBookmark />
        </Link>
      </nav>
    </div>
  );
}

export default NavigationBtns;
