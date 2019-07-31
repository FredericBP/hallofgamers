/** Importation des modules React */
import * as React from 'react';

/** Importation du module Tippy.js */
import tippy from 'tippy.js';

/** Définition des types pour les props */
interface propsType {
  currentUserPseudo?: string,
  currentUserRole?: string,
  deleteOnePost(postDataToDelete): void,
  key: number,
  post: Object | any
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

/** Composant OnePost */
class OnePost extends React.Component<propsType> {
  constructor(props: Object | any) {
    super(props);
  }

  render(): JSX.IntrinsicElements {
    let tippyContent = 'Supprimer ce post';

    return (
      <article className="post">
        <header>
          <h3>{this.props.post.title}</h3>
        </header>
        <main>
          <div dangerouslySetInnerHTML={{ __html: this.props.post.content }} />
        </main>
        <footer>
          <div>
            <p>Rédiger par {this.props.post.author}</p>
            <p>Le {new Date(this.props.post.date).toLocaleDateString('fr-FR', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
          </div>
          {(this.props.currentUserRole === 'admin' || this.props.currentUserPseudo === this.props.post.author || this.props.currentUserPseudo === this.props.post.timelineOwner) && <span className="tippy-active" data-tooltip="true" data-tippy="" data-tippy-content={tippyContent}>
            <i className="fas fa-times" onClick={(): void => this.props.deleteOnePost(this.props.post)}></i>
          </span>}
        </footer>
      </article>
    );
  }

  componentDidMount(): void {
    /** Changer le statut de l'info-bulle créée avec le module tippy.js pour la croix rouge servant à supprimer le post et définir les paramètres tippy.js */
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

/** Exportation du composant OnePost */
export default OnePost;