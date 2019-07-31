/** Importation des modules React */
import * as React from 'react';

/** Importation des composants nécessaires à ce composant */
import LandingPage from '../OnboardingSections/LandingPage';
import About from '../OnboardingSections/About';
import LegalNotice from '../OnboardingSections/LegalNotice';
import SignUp from '../../Interface/SignForms/SignUp';
import SignIn from '../../Interface/SignForms/SignIn';

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

/** Composant Main pour le composant Onboarding */
class Main extends React.Component<propsType> {
  constructor(props: Object | any) {
    super(props);
  }

  selectOnboardingSectionToRender(sectionName: string): JSX.ElementClass {
    switch (sectionName) {
      case 'LandingPage':
        return (
          <LandingPage
            handleCurrentOnboardingSectionChange={this.props.handleCurrentOnboardingSectionChange}
            statisticsForOnboarding={this.props.statisticsForOnboarding}
          />
        );

      case 'About':
        return (
          <About />
        );

      case 'LegalNotice':
        return (
          <LegalNotice />
        );

      case 'SignUp':
        return (
          <SignUp
            capitalizeFirstLetter={this.props.capitalizeFirstLetter}
            handleCurrentOnboardingSectionChange={this.props.handleCurrentOnboardingSectionChange}
            updateStateOfAppComponent={this.props.updateStateOfAppComponent}
          />
        );

      case 'SignIn':
        return (
          <SignIn
            handleCurrentOnboardingSectionChange={this.props.handleCurrentOnboardingSectionChange}
            updateStateOfAppComponent={this.props.updateStateOfAppComponent}
            userData={this.props.userData}
          />
        );
    }
  }

  render(): JSX.IntrinsicElements {
    let landingPageClassName = '';

    if (this.props.currentOnboardingSection === 'LandingPage') {
      landingPageClassName = 'landing-page';
    }

    return (
      <main className={`container onboarding-page ${landingPageClassName}`}>
        {this.selectOnboardingSectionToRender(this.props.currentOnboardingSection)}
      </main>
    );
  }

  componentDidUpdate(): void {
    /** Reinitialiser la scrollbar à chaque mise à jour du composant */
    window.document.getElementsByTagName('main')[0].scrollTop = 0;
  }
}

/** Exportation du composant Main pour le composant Onboarding */
export default Main;