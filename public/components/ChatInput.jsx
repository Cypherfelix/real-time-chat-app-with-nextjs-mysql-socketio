/* eslint-disable react/prop-types */
import React, { useState } from "react";
import styled from "styled-components";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

import dynamic from "next/dynamic";
const Picker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});
export default function ChatInput({ handleSendMessage }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState("");
  const handleEmojiPickerClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emoji) => {
    let message = msg;
    message = message + emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={() => handleEmojiPickerClick()} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
          <form action="" onSubmit={(e) => sendChat(e)}>
        <div className="input-container">
          <input
            type="text"
            name="message"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type your message here"
          />
        </div>
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 90%;
  align-items: center;
  background-color: #080420;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  justify-content: space-between;

  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    margin-right: 1.5rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
    }
    .emoji-picker-react{
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9186f3;
        .emoji-scroll-wrapper::-webkit-scrollbar{
            background-color: #080420;
            width: 5px;
            &-thumb{
                background-color: #9186f3;
            }
        }
        .emoji-categories{
            button{
                filter: contrast(0);
            }
        }

        .emoji-search{
            background-color: transparent;
            border-color: #9186f3;
        }

        .emoji-group::before{
            background-color: #080420;
        }
    }
  }
  form {
    display: flex;
    /* grid-template-columns: 80% 20%; */
    justify-content: space-between;
    .input-container {
      border-radius: 2rem;
      display: flex;
      /* align-content: center; */
      width: 80%;
      align-items: center;
      gap: 2rem;
      background-color: #ffffff34;
      input {
        width: 90%;
        height: 80%;
        background-color: transparent;
        color: white;
        border: none;
        padding-left: 1rem;
        font-size: 1.2rem;
        justify-content: center;
        align-items: center;
        &::selection {
          background-color: #9186f3;
        }

        &:focus {
          outline: none;
        }
      }
    }
    button {
      margin-left: 10px;
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9186f3;
      border: none;
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
