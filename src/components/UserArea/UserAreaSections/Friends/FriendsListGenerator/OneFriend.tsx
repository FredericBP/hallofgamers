/** Importation des modules React */
import * as React from 'react';

/** Importation du module Tippy.js */
import tippy from 'tippy.js';

/** Définition des types pour les props */
interface propsType {
  acceptOneFriend(friendDataToAccept): void,
  deleteOneFriend(friendDataToDelete): void,
  friend: Object | any,
  friendStatus?: string,
  key: number
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

/** Composant OneFriend */
class OneFriend extends React.Component<propsType> {
  constructor(props: Object | any) {
    super(props);
  }

  renderFriendInteractionButton(friendStatus) {
    let tippyContentDelete = `Ne plus être ami avec ce membre`;
    let tippyContentAccept = `Accepter la demande d'ami de ce membre`;

    switch (friendStatus) {
      case 'accepted':
        return (
          <span className="tippy-active" data-tooltip="true" data-tippy="" data-tippy-content={tippyContentDelete}>
            <i className="fas fa-times" onClick={(): void => this.props.deleteOneFriend(this.props.friend)}></i>
          </span>
        );
      case 'pending':
        return (
          <span className="tippy-active" data-tooltip="true" data-tippy="" data-tippy-content={tippyContentAccept}>
            <i className="fas fa-check" onClick={(): void => this.props.acceptOneFriend(this.props.friend)}></i>
          </span>
        );
    }
  }

  render(): JSX.IntrinsicElements {
    return (
      <div className="one-member">
        <div className="member-information">
          <p>{this.props.friend.profile.pseudo}</p>
        </div>
        <div className="member-buttons">
          {this.renderFriendInteractionButton(this.props.friendStatus)}
        </div>
      </div>
    );
  }

  componentDidMount(): void {
    /** Changer le statut de l'info-bulle créée avec le module tippy.js pour la croix rouge servant à supprimer l'ami sélectionné et définir les paramètres tippy.js */
    document.querySelectorAll('[data-tooltip="true"]').forEach((element: Element): void => {
      tippy(element, {
        arrow: true,
        arrowType: 'round',
        animateFill: false,
        animation: 'shift-away',
        placement: 'top-end'
      });
    });
  }
}

/** Exportation du composant OneFriend */
export default OneFriend;