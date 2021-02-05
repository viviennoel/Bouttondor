const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/Users.js');
const Measures = require('../models/Measures.js');
nodemailer = require('nodemailer');

//Login user function

exports.loginUser = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


//Reset Password french

exports.ResetPasswordUser = (req, res, next) => {

    if (req.body.language === 'fr'){
        console.log('fr');
        let translation = {
            Password : "Reinitialisation du mot de passe", Presentation : "Merci pour votre demande! Vous pouvez maintenant réinitialiser le mot de passe.", Paragraph : "Veuillez ciquer sur le lien ci dessous ou le copier dans votre navigateur : ", reinitiate : "Reinitialiser",
        }
        send_email(translation);
    } else if (req.body.language === 'en'){
        let translation = {
            Password : "Password reinitialisation", Presentation : "Thank you for asking the reset of your password!", Paragraph : " Please follow the link bellow. You will be redirected to a page on our website to reset your password : ", reinitiate : "Reinitiate",
        }
        send_email(translation);
    }

    function send_email(translation) {
        console.log(req.body.email);
    let token = jwt.sign(
        { userId: req.body.email },
        'RANDOM_TOKEN_SECRET',
        { expiresIn: '24h' }
    )

    let transporter = nodemailer.createTransport({
        service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
        auth: {
          user: 'reset.troisfils@gmail.com',
          pass: 'Limousin87*'
        }
      });

    let mailOptions = {
        from: 'reset.troisfils@gmail.com',
        to: req.body.email,
        subject: `Trois Fils - ${translation.Password}`,
        html: `
        <h2>${translation.Presentation}</h2>
        <p>${translation.Paragraph}</p>
        <a href="https://troisfils.com/reset/ResetPassword?token=${token}">${translation.reinitiate}</a>
        `
    }

    transporter.sendMail(mailOptions, function (err, res) {
        if(err){
            console.log('Error' + err);
        } else {
            console.log('Email Sent');
        }
        
    })
    }
};



//MODIFY THE PASSWORD

exports.ModifyPasswordUser = (req, res, next) => {

    var NewPassword = req.body.password;
    console.log(NewPassword);

    jwt.verify(req.body.token, 'RANDOM_TOKEN_SECRET', function(err, decodedToken) {
        
        if(err) { 
            alert("Le lien a expiré, veuillez recommencer.") 
        }
        else {
            console.log(decodedToken);
            console.log(decodedToken.userId);
            
            User.findOne({ email : decodedToken.userId })
            .then(
                (response) => {
                    console.log(response);
                    console.log(NewPassword);

                    if (!response) {
                        return res.status(405).json({ message: 'user doesnt exist' });
                    } else {
                        console.log('We are going to modify password')
                        console.log(NewPassword);

                        bcrypt.hash(NewPassword, 10)
                        .then(hash => {
                            console.log(hash);
                            console.log(response.email);
                            User.updateOne(
                                { email : response.email },
                                {   name: response.name,
                                    email: response.email,
                                    password: hash,
                                    adress : response.adress,
                                }
                            )
                                                        
                            .then(() => {
                                res.status(200).json({ message: 'Profile modifié !' })
                            })
                                                                
                            .catch(error => res.status(400).json({ error }));                                       
                        })
                    }
                                                
                })
                                    
            .catch(() => {
                res.status(500).send(new Error('Database error!'));
            })
        }
                                            
    });

}



//Signup user function

exports.signupUser = (req, res, next) => {
    console.log(req.body.password + 'before bcrypt');
    if (!req.body.name ||
        !req.body.email ||
        !req.body.password) {
        return res.status(410).send(new Error('Email already exist'));
    } else {
        bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    password: hash,
                    adress : "...",
                });

                console.log(user);

                user.save()
                    .then(() => res.status(201).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    }))

                    .catch(error => res.status(400).json({ error }));
            })
            .catch(error => res.status(510).json({ error }));
    }
};

//VERIF AUTHORISATION

exports.verifAuth = (req, res, next) => {
    res.status(201).json({ message: 'Token is valid' });
}


//MEASURES

exports.measures = (req, res, next) => {
    console.log('hello1');
    const measures = new Measures({
        userId: req.body.userId,
        datenow: req.body.datenow,
        gender: req.body.gender,
        unity: req.body.unity,
        measure1: req.body.measure1,
        measure2: req.body.measure2,
        measure3: req.body.measure3,
        measure4: req.body.measure4,
        measure5: req.body.measure5,
        measure6: req.body.measure6,
        measure7: req.body.measure7,
        measure8: req.body.measure8,
        measure9: req.body.measure9,
        measure10: req.body.measure10,
        measure11: req.body.measure11,
        measure12: req.body.measure12,
        measure13: req.body.measure13,
        measure14: req.body.measure14,
        measure15: req.body.measure15,
    });

    console.log('hello');

    measures.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(408).json({ error }));
};


//UPDATE MEASURES

exports.measuresUpdate = (req, res, next) => {

    Measures.updateOne(
        { userId: req.params.userId },
        { ...req.body, userId: req.params.userId })

        .then(() => {
            console.log(req.body);
            res.status(200).json({ message: 'Objet modifié !' })

        })
        .catch(error => res.status(400).json({ error }));
};

//UPDATE PROFILE

exports.userUpdate = (req, res, next) => {

    console.log(req.params.userId);
    console.log(req.body.userId);
    console.log(req.body);

    User.updateOne(
        { _id: req.params.userId },
        { ...req.body, _id: req.params.userId })

        .then(() => {
            res.status(200).json({ message: 'Profile modifié !' })

        })
        .catch(error => res.status(400).json({ error }));
};


//GET MEASURES

exports.measuresGet = (req, res, next) => {
    console.log('Before');
    console.log(req.params.userId);

    Measures.findOne({ userId: req.params.userId }).then(
            (measure) => {
                console.log(measure);
                if (!measure) {
                    return res.status(405).json({ message : 'measures not taken'});
                } else {
                    console.log('Success')
                    res.status(200).json(measure);
                }
            })
             
        .catch(
            () => {
                res.status(500).send(new Error('Database error!'));
            }
        )
};

//GET USER

exports.userGet = (req, res, next) => {
    console.log('Before');
    console.log(req.params.userId);

    User.findOne({ _id : req.params.userId }).then(
        (response) => {
            console.log(response);
            if (!response) {
                return res.status(405).json({ message: 'user doesnt exist' });
            } else {
                console.log('Success')
                res.status(200).json(response);
            }
        })

        .catch(
            () => {
                res.status(500).send(new Error('Database error!'));
            }
        )
};
