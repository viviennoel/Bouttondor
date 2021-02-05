const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/Pictures.js');
const multer = require('../Middleware/Multer-config');

//ENREGISTRER UNE PHOTO

router.post('/upload_photo', multer, usersCtrl.UploadPictures)


module.exports = router;
