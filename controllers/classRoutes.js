const express = require('express');
const { auth, isTeacher } = require('../middleware/auth')
// const { upload } = require('../middleware/avatarUpload');
const {createClass, addUser, deleteClass} = require('../services/classServices')
const router = express.Router()

router.route('/').post(auth, isTeacher, createClass);
router.route('/:id').delete(auth, isTeacher, deleteClass);
// router.route('/:id').put(auth, isTeacher, updateClass);
router.route('/student/:classId').post(auth, isTeacher, addUser);


module.exports = router;