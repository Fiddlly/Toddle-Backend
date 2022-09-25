const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, "dsakodkoak@odks")
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate!' })
    }
}

const isTeacher = async (req, res, next) => {
    if (req.user.isTeacher) {
        next()
    } else {
        res.status(401).send({ error: 'Unauthorised' })
    }
}
 
module.exports = {auth, isTeacher}