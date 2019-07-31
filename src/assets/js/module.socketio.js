/** Importation du module client pour socket.io */
import io from 'socket.io-client';

/** Etablir la connexion socket.io avec le serveur et stocker les informations dans la variable "socket" */
const socket = io.connect();

/** Executer la méthode .on() de socket.io */
function socketIoOn(event, callback) {
  socket.on(event, function(data) {
    callback(data);
  });
}

/** Executer la méthode .on() de socket.io en prenant en plus en argument le nom d'un state à mettre à jour grâce au callback */
function socketIoOnToUpdateState(event, stateToUpdate, callback) {
  socket.on(event, function(data) {
    callback(stateToUpdate, data);
  });
}

/** Executer la méthode .emit() de socket.io */
function socketIoEmit(event, data) {
  socket.emit(event, data);
}

/** Exportation des fonctions permettant d'exécuter les méthodes .on() et .emit() de socket.io */
export { socketIoOn }
export { socketIoOnToUpdateState }
export { socketIoEmit }