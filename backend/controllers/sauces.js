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
    if (req.file) { // <- si il y a une nouvelle image
      Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const oldImage = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${oldImage}`, (err) => { // <- on efface l'ancienne image
          if (err) throw err;
          console.log('ancienne photo effacée');
        })
      })
      .catch(error => res.status(400).json({ error }));
    }
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce), 
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` // <- ajout de la nouvelle image
    } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // <- update avec les nouvelles valeurs
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

// gestion des likes et des dislikes
exports.likeSauce = (req, res, next) => {
  const sauceObject = req.body; // <- ceci sera notre req
  if (sauceObject.like == 1) { // <- si on reçoit 1 alors c'est que le client like
    Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: sauceObject.userId }}) // <- on va updater notre sauce en augmenter les likes et insérant dans le tableau les usersId de ceux qui n'aiment pas
      .then(() => {
        res.status(201).json({ message: 'Sauce likée'})
        console.log('like');
      })
      .catch(error => res.status(404).json({ error }));
  } else if (sauceObject.like == -1) { // si on reçoit alors le client dislike la sauce
    Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: sauceObject.userId }}) // <- idem mais sur les dislikes
      .then(() => {
        res.status(201).json({ message: 'sauce dislikée' })
        console.log('dislike');
      })
      .catch(error => res.status(404).json({ error }));
  } else { // <- dans tout autre cas c'est que le client annule soit son like soit son dislike
    Sauce.findOne({ _id: req.params.id }) // <- nous cherchons d'abord quel sauce est concercée
      .then((thisSauce) => {
        if( thisSauce.usersLiked.includes(sauceObject.userId)) { // <- si on retrouve le userId dans le tableau des usersLiked c'est qu'il annule son like
          Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: sauceObject.userId }})
            .then(() => {
              res.status(201).json({ message: 'annulation du like'})
              console.log('annulation du like');
            })
            .catch(error => res.status(404).json({ error }));
        } else { // <- le cas où il annule son dislike
          Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: sauceObject.userId }})
            .then(() => {
              res.status(201).json({ message: 'annulation du dislike'})
              console.log('annulation du dislike');
            })
            .catch(error => res.status(404).json({ error }));
        }
      })
      .catch(error => res.status(400).json({ error }));
  }
}