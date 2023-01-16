const db = require('../utils/db');
// J'appelle le fichier qui a la connexion MySQL


// Je créé des fonctions async qui appelle la base de données, 
// afin de récupérer les données en BDD et renvoie les données.
const getAll = async () => {
    const [animes, err] = await db.query("SELECT * FROM anime");
    return animes;
};

// Je récupère un seul article via l'ID
const getById = async (id) => {
    const [anime, err] = await db.query("SELECT * FROM anime WHERE id = ?", [id]);
    if (!anime) {
        return null;
    }
    return anime[0];
};

//J'ajoute un article
const add = async (data) => {
    const [req, err] = await db.query("INSERT INTO anime (titre, auteur, annee, synopsis, img) VALUES (?,?,?,?,?)", 
    [data.titre, data.auteur, data.annee, data.synopsis, data.img]);
    if (!req) {
        return null;
    }
    return getById(req.insertId);
};

// Je modifie un article
const update = async (id, data) => {
    const anime = await getById(id);
    if (!anime) {
        return null;
    } else {
        const [req, err] = await db.query("UPDATE anime SET titre = ?, auteur = ?, annee = ?, synopsis = ? img = ? WHERE id = ? LIMIT 1", 
        [
            data.titre || anime.titre, 
            data.auteur || anime.auteur,
            data.annee || anime.annee,
            data.synopsis || anime.synopsis,
            data.img || anime.img,
            id
        ]);
        if (!req) {
            return null;
        }
        return getById(id);
    } 
};

//Je supprime un article
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