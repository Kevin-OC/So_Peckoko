// import
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// notre schéma user qui se compose en deux valeurs: un email associé à un password (pas de username)
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// vérification
userSchema.plugin(uniqueValidator);

// export
module.exports = mongoose.model('userSchema', userSchema);