/** Importation des modules React */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

/** Importation du composant App */
import App from './components/App/App';

/** Liaison du composant App à la racine du template */
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
