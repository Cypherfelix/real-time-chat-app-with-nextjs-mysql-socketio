/* eslint-disable react/prop-types */
import React from "react";
import styled from "styled-components";

export default function Welcome({ user }) {
  return (
    <Container>
      <img src="/assets/images/robot.gif" alt="robot" />
      <h1>
        Welcome <span>{user.username || user.name}!</span>
      </h1>
      <h3>Please select a chat to start Messaging</h3>
    </Container>
  );
}

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;
    img{
        height: 20rem;
    }
    span{
        color: #4e00ff;
    }
`;
