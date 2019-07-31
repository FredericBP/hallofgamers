/** Importation des modules React */
import * as React from 'react';

/** Importation des méthodes pour socket.io */
import { socketIoOn } from '../../../../../assets/js/module.socketio';
import { socketIoEmit } from '../../../../../assets/js/module.socketio';

/** Définition des types pour les props */
interface propsType {
  anotherUserData?: Object | any,
  capitalizeFirstLetter(string: string): string,
  updateStateOfAppComponent(stateToUpdate: string, data: any): void
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
  role?: string,
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

/** Composant MemberSettings */
class MemberSettings extends React.Component<propsType, stateType> {
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
      role: '',
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
      email: this.props.anotherUserData.profile.email,
      pseudo: this.props.anotherUserData.profile.pseudo,
      lastname: this.state.lastname.toUpperCase(),
      firstname: this.props.capitalizeFirstLetter(this.state.firstname),
      gender: this.state.gender,
      age: this.state.age,
      address: this.state.address,
      zipcode: this.state.zipcode,
      city: this.state.city,
      summary: this.state.summary,
      role: this.state.role
    }

    socketIoEmit('sendingSettingsDataToUpdate', JSON.stringify(settingsData));
  }

  render(): JSX.IntrinsicElements {
    return (
      <React.Fragment>
        <h2>Paramètres du compte de {this.props.anotherUserData.profile.pseudo}</h2>

        <form onSubmit={(event: Object | any): void => this.handleSubmit(event)}>

          <label htmlFor="role">Role : {this.state.role}</label>
          <select
            value={this.state.role}
            id="role"
            name="role"
            onChange={(event: Object | any): void => this.handleInputChange(event)}>
            <option value="admin">Admin</option>
            <option value="member">Membre</option>
          </select>

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

      </React.Fragment>
    );
  }

  componentDidMount(): void {
    this.setState({
      lastname: this.props.anotherUserData.profile.lastname,
      firstname: this.props.anotherUserData.profile.firstname,
      gender: this.props.anotherUserData.profile.gender,
      age: this.props.anotherUserData.profile.age,
      address: this.props.anotherUserData.profile.address,
      zipcode: this.props.anotherUserData.profile.zipcode,
      city: this.props.anotherUserData.profile.city,
      summary: this.props.anotherUserData.profile.summary,
      role: this.props.anotherUserData.role
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

/** Exportation du composant MemberSettings */
export default MemberSettings;