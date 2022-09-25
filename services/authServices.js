const User = require("../models/userModel")

const registerUser = async (req, res) => {
    const user = User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    }
    catch (e) {
        res.status(400).send(e);
    }
}


const loginUser = async (req, res) => {
    try {
        const user = await User.findUserByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send("Wrong username or password")
    }
}

module.exports = { registerUser, loginUser };
