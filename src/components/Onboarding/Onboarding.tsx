/** Importation des modules React */
import * as React from 'react';

/** Importation des composants nécessaires à ce composant */
import Header from './OnboardingStructure/Header';
import Main from './OnboardingStructure/Main';
import Footer from './OnboardingStructure/Footer';

/** Définition des types pour les props */
interface propsType {
  capitalizeFirstLetter(string: string): string,
  currentOnboardingSection?: string,
  handleCurrentOnboardingSectionChange(sectionName: string): void,
  statisticsForOnboarding?: Object | any,
  updateStateOfAppComponent(stateToUpdate: string, data: any): void,
  userData?: Object | any,
  userIsConnected?: boolean
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

/** Composant Onboarding */
class Onboarding extends React.Component<propsType> {
  constructor(props: Object | any) {
    super(props);
  }

  /** Effectuer le rendu du composant Onboarding */
  render(): JSX.IntrinsicElements {
    return (
      <React.Fragment>
        <Header handleCurrentOnboardingSectionChange={this.props.handleCurrentOnboardingSectionChange} />
        <Main
          capitalizeFirstLetter={this.props.capitalizeFirstLetter}
          currentOnboardingSection={this.props.currentOnboardingSection}
          handleCurrentOnboardingSectionChange={this.props.handleCurrentOnboardingSectionChange}
          statisticsForOnboarding={this.props.statisticsForOnboarding}
          updateStateOfAppComponent={this.props.updateStateOfAppComponent}
          userData={this.props.userData}
        />
        <Footer handleCurrentOnboardingSectionChange={this.props.handleCurrentOnboardingSectionChange} />
      </React.Fragment>
    );
  }
}

/** Exportation du composant Onboarding */
export default Onboarding;