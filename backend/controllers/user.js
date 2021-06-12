// imports
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// export de la fonction signup
exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10) // <- on va utiliser bcrypt pour hash le password
    .then(hash => {
      const user = new User({ // <- création d'un nouvel user
        email: req.body.email, // <- son email
        password: hash // <- le hash de son password
      });
      user.save() // <- on l'enregistre
        .then(() => res.status(201).json({ message: 'Compte user créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email }) // <- on va chercher quel est le user correspondant à cet email
    .then(user => {
      if (!user) { // <- s'il n'existe pas
        return res.status(401).json({ error: 'User non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password) // <- comparaison entre le password envoyé & celui enregistré
        .then(valid => {
          if (!valid) { // <- s'il ne rentre pas le bon password
            return res.status(401).json({ error: 'Password incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              process.env.TOKEN, // <- notre TOKEN
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};