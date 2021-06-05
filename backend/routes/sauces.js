const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces'); // <- la logique métier des sauces se trouve dans ce fichier
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config'); // <- logique de gestion des uploads
const isowner = require('../middleware/isowner');
 
// les ':' indiquent que cette requête est dynamique
router.post('/', auth, multer, saucesCtrl.createSauce);
router.put('/:id', auth, isowner, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, isowner, saucesCtrl.deleteSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauce);
router.post("/:id/like", auth, saucesCtrl.likeSauce);

module.exports = router;