import { categoryBar } from "@/utils/contants";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function CategoriesUpperbar() {
  const { asPath } = useRouter();

  return (
    <div className="w-full sticky z-20 top-14 shadow-md h-fit bg-gray-100 dark:bg-zinc-700 pb-4 px-3">
      <ul className="upper-category-bar">
        {categoryBar.map((item, index) => (
          <Link
            key={item.id}
            href={{ pathname: "explore", query: { category: item.link } }}
            className={`upper-category-link ${
              asPath.endsWith(`${item.link}`)
                ? "upper-category-link-active"
                : ""
            }`}
          >
            <span
              className={`grid place-content-center text-lg dark:text-white ${
                asPath.endsWith(`${item.link}`)
                  ? "dark:!text-black !text-white"
                  : ""
              }`}
            >
              <i
                className={`fi ${item.icon} leading-3 pointer-events-none`}
              ></i>
            </span>
            <p
              className={`w-full truncate overflow-hidden ${
                asPath.endsWith(`${item.link}`)
                  ? "dark:!text-black !text-white font-medium"
                  : ""
              }`}
            >
              {item.label}
            </p>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesUpperbar;
