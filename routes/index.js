const express = require('express');

// J'importe ici tous les fichiers qui se trouvent
// dans le dossier "routes"
const userRoute = require('./user.route');
const mangaRoute = require('./manga.route');
const animeRoute = require('./anime.route');
const actuanimesRoute = require ('./actuanimes.route');
const inscriptionRoute = require('./inscription.route');
const connexionRoute = require('./connexion.route');

//J'appelle le router de express
const router = express.Router();

// Ici, je mène chaque entité vers la bonne sous-route
router.use('/users', userRoute);
router.use('/manga', mangaRoute);
router.use('/anime', animeRoute);
router.use('/actuanimes', actuanimesRoute);
router.use('/inscription', inscriptionRoute);
router.use('/connexion', connexionRoute);

// J'exporte le router afin de pouvoir faire un require dessus
// et ainsi pouvoir l'utiliser
module.exports = router; 