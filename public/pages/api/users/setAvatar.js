import axios from "axios";
import { getSession } from "next-auth/react";
import { setAvatar } from "../../../utils/APIRoutes";

const handler = async (req, res, next) => {
  const session = await getSession({ req });
  if (req.method !== "POST") {
    res.status(404).json({
      msg: "Page not Found",
    });
  } else {
    if (!session) {
      res.json({
        msg: "Anauthorized",
      });
      res.end();
    } else {
      const { data } = await axios.post(setAvatar, {
        payload: { profile: req.body.avatar },
        user: {
          ...session.user,
        },
      });

      if (data.status === true) {
        res.json({
          msg: "done",
        });
      } else {
        res.json({
          msg: "Error",
        });
      }
    }
  }
};

export default handler;
