/** Importation des modules React */
import * as React from 'react';

/** Importation du module TinyMCE en tant qu'éditeur de texte */
// import tinymce from '../../../../../assets/lib/tinymce/tinymce.min.js';
// import '../../../../../assets/lib/tinymce/plugins/paste';
// import '../../../../../assets/lib/tinymce/plugins/link';
import { Editor } from '@tinymce/tinymce-react';

/** Importation des méthodes pour socket.io */
import { socketIoEmit } from '../../../../../assets/js/module.socketio';
import { socketIoOn } from '../../../../../assets/js/module.socketio';

/** Définition des types pour les props */
interface propsType {
  handleCurrentUserAreaSectionChange(sectionName: string, subSectionName: string): void,
  updateStateOfAppComponent(stateToUpdate: string, data: any): void,
  userData?: Object | any
}

/** Définition des types pour le state */
interface stateType {
  content?: string,
  serverError?: boolean,
  title?: string
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

/** Composant ProfileWritePost */
class ProfileWritePost extends React.Component<propsType, stateType> {
  constructor(props: Object | any) {
    super(props);
    this.state = {
      content: '',
      serverError: false,
      title: ''
    }
    this.handleEditorChange = this.handleEditorChange.bind(this);
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

  handleEditorChange(content: string, editor: Object): void {
    this.setState({
      content: content
    });
  }

  onSubmit(event: Object | any): void {
    event.preventDefault();

    let postAuthor = this.props.userData.profile.pseudo;
    let postContent = this.state.content;
    let postDate = new Date;
    let postTimelineOwner = this.props.userData.profile.pseudo;
    let postTitle = this.state.title;

    let newPost = {
      author: postAuthor,
      content: postContent,
      date: postDate,
      timelineOwner: postTimelineOwner,
      title: postTitle
    }

    socketIoEmit('sendingNewPost', JSON.stringify(newPost));
  }

  render(): JSX.ElementClass {
    return (
      <React.Fragment>
        <h2>Rédiger un post</h2>

        <form onSubmit={(event: Object | any): void => this.onSubmit(event)}>

          <label htmlFor="title">Titre du post</label>
          <input
            id="title"
            name="title"
            onChange={(event: Object | any): void => this.handleInputChange(event)}
            placeholder="Titre du post"
            required
            type="text"
          />

          <Editor
            init={{
              plugins: 'link image code',
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
            }}
            onEditorChange={this.handleEditorChange}
            value={this.state.content}
          />

          <div className="form-buttons">
            <button
              className="standard-button"
              type="submit">
              Publier
            </button>
          </div>

          {this.state.serverError && <p className="formError">Une erreur est survenue lors de l'enregistrement du nouveau post.</p>}

        </form>

      </React.Fragment>
    );
  }

  componentDidMount(): void {
    // tinymce.init({
    //   selector: '#tiny',
    //   plugins: ['paste', 'link']
    // });

    socketIoOn('newPostAdded', (data: boolean): void => {
      this.setState({
        serverError: !data
      });

      if (!this.state.serverError) {
        this.props.updateStateOfAppComponent('modalBox', {
          content: 'Ton post a bien été enregistré !',
          functionToActivateOnClick: () => this.props.handleCurrentUserAreaSectionChange('Profile', 'ProfileTimeline'),
          isDisplayed: true
        });
      }
    });
  }
}

/** Exportation du composant ProfileWritePost */
export default ProfileWritePost;