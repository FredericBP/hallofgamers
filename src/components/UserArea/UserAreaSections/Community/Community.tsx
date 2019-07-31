/** Importation des modules React */
import * as React from 'react';

/** Importation des composants nécessaires à ce composant */
import CommunityChat from './SubSection/CommunityChat';

/** Définition des types pour les props */
interface propsType {
  currentUserAreaSubSection?: string,
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

/** Composant Community */
class Community extends React.Component<propsType> {
  constructor(props: Object | any) {
    super(props);
  }

  render(): JSX.IntrinsicElements {
    return (
      <section>
        <h1>Communauté</h1>
        <CommunityChat />
      </section>
    );
  }
}

/** Exportation du composant Community */
export default Community;