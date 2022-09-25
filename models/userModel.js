const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    isTeacher: {
        type: Boolean,
        default: false,
    },
    classes: []
}, {
    timestamps: true
})

// hash the plain password before saving
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.statics.findUserByCredentials = async (username, password) => {
    const user = await User.findOne({ username })
    if (!user) {
        throw new Error('Unable to login!')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login!')
    }
    return user
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, "dsakodkoak@odks")
    return token
}


const User = mongoose.model('User', userSchema)
module.exports = User;
