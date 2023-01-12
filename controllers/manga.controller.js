const db = require('../utils/db');

// Je créé des fonctions async qui appelle la base de données, et renvoie les données.
const getAll = async () => {
    const [mangas, err] = await db.query("SELECT * FROM manga");
    return mangas;
};

const getById = async (id) => {
    const [manga, err] = await db.query("SELECT * FROM manga WHERE id = ?", [id]);
    if (!manga) {
        return null;
    }
    return manga[0];
};

const add = async (data) => {
    const [req, err] = await db.query("INSERT INTO manga (titre, auteur, annee, synopsis, is_coup_coeur, img) VALUES (?,?,?,?,?,?)", 
    [data.titre, data.auteur, data.annee, data.synopsis, data.is_coup_coeur, data.img]);
    if (!req) {
        return null;
    }
    return getById(req.insertId);
};

const update = async (id, data) => {
    const manga = await getById(id);
    if (!manga) {
        return null;
    } else {
        const [req, err] = await db.query("UPDATE manga SET titre = ?, auteur = ?, annee = ?, synopsis = ?, is_coup_coeur = ?, img = ? WHERE id = ? LIMIT 1", 
        [
            data.titre || manga.titre, 
            data.auteur || manga.auteur,
            data.annee || manga.annee,
            data.synopsis || manga.synopsis,
            data.is_coup_coeur || manga.is_coup_coeur,
            data.img || manga.img,
            id
        ]);
        if (!req) {
            return null;
        }
        return getById(id);
    } 
};

const remove = async (id) => {
    const [req, err] = await db.query("DELETE FROM manga WHERE id = ? LIMIT 1", [id]);
    if (!req) {
        return false;
    }
    return true;
};



module.exports = {
    getAll,
    getById,
    add,
    update,
    remove
};