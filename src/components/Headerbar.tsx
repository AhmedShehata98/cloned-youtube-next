import { useRouter } from "next/dist/client/router";
import React, {
  ChangeEvent,
  Dispatch,
  FormEvent,
  MouseEvent,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Logo from "./Logo";

interface IHeaderbarProps {
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}
function Headerbar({ setShowSidebar }: IHeaderbarProps) {
  const [query, setQuery] = useState<string>();
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

  return (
    <header className="yt-header">
      <section className="yt-container flex justify-start items-center">
        <div className="flex items-center justify-start gap-6 w-1/3 md:w-3/12 pl-1">
          <button
            type="button"
            className="lg:hidden"
            onClick={(ev: MouseEvent) => handlerShowSidebar(ev)}
          >
            <i className="fi fi-rr-menu-burger leading-3 text-2xl"></i>
          </button>
          <Logo />
        </div>
        <form
          className="w-3/5 lg:w-2/5 flex items-center justify-start bg-zinc-200"
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
              className="text-lg text-gray-500 flex justify-center items-center hover:bg-stone-400 hover:text-black py-2 px-3"
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
        <div className="w-0 lg:w-1/4 overflow-hidden flex justify-center items-center gap-2 ml-auto">
          <button className="w-9 grid place-content-center aspect-square bg-gray-200 border border-slate-300 rounded-full hover:bg-gray-300">
            <i className="fi fi-sr-bell leading-3 select-none pointer-events-none"></i>
          </button>
          <button className="w-9 grid place-content-center aspect-square bg-gray-200 border  border-slate-300 rounded-full hover:bg-gray-300">
            <i className="fi fi-sr-comment leading-3 select-none pointer-events-none"></i>
          </button>
          <button className="w-fit h-8 flex items-center justify-center gap-2 ml-4 px-3 rounded-full text-slate-700 border border-slate-400 bg-gray-200">
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
