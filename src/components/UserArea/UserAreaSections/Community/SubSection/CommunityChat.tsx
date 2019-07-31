/** Importation des modules React */
import * as React from 'react';

/** Définition des types pour les props */
interface propsType {
  
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

/** Composant CommunityChat */
class CommunityChat extends React.Component<propsType> {
  constructor(props: Object | any) {
    super(props);
  }

  render(): JSX.ElementClass {
    return (
      <React.Fragment>
        <h2>Discussion générale avec la communauté</h2>
        <div className="maintenance">
          <i className="fas fa-tools"></i>
          <p>Page en cours de construction</p>
          <p>Une surprise arrivera bientôt ici !</p>
        </div>
      </React.Fragment>
    );
  }
}

/** Exportation du composant CommunityChat */
export default CommunityChat;