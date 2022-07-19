/* eslint-disable react/prop-types */
import multiavatar from "@multiavatar/multiavatar";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";

const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  } else {
    hours = `0${hours}`;
  }

  return `${hours}:${minutes}`;
};


function ChatContainer({ selectedUser, fetchData }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (selectedUser) {
      const getMsg = async () => {
        const data = await fetchData(selectedUser);
        console.log(data);
        setMessages(data);
      };
      getMsg();
    }
  }, [fetchData]);

  const handleSendMessage = async (msg) => {
    const { data } = await axios.post("/api/messages/sendMsg", {
      to: selectedUser.id,
      message: msg,
    });

    const msgs = await fetchData(selectedUser);
    setMessages(msgs);
  };
  return (
    <>
      {selectedUser && (
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <div
                  className="img"
                  dangerouslySetInnerHTML={{
                    __html: `${multiavatar(
                      selectedUser.profile === null
                        ? selectedUser.name
                        : selectedUser.profile
                    )}`,
                  }}
                ></div>
              </div>
              <div className="username">
                <h3>{selectedUser.name || selectedUser.username}</h3>
              </div>
            </div>
            <Logout />
          </div>

          {/* <Messages />
           */}

          <div className="message-container">
            {messages.map((message, index) => {
              var date = new Date(message.timestamp)
              return (
                <div key={index}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "received"
                    }`}
                  >
                    <div className="content">
                      <p>{message.message}</p>
                      <p className="time">
                        {convertTime12to24(date.toLocaleTimeString())}{" "}
                        {message.fromSelf ? message.seen ? (
                          <span> &#10003; &#10003;</span>
                        ) : (
                          <span className="unread"> &#10003;</span>
                        ):""}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMessage={handleSendMessage} />
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  grid-template-rows: 10% 75% 15%;
  gap: 0.1rem;
  overflow: hidden;
  display: grid;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 3rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

      .avatar {
        .img svg {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .message-container {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        display: flex;
        flex-direction: column;
        padding-bottom: 0.4rem;
        gap: 0.5rem;
        .time {
          align-self: flex-end;
          font-size: 0.7rem;
          span {
            font-size: 12px;
            font-weight: 700;
            word-spacing: -8px;
            color: #419dcf;
            transform: rotate(12deg);
            -ms-transform: rotate(12deg);
            -webkit-transform: rotate(12deg);
            display: inline-block;
          }
          span.unread {
            color: #ffffff34;
          }
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;

export default ChatContainer;

// transform: rotate(0deg); */
    