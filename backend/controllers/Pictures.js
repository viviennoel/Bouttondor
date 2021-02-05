const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Pictures = require('../models/Pictures.js');


//SAVE THE DRESSES IN THE DATABASE

exports.UploadPictures = (req, res, next) => {
    console.log(req.body);

    const obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj);

    const pictures = new Pictures({
        userId: req.body.userId,
        datenow: req.body.datenow,
        name: req.body.name,
        email: req.body.email,
        comment: req.body.comment,
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    console.log(pictures)

    pictures.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(402).json({ error }));

};
