/* eslint-disable react/react-in-jsx-scope */
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Chat from "./chat";
import Login from "./login";
import { Container } from "../styles/";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  return (
    <div className="">
      <Head>
        <title>TwoChat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {status === "loading" && (
        <Container>
          <img src="/assets/images/loader.gif" className="loader" alt="" />
        </Container>
      )}

      {session ? <Chat /> : <Login />}
    </div>
  );
};

export default Home;
