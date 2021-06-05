const Sauce = require('../models/sauceSchema');
const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    const token = req.headers.authorization.split(' ')[1]; // <- notre token (le 2ème élement de ce tableau)
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // <- on le décode
    const userId = decodedToken.userId; // <- on attribue ce token décodé à userId
    Sauce.findOne({ _id: req.params.id }) // <- on va chercher la sauce en fonction de l'url
        .then(sauce => {
            if (userId == sauce.userId) { // <- si le userId de la sauce est le même que le userId alors c'est qu'il s'agit du créateur de la sauce et on passe à next()
                console.log("vous êtes bien le créateur de cette sauce");
                next();
            } else { // <- dans ce cas la sauce n'a pas été créée par le userId donc on renvoie une érreur
                return res.status(401).json({ error: 'vous ne possédez pas l\'autorisation pour modifier ni supprimer cette sauce' });
            }
        })
        .catch(error => res.status(400).json({ error }));
};