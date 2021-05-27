const mongoose = require('mongoose');

// création d'un schéma de données pour notre database
const sauceSchema = mongoose.Schema({ // <- la fonction .Schema() (mis à disposition par le package mongoose) prend en paramètre un objet qui sera notre modèle de données
  userId: { type: String, required: true }, // identifiant unique MongoDB pour l'utilisateur qui a créé la sauce
  name: { type: String, required: true }, // <- nom de la sauce
  manufacturer: { type: String, required: true }, // <- fabricant de la sauce 
  description: { type: String, required: true }, // <- description de la sauce
  mainPepper: { type: String, required: true }, // <- principal ingrédient dans la sauce
  imageUrl: { type: String, required: true }, // <- string de l'image de la sauce téléchargée par l'utilisateur
  heat: { type: String, required: true }, // <- nombre entre 1 et 10 décrivant le piquant de la sauce
  likes: { type: Number, default: 0 }, // nombre d'utilisateurs qui aiment la sauce
  dislikes: { type: Number, default: 0 }, // nombre d'utilisateurs qui n'aiment pas la sauce
  usersLiked: { type: [String], default: [] }, // <- tableau d'identifiants d'utilisateurs ayant aimé la sauce
  usersDisliked: { type: [String], default: [] } // <- tableau d'identifiants d'utilisateurs n'ayant pas aimé la sauce
});

// pour exploiter ce modèle il faut l'exporter au module 'mongoose'
// les argument passés à cette méthode sont -> mongoose.model('nomDuModèle', nomDuSchéma);
module.exports = mongoose.model('sauceSchema', sauceSchema);