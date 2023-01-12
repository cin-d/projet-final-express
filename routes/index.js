const express = require('express');

const userRoute = require('./user.route');
const mangaRoute = require('./manga.route');
const animeRoute = require('./anime.route');
const actuanimesRoute = require ('./actuanimes.route');

const router = express.Router();

router.use('/users', userRoute);
router.use('/manga', mangaRoute);
router.use('/anime', animeRoute);
router.use('/actuanimes', actuanimesRoute);



module.exports = router; 