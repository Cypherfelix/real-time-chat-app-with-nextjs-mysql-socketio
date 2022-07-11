import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { Container } from "../styles";
import { useSession } from "next-auth/react";
import multiavatar from "@multiavatar/multiavatar/esm";

export default function SetAvatar() {
  const router = useRouter();
  const [avatars, setAvatars] = useState([]);
  const [code, setCode] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const { data: session, status } = useSession();
  console.log(session);

  if (!session && status != "loading") {
    router.push("/login");
  }

  const setProfilePic = async () => {
    const { data } = await axios.post("/api/users/setAvatar", {
      avatar: `${code[selectedAvatar]}`,
    });

    if (data.msg != "done") {
      router.push("/login");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    // if (!session) {
    //   router.push("/login");
    // }

    const data = [];
    const vals = [];
    async function fetchData() {
      for (let i = 0; i < 4; i++) {
        var no = Math.round(Math.random() * 1000);
        while (vals.includes(no)) {
          no = Math.round(Math.random() * 1000);
        }
        let svgCode = multiavatar(`45678945/${no}`);
        data.push(svgCode);
        vals.push(`45678945/${no}`);
      }
      setAvatars(data);
      setCode(vals);
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    }

    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src="/assets/images/loader.gif" className="loader" alt="" />
        </Container>
      ) : (
        <Container>
          <div className="tittle-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, i) => {
              return (
                <div
                  className={`avatar ${selectedAvatar === i ? "selected" : ""}`}
                  key={i}
                >
                  {/* ${avatar}*/}
                  <div
                    className="img"
                    onClick={() => setSelectedAvatar(i)}
                    dangerouslySetInnerHTML={{ __html: `${avatar}` }}
                  ></div>

                  {/* <img src={`data:image/svg+xml;base64,${avatar}
                  alt="avatar `} onClick={() => setSelectedAvatar(i)} /> */}
                </div>
              );
            })}
          </div>

          <button className="submit-btn" onClick={() => setProfilePic()}>
            Set as Profile
          </button>
        </Container>
      )}
      <ToastContainer />
    </>
  );
}
