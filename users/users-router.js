const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");
const checkDpmt = require("../auth/check-dpmt-middleware.js");

router.get("/", restricted, async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    next({ apiCode: 500, apiMessage: "DB error getting users", ...err });
  }
});

router.post("/", restricted, checkDpmt("Finance"), async (req, res) => {
  try {
    res.status(501).json({ message: "not implemented" });
  } catch (err) {
    next({ apiCode: 500, apiMessage: "Error adding user", ...err });
  }
});

module.exports = router;
