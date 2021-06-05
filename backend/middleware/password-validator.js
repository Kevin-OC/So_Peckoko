const passwordSchema = require('../models/passwordSchema');

// le message des conditions à réunir pour établir un password valide
const requis = "8 caractères min, " +
               "30 caractères max, " +
               "1 minuscule au moins, " +
               "1 majuscule au moins, " +
               "ne doit pas contenir d'espace vide";

module.exports = (req, res, next) => {
    const userPassword = req.body.password; // <- notre fameux req.body.password qui est le password envoyé
    if (!passwordSchema.validate(userPassword)) { // <- SI la méthode validate() ne renvoie pas true alors le mot de passe est invalide et on passe au next()
        res.writeHead(400, `{ "message" : "format du mot de passe => ${requis}" }`, {
            'content-type': 'application/json'
        });
        res.end(requis);
        console.log("le mot de passe ne passe pas la sécurité minimale nécessaire")
    } else { // <- SINON tout c'est bien passé alors au passe au prochain middleware
        next();
    }
};