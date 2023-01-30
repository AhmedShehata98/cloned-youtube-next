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
import Logo from "./Logo";

interface IHeaderbarProps {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}
function Headerbar({ setShowSidebar }: IHeaderbarProps) {
  const [query, setQuery] = useState<string>();
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
    _ev.preventDefault();
    setShowSidebar((curr) => !curr);
  }
  function handleShowSearchInput() {
    setshowInputSearch((current) => !current);
  }

  useEffect(() => {
    window.addEventListener("resize", () => {
      setInnerWidth(window.innerWidth);
    });
  }, []);

  useEffect(() => {
    if (innerWidth >= 770) {
      setshowInputSearch(false);
    }
  }, [innerWidth]);

  return (
    <header className="yt-header">
      <section className="yt-container flex justify-start items-center">
        <div className="flex items-center justify-start gap-3 lg:gap-6 w-fit lg:w-1/5 pl-1 pr-3">
          <button
            type="button"
            className="grid place-content-center lg:hidden"
            onClick={(ev: MouseEvent) => handlerShowSidebar(ev)}
          >
            <i className="fi fi-rr-menu-burger leading-3 text-3xl"></i>
          </button>
          {!showInputSearch && <Logo />}
        </div>
        <form
          className={`flex-1 hidden lg:flex-none lg:w-2/5 lg:flex items-center justify-start rounded-full mx-2 overflow-hidden ${
            showInputSearch && "!flex"
          } bg-zinc-200`}
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
              className="text-lg text-gray-500 flex justify-center items-center hover:bg-stone-300 hover:text-black py-2 pl-5 pr-4"
            >
              <i className="fi fi-rr-search leading-3"></i>
            </button>
            <input
              className="flex-1 bg-zinc-200 py-1 px-3 focus:outline-none"
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
            className="w-8 grid lg:hidden place-content-center aspect-square shadow bg-zinc-200 border border-slate-200 rounded-full hover:bg-gray-300 ml-2"
            onClick={handleShowSearchInput}
          >
            {showInputSearch ? (
              <i className="fi fi-rr-arrow-small-left leading-3 select-none pointer-events-none text-2xl"></i>
            ) : (
              <i className="fi fi-rr-search leading-3 select-none pointer-events-none "></i>
            )}
          </button>
          <button className="hidden w-8 md:grid place-content-center aspect-square shadow bg-zinc-200 border border-slate-200 rounded-full hover:bg-gray-300">
            <i className="fi fi-sr-bell leading-3 select-none pointer-events-none"></i>
          </button>
          <button className="hidden w-8 md:grid place-content-center aspect-square shadow bg-zinc-200 border border-slate-200 rounded-full hover:bg-gray-300">
            <i className="fi fi-sr-comment leading-3 select-none pointer-events-none"></i>
          </button>
          <button
            className={`w-fit h-8 flex items-center justify-center gap-2 lg:ml-4 lg:px-3 rounded-full text-slate-900 border border-slate-200 bg-gray-200 ${
              showInputSearch && "hidden"
            }`}
          >
            <span className="w-8 h-full text-lg grid place-content-center">
              <i className="fi fi-sr-fill leading-3 select-none pointer-events-none"></i>
            </span>
          </button>
        </div>
      </section>
    </header>
  );
}

export default Headerbar;
