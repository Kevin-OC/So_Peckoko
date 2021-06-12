// nous allons travailler avec express
const express = require('express');
const app = express();
// import de mongoose pour communiquer avec MongoDB Atlase
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');
const helmet = require("helmet");

// dotenv (dossier qui protège les données que l'on souhaite garder privées)
require('dotenv').config();
// helmet (sécurité)
app.use(helmet());

// connection de mongoose avec MongoDB Atlas
mongoose.connect('mongodb+srv://' + process.env.PSEUDO_MDP_CLUSTER + process.env.DATABASE + '?retryWrites=true&w=majority', 
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// middleware général (valable pour l'ensemble des routes) concernant les Headers
// on répond à toutes les requêtes -> *
// on auorise les X origin & les méthodes GET, POST, etc...
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*'); // <- on réponds à toutes les requêtes '*'
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
});

// on va utiliser bodyParser
app.use(bodyParser.json());

// nos routes (images, sauces, auth)
app.use('/images', express.static(path.join(__dirname, 'images'))); // <- la route qui gère les requêtes images
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

// ici on exporte notre code contenu dans ce fichier vers les modules (afin de pouvoir être importé par 'server.js' ensuite)
module.exports = app;