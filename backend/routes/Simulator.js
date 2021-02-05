const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/Simulator.js');
const auth = require('../Middleware/Auth');

//ENREGISTRER LES ROBES DU SIMULATEUR

router.post('/dresses', auth, usersCtrl.simulatorDresses)


module.exports = router;
