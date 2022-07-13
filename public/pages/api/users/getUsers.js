import axios from "axios";
import { getSession } from "next-auth/react";
import { getUsers } from "../../../utils/APIRoutes";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (req.method !== "GET") {
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
      const { data } = await axios.post(getUsers, {
        email: session.user.email,
      });

      if (data.status === true) {
        res.json({
          users: data.users,
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
