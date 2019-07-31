/** Importation des modules React */
import * as React from 'react';

/** Importation du module Tippy.js */
import tippy from 'tippy.js';

/** Importation des méthodes pour socket.io */
import { socketIoEmit } from '../../../assets/js/module.socketio';

/** Définition des types pour les props */
interface propsType {
  handleOpenAccountButtonMenu?: any,
  isAccountButtonMenuOpen?: boolean,
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

/** Composant AccountButton */
class AccountButton extends React.Component<propsType> {
  constructor(props: Object | any) {
    super(props);
  }

  accountButtonMenu(): JSX.IntrinsicElements {
    return (
      <div id="account-button-menu">
        <nav>
          <ul>
            <li>Paramètres du compte</li>
            <li onClick={(): void => socketIoEmit('sendingSignOutRequest', this.props.userData.profile.email)}>Déconnexion</li>
          </ul>
        </nav>
      </div>
    );
  }

  getTippyContentForAccountButtonMenu(): string {
    let tippyContent = (
      `<div id="account-button-menu">
        <nav>
          <ul>
            <li>Paramètres du compte</li>
            <li onclick="console.log('Déconnecté')">Déconnexion</li>
          </ul>
        </nav>
      </div>`
    );
    
    return tippyContent;
  }

  render(): JSX.IntrinsicElements {
    let accountButtonMenu = this.getTippyContentForAccountButtonMenu();

    return (
      <div id="account-button">
        <span className="tippy-active" data-tooltip="true" data-tippy="" data-tippy-content={accountButtonMenu}>
          <i className="fas fa-user-circle"></i>
        </span>
      </div>
    );
  }

  componentDidMount(): void {
    /** Changer le statut de l'info-bulle créée avec le module tippy.js pour le bouton du compte et définir les paramètres tippy.js */
    document.querySelectorAll('[data-tooltip="true"]').forEach((element: Element): void => {
      tippy(element, {
        arrow: true,
        arrowType: 'round',
        animateFill: false,
        animation: 'shift-away',
        interactive: true
      });
    });
  }
}

/** Exportation du composant AccountButton */
export default AccountButton;