const express = require('express');

const animeController = require('../controllers/anime.controller');

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        // On fait appel à des fonctions que je créé dans le controller.
        const animes = await animeController.getAll();
       
        // Si je ne reçois rien, je répond une 404.
        if (!animes) {
            res.status(404).json();
        }
        // sinon, je renvoie une 200 avec les données.
        res.status(200).json(animes);
    })
    .put(async (req, res) => {
        const new_anime = await animeController.add(req.body);
        if (!new_anime) {
            res.status(404).json();
        }
        res.status(201).json(new_anime);
    })
;

router.route('/:id')
    .get(async (req, res) => {
        const anime = await animeController.getById(req.params.id);
        if (!anime) {
            res.status(404).json();
        }
        res.status(200).json(anime);
    })
    .patch(async (req, res) => {
        const anime = await animeController.update(req.params.id, req.body);
        if (!anime) {
            res.status(404).json();
        }
        res.status(202).json(anime);
    })
    .delete(async (req, res) => {
        const anime = await animeController.remove(req.params.id);
        if (!anime) {
            res.status(404).json();
        }
        res.status(202).json();
    })
;



module.exports = router; 