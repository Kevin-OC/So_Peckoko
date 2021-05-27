const Sauce = require('../models/sauceSchema'); // <- import du schéma de données des sauces
const fs = require('fs'); // <- filesystem

// sauvegarde d'une sauce via la méthode 'save()'
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id; // <- suppression de l'élément '_id' qui a été générée automatiquement par la mongoDB
    const sauce = new Sauce({ // <- l'objet 'sauce' est une instance du schéma de données 'Sauce' 
        ...sauceObject, // <- raccourci pour copier toutes les éléments de 'sauceObject'
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save() // <- sauvegarde de notre objet dans la base de donnée
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'})) // <- nous allons renvoyer une réponse pour éviter une expiration de requête en passant le statut '201'
        .catch(error => res.status(400).json({ error })); // <- si une erreur se produit renvoyons le statut '400' + un message d'erreur
};

// modification d'une sauce via la méthode 'updateOne()'
exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.thing),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Sauce modifiée!'}))
        .catch(error => res.status(400).json({ error }));
};

// suppression d'une sauce via la méthode 'deleteOne()'
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
};

// affichage d'une sauce (en fonction de l'id de l'URL) via la méthode 'findOne()'
exports.getOneSauce = (req, res, next) => { // <- pour aller chercher une sauce spécifique
    Sauce.findOne({ _id: req.params.id }) // <- utilisation de la méthode 'findOne()' nous allons vérifier la comparaison entre l'élément '_id' de l'objet et celui de la requête
        .then(sauce => res.status(200).json(sauce)) // renvoyons la réponse
        .catch(error => res.status(404).json({ error })); // <- gestion d'erreur
};

// affichage de l'ensemble des sauces via la méthode 'find()'
exports.getAllSauce = (req, res, next) => { // <- pour aller chercher l'ensemble des sauces
    Sauce.find() // <- utilisation de la méthode 'find()', pas besoin de spécifier un élément en particulier car on souhaite l'ensemble des sauces
        .then(sauces => res.status(200).json(sauces)) // <- renvoie de toutes les sauces en réponse
        .catch(error => res.status(400).json({ error })); // <- gestion d'erreur
};