// le package 'multer' gère les upload
const multer = require('multer');

// gestion des types d'extensions
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// la méthode 'diskStorage()' demande un dossier de destination (pour enregistrer) et un nom de fichier
const storage = multer.diskStorage({
  destination: (req, file, callback) => { // <- c'est la fonction callback qui nous intéresse
    callback(null, 'images'); // <- ça va atterrir ici -> '/images'
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_').split('.')[0]; // <- enlevons tous les possibles whitespace dans le nom du fichier et remplaçons par un underscore
    const extension = MIME_TYPES[file.mimetype]; // <- spécifions notre extension dynamiquement grâce à file.mimetype
    callback(null, name + Date.now() + '.' + extension); // <- notre nom de fichier ressemblera à: nomDuFichierDateActuelle.extension
  }
});

module.exports = multer({storage: storage}).single('image'); // <- on exporte notre multer