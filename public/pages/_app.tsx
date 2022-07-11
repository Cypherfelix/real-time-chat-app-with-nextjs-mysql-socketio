/* eslint-disable react/react-in-jsx-scope */
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { StoreProvider } from "../utils/store";
import { SessionProvider } from "next-auth/react";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <SessionProvider session={session}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </SessionProvider>
  );
};

export default MyApp;
