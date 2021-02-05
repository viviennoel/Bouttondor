const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Orders = require('../models/Orders.js');
const ObjectId = require('mongodb').ObjectId;


//SAVE THE ORDER IN THE DATABASE

exports.orderPost = (req, res, next) => {
    console.log(req.body);

    const obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj);

    const order = new Orders({
        userId: req.body.userId,
        datenow: req.body.datenow,
        price: req.body.price,
        email: req.body.email,
        status: "Awaiting payment",
        comment: req.body.comment,
        picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    console.log(order)

    order.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(402).json({ error }));

};

//GET AN ORDER IN THE DATABASE

exports.orderGet = (req, res, next) => {
        console.log(req.params.userId);

        Orders.find({ userId: req.params.userId }).then(
            (order) => {
                console.log(order);
                if (!order) {
                    return res.status(405).json({ message: 'no order saved' });
                } else {
                    console.log('Success')
                    res.status(200).json(order);
                }
            })

            .catch(
                () => {
                    res.status(500).send(new Error('Database error!'));
                }
            )
    };

    //FIND A SPECIFIC ORDER IN THE DATABASE

    exports.orderGetOne = (req, res, next) => {
        var o_id = new ObjectId(req.params.orderId);
        console.log(o_id);
        console.log('hello');

        Orders.find({ _id: o_id }).then(
            (order) => {
                console.log(order);
                if (!order) {
                    return res.status(405).json({ message: 'no order saved' });
                } else {
                    console.log('Success')
                    res.status(200).json(order);
                }
            })

            .catch(
                () => {
                    res.status(500).send(new Error('Database error!'));
                }
            )
    };

    //MODIFY A SPECIFIC ORDER IN THE DATABASE

exports.orderUpdateOne = (req, res, next) => {
    let o_id = new ObjectId(req.params.orderId);
    console.log('Update the status');
    console.log(req.body.userId);
    console.log(req.body);

    Orders.updateOne(
        { _id: o_id },
        { ...req.body, _id: req.params.orderId })

        .then(() => {
            res.status(200).json({ message: 'Profile modifié !' })

        })
        .catch(error => res.status(400).json({ error }));
};