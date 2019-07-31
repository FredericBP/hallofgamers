/** Importation des modules React */
import * as React from 'react';

/** Importation des méthodes pour socket.io */
import { socketIoOnToUpdateState } from '../../assets/js/module.socketio';
import { socketIoEmit } from '../../assets/js/module.socketio';

/** Importation des composants nécessaires à ce composant */
import Onboarding from '../Onboarding/Onboarding';
import UserArea from '../UserArea/UserArea';

/** Importation des fichiers pour le dossier de production */
import '../../assets/files/favicon.ico';
import '../../assets/files/background-pattern.png';
import ModalBox from '../Interface/ModalBox/ModalBox';

/** Définition des types pour les props */
interface propsType {}

/** Définition des types pour le state */
interface stateType {
  appWidth?: number,
  currentOnboardingSection?: string,
  currentUserAreaSection?: string,
  currentUserAreaSubSection?: string,
  modalBox?: Object | any,
  statisticsForOnboarding?: Object | any,
  userData?: Object | any,
  anotherUserData?: Object | any,
  userIsConnected?: boolean
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

/** Composant App */
class App extends React.Component<propsType, stateType> {
  constructor(props: Object | any) {
    super(props);
    this.state = {
      anotherUserData: {
        role: 'member',
        connected: false,
        profile: {
          email: '',
          pseudo: '',
          lastname: '',
          firstname: '',
          gender: '',
          age: 0,
          address: '',
          zipcode: 0,
          city: '',
          summary: ''
        },
        friends: {
          list: [],
          pending: [],
          sent: [],
          recommanded: []
        },
        posts: [],
        messages: [],
        settings: {}
      },
      appWidth: 0,
      currentOnboardingSection: 'LandingPage',
      currentUserAreaSection: 'Profile',
      currentUserAreaSubSection: 'ProfileTimeline',
      modalBox: {
        content: '',
        functionToActivateOnClick: undefined,
        isDisplayed: false
      },
      statisticsForOnboarding: {
        numberOfAllMessagesFromUsers: 0,
        numberOfUsersCurrentlyConnected: 0
      },
      userData: {
        role: 'member',
        connected: true,
        profile: {
          email: '',
          pseudo: '',
          lastname: '',
          firstname: '',
          gender: '',
          age: 0,
          address: '',
          zipcode: 0,
          city: '',
          summary: ''
        },
        friends: {
          list: [],
          pending: [],
          sent: [],
          recommanded: []
        },
        posts: [],
        messages: [],
        settings: {}
      },
      userIsConnected: false
    };
    this.handleCurrentOnboardingSectionChange = this.handleCurrentOnboardingSectionChange.bind(this);
    this.handleCurrentUserAreaSectionChange = this.handleCurrentUserAreaSectionChange.bind(this);
    this.updateStateOfAppComponent = this.updateStateOfAppComponent.bind(this);
  }

  /**
   * Mettre à jour le state pour changer le statut de la section en cours pour l'espace d'accueil du site (onboarding)
   * @param sectionName {string} reçoit le nom d'une section
   */
  handleCurrentOnboardingSectionChange(sectionName: string): void {
    this.setState({
      currentOnboardingSection: sectionName
    });
  }

  /**
   * Mettre à jour le state pour changer le statut de la section et la sous-section en cours pour l'espace utilisateur (user area)
   * @param sectionName {string} reçoit le nom d'une section
   * @param subSectionName {string} reçoit le nom d'une sous-section
   */
  handleCurrentUserAreaSectionChange(sectionName: string, subSectionName: string): void {
    this.setState({
      currentUserAreaSection: sectionName,
      currentUserAreaSubSection: subSectionName
    });
  }

  /**
   * Transformer un texte pour qu'il soit écrit avec la première lettre en capitale et le reste en minuscule
   * @param string {string} reçoit un texte à transformer
   * @returns renvoit le texte avec la première lettre en capitale
   */
  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  /**
   * Mettre à jour un state du composant App
   * @param stateToUpdate {string} reçoit le nom du state à mettre à jour
   * @param data {any} reçoit les données du state à mettre à jour
   */
  updateStateOfAppComponent(stateToUpdate: string, data: any): void {
    this.setState({
      [stateToUpdate]: data
    });
  }

  /**
   * Vérifier que l'utilisateur est connecté et retourne le composant UserArea si c'est le cas, sinon retourne le composant Onboarding
   * @returns renvoit le composant UserArea ou Onboarding à afficher
   */
  displayUserAreaIfUserIsConnectedOrOnboardingifNot(): JSX.ElementClass {
    if (this.state.userIsConnected) {
      return (
        <UserArea
          anotherUserData={this.state.anotherUserData}
          appWidth={this.state.appWidth}
          capitalizeFirstLetter={this.capitalizeFirstLetter}
          currentUserAreaSection={this.state.currentUserAreaSection}
          currentUserAreaSubSection={this.state.currentUserAreaSubSection}
          handleCurrentUserAreaSectionChange={(sectionName: string, subSectionName: string): void => this.handleCurrentUserAreaSectionChange(sectionName, subSectionName)}
          updateStateOfAppComponent={(stateToUpdate: string, data: any): void => this.updateStateOfAppComponent(stateToUpdate, data)}
          userData={this.state.userData}
        />
      );
    } else {
      return (
        <Onboarding
          capitalizeFirstLetter={this.capitalizeFirstLetter}
          currentOnboardingSection={this.state.currentOnboardingSection}
          handleCurrentOnboardingSectionChange={(sectionName: string): void => this.handleCurrentOnboardingSectionChange(sectionName)}
          statisticsForOnboarding={this.state.statisticsForOnboarding}
          updateStateOfAppComponent={(stateToUpdate: string, data: any): void => this.updateStateOfAppComponent(stateToUpdate, data)}
          userData={this.state.userData}
          userIsConnected={this.state.userIsConnected}
        />
      );
    }
  }

  /** Effectuer le rendu du composant App */
  render(): JSX.IntrinsicElements {
    if (this.state.userData) {
      return (
        <div className="App">
          {this.displayUserAreaIfUserIsConnectedOrOnboardingifNot()}
          {this.state.modalBox.isDisplayed && (
            <ModalBox
              functionToActivateOnClick={this.state.modalBox.functionToActivateOnClick}
              modalBox={this.state.modalBox}
              updateStateOfAppComponent={(stateToUpdate: string, data: any): void => this.updateStateOfAppComponent(stateToUpdate, data)}
            />
          )}
        </div>
      );
    }
  }
  
  componentDidMount(): void {
    /** Mettre à jour le state indiquant la largeur de la fenêtre du navigateur */
    // this.updateStateOfAppComponent('appWidth', window.document.body.clientWidth);

    /** Pour chaque évènement resize de window, mettre à jour le state indiquant la largeur de la fenêtre du navigateur */
    window.addEventListener("resize", (): void => this.updateStateOfAppComponent('appWidth', window.document.body.clientWidth));

    socketIoEmit('sendingStatisticsRequest', '');
  
    socketIoOnToUpdateState('signOutValidated', 'userIsConnected', (stateToUpdate: string, data: any): void => {
      socketIoEmit('sendingStatisticsRequest', '');
      this.handleCurrentOnboardingSectionChange('LandingPage');
      this.updateStateOfAppComponent(stateToUpdate, data);
      this.updateStateOfAppComponent('modalBox', {
        content: `Déconnexion validée. Reviens vite, tu nous manques déjà !`,
        functionToActivateOnClick: function(): void {},
        isDisplayed: true
      });
    });
    
    socketIoOnToUpdateState('sendingUserData', 'userData', (stateToUpdate: string, data: any): void => this.updateStateOfAppComponent(stateToUpdate, JSON.parse(data)));
    
    socketIoOnToUpdateState('sendingStatisticsFromDatabase', 'statisticsForOnboarding', (stateToUpdate: string, data: any): void => this.updateStateOfAppComponent(stateToUpdate, JSON.parse(data)));
  }

  componentWillUnmount(): void {
    /** Ne plus écouter l'évènement resize de window */
    window.removeEventListener("resize", (): void => this.updateStateOfAppComponent('appWidth', window.document.body.clientWidth));
  }
}

/** Exportation du composant App */
export default App;