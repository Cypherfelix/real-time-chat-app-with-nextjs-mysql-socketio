import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Store } from "../utils/store";
import { FormContainer } from "../styles";
import { useSession, signIn, signOut } from "next-auth/react";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { password, confirmPassword, username, email } = values;

      const { data } = await axios.post("/api/users/register", {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      } else if (data.status === true) {
        await signIn("credentials", {
          email: email,
          password: password,
          redirect: false,
        });
      } else {
        toast.error(data.msg, toastOptions);
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (regex.test(email) === false) {
      toast.error("Inavlid Email !!", toastOptions);
      return false;
    } else if (password != confirmPassword) {
      toast.error("Password do not match", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username must be at least 3 characters", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be at least 8 characters", toastOptions);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src="./assets/images/logo.svg" alt="" />
            <h1>TwoChat</h1>
          </div>

          <input
            type="text"
            placeholder="Usernames"
            name="username"
            required
            onChange={(event) => handleChange(event)}
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            required
            onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            onChange={(event) => handleChange(event)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            onChange={(event) => handleChange(event)}
          />
          <button type="submit">Create User</button>
          <span>
            Already have an account ? <Link href="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

Register.displayName = "Register";

export default Register;
