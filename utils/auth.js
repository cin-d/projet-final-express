const config = require('../config');
const jwt = require('jsonwebtoken');

const isAuth = () => {
    return (req, res, next) => {
        const header = req.headers.authorization;
        // Je récupère les paramètres de connexion
        if (!header) {
            res.status(401).json({message: "Vous devez être connecté"});
        }
        // Si !connexion, alors j'envoie un message d'erreur

        const access_token = header.split(" ")[1];
        // si connexion alors je la récupère 

        jwt.verify(access_token, config.jwtPass, (err, decodedToken) => {
            // je vérifie qu'il soit valide 
            if (err) {
                res.status(401).json({message: "JWT invalide"});
            } else if (decodedToken.role === 'user') {
                // s'il est valide alors je vérifie le role qui est associé au Jwt de connexion 
                next();
                // S'il est user alors suivant sinon message erreur 
            } else {
                res.status(401).json({message: "Vous devez être user"});
            }
        });
    }
};

const isAdmin = () => {
    return (req, res, next) => {
        const header = req.headers.authorization;
        
        if (!header) {
            res.status(401).json({message: "Vous devez être connecté"});
        }

        const access_token = header.split(" ")[1];


        jwt.verify(access_token, config.jwtPass, (err, decodedToken) => {
            if (err) {
                res.status(401).json({message: "JWT invalide"});
            } else if (decodedToken.role == 'admin') {
                next();
            } else {
                res.status(401).json({message: "Vous devez être administrateur"});
            }
        });
    }
};

module.exports =  {
    isAuth,
    isAdmin
}