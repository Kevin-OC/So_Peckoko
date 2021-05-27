const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces'); // <- la logique métier se trouve dans ce fichier
const auth = require('../middleware/auth'); // <- gestion des authentifications
const multer = require('../middleware/multer-config'); // <- logique de gestion des uploads
 
router.post('/', auth, multer, saucesCtrl.createSauce); // <- router.post('URL', authentification, uploadFichier, fonctionLogiqueMétier)
router.put('/:id', auth, multer, saucesCtrl.modifySauce); // <- les ':' indiquent que cette requête est dynamique
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauce);

module.exports = router;