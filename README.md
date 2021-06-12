# Gautier_6_27052021

So Peckoko

Clonez ce projet depuis GitHub.

1) Pour lancer le frontend
    - Ouvrez un terminal depuis le dossier frontend de ce projet.
    - Pour installer les dépendances nécessaires exécutez la commande: npm install
    - Exécutez: npm install node-sass
    - Démarrez le serveur de développement avec la commande: ng serve
    - Le port écouté est le port 4200: http://localhost:4200

2) Pour lancer le backend
    - Ouvrez un terminal depuis le dossier backend de ce projet
    - Exécutez la commande: npm install
    - Pour faciliter le travail nous allons utiliser nodemon l'installant globalement avec la commande npm install -g nodemon.
    - Créez un fichier .env (dans le dossier backend) avec les valeurs pour TOKEN (qui sera un string aléatoire) qui sert de clé pour chiffrer/déchiffrer le token
    - et un autre PSEUDO_MDP_CLUSTER qui contient le pseudo, le mot de passe, et le cluster <pseudo>:<password>@<cluster>.mongodb.net/
    - et un dernier DATABASE qui aura pour valeur le nom du projet (exemple: DATABASE=projet6DataBase)
    - Puis lancez le serveur: nodemon server
    - Le port écouté sera affiché en console (exemple: Listening on port 3000)

3) Utilisation
    - Vous pouvez vous rendre sur: http://localhost:4200
    - Vous pouvez cliquer sur "inscription" et créer un compte user
