const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

async function httpGetUserById(req, res) {
  try {
    const user = await User.FindUserById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

async function httpGetAllMembers(_, res) {
  try {
    const users = await User.GetAllUsers();
    const response = users.map((user) => {
      const { password, updatedAt, ...other } = user._doc;
      return other;
    });

    res.status(200).json(response);
  } catch (err) {
    return res.stauts(500).json(err);
  }
}

async function httpUpdateUser(req, res) {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    try {
      const user = await User.UpdateUserById(req.params.id, req.body);
      if (!user) {
        return res.status(404).json("user not found");
      }
      return res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can update only account!");
  }
}

async function httpMoveToActiveTransaction(req, res) {
  if (req.body.isAdmin) {
    try {
      await User.UpdateActiveTransactions(req.body.userId, req.params.id);
      res.status(200).json("Added to Active Transaction");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Only Admin can add a transaction");
  }
}

async function httpMoveToPreTransaction(req, res) {
  if (req.body.isAdmin) {
    try {
      await User.UpdatePreTransaction(req.body.userId, req.params.id);
      res.status(200).json("Added to Prev transaction Transaction");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("Only Admin can do this");
  }
}

async function httpDeleteUser(req, res) {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.DeleteUser(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
}

module.exports = {
  httpGetUserById,
  httpGetAllMembers,
  httpUpdateUser,
  httpMoveToActiveTransaction,
  httpMoveToPreTransaction,
  httpDeleteUser,
};
