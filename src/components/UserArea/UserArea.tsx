/** Importation des modules React */
import * as React from 'react';

/** Importation des composants nécessaires à ce composant */
import Header from './UserAreaStructure/Header';
import Main from './UserAreaStructure/Main';
import FloatingActionButton from '../Interface/Buttons/FloatingActionButton';

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

/** Composant UserArea */
class UserArea extends React.Component<propsType> {
  constructor(props: Object | any) {
    super(props);
  }

  render(): JSX.ElementClass {
    return (
      <React.Fragment>
        <Header
          appWidth={this.props.appWidth}
          handleCurrentUserAreaSectionChange={this.props.handleCurrentUserAreaSectionChange}
          userData={this.props.userData}
        />
        <Main
          anotherUserData={this.props.anotherUserData}
          appWidth={this.props.appWidth}
          capitalizeFirstLetter={this.props.capitalizeFirstLetter}
          currentUserAreaSection={this.props.currentUserAreaSection}
          currentUserAreaSubSection={this.props.currentUserAreaSubSection}
          handleCurrentUserAreaSectionChange={this.props.handleCurrentUserAreaSectionChange}
          updateStateOfAppComponent={this.props.updateStateOfAppComponent}
          userData={this.props.userData}
        />
        <FloatingActionButton functionToActivateOnClick={(): void => this.props.handleCurrentUserAreaSectionChange('Profile', 'ProfileWritePost')} />
      </React.Fragment>
    );
  }
}

/** Exportation du composant UserArea */
export default UserArea;