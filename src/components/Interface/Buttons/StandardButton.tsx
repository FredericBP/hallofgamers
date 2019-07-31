/** Importation des modules React */
import * as React from 'react';

/** Composant StandardButton */
const StandardButton = (props: Object | any): JSX.Element => {
  return (
    <button
      className="standard-button"
      onClick={(): void => props.functionToActivateOnClick()}>
      {props.value}
    </button>
  );
}

/** Exportation du composant StandardButton */
export default StandardButton;