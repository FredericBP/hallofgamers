/** Importation des modules React */
import * as React from 'react';
import AllPosts from '../PostsGenerator/AllPosts';

/** Définition des types pour les props */
interface propsType {
  anotherUserData?: Object | any,
  deleteOnePost(postDataToDelete): void,
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

/** Composant ProfileTimelineOfAnotherMember */
class ProfileTimelineOfAnotherMember extends React.Component<propsType> {
  constructor(props: Object | any) {
    super(props);
  }

  render(): JSX.ElementClass {
    return (
      <React.Fragment>
        <h2>Fil d'actualité de {this.props.anotherUserData.profile.pseudo}</h2>
        {this.props.anotherUserData.profile.summary && <p>Présentation : {this.props.anotherUserData.profile.summary}</p>}
        <AllPosts
          currentUserPseudo={this.props.userData.profile.pseudo}
          currentUserRole={this.props.userData.role}
          deleteOnePost={this.props.deleteOnePost}
          userDataPosts={this.props.anotherUserData.posts}
        />
      </React.Fragment>
    );
  }
}

/** Exportation du composant ProfileTimelineOfAnotherMember */
export default ProfileTimelineOfAnotherMember;