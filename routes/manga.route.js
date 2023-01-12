const express = require('express');

const mangaController = require('../controllers/manga.controller');

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        // On fait appel à des fonctions que je créé dans le controller.
        const mangas = await mangaController.getAll();
       
        // Si je ne reçois rien, je répond une 404.
        if (!mangas) {
            res.status(404).json();
        }
        // sinon, je renvoie une 200 avec les données.
        res.status(200).json(mangas);
    })
    .put(async (req, res) => {
        const new_manga = await mangaController.add(req.body);
        if (!new_manga) {
            res.status(404).json();
        }
        res.status(201).json(new_manga);
    })
;

router.route('/:id')
    .get(async (req, res) => {
        const manga = await mangaController.getById(req.params.id);
        if (!manga) {
            res.status(404).json();
        }
        res.status(200).json(manga);
    })
    .patch(async (req, res) => {
        const manga = await mangaController.update(req.params.id, req.body);
        if (!manga) {
            res.status(404).json();
        }
        res.status(202).json(manga);
    })
    .delete(async (req, res) => {
        const manga = await mangaController.remove(req.params.id);
        if (!manga) {
            res.status(404).json();
        }
        res.status(202).json();
    })
;



module.exports = router; 