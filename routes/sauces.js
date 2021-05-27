const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces'); // <- la logique métier se trouve dans ce fichier
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
 
router.post('/', auth, multer, saucesCtrl.createSauce); // <- le premier argument est la requête, le deuxième est la fonction à appliquer (qui se trouve dans '../controllers/sauces')
router.put('/:id', auth, saucesCtrl.modifySauce); // <- les ':' indiquent que cette requête est dynamique
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.get('/', auth, saucesCtrl.getAllSauce);

module.exports = router;