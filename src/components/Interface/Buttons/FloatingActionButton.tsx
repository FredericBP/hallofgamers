/** Importation des modules React */
import * as React from 'react';

/** Importation du module Tippy.js */
import tippy from 'tippy.js';

/** Définition des types pour les props */
interface propsType {
  functionToActivateOnClick(): void
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

/** Composant FloatingActionButton */
class FloatingActionButton extends React.Component<propsType> {
  constructor(props: Object | any) {
    super(props);
  }

  render(): JSX.IntrinsicElements {
    let tippyContent = 'Rédiger un post';

    return (
      <button
        className="tippy-active" data-tooltip="true" data-tippy="" data-tippy-content={tippyContent}
        id="floating-action-button"
        onClick={(): void => this.props.functionToActivateOnClick()}>
        <i className="fas fa-plus"></i>
      </button>
    );
  }

  componentDidMount(): void {
    /** Changer le statut de l'info-bulle créée avec le module tippy.js pour le bouton d'action en bas à droite et définir les paramètres tippy.js */
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

/** Exportation du composant FloatingActionButton */
export default FloatingActionButton;