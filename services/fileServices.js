const mongoose = require('mongoose')
const cloudinary = require('../config/cloudinary')
const File = require('../models/fileModel')

const uploadFile = async (req, res) => {
    try {
        const fileName = req.body.name
        const fileType = req.body.type
        const result = await cloudinary.uploader.upload(req.file.path)
        const uploadedFile = await File.create({
            name: fileName,
            fileType,
            url: result.secure_url
        })
        res.status(201).json(uploadedFile)
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
}

module.exports = {uploadFile}