/* eslint-disable react/prop-types */
import multiavatar from "@multiavatar/multiavatar";
import React from "react";
import styled from "styled-components";
import Logout from "./Logout"
import ChatInput from "./ChatInput";
import Messages from "./Messages";

function ChatContainer({ selectedUser }) {
  // console.log(selectedUser);
    const handleSendMessage = async (msg) => {
        alert(msg);
    }
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

          <Messages/>
          <ChatInput handleSendMessage={handleSendMessage}/>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  padding-top: 1rem;
  grid-template-rows: 10% 75% 15%;
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
`;

export default ChatContainer;
