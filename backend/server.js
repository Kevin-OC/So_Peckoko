// importation des modules
const http = require('http');
const app = require('./app');

// fonction qui renvoie un port valide
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// ici on applique la méthode set() sur la constante port qui contient le port sur lequel on communique
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// fonction en charge de la gestion d'erreur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// constante qui contient la méthode createServer()
const server = http.createServer(app);

// évènement "on": soit il y a une erreur et on appel la fonction errorHandler soit ça marche et ça déclenche une fonction anonyme qui affiche quel port est en cours
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// écoute du port en cours d'exécution sur notre server
server.listen(port);