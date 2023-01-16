const express = require('express');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user.controller');
const connexionSchema = require('../models/connexion');
const validator = require('../utils/validator');
const config = require('../config');


const router = express.Router();

router.route('/')
    .post(validator(connexionSchema), async (req, res) => {

        let user = await userController.getByEmailAndPassword(req.body);

        if (!user) {
            res.status(401).json({message: "Combinaison email/password incorrecte"});
        } else {
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                role: user.role
            }, config.jwtPass, { expiresIn: config.jwtExpireLength });

            res.status(200).json({
                access_token: token,
                role: user.role

            });
            console.log(token);
        }
    })
    ;


    // router.route('/')
    // .post(async (req, res) => {

    //     let user = await userController.getbyEmailAndPassword(req.body);

    //     if (!user) {
    //         res.status(401).json({message: "Combinaison email/password incorrecte"});
    //     } else {
    //         const token = jwt.sign({
    //             id: '1',
    //             email: req.body.email, 
    //             password: req.body.password
    //         }, SECRET, { expiresIn: '1 hour' })
            
    //         return res.json({
    //             access_token: token
    //         });
    //     }
    // });


module.exports = router;