/** Importation des modules React */
import * as React from 'react';

/** Définition des types pour les props */
interface propsType {
  
}

/** Définition des types pour le state */
interface stateType {
  
}

/** Composant Games */
class Games extends React.Component<propsType, stateType> {
  constructor(props: Object | any) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <section>
        <h1>Jeux</h1>
        <div className="maintenance">
          <i className="fas fa-tools"></i>
          <p>Page en cours de construction</p>
          <p>Une surprise arrivera bientôt ici !</p>
        </div>
      </section>
    );
  }
}

/** Exportation du composant Games */
export default Games;