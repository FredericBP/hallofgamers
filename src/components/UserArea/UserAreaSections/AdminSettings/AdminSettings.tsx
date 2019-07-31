/** Importation des modules React */
import * as React from 'react';

/** Importation des composants nécessaires à ce composant */
import MemberSearch from './SubSection/MemberSearch';
import MemberSettings from './SubSection/MemberSettings';

/** Définition des types pour les props */
interface propsType {
  anotherUserData?: Object | any,
  capitalizeFirstLetter(string: string): string,
  currentUserAreaSubSection?: string,
  handleCurrentUserAreaSectionChange(sectionName: string, subSectionName: string): void,
  updateStateOfAppComponent(stateToUpdate: string, data: any): void
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

/** Composant AdminSettings */
class AdminSettings extends React.Component<propsType> {
  constructor(props: Object | any) {
    super(props);
  }

  /**
   * Obtenir le code JSX d'une sous-section
   * @param subSectionName {string} reçoit le nom de la sous-section
   * @returns un composant de la sous-section indiquée en paramètre
   */
  renderSubSection(subSectionName: string): JSX.ElementClass {
    switch (subSectionName) {
      case 'MemberSearch':
        return (
          <MemberSearch
            handleCurrentUserAreaSectionChange={this.props.handleCurrentUserAreaSectionChange}
            updateStateOfAppComponent={this.props.updateStateOfAppComponent}
          />
        );
      
      case 'MemberSettings':
        return (
          <MemberSettings
            anotherUserData={this.props.anotherUserData}
            capitalizeFirstLetter={this.props.capitalizeFirstLetter}
            updateStateOfAppComponent={this.props.updateStateOfAppComponent}
          />
        );
    }
  }

  render(): JSX.IntrinsicElements {
    return (
      <section>
        <h1>Tableau de bord administrateur</h1>
        {this.renderSubSection(this.props.currentUserAreaSubSection)}
      </section>
    );
  }
}

/** Exportation du composant AdminSettings */
export default AdminSettings;