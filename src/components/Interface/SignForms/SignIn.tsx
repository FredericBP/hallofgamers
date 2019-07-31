/** Importation des modules React */
import * as React from 'react';

/** Importation des méthodes pour socket.io */
import { socketIoOn } from '../../../assets/js/module.socketio';
import { socketIoEmit } from '../../../assets/js/module.socketio';

/** Définition des types pour les props */
interface propsType {
  handleCurrentOnboardingSectionChange(sectionName: string): void,
  updateStateOfAppComponent(stateToUpdate: string, data: any): void,
  userData?: Object | any
}

/** Définition des types pour le state */
interface stateType {
  login?: string,
  password?: string,
  signInErrors?: Object | any
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

/** Composant SignIn */
class SignIn extends React.Component<propsType, stateType> {
  constructor(props: Object | any) {
    super(props);
    this.state = {
      login: '',
      password: '',
      signInErrors: {
        loginError: false,
        passwordError: false,
        serverError: false
      }
    }
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
  onSubmit(event: Object | any): void {
    event.preventDefault();

    let connectionData = {
      login: this.state.login,
      password: this.state.password
    }

    socketIoEmit('sendingSignInDataToBeChecked', JSON.stringify(connectionData));
  }

  render(): JSX.IntrinsicElements {
    return (
      <section>
        <h1>Connexion</h1>

        <form onSubmit={(event: Object | any): void => this.onSubmit(event)}>

          <label htmlFor="login">Login</label>
          <input
            id="login"
            name="login"
            onChange={(event: Object | any): void => this.handleInputChange(event)}
            placeholder="Adresse e-mail"
            required
            type="text"
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

          <div className="form-buttons">
            <button
              className="standard-button"
              onClick={(): void => this.props.handleCurrentOnboardingSectionChange('LandingPage')}>
              Annuler
            </button>
            <button
              className="standard-button"
              type="submit">
              Se connecter
            </button>
          </div>

          {(this.state.signInErrors.loginError || this.state.signInErrors.passwordError) && <p className="formError">Oups ! Il semble qu'il y ait un problèmes avec les informations de connexion...</p>}
          {this.state.signInErrors.loginError && <p className="formError">Aucun compte n'existe avec cette adresse e-mail...</p>}
          {this.state.signInErrors.passwordError && <p className="formError">Le mot de passe est incorrect.</p>}

        </form>
      </section>
    );
  }

  componentDidMount(): void {
    socketIoOn('resultOfSignInDataVerification', (data: any): void => {
      this.setState({
        signInErrors: JSON.parse(data)
      });

      if (!this.state.signInErrors.loginError && !this.state.signInErrors.passwordError && !this.state.signInErrors.serverError) {
        this.props.updateStateOfAppComponent('userIsConnected', true);
        this.props.updateStateOfAppComponent('modalBox', {
          content: `Connexion réussi. Bon retour parmi nous ${this.props.userData.profile.pseudo} !`,
          functionToActivateOnClick: function(): void {},
          isDisplayed: true
        });
      }
    });
  }
}

/** Exportation du composant SignIn */
export default SignIn;