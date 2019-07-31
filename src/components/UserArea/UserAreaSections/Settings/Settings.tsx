/** Importation des modules React */
import * as React from 'react';

/** Importation des méthodes pour socket.io */
import { socketIoOn } from '../../../../assets/js/module.socketio';
import { socketIoEmit } from '../../../../assets/js/module.socketio';

/** Définition des types pour les props */
interface propsType {
  capitalizeFirstLetter(string: string): string,
  updateStateOfAppComponent(stateToUpdate: string, data: any): void,
  userData?: Object | any
}

/** Définition des types pour le state */
interface stateType {
  lastname?: string,
  firstname?: string,
  gender?: string,
  age?: number,
  address?: string,
  zipcode?: number,
  city?: string,
  summary?: string,
  settingsErrors?: Object | any
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

/** Composant Settings */
class Settings extends React.Component<propsType, stateType> {
  constructor(props: Object | any) {
    super(props);
    this.state = {
      lastname: '',
      firstname: '',
      gender: 'male',
      age: 0,
      address: '',
      zipcode: 0,
      city: '',
      summary: '',
      settingsErrors: {
        serverError: false
      }
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Evènement pour récupérer en temps réel chaque saisie dans le champs input et mettre à jour le state selon l'attribut name
   * @param event {Objet | any} reçoit un objet contenant tous les évènements du DOM
   */
  handleInputChange(event: Object | any): void {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  /**
   * Empêcher l'évènement de validation par défaut d'un formulaire et envoyer les données de connexion au serveur
   * @param event {Objet | any} reçoit un objet contenant tous les évènements du DOM
   */
  handleSubmit(event: Object | any): void {
    event.preventDefault();

    let settingsData = {
      email: this.props.userData.profile.email,
      pseudo: this.props.userData.profile.pseudo,
      lastname: this.state.lastname.toUpperCase(),
      firstname: this.props.capitalizeFirstLetter(this.state.firstname),
      gender: this.state.gender,
      age: this.state.age,
      address: this.state.address,
      zipcode: this.state.zipcode,
      city: this.state.city,
      summary: this.state.summary
    }

    socketIoEmit('sendingSettingsDataToUpdate', JSON.stringify(settingsData));
  }

  render(): JSX.IntrinsicElements {
    return (
      <section>
        <h1>Paramètres du compte</h1>

        <form onSubmit={(event: Object | any): void => this.handleSubmit(event)}>

          <label htmlFor="gender">Sexe : {this.state.gender === 'male' ? 'Homme' : 'Femme'}</label>
          <select
            value={this.state.gender}
            id="gender"
            name="gender"
            onChange={(event: Object | any): void => this.handleInputChange(event)}>
            <option value="male">Homme</option>
            <option value="female">Femme</option>
          </select>

          <label htmlFor="lastname">Nom</label>
          <input
            id="lastname"
            name="lastname"
            onChange={(event: Object | any): void => this.handleInputChange(event)}
            type="text"
            value={this.state.lastname}
          />

          <label htmlFor="firstname">Prénom</label>
          <input
            id="firstname"
            name="firstname"
            onChange={(event: Object | any): void => this.handleInputChange(event)}
            type="text"
            value={this.state.firstname}
          />

          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            onChange={(event: Object | any): void => this.handleInputChange(event)}
            type="number"
            value={this.state.age}
          />

          <label htmlFor="address">Adresse</label>
          <input
            id="address"
            name="address"
            onChange={(event: Object | any): void => this.handleInputChange(event)}
            type="text"
            value={this.state.address}
          />

          <label htmlFor="zipcode">Code postal</label>
          <input
            id="zipcode"
            name="zipcode"
            onChange={(event: Object | any): void => this.handleInputChange(event)}
            type="number"
            value={this.state.zipcode}
          />

          <label htmlFor="city">Ville</label>
          <input
            id="city"
            name="city"
            onChange={(event: Object | any): void => this.handleInputChange(event)}
            type="text"
            value={this.state.city}
          />

          <label htmlFor="summary">Résumé du profil</label>
          <textarea
            id="summary"
            name="summary"
            onChange={(event: Object | any): void => this.handleInputChange(event)}
            value={this.state.summary}>
          </textarea>

          <div className="form-buttons">
            <button
              className="standard-button"
              type="submit">
              Sauvegarder les changements
            </button>
          </div>

          {(this.state.settingsErrors.serverError) && <p className="formError">Le serveur a rencontré un problème...</p>}

        </form>

      </section>
    );
  }

  componentDidMount(): void {
    this.setState({
      lastname: this.props.userData.profile.lastname,
      firstname: this.props.userData.profile.firstname,
      gender: this.props.userData.profile.gender,
      age: this.props.userData.profile.age,
      address: this.props.userData.profile.address,
      zipcode: this.props.userData.profile.zipcode,
      city: this.props.userData.profile.city,
      summary: this.props.userData.profile.summary
    });

    socketIoOn('resultOfSettingsDataUpdate', (data: any): void => {
      this.setState({
        settingsErrors: JSON.parse(data)
      });

      if (!this.state.settingsErrors.serverError) {
        this.props.updateStateOfAppComponent('modalBox', {
          content: `Les changements ont bien été pris en compte !`,
          functionToActivateOnClick: function(): void {},
          isDisplayed: true
        });
      }
    });
  }
}

/** Exportation du composant Settings */
export default Settings;