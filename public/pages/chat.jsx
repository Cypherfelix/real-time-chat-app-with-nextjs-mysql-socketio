import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Container } from "../styles";

const Chat = () => {
  const { data: session, status } = useSession();
  console.log(session);
  const router = useRouter();
  useEffect(() => {
    if (!session && status != "loading") {
      router.push("/login");
    }
  }, [session]);

  return (
    <>
      {status === "loading" ? (
        <Container>
          <img src="/assets/images/loader.gif" className="loader" alt="" />
        </Container>
      ) : (
        <Container>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

export default Chat;
