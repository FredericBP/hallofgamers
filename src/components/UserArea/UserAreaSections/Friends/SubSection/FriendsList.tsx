/** Importation des modules React */
import * as React from 'react';

/** Importation des composants nécessaires à ce composant */
import AllFriends from '../FriendsListGenerator/AllFriends';

/** Définition des types pour les props */
interface propsType {
  deleteOneFriend(friendDataToDelete): void,
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

/** Composant FriendsList */
class FriendsList extends React.Component<propsType> {
  constructor(props: Object | any) {
    super(props);
  }

  render(): JSX.ElementClass {
    return (
      <React.Fragment>
        <h2>Liste d'amis</h2>
        <AllFriends
          deleteOneFriend={this.props.deleteOneFriend}
          friendStatus={'accepted'}
          userDataFriends={this.props.userData.friends.list}
        />
      </React.Fragment>
    );
  }
}

/** Exportation du composant FriendsList */
export default FriendsList;