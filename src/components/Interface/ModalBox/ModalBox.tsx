/** Importation des modules React */
import * as React from 'react';

/** Importation des composants nécessaires à ce composant */
import StandardButton from '../../Interface/Buttons/StandardButton';

/** Composant ModalBox */
const ModalBox = (props: Object | any): JSX.Element => {
  return (
    <div id="modal-box">
      <i className="fas fa-times" onClick={(): void => {
        props.updateStateOfAppComponent('modalBox', {
          content: '',
          functionToActivateOnClick: undefined,
          isDisplayed: false
        });
        props.functionToActivateOnClick();
      }}></i>
      <p className="modal-content">{props.modalBox.content}</p>
      <div className="modal-button">
        <StandardButton
          functionToActivateOnClick={(): void => {
            props.updateStateOfAppComponent('modalBox', {
              content: '',
              functionToActivateOnClick: undefined,
              isDisplayed: false
            });
            props.functionToActivateOnClick();
          }}
          value="Fermer"
        />
      </div>
    </div>
  );
}

/** Exportation du composant ModalBox */
export default ModalBox;