/** Initialisation du module Chalk */
const chalk = require('chalk');

/** Initialisation du module Bcrypt pour hasher les mots de passe */
const bcrypt = require('bcryptjs');
const saltRounds = 10;

/** Méthode pour hasher un mot de passe */
exports.passwordHash = function(passwordToHash, errorObject, callback) {
  bcrypt.genSalt(saltRounds, function(error, salt) {
    if (error) {
      console.log(chalk.red(`Une erreur est survenue lors de l'initialisation de bcrypt`));
      errorObject.serverError = true;
    } else {
      bcrypt.hash(passwordToHash, salt, function(error, hash) {
        if (error) {
          console.log(chalk.red(`Une erreur est survenue lors du hashage du mot de passe`));
          errorObject.serverError = true;
        } else {
          let hashedPassword = hash;

          callback(hashedPassword, errorObject);
        }
      });
    }
  });
}

/** Méthode pour compare un mot de passe envoyé depuis un client à un mot de passe stocké en base de données */
exports.comparePasswords = function(passwordToCompare, hashedPasswordFromDatabase, errorObject, callback) {
  bcrypt.compare(passwordToCompare, hashedPasswordFromDatabase, function(error, response) {
    if (error) {
      console.log(chalk.red(`Une erreur est survenue lors de la comparaison du mot de passe avec la base de données`));
    }
    callback(errorObject, response);
  });
}

/** Méthode retournant un objet utilisateur avec les données passées en argument et sans les informations de connexion */
exports.generateOneUserDataWithoutConnectionData = function(data) {
  let oneUserData = {
    role: data.role || 'member',
    connected: data.connected || false,
    profile: {
      email: data.profile.email || '',
      pseudo: data.profile.pseudo || '',
      lastname: data.profile.lastname || '',
      firstname: data.profile.firstname || '',
      gender: data.profile.gender || '',
      age: data.profile.age || 0,
      address: data.profile.address || '',
      zipcode: data.profile.zipcode || 0,
      city: data.profile.city || '',
      summary: data.profile.summary || ''
    },
    friends: {
      list: data.friends.list || [],
      pending: data.friends.pending || [],
      sent: data.friends.sent || [],
      recommanded: data.friends.recommanded || []
    },
    posts: data.posts || [],
    messages: data.messages || [],
    settings: data.settings || {}
  }

  return oneUserData;
}