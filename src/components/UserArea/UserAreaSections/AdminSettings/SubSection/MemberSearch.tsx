/** Importation des modules React */
import * as React from 'react';

/** Importation du module Tippy.js */
import tippy from 'tippy.js';

/** Importation des méthodes pour socket.io */
import { socketIoOn } from '../../../../../assets/js/module.socketio';
import { socketIoEmit } from '../../../../../assets/js/module.socketio';

/** Définition des types pour les props */
interface propsType {
  handleCurrentUserAreaSectionChange(sectionName: string, subSectionName: string): void,
  updateStateOfAppComponent(stateToUpdate: string, data: any): void,
}

/** Définition des types pour le state */
interface stateType {
  memberSearch?: string,
  membersListFromResults?: Array<any>,
  noMemberFound?: boolean | string
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

/** Composant MemberSearch */
class MemberSearch extends React.Component<propsType, stateType> {
  constructor(props: Object | any) {
    super(props);
    this.state = {
      memberSearch: '',
      membersListFromResults: [],
      noMemberFound: 'userDidNotSearchMembersYet'
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

    socketIoEmit('sendingMemberSearchDataToBeChecked', this.state.memberSearch);
  }

  /**
   * Créer le formulaire de recherche d'un membre
   * @returns retourne du code JSX avec le formulaire de recherche d'un membre
   */
  renderMemberSearchForm(): JSX.IntrinsicElements {
    return (
      <form onSubmit={(event: Object | any): void => this.onSubmit(event)}>

        <input
          id="memberSearch"
          name="memberSearch"
          onChange={(event: Object | any): void => this.handleInputChange(event)}
          placeholder="Tape ici le pseudo d'un membre"
          required
          type="text"
        />

        <div className="form-buttons">
          <button
            className="standard-button"
            type="submit">
            Rechercher
          </button>
        </div>

      </form>
    );
  }

  /**
   * Créer les informations d'un membre
   * @param oneMember {Object | any} reçoit un objet avec les informations d'un membre
   * @returns retourne du code JSX pour afficher les informations d'un membre
   */
  renderOneMemberFoundFromSearch(oneMember: Object | any): JSX.IntrinsicElements {
    let tippyContentMemberSettings = `Modifier les informations de profil de cet utilisateur`;

    return (
      <div className="one-member" key={oneMember.profile.pseudo}>
        <div className="member-information">
          <p>{oneMember.profile.pseudo}</p>
        </div>
        <span className="tippy-active" data-tooltip="true" data-tippy="" data-tippy-content={tippyContentMemberSettings}>
          <i className="fas fa-chevron-right" onClick={(): void => {
            this.props.updateStateOfAppComponent('anotherUserData', oneMember);
            this.props.handleCurrentUserAreaSectionChange('AdminSettings', 'MemberSettings');
          }}></i>
        </span>
      </div>
    );
  }

  /**
   * Obtenir la liste des éléments JSX pour chaque membre chaque membre du resultat de la recherche
   * @param membersListFromResults {Array<Object | any} reçoit un tableau contenant les informations de tous les membres concernés par la recherche
   * @returns retourne un tableau avec du code JSX des membres
   */
  renderAllMemberFoundFromSearch(membersListFromResults: Array<Object | any>): Array<JSX.IntrinsicElements> {
    let processedMembersListFromResults = [];
    
    membersListFromResults.map((oneMember) => {
      processedMembersListFromResults.push(
        this.renderOneMemberFoundFromSearch(oneMember)
      );
    });

    return processedMembersListFromResults;
  }

  /**
   * Afficher le résultat de la recherche
   * @param membersListFromResults {Array<Object | any} reçoit un tableau contenant les informations de tous les membres concernés par la recherche
   * @returns retourne le code JSX pour afficher le résultats de la recherche
   */
  renderResultsFromSearch(membersListFromResults: Array<Object | any>): JSX.IntrinsicElements {
    if (this.state.noMemberFound === 'userDidNotSearchMembersYet') {
      return (
        <div className="member-search-results">
          <p>Entre le pseudo d'un membre dans la barre de recherche ci-dessus pour le retrouver et ainsi pouvoir changer les informations de son profil.</p>
        </div>
      );
    } else {
      if (this.state.noMemberFound) {
        return (
          <div className="member-search-results">
            <p>Aucun résultat pour : {this.state.memberSearch}</p>
          </div>
        );
      } else {
        return (
          <div className="member-search-results">
            {this.renderAllMemberFoundFromSearch(membersListFromResults)}
          </div>
        );
      }
    }
  }

  render(): JSX.ElementClass {
    return (
      <React.Fragment>

        <h2>Recherche d'un membre</h2>

        {this.renderMemberSearchForm()}

        {this.renderResultsFromSearch(this.state.membersListFromResults)}

      </React.Fragment>
    );
  }

  componentDidMount(): void {
    socketIoOn('resultsFromMemberSearch', (data: any): void => {
      let membersListFromResults = JSON.parse(data);
      let noMemberFound = false;

      if (membersListFromResults.length === 0) {
        noMemberFound = true;
      }

      this.setState({
        membersListFromResults: membersListFromResults,
        noMemberFound: noMemberFound
      });
    });

    /** Changer le statut de l'info-bulle créée avec le module tippy.js pour le chevron et définir les paramètres tippy.js */
    document.querySelectorAll('[data-tooltip="true"]').forEach((element: Element): void => {
      tippy(element, {
        arrow: true,
        arrowType: 'round',
        animateFill: false,
        animation: 'shift-away',
        placement: 'top-end'
      });
    });
  }
}

/** Exportation du composant MemberSearch */
export default MemberSearch;