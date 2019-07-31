/** Importation des modules React */
import * as React from 'react';

/** Importation des méthodes pour socket.io */
import { socketIoEmit } from '../../../assets/js/module.socketio';

/** Importation des composants nécessaires à ce composant */
import MenuForHeader from '../../Interface/Menu/MenuForHeader';
import StandardButton from '../../Interface/Buttons/StandardButton';

/** Importation du logo */
const logoHallOfGamers = require('../../../assets/files/logo-hall-of-gamers-light.png');

/** Définition des types pour les props */
interface propsType {
  appWidth?: number,
  handleCurrentUserAreaSectionChange(sectionName: string, subSectionName: string): void,
  userData?: Object | any
}

/** Définition des types pour le state */
interface stateType {
  isMenuOpen?: boolean
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

/** Composant Header pour le composant UserArea */
class Header extends React.Component<propsType, stateType> {
  constructor(props: Object | any) {
    super(props);
    this.state = {
      isMenuOpen: false
    };
  }

  handleOpenMenuForHeader(): void {
    this.setState({
      isMenuOpen: !this.state.isMenuOpen
    });
  }

  render(): JSX.IntrinsicElements {
    if (this.props.appWidth < 1475) {
      return (
        <header className="user-area">
          <i className="fas fa-bars" onClick={(): void => this.handleOpenMenuForHeader()}></i>
          <MenuForHeader
            handleCurrentUserAreaSectionChange={this.props.handleCurrentUserAreaSectionChange}
            handleOpenMenuForHeader={(): void => this.handleOpenMenuForHeader()}
            isMenuOpen={this.state.isMenuOpen}
            logoHallOfGamers={logoHallOfGamers}
            userData={this.props.userData}
          />
          <img
            src={logoHallOfGamers}
            alt="Logo Hall of Gamers"
            onClick={(): void => this.props.handleCurrentUserAreaSectionChange('Profile', 'ProfileTimeline')}
          />
          <StandardButton
            functionToActivateOnClick={(): void => {
              socketIoEmit('sendingSignOutRequest', this.props.userData.profile.email);
              this.props.handleCurrentUserAreaSectionChange('Profile', 'ProfileTimeline');
            }}
            value="Déconnexion"
          />
        </header>
      );
    } else {
      return (
        <header className="user-area">
          <img
            src={logoHallOfGamers}
            alt="Logo Hall of Gamers"
            onClick={(): void => this.props.handleCurrentUserAreaSectionChange('Profile', 'ProfileTimeline')}
          />
          <StandardButton
            functionToActivateOnClick={(): void => socketIoEmit('sendingSignOutRequest', this.props.userData.profile.email)}
            value="Déconnexion"
          />
        </header>
      );
    }
  }
}

/** Exportation Header pour le composant UserArea */
export default Header;