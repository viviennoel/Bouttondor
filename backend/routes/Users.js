const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/Users.js');
const auth = require('../Middleware/Auth');
const multer = require('../Middleware/Multer-config-multiple');

//LOGIN

router.post('/login', usersCtrl.loginUser)

//SIGNUP

router.post('/signup', usersCtrl.signupUser)

//USER GET ONE

router.get('/userGet/:userId', auth, usersCtrl.userGet)

//RESET PASSWORD

router.post('/ResetPassword', usersCtrl.ResetPasswordUser)

//MODIFY PASSWORD TO RESET

router.post('/ModifyPassword', usersCtrl.ModifyPasswordUser)

//IS USER LOGGED

router.post('/verifAuth', auth, usersCtrl.verifAuth)

//MEASURES

router.post('/measures', auth, usersCtrl.measures)

//MEASURES UPDATE

router.put('/measuresUpdate/:userId', auth, usersCtrl.measuresUpdate)

//MEASURES GET ONE

router.get('/measuresGet/:userId', auth, usersCtrl.measuresGet)

//UPDATE PROFILES

router.put('/userUptate/:userId', auth, usersCtrl.userUpdate)

module.exports = router;
