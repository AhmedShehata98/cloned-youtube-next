import "../styles/globals.css";
import Headerbar from "@/components/Headerbar";
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRef, useState } from "react";
import LeftSidebar from "@/components/LeftSidebar";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Headerbar setShowSidebar={setShowSidebar} />
        <main className="min-h-screen w-full flex justify-center items-center bg-gray-50">
          <section className="yt-container flex flex-row items-start justify-start">
            <LeftSidebar show={showSidebar} />
            <Component {...pageProps} />
          </section>
        </main>
        {/* <ReactQueryDevtools panelPosition="bottom" /> */}
      </Hydrate>
    </QueryClientProvider>
  );
}
