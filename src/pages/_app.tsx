import "../styles/globals.css";
import Headerbar from "@/components/Headerbar";
import type { AppProps } from "next/app";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Headerbar />
        <Component {...pageProps} />
        <ReactQueryDevtools panelPosition="bottom" />
      </Hydrate>
    </QueryClientProvider>
  );
}
