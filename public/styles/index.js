import styled from "styled-components";
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: ${({ theme }) => theme.primary};
  overflow: auto;
  img {
    height: 3rem;
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }

  h1 {
    color: ${({ theme }) => theme.text};
    text-transform: uppercase;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: ${({ theme }) => theme.secondary};
    border-radius: 2rem;
    padding: 2rem 5rem;
  }

  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: ${({ theme }) => theme.text};
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #997af0;
    color: ${({ theme }) => theme.text};
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: ${({ theme }) => theme.text};
    text-transform: uppercase;
    letter-spacing: 1px;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: ${({ theme }) => theme.primary};
  height: 100vh;
  width: 100vw;

  .loader {
    max-inline-size: 100%;
  }

  .tittle-container {
    h1 {
      color: ${({ theme }) => theme.text};
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;
      img,
      svg,
      .img {
        height: 6rem;
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .submit-btn {
    background-color: #997af0;
    color: ${({ theme }) => theme.text};
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    transition: 0.5s ease-in-out;
    &:hover {
      background-color: #4e0eff;
    }
  }
`;

module.exports = {
  FormContainer,
  Container,
};
