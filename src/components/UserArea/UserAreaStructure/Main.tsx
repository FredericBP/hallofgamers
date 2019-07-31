/** Importation des modules React */
import * as React from 'react';

/** Importation des composants nécessaires à ce composant */
import SideMenu from '../../Interface/Menu/SideMenu';
import Profile from '../UserAreaSections/Profile/Profile';
import Friends from '../UserAreaSections/Friends/Friends';
import Messages from '../UserAreaSections/Messages/Messages';
import Community from '../UserAreaSections/Community/Community';
import Games from '../UserAreaSections/Games/Games';
import Settings from '../UserAreaSections/Settings/Settings';
import AdminSettings from '../UserAreaSections/adminSettings/AdminSettings';

/** Définition des types pour les props */
interface propsType {
  appWidth?: number,
  capitalizeFirstLetter(string: string): string,
  currentUserAreaSection?: string,
  currentUserAreaSubSection?: string,
  handleCurrentUserAreaSectionChange(sectionName: string, subSectionName: string): void,
  updateStateOfAppComponent(stateToUpdate: string, data: any): void,
  userData?: Object | any,
  anotherUserData?: Object | any
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

/** Composant Main pour le composant UserArea */
class Main extends React.Component<propsType> {
  constructor(props: Object | any) {
    super(props);
  }

  /**
   * Sélectionner pour l'espace utilisateur (composant UserArea) le composant de la section correspondant au nom passé en argument
   * @param sectionName {string} reçoit le nom d'une section
   * @returns retourne un élément JSX affichant le composant d'une section de l'espace utilisateur
   */
  showThecurrentUserAreaSection(sectionName: string): JSX.ElementClass {
    switch (sectionName) {
      case 'Profile':
        return (
          <Profile
            anotherUserData={this.props.anotherUserData}
            currentUserAreaSubSection={this.props.currentUserAreaSubSection}
            handleCurrentUserAreaSectionChange={this.props.handleCurrentUserAreaSectionChange}
            updateStateOfAppComponent={this.props.updateStateOfAppComponent}
            userData={this.props.userData}
          />
        );
      case 'Friends':
        return (
          <Friends
            currentUserAreaSubSection={this.props.currentUserAreaSubSection}
            handleCurrentUserAreaSectionChange={this.props.handleCurrentUserAreaSectionChange}
            updateStateOfAppComponent={this.props.updateStateOfAppComponent}            
            userData={this.props.userData}
          />
        );
      case 'Messages':
        return (
          <Messages />
        );
      case 'Community':
        return (
          <Community
            currentUserAreaSubSection={this.props.currentUserAreaSubSection}
            userData={this.props.userData}
          />
        );
      case 'Games':
        return (
          <Games />
        );
      case 'Settings':
        return (
          <Settings
            capitalizeFirstLetter={this.props.capitalizeFirstLetter}
            updateStateOfAppComponent={this.props.updateStateOfAppComponent}
            userData={this.props.userData}
          />
        );
      case 'AdminSettings':
        return (
          <AdminSettings
            anotherUserData={this.props.anotherUserData}
            capitalizeFirstLetter={this.props.capitalizeFirstLetter}
            currentUserAreaSubSection={this.props.currentUserAreaSubSection}            
            handleCurrentUserAreaSectionChange={this.props.handleCurrentUserAreaSectionChange}
            updateStateOfAppComponent={this.props.updateStateOfAppComponent}
          />
        );
    }
  }

  render(): JSX.IntrinsicElements {
    if (this.props.appWidth < 1475) {
      return (
        <main className="container user-area">
          {this.showThecurrentUserAreaSection(this.props.currentUserAreaSection)}
        </main>
      );
    } else {
      return (
        <main className="container user-area">
          <SideMenu
            handleCurrentUserAreaSectionChange={this.props.handleCurrentUserAreaSectionChange}
            handleOpenMenuForHeader={function(): void {}}
            userData={this.props.userData}
          />
          {this.showThecurrentUserAreaSection(this.props.currentUserAreaSection)}
        </main>
      );
    }
  }

  componentDidUpdate(): void {
    /** Reinitialiser la scrollbar à chaque mise à jour du composant */
    window.document.getElementsByTagName('main')[0].scrollTop = 0;
  }
}

/** Exportation du composant Main pour le composant UserArea */
export default Main;