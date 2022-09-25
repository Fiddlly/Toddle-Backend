const mongoose = require('mongoose')


const classSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    files: [{
        file: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'File'
        }
    }]
}, {
    timestamps: true
})


const Class = mongoose.model('Class', classSchema)
module.exports = Class;