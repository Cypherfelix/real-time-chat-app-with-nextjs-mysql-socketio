import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import Contact from "../components/Contact"
import Welcome from "../components/Welcome"
import ChatContainer from '../components/ChatContainer'

const Chat = () => {
  const [contacts, setContacts] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [currentChat, setCurrentChat] = useState(undefined);
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session && status != "loading") {
      router.push("/login");
    } else {
      const fetchContacts = async () => {
        const { data } = await axios.get(`/api/users/getUsers`); 
        setContacts(data.users);
        setIsLoading(false);
      }
      fetchContacts();
    }
  }, [session]);

  const handleChatChange = (chat) => { 
    setCurrentChat(chat);
  } 

  return (
    <>
      {status === "loading" ? (
        <Container>
          <img src="/assets/images/loader.gif" className="loader" alt="" />
        </Container>
      ) : (
        <Container>
          <div className="container">
            <Contact
              contacts={contacts}
              currentUser={session.user}
              changeChat={handleChatChange}
            />

            {!isLoading && currentChat === undefined ? (
              <Welcome user={session.user} />
            ) : (
                  <ChatContainer user={session.user} selectedUser={ currentChat} />
            )}
          </div>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: ${({ theme }) => theme.primary};

  .container {
    height: 85vh;
    width: 85vw;
    background-color: ${({ theme }) => theme.secondary};
    display: grid;
    grid-template-columns: 25% 75%;
    border-radius: 2rem;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
