/** Importation des modules React */
import * as React from 'react';

/** Importation des méthodes pour socket.io */
import { socketIoOn } from '../../../assets/js/module.socketio';
import { socketIoEmit } from '../../../assets/js/module.socketio';

/** Définition des types pour les props */
interface propsType {
  capitalizeFirstLetter(string: string): string,
  handleCurrentOnboardingSectionChange(sectionName: string): void,
  updateStateOfAppComponent(stateToUpdate: string, data: any): void
}

/** Définition des types pour le state */
interface stateType {
  email?: string,
  password?: string,
  pseudo?: string,
  lastname?: string,
  firstname?: string,
  gender?: string,
  age?: number,
  address?: string,
  zipcode?: number,
  city?: string,
  summary?: string,
  signUpErrors?: Object | any
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

/** Composant SignUp */
class SignUp extends React.Component<propsType, stateType> {
  constructor(props: Object | any) {
    super(props);
    this.state = {
      email: "",
      password: "",
      pseudo: "",
      lastname: "",
      firstname: "",
      gender: "male",
      age: 0,
      address: "",
      zipcode: 0,
      city: "",
      summary: "",
      signUpErrors: {
        emailError: false,
        pseudoError: false,
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

    let signUpData = {
      email: this.state.email.toLowerCase(),
      password: this.state.password,
      pseudo: this.state.pseudo,
      lastname: this.state.lastname.toUpperCase(),
      firstname: this.props.capitalizeFirstLetter(this.state.firstname),
      gender: this.state.gender,
      age: this.state.age,
      address: this.state.address,
      zipcode: this.state.zipcode,
      city: this.state.city,
      summary: this.state.summary
    }

    socketIoEmit('sendingSignUpDataToBeChecked', JSON.stringify(signUpData));
  }

  render(): JSX.IntrinsicElements {
    return (
      <section>
        <h1>Inscription</h1>

        <form onSubmit={(event: Object | any): void => this.handleSubmit(event)}>

          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            name="email"
            onChange={(event: Object | any): void => this.handleInputChange(event)}
            placeholder="E-mail"
            required
            type="email"
          />

          <label htmlFor="password">Mot de passe</label>
          <input
            id="password"
            name="password"
            onChange={(event: Object | any): void => this.handleInputChange(event)}
            placeholder="Mot de passe"
            required
            type="password"
          />

          <label htmlFor="pseudo">Pseudo</label>
          <input
            id="pseudo"
            name="pseudo"
            onChange={(event: Object | any): void => this.handleInputChange(event)}
            placeholder="Pseudo"
            required
            type="text"
          />

          <label htmlFor="gender">Sexe</label>
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
            placeholder="Nom"
            required
            type="text"
          />

          <label htmlFor="firstname">Prénom</label>
          <input
            id="firstname"
            name="firstname"
            onChange={(event: Object | any): void => this.handleInputChange(event)}
            placeholder="Prénom"
            required
            type="text"
          />

          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            onChange={(event: Object | any): void => this.handleInputChange(event)}
            placeholder="Age"
            required
            type="number"
          />

          <label htmlFor="address">Adresse</label>
          <input
            id="address"
            name="address"
            onChange={(event: Object | any): void => this.handleInputChange(event)}
            placeholder="Adresse"
            type="text"
          />

          <label htmlFor="zipcode">Code postal</label>
          <input
            id="zipcode"
            name="zipcode"
            onChange={(event: Object | any): void => this.handleInputChange(event)}
            placeholder="Code postal"
            type="number"
          />

          <label htmlFor="city">Ville</label>
          <input
            id="city"
            name="city"
            onChange={(event: Object | any): void => this.handleInputChange(event)}
            placeholder="Ville"
            type="text"
          />

          <label htmlFor="summary">Résumé du profil</label>
          <textarea
            id="summary"
            name="summary"
            onChange={(event: Object | any): void => this.handleInputChange(event)}></textarea>

          <div className="form-buttons">
            <button
              className="standard-button"
              onClick={(): void => this.props.handleCurrentOnboardingSectionChange('LandingPage')}>
              Annuler
            </button>
            <button
              className="standard-button"
              type="submit">
              S'inscrire
            </button>
          </div>

          {(this.state.signUpErrors.emailError || this.state.signUpErrors.pseudoError || this.state.signUpErrors.serverError) && <p className="formError">Mince, une erreur est survenue !</p>}
          {this.state.signUpErrors.emailError && <p className="formError">Cette adresse e-mail a déjà été utilisé par un autre membre...</p>}
          {this.state.signUpErrors.pseudoError && <p className="formError">Ce pseudo est déjà utilisé par un autre membre, choisis en un qui le fera regretter d'avoir pris ton pseudo !</p>}

        </form>
      </section>
    );
  }

  componentDidMount(): void {
    socketIoOn('resultOfSignUpDataVerification', (data: any): void => {
      this.setState({
        signUpErrors: JSON.parse(data)
      });

      if (!this.state.signUpErrors.emailError && !this.state.signUpErrors.pseudoError && !this.state.signUpErrors.serverError) {
        this.props.updateStateOfAppComponent('userIsConnected', true);
        this.props.updateStateOfAppComponent('modalBox', {
          content: `Bienvenu ${this.state.pseudo} !`,
          functionToActivateOnClick: function(): void {},
          isDisplayed: true
        });
      }
    });
  }
}

/** Exportation du composant SignUp */
export default SignUp;