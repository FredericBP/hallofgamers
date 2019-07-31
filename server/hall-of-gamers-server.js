'use-strict';

/** Initialisation des modules */
const chalk = require('chalk');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
const app = express();

/** Middleware liés aux modules */
app.locals.pretty = true;
app.use(bodyParser.urlencoded({extended: true}));

// var sess;
// app.use(cookieParser())
// app.use(session({
//   cookie: {
//     maxAge: 1000 * 60 * 60 * 24 * 14,
//     sameSite: true
//   },
//   name: 'sessionHallOfGamers',
//   resave: false,
//   saveUninitialized: false,
//   secret: '2x,n#sun/jHwfv0'
// }));

/** Initialisation de la base de données et de bcrypt pour le hashage des mots de passe */
const db = require('./server/database/database');
const dataProcessing = require('./server/database/data-processing-methods');
const dbName = 'hallofgamers';
const collectionUsers = 'users';

/** Gestion des fichiers statiques */
app.use(express.static(path.join(__dirname)));

/** Gestion des routes */
app.get('/',function(req, res) {
  res.sendFile(__dirname + '/index.html');

  // sess = req.session;
  // if (sess.userLogin) {
  //   console.log(`connected as : ${sess.userLogin}`);
  // } else {
  //   console.log(`not connected before, the session value is ${sess.userLogin}`);
  // }

});

/** Gestion des erreurs */
// app.use(function (req, res) {
//   res.status(404).render('error');
// });

/** Gestion des requetes socket.io */
const socketIo = require('socket.io');
const server = require('http').Server(app);
const io = socketIo.listen(server);

io.on('connection', function(socket) {
  console.log(chalk.yellow(`Connexion WebSocket établie avec : ` + socket.id));

  /** Récupération des statistiques pour la page d'accueil */
  socket.on('sendingStatisticsRequest', function(data) {
    db.findAll(dbName, collectionUsers, function(allDataFromOneCollection) {
      let statisticsForOnboarding = {
        numberOfAllMessagesFromUsers: 0,
        numberOfUsersCurrentlyConnected: 0
      }
  
      allDataFromOneCollection.forEach(document => {
        if (document.connected) {
          statisticsForOnboarding.numberOfUsersCurrentlyConnected++;
        }
  
        statisticsForOnboarding.numberOfAllMessagesFromUsers += document.posts.length;
      });
  
      socket.emit('sendingStatisticsFromDatabase', JSON.stringify(statisticsForOnboarding));
    });
  });

  /** Gestion des données liées à l'inscription d'un utilisateur */
  socket.on('sendingSignUpDataToBeChecked', function(data) {
    let signUpData = JSON.parse(data);
    let signUpErrors = {
      emailError: false,
      pseudoError: false,
      serverError: false
    }

    /** Vérification qu'aucun autre utilisateur ne possède déjà la même adresse e-mail et le même pseudo */
    db.find(dbName, collectionUsers, {
      'profile.email': signUpData.email
    }, {}, function(dataFound) {

      if (dataFound.length > 0) {
        signUpErrors.emailError = true;
      }
      
      db.find(dbName, collectionUsers, {
        'profile.pseudo': signUpData.pseudo
      }, {}, function(dataFound) {
        if (dataFound.length > 0) {
          signUpErrors.pseudoError = true;
        }
        
        if (signUpErrors.emailError || signUpErrors.pseudoError) {
          
          socket.emit('resultOfSignUpDataVerification', JSON.stringify(signUpErrors));

        } else {

          /** Hashage du mot de passe avant d'insérer le nouveau membre dans la base de données */
          dataProcessing.passwordHash(signUpData.password, signUpErrors, function(hashedPassword, errorObject) {
            if (errorObject.serverError) {
              socket.emit('resultOfSignUpDataVerification', JSON.stringify(errorObject));
            } else {
              let newUserToInsert = {
                role: 'member',
                connected: true,
                connection: {
                  login: signUpData.email,
                  password: hashedPassword
                },
                profile: {
                  email: signUpData.email,
                  pseudo: signUpData.pseudo,
                  lastname: signUpData.lastname,
                  firstname: signUpData.firstname,
                  gender: signUpData.gender,
                  age: signUpData.age,
                  address: signUpData.address,
                  zipcode: signUpData.zipcode,
                  city: signUpData.city,
                  summary: signUpData.summary
                },
                friends: {
                  list: [],
                  pending: [],
                  sent: [],
                  recommanded: []
                },
                posts: [],
                messages: [],
                settings: {}
              }

              /** Insertion d'un nouveau membre dans la base de données */
              db.insertOne(dbName, collectionUsers, newUserToInsert, function() {
                let oneUserData = dataProcessing.generateOneUserDataWithoutConnectionData(newUserToInsert);
                socket.emit('sendingUserData', JSON.stringify(oneUserData));

                socket.emit('resultOfSignUpDataVerification', JSON.stringify(errorObject));
              });
            }
          });
        }
      });
    });
  });

  /** Gestion des données liées à la connexion d'un utilisateur */
  socket.on('sendingSignInDataToBeChecked', function(data) {
    let signInData = JSON.parse(data);
    let signInErrors = {
      loginError: false,
      passwordError: false,
      serverError: false
    }

    db.find(dbName, collectionUsers, {
      'connection.login': signInData.login
    }, {}, function(dataFound) {
      
      if (dataFound.length > 0) {

        dataProcessing.comparePasswords(signInData.password, dataFound[0].connection.password, signInErrors, function(errorObject, response) {
              
          if (response) {

            let userData = dataProcessing.generateOneUserDataWithoutConnectionData(dataFound[0]);

            socket.emit('sendingUserData', JSON.stringify(userData));

            db.updateOne(dbName, collectionUsers, {
              'connection.login': signInData.login
            }, {
              $set: {
                connected: true
              }
            }, {}, function() {
              socket.emit('resultOfSignInDataVerification', JSON.stringify(errorObject));
            });

          } else {
            errorObject.passwordError = true;

            socket.emit('resultOfSignInDataVerification', JSON.stringify(errorObject));
          }
        });

      } else {

        signInErrors.loginError = true;

        socket.emit('resultOfSignInDataVerification', JSON.stringify(signInErrors));

      }
    });
  });

  /** Gestion de la déconnexion d'un utilisateur à son compte */
  socket.on('sendingSignOutRequest', function(data) {
    db.updateOne(dbName, collectionUsers, {
      'connection.login': data
    }, {
      $set: {
        connected: false
      }
    }, {}, function() {
      socket.emit('signOutValidated', false);
    });
  });

  /** Insertion du nouveau post d'un utilisateur */
  socket.on('sendingNewPost', function(data) {
    let newPostData = JSON.parse(data);
    let processedNewPostData = {
      author: newPostData.author,
      content: newPostData.content,
      date: newPostData.date,
      timelineOwner: newPostData.timelineOwner,
      title: newPostData.title
    }

    db.updateOne(dbName, collectionUsers, {
      'profile.pseudo': newPostData.timelineOwner
    }, {
      $push: {
        posts: processedNewPostData
      }
    }, {}, function() {

      db.find(dbName, collectionUsers, {
        'profile.pseudo': newPostData.timelineOwner
      }, {}, function(dataFound) {
        
        if (dataFound.length > 0) {
          let userData = dataProcessing.generateOneUserDataWithoutConnectionData(dataFound[0]);

          socket.emit('sendingUserData', JSON.stringify(userData));

          socket.emit('newPostAdded', true);
        } else {
          socket.emit('newPostAdded', false);
        }

      });
    });
  });

  /** Suppression du post de l'utilisateur */
  socket.on('deletingOnePost', function(data) {
    let postDataSendToDelete = JSON.parse(data);

    db.updateOne(dbName, collectionUsers, {
      'profile.pseudo': postDataSendToDelete.timelineOwner
    }, {
      $pull: {
        'posts': {
          content: postDataSendToDelete.content
        }
      }
    }, {}, function() {

      db.find(dbName, collectionUsers, {
        'profile.pseudo': postDataSendToDelete.timelineOwner
      }, {}, function(dataFound) {
        
        if (dataFound.length > 0) {
          let userData = dataProcessing.generateOneUserDataWithoutConnectionData(dataFound[0]);

          socket.emit('sendingUserData', JSON.stringify(userData));

          socket.emit('postDeleted', true);
        } else {
          socket.emit('postDeleted', false);
        }

      });
      
    });
  });

  socket.on('sendingMemberSearchDataToBeChecked', function(data) {
    let memberSearchRegex = new RegExp(data, 'gmi');
    
    db.find(dbName, collectionUsers, {
      'profile.pseudo': { $regex: memberSearchRegex }
    }, {}, function(results) {

      let processedResults = [];

      results.forEach((member) => {
        let memberData = dataProcessing.generateOneUserDataWithoutConnectionData(member);
        
        processedResults.push(memberData);
      });

      socket.emit('resultsFromMemberSearch', JSON.stringify(processedResults));
    });
  });

  /** Insertion du nouveau post d'un utilisateur */
  socket.on('invitingOneFriend', function(data) {
    let processedFriendDataToInvite = JSON.parse(data);

    db.updateOne(dbName, collectionUsers, {
      'profile.pseudo': processedFriendDataToInvite.friendDataToInvite.profile.pseudo
    }, {
      $push: {
        'friends.pending': {
          profile: {
            pseudo: processedFriendDataToInvite.currentUserPseudo
          }
        }
      }
    }, {}, function() {
      
      db.updateOne(dbName, collectionUsers, {
        'profile.pseudo': processedFriendDataToInvite.currentUserPseudo
      }, {
        $push: {
          'friends.sent': {
            profile: {
              pseudo: processedFriendDataToInvite.friendDataToInvite.profile.pseudo
            }
          }
        }
      }, {}, function() {
  
        db.find(dbName, collectionUsers, {
          'profile.pseudo': processedFriendDataToInvite.currentUserPseudo
        }, {}, function(dataFound) {
          
          if (dataFound.length > 0) {
            let userData = dataProcessing.generateOneUserDataWithoutConnectionData(dataFound[0]);
  
            socket.emit('sendingUserData', JSON.stringify(userData));
  
            socket.emit('friendInvited', true);
          } else {
            socket.emit('friendInvited', false);
          }
  
        });

      });
    });
  });

  /** Insertion du nouveau post d'un utilisateur */
  socket.on('acceptingOneFriend', function(data) {
    let processedFriendDataToAccept = JSON.parse(data);

    db.updateOne(dbName, collectionUsers, {
      'profile.pseudo': processedFriendDataToAccept.friendDataToAccept.profile.pseudo
    }, {
      $pull: {
        'friends.sent': {
          profile: {
            pseudo: processedFriendDataToAccept.currentUserPseudo 
          }
        }
      },
      $push: {
        'friends.list': {
          profile: {
            pseudo: processedFriendDataToAccept.currentUserPseudo
          }
        }
      }
    }, {}, function() {
      
      db.updateOne(dbName, collectionUsers, {
        'profile.pseudo': processedFriendDataToAccept.currentUserPseudo
      }, {
        $pull: {
          'friends.pending': {
            profile: {
              pseudo: processedFriendDataToAccept.friendDataToAccept.profile.pseudo
            }
          }
        },
        $push: {
          'friends.list': {
            profile: {
              pseudo: processedFriendDataToAccept.friendDataToAccept.profile.pseudo
            }
          }
        }
      }, {}, function() {
  
        db.find(dbName, collectionUsers, {
          'profile.pseudo': processedFriendDataToAccept.currentUserPseudo
        }, {}, function(dataFound) {
          
          if (dataFound.length > 0) {
            let userData = dataProcessing.generateOneUserDataWithoutConnectionData(dataFound[0]);
  
            socket.emit('sendingUserData', JSON.stringify(userData));
  
            socket.emit('friendAccepted', true);
          } else {
            socket.emit('friendAccepted', false);
          }
  
        });

      });
    });
  });

  /** Suppression d'un ami de l'utilisateur */
  socket.on('deletingOneFriend', function(data) {
    let processedFriendDataToDelete = JSON.parse(data);

    db.updateOne(dbName, collectionUsers, {
      'profile.pseudo': processedFriendDataToDelete.currentUserPseudo
    }, {
      $pull: {
        'friends.list': {
          profile: {
            pseudo: processedFriendDataToDelete.friendDataToDelete.profile.pseudo
          }
        }
      }
    }, {}, function() {

      db.find(dbName, collectionUsers, {
        'profile.pseudo': processedFriendDataToDelete.currentUserPseudo
      }, {}, function(dataFound) {
        
        if (dataFound.length > 0) {
          let userData = dataProcessing.generateOneUserDataWithoutConnectionData(dataFound[0]);

          socket.emit('sendingUserData', JSON.stringify(userData));

          socket.emit('friendDeleted', true);
        } else {
          socket.emit('friendDeleted', false);
        }

      });
      
    });
  });

  socket.on('sendingSettingsDataToUpdate', function(data) {
    let settingsData = JSON.parse(data);
    let settingsErrors = {
      serverError: false
    }
    let processedProfileData = {
      email: settingsData.email,
      pseudo: settingsData.pseudo,
      lastname: settingsData.lastname,
      firstname: settingsData.firstname,
      gender: settingsData.gender,
      age: settingsData.age,
      address: settingsData.address,
      zipcode: settingsData.zipcode,
      city: settingsData.city,
      summary: settingsData.summary
    }
    let processedRoleData = 'member';

    if (settingsData.role && settingsData.role === 'admin') {
      processedRoleData = 'admin';
    }

    db.updateOne(dbName, collectionUsers, {
      'profile.pseudo': settingsData.pseudo
    }, {
      $set: {
        role: processedRoleData,
        profile: processedProfileData
      }
    }, {}, function() {

      db.find(dbName, collectionUsers, {
        'profile.pseudo': settingsData.pseudo
      }, {}, function(dataFound) {
        
        if (dataFound.length > 0) {
          let userData = dataProcessing.generateOneUserDataWithoutConnectionData(dataFound[0]);

          socket.emit('sendingUserData', JSON.stringify(userData));

          socket.emit('resultOfSettingsDataUpdate', JSON.stringify(settingsErrors));
        } else {
          settingsErrors.serverError = true;
          socket.emit('resultOfSettingsDataUpdate', JSON.stringify(settingsErrors));
        }

      });
    });
  });

  /** Gestion de la déconnexion d'un client */
  socket.on('disconnect', function() {
    console.log(chalk.magenta(`Déconnexion WebSocket avec : ` + socket.id));
  });
});

/** Attribution du port d'écoute */
const port = 80;
server.listen(port, function(erreur) {
  if (erreur) {
    console.log(chalk.red(`Impossible de démarrer le serveur sur le port ` + port));
  } else {
    console.log(chalk.green(`Le serveur est à l'écoute sur le port ` + port));
  }
});