const jwt = require('jsonwebtoken'); // <- le package jsonwebtoken génère pour nous des token

module.exports = (req, res, next) => { // on va utiliser try/catch au cas où l'authentification se passe mal
  try {
    const token = req.headers.authorization.split(' ')[1]; // <- si on split req.headers.authorization au niveau de l'espace alors token est le 2ème élément de ce array
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // <- appel à la méthode 'verify(monToken, 'maCléPourEncoder') 
    const userId = decodedToken.userId; // <- le userId est le token une fois décodé
    if (req.body.userId && req.body.userId !== userId) { // <- si jamais le req.body.userId n'est PAS égal au userId (de notre token)
      throw 'User ID invalide!'; // <- dans ce cas alors le user Id n'est pas le bon
    } else { // <- si on arrive ici c'est que tout c'est bien passé
      next(); // <- donc on passe au prochain middleware
    }
  } catch { // <- si jamais il y a une erreur ci-dessus
    res.status(401).json({
      error: new Error('Request invalide!')
    });
  }
};