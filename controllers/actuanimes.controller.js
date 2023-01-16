const db = require('../utils/db');

// Je créé des fonctions async qui appelle la base de données, et renvoie les données.
const getAll = async () => {
    const [actuanimes, err] = await db.query("SELECT * FROM articles");
    console.log("je suis la ")
    return actuanimes;

};

const getById = async (id) => {
    const [anime, err] = await db.query("SELECT * FROM articles WHERE id = ?", [id]);
    if (!anime) {
        return null;
    }
    return actuanime[0];
};

const getLastAnimes = async (length) => {
    const [response, err] = await db.query("SELECT * FROM articles ORDER BY id DESC LIMIT 3");
    const lastAnimes = [];
    for (let lastAnime of response) {
        lastAnimes.push(lastAnime);
    }
    return lastAnimes;
};

const add = async (data) => {
    const [req, err] = await db.query("INSERT INTO articles (titre, img, texte) VALUES (?,?,?)", 
    [data.titre, data.img, data.texte]);
    if (!req) {
        return null;
    }
    return getById(req.insertId);
};

const update = async (id, data) => {
    const actuanime = await getById(id);
    if (!actuanime) {
        return null;
    } else {
        const [req, err] = await db.query("UPDATE articles SET titre = ?, img = ?, texte = ? WHERE id = ? LIMIT 1", 
        [
            data.titre || actuanime.titre, 
            data.img || actuanime.img,
            data.texte || actuanime.texte,
            id
        ]);
        if (!req) {
            return null;
        }
        return getById(id);
    } 
};

const remove = async (id) => {
    const [req, err] = await db.query("DELETE FROM articles WHERE id = ? LIMIT 1", [id]);
    if (!req) {
        return false;
    }
    return true;
};



module.exports = {
    getAll,
    getById,
    getLastAnimes,
    add,
    update,
    remove
};