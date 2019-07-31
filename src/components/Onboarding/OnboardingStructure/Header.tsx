/** Importation des modules React */
import * as React from 'react';

/** Importation des composants nécessaires à ce composant */
import StandardButton from '../../Interface/Buttons/StandardButton';

/** Importation du logo */
const logoHallOfGamers = require('../../../assets/files/logo-hall-of-gamers-light.png');

/** Définition des types pour les props */
interface propsType {
  handleCurrentOnboardingSectionChange(sectionName: string): void
}

/** Définition des types pour le state */
interface stateType {
  mainMenuOpen?: boolean
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

/** Composant Header pour le composant Onboarding */
class Header extends React.Component<propsType, stateType> {
  constructor(props: Object | any) {
    super(props);
    this.state = {
      mainMenuOpen: false
    };
  }

  render(): JSX.IntrinsicElements {
    return (
      <header className="onboarding-page">
        <img
          src={logoHallOfGamers}
          alt="Logo Hall of Gamers"
          onClick={(): void => this.props.handleCurrentOnboardingSectionChange('LandingPage')}
        />
        <div>
          <StandardButton
            functionToActivateOnClick={(): void => this.props.handleCurrentOnboardingSectionChange('SignUp')}
            value="Inscription"
          />
          <StandardButton
            functionToActivateOnClick={(): void => this.props.handleCurrentOnboardingSectionChange('SignIn')}
            value="Connexion"
          />
        </div>
      </header>
    );
  }
}

/** Exportation du composant Header pour le composant Onboarding */
export default Header;