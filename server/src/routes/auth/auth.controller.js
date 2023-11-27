const User = require("../../models/user.model");
const bcrypt = require("bcrypt");

async function httpRegister(req, res) {
    try {
        const user = req.body;
        const newUser = await User.AddNewUser(user);
        return res.status(200).json(newUser);
    } catch (err) {
        console.log(err);
        return res.status(500);
    }
}

async function httpSignin(req, res) {
    try {
        const user = req.body.admissionId
            ? await User.FindUserByAdminssionId(req.body.admissionId)
            : await User.FindUserByEmployeeId(req.body.employeeId);

        console.log(req.body)
        !user && res.status(404).json("User not found");

        const validPass = await bcrypt.compare(req.body.password, user.password);
        !validPass && res.status(400).json("Wrong Password");

        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        return res.status(404);
    }
}

module.exports = {
    httpRegister,
    httpSignin,
};
