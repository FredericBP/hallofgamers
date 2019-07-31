/** Initialisation du module Chalk */
const chalk = require('chalk');

/** Initialisation de la base de données */
const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const mongoUrl = 'mongodb://51.91.9.237:27017';

/** Initialisation d'une instance MongoDB avant d'exécuter une méthode de MongoDB insérée en callback */
exports.action = function(dbName, callback) {
  mongoClient.connect(mongoUrl, {useNewUrlParser: true}, function(error, client) {
    assert.equal(null, error);
    if (error) {
      console.log(chalk.red(`Impossible de se connecter à MongoDB`));
    } else {
      const db = client.db(dbName);

      callback(client, db);
    }
  });
}

/** Méthode pour insérer un document dans une collection de la base de données */
exports.insertOne = function(dbName, collectionName, dataToInsert, callback) {
  this.action(dbName, function(client, db) {
    db.collection(collectionName).insertOne(dataToInsert, function(error, result) {
      if (error) {
        console.log(chalk.red(`Impossible d'enregistrer les données suivantes dans la base de données :`), dataToInsert);
      }
    });

    callback();
  });
}

/** Méthode pour rechercher un document dans une collection de la base de données */
exports.find = function(dbName, collectionName, dataToFind, options, callback) {
  this.action(dbName, function(client, db) {
    db.collection(collectionName, {strict: true}, function(error, collection) {
      if (error) {
        console.log(chalk.red(`Impossible de se connecter à la collection ${collectionName}`));
        client.close();
      } else {
        let cursorFind = collection.find(dataToFind, options);
        cursorFind.toArray(function(error, documents) {
          if (error) {
            console.log(chalk.red(`Impossible de parcourir la collection ${collectionName}`));
          } else {
            let dataFoundFromOneCollection = [];

            for (let i = 0; i < documents.length; i++) {
              dataFoundFromOneCollection.push(documents[i]);
            }
            
            callback(dataFoundFromOneCollection);
          }
          client.close();
        });
      }
    });
  });
}

/** Méthode pour rechercher tous les documentss dans une collection de la base de données */
exports.findAll = function(dbName, collectionName, callback) {
  this.action(dbName, function(client, db) {
    db.collection(collectionName, {strict: true}, function(error, collection) {
      if (error) {
        console.log(chalk.red(`Impossible de se connecter à la collection ${collectionName}`));
        client.close();
      } else {
        let cursorFind = collection.find();
        cursorFind.toArray(function(error, documents) {
          if (error) {
            console.log(chalk.red(`Impossible de parcourir la collection ${collectionName}`));
          } else {
            let allDataFromOneCollection = [];

            for (let i = 0; i < documents.length; i++) {
              allDataFromOneCollection.push(documents[i]);
            }
            
            callback(allDataFromOneCollection);
          }
          client.close();
        });
      }
    });
  });
}

/** Méthode pour rechercher dans une collection de la base de données les documents correspondant à des filtres passés en argument */
exports.findFilteredElements = function(dbName, collectionName, filters, callback) {
  this.action(dbName, function(client, db) {
    db.collection(collectionName).aggregate([
      { $match: filters.match },
      { $group: filters.group },
      { $sort: filters.sort }
    ]).toArray(function(error, data) {
      if (error) {
        console.log(chalk.red(`Impossible d'effectuer la recherche dans la base de données avec les filtres suivants :`), filters);
      } else {
        callback(data);
      }
      client.close();
    });
  });
}

/** Méthode pour trouver dans une collection un document et le mettre à jour */
exports.updateOne = function(dbName, collectionName, dataToUpdate, modificationsToApply, options, callback) {
  this.action(dbName, function(client, db) {
    db.collection(collectionName).updateOne(dataToUpdate, modificationsToApply, options, function(error, result) {
      if (error) {
        console.log(chalk.red(`Impossible de mettre à jour les données suivantes dans la base de données :`), dataToUpdate, modificationsToApply);
      }
    });

    callback();
  });
}

/** Méthode pour trouver dans une collection un document et le supprimer */
exports.deleteOne = function(dbName, collectionName, dataToDelete, options, callback) {
  this.action(dbName, function(client, db) {
    db.collection(collectionName).deleteOne(dataToDelete, options, function(error, result) {
      if (error) {
        console.log(chalk.red(`Impossible de supprimer les données suivantes dans la base de données :`), dataToDelete);
      }
    });

    callback();
  });
}