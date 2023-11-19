const User = require("./user.mongo");
const transaction = require("./transaction.mongo");
const bcrypt = require("bcrypt");

async function AddNewUser(user) {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(user.password, salt);

  const newUser = await new User({
    userType: user.userType,
    userFullName: user.userFullName,
    admissionId: user.admissionId,
    employeeId: user.employeeId,
    age: user.age,
    dob: user.dob,
    gender: user.gender,
    address: user.address,
    mobileNumber: user.mobileNumber,
    email: user.email,
    password: hashedPass,
    isAdmin: user.isAdmin,
  });

  let nUser = await newUser.save();
  return nUser;
}

async function FindUserByAdminssionId(id) {
  const user = await User.findOne({
    admissionId: id,
  });

  return user;
}

async function FindUserByEmployeeId(id) {
  const user = await User.findOne({
    employeeId: id,
  });

  return user;
}

async function FindUserById(id) {
  const user = await User.findById(id)
    .populate("activeTransactions")
    .populate("prevTransactions");
  return user;
}
async function GetAllUsers() {
  const users = await User.find({})
    .populate("activeTransactions")
    .populate("prevTransactions")
    .sort({ _id: -1 });

  return users;
}

async function UpdateUserById(userId, userInfo) {
  const user = await User.findByIdAndUpdate(userId, {
    $set: userInfo,
  });

  return user;
}

async function UpdateActiveTransactions(userId, transactionId) {
  const user = await User.findById(userId);
  await user.updateOne({
    $push: {
      activeTransactions: transactionId,
    },
  });
}

async function UpdatePreTransaction(userId, transactionId) {
  const user = await User.findById(userId);
  await user.updateOne({ $pull: { activeTransactions: transactionId } });
  await user.updateOne({ $push: { prevTransactions: transactionId } });
  return user;
}

async function DeleteUser(userId) {
  await User.findByIdAndDelete(userId);
}

module.exports = {
  AddNewUser,
  FindUserByAdminssionId,
  FindUserByEmployeeId,
  FindUserById,
  GetAllUsers,
  UpdateUserById,
  UpdateActiveTransactions,
  UpdatePreTransaction,
  DeleteUser,
};
