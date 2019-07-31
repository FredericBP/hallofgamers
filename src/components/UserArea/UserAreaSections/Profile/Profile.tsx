/** Importation des modules React */
import * as React from 'react';

/** Importation des méthodes pour socket.io */
import { socketIoEmit } from '../../../../assets/js/module.socketio';
import { socketIoOn } from '../../../../assets/js/module.socketio';

/** Importation des composants nécessaires à ce composant */
import ProfileTimeline from './SubSection/ProfileTimeline';
import ProfileTimelineOfAnotherMember from './SubSection/ProfileTimelineOfAnotherMember';
import ProfileWritePost from './SubSection/ProfileWritePost';

/** Définition des types pour les props */
interface propsType {
  anotherUserData?: Object | any,
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

/** Composant Profile */
class Profile extends React.Component<propsType> {
  constructor(props: Object | any) {
    super(props);
  }

  /**
   * Envoyer les données d'un post au serveur pour les supprimer de la base de données
   * @param postDataToDelete {Object | any} reçoit les données d'un post
   */
  deleteOnePost(postDataToDelete): void {
    socketIoEmit('deletingOnePost', JSON.stringify(postDataToDelete));
  }

  /**
   * Sélectionner la sous-section correspondant au nom passé en argument
   * @param subSectionName {string} reçoit le nom d'une sous-section
   * @returns retourne un élément JSX affichant le composant d'une sous-section de la section Profil
   */
  renderSubSection(subSectionName: string): JSX.ElementClass {
    switch (subSectionName) {
      case 'ProfileTimeline':
        return (
          <ProfileTimeline
            deleteOnePost={(postDataToDelete): void => this.deleteOnePost(postDataToDelete)}
            userData={this.props.userData}
          />
        );

      case 'ProfileTimelineOfAnotherMember':
        return (
          <ProfileTimelineOfAnotherMember
            anotherUserData={this.props.anotherUserData}
            deleteOnePost={(postDataToDelete): void => this.deleteOnePost(postDataToDelete)}
            userData={this.props.userData}
          />
        );
      
      case 'ProfileWritePost':
        return (
          <ProfileWritePost
            handleCurrentUserAreaSectionChange={this.props.handleCurrentUserAreaSectionChange}
            updateStateOfAppComponent={this.props.updateStateOfAppComponent}
            userData={this.props.userData}
          />
        );
    }
  }

  render(): JSX.IntrinsicElements {
    return (
      <section>
        <h1>Profil</h1>
        {this.renderSubSection(this.props.currentUserAreaSubSection)}
      </section>
    );
  }
  
  componentDidMount(): void {
    socketIoOn('postDeleted', (data: any): void => {
      if (data) {
        this.props.updateStateOfAppComponent('modalBox', {
          content: `Le post a bien été supprimé.`,
          functionToActivateOnClick: function(): void {},
          isDisplayed: true
        });
      } else {
        this.props.updateStateOfAppComponent('modalBox', {
          content: `Une erreur est survenue lors de la suppression du post :(`,
          functionToActivateOnClick: function(): void {},
          isDisplayed: true
        });
      }
    });
  }
}

/** Exportation du composant Profile */
export default Profile;