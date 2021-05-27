const express = require('express');
const router = express.Router();
const saucesCtrl = require('../controllers/sauces'); // <- la logique métier se trouve dans ce fichier
 
router.post('/', saucesCtrl.createSauce); // <- le premier argument est la requête, le deuxième est la fonction à appliquer (qui se trouve dans '../controllers/sauces')
router.put('/:id', saucesCtrl.modifySauce); // <- les ':' indiquent que cette requête est dynamique
router.delete('/:id', saucesCtrl.deleteSauce);
router.get('/:id', saucesCtrl.getOneSauce);
router.get('/', saucesCtrl.getAllSauce);

module.exports = router;