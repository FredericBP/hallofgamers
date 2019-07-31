/** Importation des modules React */
import * as React from 'react';

/** Importation des composants nécessaires à ce composant */
import AllPosts from '../PostsGenerator/AllPosts';

/** Définition des types pour les props */
interface propsType {
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

/** Composant ProfileTimeline */
class ProfileTimeline extends React.Component<propsType> {
  constructor(props: Object | any) {
    super(props);
  }

  render(): JSX.ElementClass {
    return (
      <React.Fragment>
        <h2>Mon fil d'actualité</h2>
        {this.props.userData.profile.summary && <p>Présentation : {this.props.userData.profile.summary}</p>}
        <AllPosts
          currentUserPseudo={this.props.userData.profile.pseudo}
          currentUserRole={this.props.userData.role}
          deleteOnePost={this.props.deleteOnePost}
          userDataPosts={this.props.userData.posts}
        />
      </React.Fragment>
    );
  }
}

/** Exportation du composant ProfileTimeline */
export default ProfileTimeline;