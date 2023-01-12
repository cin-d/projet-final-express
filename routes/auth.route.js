const express = require('express');
const jwt = require('jsonwebtoken');
const userController = require('../controllers/user.controller');
const config = require('../config');
const loginValidator = require('../utils/auth');

const router = express.Router();


router.route('/')
    .post(async (req, res) => {

        let user = await userController.getbyEmailAndPassword(req.body);

        if (!user) {
            res.status(401).json({message: "Combinaison email/password incorrecte"});
        } else {
            const token = jwt.sign({
                id: '1',
                email: req.body.email, 
                password: req.body.password
            }, SECRET, { expiresIn: '1 hour' })
            
            return res.json({
                access_token: token
            });
        }
    });


router.route('/test')
    .get(loginValidator.checkToken(), (req, res) => {
        res.json({message: "coucou"});
    });

router.route('/test/admin')
    .get(loginValidator.isAdmin(), (req, res) => {
        res.json({message: "coucou admin!"})
    });


    

module.exports = router; 