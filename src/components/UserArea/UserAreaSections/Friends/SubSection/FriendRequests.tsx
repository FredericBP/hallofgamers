/** Importation des modules React */
import * as React from 'react';

/** Importation des composants nécessaires à ce composant */
import AllFriends from '../FriendsListGenerator/AllFriends';

/** Définition des types pour les props */
interface propsType {
  acceptOneFriend(friendDataToAccept): void,
  userData?: Object | any
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

/** Composant FriendRequests */
class FriendRequests extends React.Component<propsType> {
  constructor(props: Object | any) {
    super(props);
  }

  render(): JSX.ElementClass {
    return (
      <React.Fragment>
        <h2>Demandes en attentes</h2>

        <h3>Invitations reçues</h3>
        {this.props.userData.friends.pending.length === 0 ? (
          <p>Tu n'as aucune invitation reçue pour le moment.</p>
        ) : (
          <AllFriends
            acceptOneFriend={this.props.acceptOneFriend}
            friendStatus={'pending'}
            userDataFriends={this.props.userData.friends.pending}
          />
        )}

        <h3>Invitations envoyées</h3>
        {this.props.userData.friends.sent.length === 0 ? (
          <p>Il n'y a aucune invitation envoyée en attente.</p>
        ) : (
          <AllFriends
            friendStatus={'sent'}
            userDataFriends={this.props.userData.friends.sent}
          />
        )}

      </React.Fragment>
    );
  }
}

/** Exportation du composant FriendRequests */
export default FriendRequests;