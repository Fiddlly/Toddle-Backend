const express = require('express');
const { auth, isTeacher } = require('../middleware/auth')
// const { upload } = require('../middleware/avatarUpload');
const { uploadFile } = require('../services/fileServices')
const router = express.Router()
const upload = require('../middleware/multer')



router.route('/').post(upload.single('file'), uploadFile);


module.exports = router;