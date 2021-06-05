// import du package 'password-validator' qui consiste en une série de test sur un mdp
const passwordValidator = require('password-validator');

// création de notre schéma
const passwordSchema = new passwordValidator();

// Contraintes du mot de passe
passwordSchema
.is().min(8) // <- 8 caractères min
.is().max(30) // <- 30 caractères max
.has().uppercase() // 1 majuscule au moins
.has().lowercase() // 1 minuscule au moins
//.has().digits() // <- 1 chiffre au moins - je commente cette ligne car bcp de gens ne mettent pas de chiffres dans leur mdp
.has().not().spaces() // <- Ne doit PAS avoir de whitespace (espaces blancs)
.is().not().oneOf([]); // <- la blacklist (là j'ai laissé vide mais on pourrait spécifier un mdp si nécessaire) 

module.exports = passwordSchema;