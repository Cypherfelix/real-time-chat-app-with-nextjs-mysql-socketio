const {
  register,
  checkuser,
  test,
  login,
  check,
  getUserByEmail,
} = require("../controllers/usersController");

const router = require("express").Router();

router.post("/register", register);
router.post("/checkaccount", checkuser);
router.post("/login", login);
router.post("/test", test);
router.post("/check", check);
router.post("/getUserByEmail", getUserByEmail);

module.exports = router;
