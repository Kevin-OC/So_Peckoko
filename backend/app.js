// les imports nécessaires
const express = require('express');
const app = express(); // <- maintenant 'app' est une application du framework express
const mongoose = require('mongoose'); // <- import de 'mongoose' pour communiquer avec MongoDB Atlas
const bodyParser = require('body-parser');
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');
const helmet = require("helmet");

// dotenv
require('dotenv').config();
// helmet
app.use(helmet());

// connection de mongoose avec MongoDB Atlas
mongoose.connect('mongodb+srv://Kevin:Mongodb18@realmcluster.wpjgk.mongodb.net/projet6DataBase?retryWrites=true&w=majority', 
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// middleware général (valable pour l'ensemble des routes) concernant les Headers
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*'); // <- on réponds à toutes les requêtes '*'
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); // <- on autorise les X origin
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // <- on autorise toutes ces méthodes
   next(); // <- et on passe au suivant middleware
});

// on va utiliser bodyParser (attention déprécié! <- vu que c'est ce qui est sur le cours on va utiliser cette méthode en attendant)
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images'))); // <- la route qui gère les requêtes sur l'URL '/images'
app.use('/api/sauces', saucesRoutes); // <- toutes les requêtes comprenant dans l'url 'api/sauces' déclenchent 'saucesRoutes' qui contient la logique de routage pour les sauces
app.use('/api/auth', userRoutes); // <- toutes les requêtes comprenant dans l'url 'api/auth' déclenchent 'userRoutes' qui contient la logique de routage pour les user

console.log(process.env.SECRET);

// ici on exporte notre code contenu dans ce fichier vers les modules (afin de pouvoir être importé par 'server.js' ensuite)
module.exports = app;