const Class = require('../models/classModel');
const User = require('../models/userModel');
const mongoose = require('mongoose')

const createClass = async (req, res) => {
    try {
    const userId = req.user.id
    const classRecord = Class(req.body)
        await classRecord.save()
        await User.updateOne({
            _id: userId,
        }, {
            $push: {
                classes: {
                    "id" : classRecord._id
                }
            }
        })
        res.status(201).send({ classRecord });
    } catch (error) {
        res.status(400).send(error)
    }
}

const addUser = async (req, res) => {
    try {
        const classId = mongoose.Types.ObjectId(req.params.classId);
        const userId = req.body.userId;
        await User.updateOne({
            _id: userId,
        }, {
            $push: {
                classes: {
                    "id": classId
                }
            }
        })
        res.status(200).send('User added successfully')
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
}

const deleteClass = async (req, res) => {
    try {
        const classId = mongoose.Types.ObjectId(req.params.id);
        const deletedClass = await Class.findByIdAndDelete({
            _id: classId
        })
        let users = await User.find()
        users = users.map(async (user) => {
            let newUserClasses = user.classes.filter((cc) => {
                if (cc.id.toString() !== classId.toString()) {
                    return true
                } else {
                    return false
                }
            })
            await User.findOneAndUpdate({
                _id: user._id,
            }, {
                classes: newUserClasses
            })
        })
        res.status(200).send('Class deleted successfully')
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}




module.exports = { createClass, addUser, deleteClass}