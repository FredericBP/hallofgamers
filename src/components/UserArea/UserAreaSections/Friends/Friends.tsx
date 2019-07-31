/** Importation des modules React */
import * as React from 'react';

/** Importation des méthodes pour socket.io */
import { socketIoEmit } from '../../../../assets/js/module.socketio';
import { socketIoOn } from '../../../../assets/js/module.socketio';

/** Importation des composants nécessaires à ce composant */
import FriendsList from './SubSection/FriendsList';
import FriendSearch from './SubSection/FriendSearch';
import FriendRequests from './SubSection/FriendRequests';

/** Définition des types pour les props */
interface propsType {
  currentUserAreaSubSection?: string,
  handleCurrentUserAreaSectionChange(sectionName: string, subSectionName: string): void,
  updateStateOfAppComponent(stateToUpdate: string, data: any): void,
  userData?: Object | any
}

/**
 * Définition des types pour la synthaxe JSX
 * ElementClass correspond aux éléments JSX créé à partir d'une class d'un autre composant
 * IntrinsicElements correspond aux éléments JSX créé directement dans la méthode concernée
 */
declare namespace JSX {
  interface ElementClass {}
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}

/** Composant Friends */
class Friends extends React.Component<propsType> {
  constructor(props: Object | any) {
    super(props);
  }

  /**
   * Envoyer les données d'un ami au serveur pour sauvegarder la demande d'ami dans la base de données
   * @param friendDataToInvite {Object | any} reçoit les données d'un ami
   */
  inviteOneFriend(friendDataToInvite: Object | any): void {
    let processedFriendDataToInvite = {
      currentUserPseudo: this.props.userData.profile.pseudo,
      friendDataToInvite: friendDataToInvite
    }

    socketIoEmit('invitingOneFriend', JSON.stringify(processedFriendDataToInvite));
  }

  /**
   * Envoyer les données d'un ami au serveur pour accepter la demande d'ami dans la base de données
   * @param friendDataToInvite {Object | any} reçoit les données d'un ami
   */
  acceptOneFriend(friendDataToAccept: Object | any): void {
    let processedFriendDataToAccept = {
      currentUserPseudo: this.props.userData.profile.pseudo,
      friendDataToAccept: friendDataToAccept
    }

    socketIoEmit('acceptingOneFriend', JSON.stringify(processedFriendDataToAccept));
  }

  /**
   * Envoyer les données d'un ami au serveur pour les supprimer de la base de données
   * @param friendDataToDelete {Object | any} reçoit les données d'un ami
   */
  deleteOneFriend(friendDataToDelete: Object | any): void {
    let processedFriendDataToDelete = {
      currentUserPseudo: this.props.userData.profile.pseudo,
      friendDataToDelete: friendDataToDelete
    }

    socketIoEmit('deletingOneFriend', JSON.stringify(processedFriendDataToDelete));
  }

  /**
   * Obtenir le code JSX d'une sous-section
   * @param subSectionName {string} reçoit le nom de la sous-section
   * @returns un composant de la sous-section indiquée en paramètre
   */
  renderSubSection(subSectionName: string): JSX.ElementClass {
    switch (subSectionName) {
      case 'FriendsList':
        return (
          <FriendsList
            deleteOneFriend={(friendDataToDelete: Object | any): void => this.deleteOneFriend(friendDataToDelete)}
            userData={this.props.userData}
          />
        );
      
      case 'FriendSearch':
        return (
          <FriendSearch
            deleteOneFriend={(friendDataToDelete: Object | any): void => this.deleteOneFriend(friendDataToDelete)}
            handleCurrentUserAreaSectionChange={this.props.handleCurrentUserAreaSectionChange}
            inviteOneFriend={(friendDataToInvite: Object | any): void => this.inviteOneFriend(friendDataToInvite)}
            updateStateOfAppComponent={this.props.updateStateOfAppComponent}
            userData={this.props.userData}
          />
        );
      
      case 'FriendRequests':
        return (
          <FriendRequests
            acceptOneFriend={(friendDataToAccept: Object | any): void => this.acceptOneFriend(friendDataToAccept)}
            userData={this.props.userData}
          />
        );
    }
  }

  render(): JSX.IntrinsicElements {
    return (
      <section>
        <h1>Amis</h1>
        {this.renderSubSection(this.props.currentUserAreaSubSection)}
      </section>
    );
  }

  componentDidMount(): void {
    socketIoOn('friendInvited', (data: any): void => {
      if (data) {
        this.props.updateStateOfAppComponent('modalBox', {
          content: `Ta demande a bien été envoyée !`,
          functionToActivateOnClick: function(): void {},
          isDisplayed: true
        });
      } else {
        this.props.updateStateOfAppComponent('modalBox', {
          content: `Désolé, une erreur est survenue :(`,
          functionToActivateOnClick: function(): void {},
          isDisplayed: true
        });
      }
    });

    socketIoOn('friendAccepted', (data: any): void => {
      if (data) {
        this.props.updateStateOfAppComponent('modalBox', {
          content: `Félicitations, tu as un nouvel ami !`,
          functionToActivateOnClick: function(): void {},
          isDisplayed: true
        });
      } else {
        this.props.updateStateOfAppComponent('modalBox', {
          content: `Désolé, une erreur est survenue :(`,
          functionToActivateOnClick: function(): void {},
          isDisplayed: true
        });
      }
    });

    socketIoOn('friendDeleted', (data: any): void => {
      if (data) {
        this.props.updateStateOfAppComponent('modalBox', {
          content: `Dorénavant tu n'es plus ami avec ce membre.`,
          functionToActivateOnClick: function(): void {},
          isDisplayed: true
        });
      } else {
        this.props.updateStateOfAppComponent('modalBox', {
          content: `Désolé, une erreur est survenue :(`,
          functionToActivateOnClick: function(): void {},
          isDisplayed: true
        });
      }
    });
  }
}

/** Exportation du composant Friends */
export default Friends;