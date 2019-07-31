/** Importation des modules React */
import * as React from 'react';

/** Définition des types pour les props */
interface propsType {
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

/** Composant Messages */
class Messages extends React.Component<propsType> {
  constructor(props: Object | any) {
    super(props);
  }

  render(): JSX.IntrinsicElements {
    return (
      <section>
        <h1>Messages</h1>
        <div className="maintenance">
          <i className="fas fa-tools"></i>
          <p>Page en cours de construction</p>
          <p>Une surprise arrivera bientôt ici !</p>
        </div>
      </section>
    );
  }
}

/** Exportation du composant Messages */
export default Messages;