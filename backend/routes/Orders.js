const express = require('express');
const router = express.Router();
const orderCtrl = require('../controllers/Orders.js');
const auth = require('../Middleware/Auth');
const multer = require('../Middleware/Multer-config');

//POST AN ORDER

router.post('/orderPost', auth, multer, orderCtrl.orderPost);

//GET ALL ORDERS OF AN USER

router.get('/orderGet/:userId', auth, orderCtrl.orderGet);

//GET ONE ORDER OF AN USER

router.get('/orderGetOne/:orderId', auth, orderCtrl.orderGetOne);


//UPDATE AN ORDER (PAYMENT)

router.put('/orderUpdateOne/:orderId', auth, orderCtrl.orderUpdateOne)

module.exports = router;
