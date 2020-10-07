const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require("express").Router();

const Users = require("../users/users-model.js");
const { isValid } = require("../users/users-service.js");

router.post("/register", async (req, res, next) => {
  const credentials = req.body;

  try {
    if (isValid(credentials)) {
      const rounds = process.env.BCRYPT_ROUNDS
        ? parseInt(process.env.BCRYPT_ROUNDS)
        : 8;

      const hash = bcryptjs.hashSync(credentials.password, rounds);
      credentials.password = hash;

      const user = await Users.add(credentials);
      const token = generateToken(user);
      res.status(201).json({ data: user, token });
    } else {
      next({
        apiCode: 400,
        apiMessage:
          "Username or password missing, or password not alphanumeric",
      });
    }
  } catch (err) {
    next({ apiCode: 500, apiMessage: "Error saving new user", ...err });
  }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!isValid(req.body)) {
      next({
        apiCode: 400,
        apiMessage: "Username or password missing, or not alphanumeric",
      });
    } else {
      const [user] = await Users.findBy({ username: username });
      if (user && bcryptjs.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ message: "Welcome to the api", token: token });
      } else {
        next({ apiCode: 401, apiMessage: "Invalid credentials" });
      }
    }
  } catch (err) {
    next({ apiCode: 500, apiMessage: "DB error loggin in", ...err });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    departmentname: user.departmentname,
  };

  const secret = process.env.JWT_SECRET || "some insecure secret";
  const options = {
    expiresIn: "1d",
  };

  const token = jwt.sign(payload, secret, options);

  return token;
}

module.exports = router;
