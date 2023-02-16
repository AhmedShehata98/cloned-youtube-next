import { useRouter } from "next/dist/client/router";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  MouseEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  IoMenu,
  IoCloseSharp,
  IoSearchSharp,
  IoMoonSharp,
  IoSunnySharp,
  IoNotificationsSharp,
  IoArrowForwardSharp,
} from "react-icons/io5";
import { MdOutlineComment } from "react-icons/md";
import Logo from "./Logo";

interface IHeaderbarProps {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}
function Headerbar({ setShowSidebar }: IHeaderbarProps) {
  const [query, setQuery] = useState<string>();
  const [currentTheme, setCurrentTheme] = useState<"DARK" | "LIGHT">("LIGHT");
  const [showInputSearch, setshowInputSearch] = useState<boolean>(false);
  const [innerWidth, setInnerWidth] = useState<number>(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );
  const { push } = useRouter();

  function handleSearch(_ev?: MouseEvent | KeyboardEvent) {
    const target = _ev?.target as HTMLFormElement;
    target?.preventDefault();
    if (query) {
      push({
        pathname: "/results",
        query: { search_query: query?.toLowerCase() },
      });
    }
  }
  function handlerShowSidebar(_ev: MouseEvent) {
    const target = _ev.target as HTMLElement;
    _ev.preventDefault();
    setShowSidebar((curr) => !curr);
    const icons = target.children as HTMLCollection;

    Array.from(icons).forEach((icon) =>
      icon.classList.contains("hidden")
        ? icon.classList.remove("hidden")
        : icon.classList.add("hidden")
    );
  }

  const handleClosesidebar = (ev: globalThis.MouseEvent) => {
    const target = ev.target as HTMLElement;
    if (target.id !== "sidemenuBtn") setShowSidebar(false);
  };

  function handleShowSearchInput() {
    setshowInputSearch((current) => !current);
  }

  const handleReSize = () => {
    setInnerWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", () => {
      handleReSize();
    });
    return () => {
      removeEventListener("resize", handleReSize);
    };
  }, []);

  useEffect(() => {
    if (innerWidth >= 770) {
      setshowInputSearch(false);
    }
  }, [innerWidth]);

  useEffect(() => {
    window.document.onclick = (ev: globalThis.MouseEvent) => {
      handleClosesidebar(ev);
    };
    return () => {
      removeEventListener("click", handleClosesidebar);
    };
  }, []);

  const handleSwitchMode = () => {
    setCurrentTheme((prev) => (prev === "LIGHT" ? "DARK" : "LIGHT"));
    if (typeof window !== "undefined") {
      window.localStorage.setItem("currentTheme", currentTheme);
      if (currentTheme === "DARK") {
        window.document.documentElement.classList.replace("dark", "light");
      } else {
        window.document.documentElement.classList.replace("light", "dark");
      }
    }
  };

  return (
    <header className="yt-header">
      <section className="yt-container flex justify-start items-center">
        <div className="flex items-center justify-start gap-3 lg:gap-6 w-fit lg:w-1/5 pl-1 pr-3">
          {!showInputSearch && <Logo />}
        </div>
        <form
          className={`search-form ${
            showInputSearch && "!flex"
          } bg-zinc-200 dark:bg-zinc-600`}
          onSubmit={(ev: FormEvent<HTMLFormElement>) => {
            ev.preventDefault();
            handleSearch();
          }}
        >
          <label
            htmlFor="search-yt-videos"
            className="w-full flex items-center justify-between gap-2"
          >
            <button
              type="button"
              onClick={() => handleSearch()}
              className="text-lg text-gray-500 dark:text-zinc-200 flex justify-center items-center hover:bg-stone-300 dark:hover:bg-zinc-700 hover:text-black py-2 pl-5 pr-4"
            >
              <IoSearchSharp className="fi fi-rr-search leading-3" />
            </button>
            <input
              className="flex-1 bg-zinc-200 dark:bg-zinc-600 dark:placeholder:text-zinc-300 py-1 px-3 focus:outline-none"
              type="search"
              name="search-yt-videos"
              id="search-yt-videos"
              placeholder="search for videos or channels ..."
              value={query}
              onChange={(ev: ChangeEvent<HTMLInputElement>) =>
                setQuery(ev.target.value)
              }
            />
          </label>
        </form>
        <div className="w-fit overflow-hidden flex justify-center items-center gap-2 ml-auto">
          <button
            className="w-8 grid lg:hidden place-content-center aspect-square shadow bg-zinc-200 dark:bg-zinc-600 border border-slate-200 dark:border-gray-400 rounded-full dark:text-white hover:bg-gray-300 ml-2"
            onClick={handleShowSearchInput}
          >
            {showInputSearch ? (
              <IoArrowForwardSharp className="fi fi-rr-arrow-small-left leading-3 select-none pointer-events-none text-2xl" />
            ) : (
              <IoSearchSharp className="fi fi-rr-search leading-3 text-2xl select-none pointer-events-none " />
            )}
          </button>
          <button className="hidden w-8 md:grid place-content-center aspect-square shadow bg-zinc-200 border border-slate-200 dark:border-gray-400 dark:text-white dark:bg-zinc-600 dark:hover:bg-zinc-700 rounded-full hover:bg-gray-300">
            <IoNotificationsSharp className="fi fi-sr-bell leading-3 select-none pointer-events-none" />
          </button>
          <button className="hidden w-8 md:grid place-content-center aspect-square shadow border-slate-200 dark:border-gray-400 dark:text-white bg-gray-200 dark:bg-zinc-600 dark:hover:bg-zinc-700 rounded-full hover:bg-gray-300">
            <MdOutlineComment className="fi fi-sr-comment leading-3 select-none pointer-events-none" />
          </button>
          <button
            className={`w-fit h-8 flex items-center justify-center gap-2 lg:ml-4 lg:px-3 rounded-full dark:border-gray-400 ${
              currentTheme === "DARK"
                ? "bg-yellow-400 tex-black"
                : "bg-violet-700 text-white"
            } ${showInputSearch && "hidden"}`}
            onClick={() => handleSwitchMode()}
          >
            <span className="w-8 h-full text-lg grid place-content-center select-none pointer-events-none">
              {currentTheme === "DARK" && (
                <IoSunnySharp className="fi fi-sr-brightness leading-3 select-none pointer-events-none" />
              )}
              {currentTheme === "LIGHT" && (
                <IoMoonSharp className="fi fi-sr-moon-stars leading-3 select-none pointer-events-none" />
              )}
            </span>
          </button>
        </div>
      </section>
    </header>
  );
}

export default Headerbar;
