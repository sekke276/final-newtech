const express = require("express");
const {
  httpGetUserById,
  httpGetAllMembers,
  httpUpdateUser,
  httpMoveToActiveTransaction,
  httpMoveToPreTransaction,
  httpDeleteUser,
} = require("./user.controller");

const userRouter = express.Router();

userRouter.get("/getuser/:id", httpGetUserById);
userRouter.get("/allmembers", httpGetAllMembers);
userRouter.put("/updateuser/:id", httpUpdateUser);
userRouter.put("/:id/move-to-activetransactions", httpMoveToActiveTransaction);
userRouter.put("/:id/move-to-prevtransactions", httpMoveToPreTransaction);
userRouter.delete("/deleteuser/:id", httpDeleteUser);
module.exports = userRouter;
