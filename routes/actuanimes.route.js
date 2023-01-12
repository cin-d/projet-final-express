const express = require('express');

const actuanimesController = require('../controllers/actuanimes.controller');

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        // On fait appel à des fonctions que je créé dans le controller.
        console.log("je suis la encore ");
        const actuanimes = await actuanimesController.getAll();
        // Si je ne reçois rien, je répond une 404.
        if (!actuanimes) {
            res.status(404).json();
        }
        // sinon, je renvoie une 200 avec les données.
        res.status(200).json(actuanimes);
    })
    .put(async (req, res) => {
        const new_actuanime = await actuanimesController.add(req.body);
        if (!new_actuanime) {
            res.status(404).json();
        }
        res.status(201).json(new_actuanime);
    })
;

router.route('/:id')
    .get(async (req, res) => {
        const actuanime = await actuanimesController.getById(req.params.id);
        if (!actuanime) {
            res.status(404).json();
        }
        res.status(200).json(anime);
    })
    .patch(async (req, res) => {
        const actuanime = await actuanimesController.update(req.params.id, req.body);
        if (!actuanime) {
            res.status(404).json();
        }
        res.status(202).json(actuanime);
    })
    .delete(async (req, res) => {
        const actuanime = await actuanimesController.remove(req.params.id);
        if (!actuanime) {
            res.status(404).json();
        }
        res.status(202).json();
    })
;

module.exports = router; 