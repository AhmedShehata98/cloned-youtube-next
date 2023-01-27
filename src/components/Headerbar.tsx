import React from "react";
import Logo from "./Logo";

function Headerbar() {
  return (
    <header className="sticky top-0 z-40 w-full h-14 flex justify-between items-center bg-white border-b px-2 lg:px-0">
      <section className="yt-container flex justify-start items-center">
        <div className="flex items-center justify-start gap-6 w-1/3 md:w-3/12">
          <button type="button">
            <i className="fi fi-rr-menu-burger leading-3 text-2xl"></i>
          </button>
          <Logo />
        </div>
        <form className="w-3/5 lg:w-2/5 flex items-center justify-start bg-slate-100 px-3">
          <label
            htmlFor="search-yt-videos"
            className="w-full flex items-center justify-between gap-2"
          >
            <span className="text-lg text-gray-500 flex justify-center items-center">
              <i className="fi fi-rr-search leading-3"></i>
            </span>
            <input
              className="flex-1 bg-gray-100 py-1 px-3 focus:outline-none"
              type="search"
              name="search-yt-videos"
              id="search-yt-videos"
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
          <button className="w-fit h-9 flex items-center justify-center gap-2 ml-4 px-3 rounded-3xl text-cyan-700 border border-slate-400 bg-gray-200">
            <span className="w-7 h-7 text-lg grid place-content-center">
              <i className="fi fi-rr-user leading-3 select-none pointer-events-none"></i>
            </span>
            <p>Guest user</p>
          </button>
        </div>
      </section>
    </header>
  );
}

export default Headerbar;
