const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Dresses = require('../models/Dresses.js');

//SAVE THE DRESSES IN THE DATABASE

exports.simulatorDresses = (req, res, next) => {
    const dress = new Dresses({
        userId: req.body.userId,
        datenow: req.body.datenow,
        shoulder: req.body.shoulder,
        style: req.body.style,
        back: req.body.back,
        color: req.body.color,
        fabric: req.body.fabric
    });

    console.log(dress);

    dress.save()
        .then(() => res.status(201).json({ message :'succès dress saved'
        }))

};

