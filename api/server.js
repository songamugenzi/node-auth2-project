const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const errHandler = require("./errorHandler.js");

const authRouter = require("../auth/auth-router.js");
const usersRouter = require("../users/users-router.js");

const server = express();

// Global Middleware //
server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/users", usersRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

server.use(errHandler);

module.exports = server;
