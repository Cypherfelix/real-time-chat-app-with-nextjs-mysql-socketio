import axios from "axios";
import { getSession } from "next-auth/react";
import { sendMessage } from "../../../utils/APIRoutes";

const handler = async (req, res) => {
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
      const { data } = await axios.post(sendMessage, {
        from: session.user.id,
        ...req.body
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
