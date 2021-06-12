// imports
const express = require('express');
const router = express.Router();
// la logique métier des fonctions concernant les sauces se trouve dans le fichier ci-dessous
const saucesCtrl = require('../controllers/sauces');
// ci-dessous les middlewares nécessaires
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const isowner = require('../middleware/isowner');
 
// les ':' indiquent que cette requête est dynamique
router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, isowner, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, isowner, saucesCtrl.deleteSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauce);
router.post("/:id/like", auth, saucesCtrl.likeSauce);

// export
module.exports = router;