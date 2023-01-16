const db = require('../utils/db');
const bcrypt = require('bcrypt');

// Je créé des fonctions async qui appelle la base de données, et renvoie les données.
const getAll = async () => {
    const [users, err] = await db.query("SELECT * FROM user");
    return users;
};

const getById = async (id) => {
    const [user, err] = await db.query("SELECT * FROM user WHERE id = ?", [id]);
    if (!user) {
        return null;
    }
    // getById sert ici à récupérer un seul user. On retourne donc user[0], car MySQL répond
    // toujours un array.
    return user[0];
};

const getByEmail = async (data) => {
    const [user, err] = await db.query("SELECT * FROM user WHERE email = ? LIMIT 1", [data.email]);
    if (!user || user.length == 0) {
        return null;
    }
    return user[0];
};

const getByEmailAndPassword = async (data) => {

    const user = await getByEmail(data);
    if (!user) {
        return null
    };

    const hashedPassword = await bcrypt.compare(data.password, user.password);
    if (hashedPassword) {
        return user; 
    } else {
        return null;
    }

};

// const add = async (data) => {
//     const [req, err] = await db.query("INSERT INTO user (email, password, role) VALUES (?,?, ?)", [data.email, data.password, data.role]);
//     if (!req) {
//         return null;
//     }
//     // Une fois un user ajouté en base, on appelle la fonction getById, créée plus haut, qui permet d'aller
//     // récupérer en base le user nouvellement créé, sans réécrire la fonction "SELECT * FROM users"
// };

const add = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const [req, err] = await db.query("INSERT INTO user (email, password, role) VALUES (?, ?, ?)", [data.email, hashedPassword, "user"]);
    if (!req) {
        return null;
    }
    // Une fois un user ajouté en base, on appelle la fonction getById, créée plus haut, qui permet d'aller
    // récupérer en base le user nouvellement créé, sans réécrire la fonction "SELECT * FROM users"
    return getById(req.insertId);

};


const update = async (id, data) => {
    // Pour update, on va d'abord chercher en base le user correspondant
    const user = await getById(id);
    if (!user) {
        return null;
    } else {
        // On met à jour, en réécrivant les champs potentiellement manquant, grace au user récupéré
        const [req, err] = await db.query("UPDATE user SET email = ?, password = ?, role = ? WHERE id = ? LIMIT 1", 
        [
            data.email || user.email, 
            data.password || user.password,
            data.role || user.role,
            id
        ]);
        if (!req) {
            return null;
        }
        // Finalement, on retourne le user modifié
        return getById(id);
    } 
};

const remove = async (id) => {
    const [req, err] = await db.query("DELETE FROM user WHERE id = ? LIMIT 1", [id]);
    // Si la suppresion a fonctionné, on renvoie "true", sinon "false"
    if (!req) {
        return false;
    }
    return true;
};


// On exporte toutes les fonctions écrites ici
module.exports = {
    getAll,
    add,
    getById,
    getByEmail,
    getByEmailAndPassword,
    update, 
    remove 
};