const express = require('express');
// Je déclare les constances que j'aurais besoin d'appeler dans les méthodes

//Pour les requêtes SQL
const animeController = require('../controllers/anime.controller');

const router = express.Router();

router.route('/')
    //Pour récupérer mes articles
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
    //Pour créer un article
    .put(async (req, res) => {
        const new_anime = await animeController.add(req.body);
        if (!new_anime) {
            res.status(404).json();
        }
        res.status(201).json(new_anime);
    })
;

router.route('/:id')
//Pour récupérer un seul article
    .get(async (req, res) => {
        const anime = await animeController.getById(req.params.id);
        if (!anime) {
            res.status(404).json();
        }
        res.status(200).json(anime);
    })
    //Pour modifier mon article
    .patch(async (req, res) => {
        const anime = await animeController.update(req.params.id, req.body);
        if (!anime) {
            res.status(404).json();
        }
        res.status(202).json(anime);
    })
    //Pour supprimer mon article
    .delete(async (req, res) => {
        const anime = await animeController.remove(req.params.id);
        if (!anime) {
            res.status(404).json();
        }
        res.status(202).json();
    })
;



module.exports = router; 