/* eslint-disable react/react-in-jsx-scope */
import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { StoreProvider } from "../utils/store";
import { SessionProvider } from "next-auth/react";
// import { useState } from "react";
import { darkTheme } from "../utils/Theme";
import { ThemeProvider } from "styled-components";

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) => {
  // const [theme, setTheme] = useState("dark");
  // const themeToggler = () => {
  //   theme === "light" ? setTheme("dark") : setTheme("light");
  // };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    // theme === "light" ? darkTheme :
    <ThemeProvider theme={darkTheme}>
      <SessionProvider session={session}>
        <StoreProvider>
          {/* <button onClick={() => themeToggler()}>Set Theme</button> */}
          <Component {...pageProps} />
        </StoreProvider>
      </SessionProvider>
    </ThemeProvider>
  );
};

export default MyApp;
