import "../styles/globals.css";
import "../styles/reset.css";

import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextPage } from "next";
import DefaultLayout from "components/Layouts/DefaultLayout";
import React from "react";
import { getTokenAtLocalStorage } from "utils/localStorage";
import { setTokenToAxiosHeader } from "apis";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Loading from "components/Loading";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const [isLogged, setIsLogged] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const token = getTokenAtLocalStorage();

    if (token) {
      setTokenToAxiosHeader(token);
      setIsLogged(true);
      return;
    }

    setIsLogged(false);
  }, []);

  if (typeof isLogged !== "boolean") return <Loading />;

  const getLayout =
    Component.getLayout ||
    ((page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <QueryClientProvider client={queryClient}>
      {getLayout(<Component {...pageProps} />)}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
