const db = require('../utils/db');

// Je créé des fonctions async qui appelle la base de données, et renvoie les données.
const getAll = async () => {
    const [animes, err] = await db.query("SELECT * FROM anime");
    return animes;
};

const getById = async (id) => {
    const [anime, err] = await db.query("SELECT * FROM anime WHERE id = ?", [id]);
    if (!anime) {
        return null;
    }
    return anime[0];
};

const add = async (data) => {
    const [req, err] = await db.query("INSERT INTO anime (titre, auteur, annee, synopsis, is_coup_coeur, img) VALUES (?,?,?,?,?,?)", 
    [data.titre, data.auteur, data.annee, data.synopsis, data.is_coup_coeur, data.img]);
    if (!req) {
        return null;
    }
    return getById(req.insertId);
};

const update = async (id, data) => {
    const anime = await getById(id);
    if (!anime) {
        return null;
    } else {
        const [req, err] = await db.query("UPDATE anime SET titre = ?, auteur = ?, annee = ?, synopsis = ?, is_coup_coeur = ?, img = ? WHERE id = ? LIMIT 1", 
        [
            data.titre || anime.titre, 
            data.auteur || anime.auteur,
            data.annee || anime.annee,
            data.synopsis || anime.synopsis,
            data.is_coup_coeur || anime.is_coup_coeur,
            data.img || anime.img,
            id
        ]);
        if (!req) {
            return null;
        }
        return getById(id);
    } 
};

const remove = async (id) => {
    const [req, err] = await db.query("DELETE FROM anime WHERE id = ? LIMIT 1", [id]);
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