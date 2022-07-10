import React, { useContext, useEffect, useState } from "react";
import { FormContainer } from "../styles";
import { Button, Heading } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsGithub, BsTwitter, BsGoogle } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import { Store } from "../utils/store";
import { useRouter } from "next/router";
import Link from "next/link";
import Cookies from "js-cookie";

const providers = [
  {
    name: "google",
    Icon: BsGoogle,
  },
];

const LogIn = () => {
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
  const { data: session, status } = useSession();
  console.log(session);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const { error } = router.query;
  let err = error;

  useEffect(() => {
    if (err) {
      toast.error(err, toastOptions);
      console.log(err);
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", "/login");
      }
      err = null;
      return;
    }
  }, [err]);

  const handleOAuthSignIn = async (provider) => {
    try {
      //, { callbackUrl: "/login" }
      signIn(provider);
      // console.log(result);
      // if (result.error) {
      //   toast.error(result.error, toastOptions);
      // }
    } catch (err) {
      toast.error(err.message, toastOptions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      console.log(result.error);
      if (result.error) {
        toast.error(result.error, toastOptions);
      }
    } catch (err) {
      toast.error(err.message, toastOptions);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  if (status === "loading")
    return <Heading>Checking Authentication...</Heading>;

  if (session) {
    setTimeout(() => {
      // router.push("/");
    }, 5000);

    return <Heading>you are already signed in</Heading>;
  }

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
            placeholder="Email or Username"
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

          <button type="submit">LogIn</button>
          {providers.map(({ name, Icon }) => (
            <Button
              key={name}
              leftIcon={<Icon />}
              onClick={(e) => handleOAuthSignIn(name)}
              textTransform="uppercase"
              w="100%"
            >
              Sign in with {name}
            </Button>
          ))}

          <span>
            Dont have an account ? <Link href="/register">SignUp</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer limit={1} />
    </>
  );
};

export default LogIn;
