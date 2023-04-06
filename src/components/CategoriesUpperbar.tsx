import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface ICategoriesUpperbarProps {
  categoriesData: Array<string>;
}
function CategoriesUpperbar({ categoriesData }: ICategoriesUpperbarProps) {
  const { asPath } = useRouter();

  return (
    <div className="w-full sticky z-20 top-14 shadow-md h-fit bg-gray-100 dark:bg-zinc-700 pb-4 px-3">
      <ul className="upper-category-bar">
        {categoriesData?.map((item) => (
          <Link
            key={item}
            href={{ pathname: "explore", query: { category: item } }}
            className={`upper-category-link ${
              asPath.endsWith(`${item}`) ? "upper-category-link-active" : ""
            }`}
          >
            <p
              className={`w-full truncate overflow-hidden ${
                asPath.endsWith(`${item}`)
                  ? "dark:!text-black !text-white font-medium"
                  : ""
              }`}
            >
              {item}
            </p>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default CategoriesUpperbar;
