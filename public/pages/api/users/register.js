import { nextConnect as nc } from "next-connect";
import axios from "axios";
import { signToken } from "../../../utils/auth";
import { registerRoute } from "../../../utils/APIRoutes";

//  handler = require("express").Router();

const handler = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return;
    }
    const { username, email, password } = req.body;
    if (
      !username ||
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 5
    ) {
      res.status(422).json({
        message: "Validation error",
      });
      return;
    }

    const { data } = await axios.post(registerRoute, req.body);

    if (data.status == false) {
      res.json({ status: false, msg: data.msg });
    }

    if (data.status === true) {
      const { user } = data;
      const token = signToken(user);
      res.json({
        status: true,
        user: {
          token,
          user,
        },
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export default handler;
