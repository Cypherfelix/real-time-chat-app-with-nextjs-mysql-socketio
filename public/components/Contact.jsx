/* eslint-disable react/prop-types */
import multiavatar from "@multiavatar/multiavatar";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Contact({ contacts, currentUser, changeChat  }) {
  const [currentUserName, setcurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (currentUser) {
      if (currentUser.username === null) {
        setcurrentUserName(currentUser.name);
      } else {
        setcurrentUserName(currentUser.username);
      }
      var svgCode;
      if (currentUser.profile === null) {
        svgCode = multiavatar(`${currentUserName}`);
      } else {
        svgCode = multiavatar(`${currentUser.profile}`);
      }
      setCurrentUserImage(svgCode);
    }
  }, [currentUser]);
 
    const changeCurrentChat = (chat,index) => {
        changeChat(chat);
        setCurrentSelected(index);
     }
    
  return (
    <>
      {currentUserImage && currentUserName && (
        <Container>
          <div className="brand">
            <img src="../assets/images/logo.svg" alt="" />
            <h3>TwoChat</h3>
          </div>

          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                      className={`contact ${index === currentSelected ? "selected" : ""
                          }`}
                      key={index}
                      onClick={() => changeCurrentChat(contact,index)}
                >
                  <div className="avatar">
                    <div
                      className="img"
                      dangerouslySetInnerHTML={{
                        __html: `${multiavatar(
                          contact.profile === null
                            ? contact.name
                            : contact.profile
                        )}`,
                      }}
                    ></div>
                  </div>
                  <div className="username">
                    <h3>{contact.name || contact.username}</h3>
                  </div>
                </div>
              );
            })}
            
          </div>

          <div className="current-user">
            <div className="avatar">
              <div
                className="img"
                dangerouslySetInnerHTML={{
                  __html: `${multiavatar(currentUserImage)}`,
                }}
              ></div>
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    .img,
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar{
        width: 0.2rem;

        &-thumb{
            background-color: #ffffff39;
            width: 0.1rem;
            border-radius: 1rem;
        }
    }
    .contact {
      background-color: #ffffff39;
      min-height: 4rem;
      width: 90%;
      cursor: pointer;
      border-radius: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
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

    .selected {
      background-color: #9186f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .avatar {
      .img svg {
        height: 4rem;
        max-inline-size: 100%;
      }
    }

    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
