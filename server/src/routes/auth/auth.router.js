const express = require("express");
const { httpRegister, httpSignin } = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/register", httpRegister);
authRouter.post("/signin", httpSignin);
module.exports = authRouter;
