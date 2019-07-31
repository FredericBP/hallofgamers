/** Importation des modules React */
import * as React from 'react';

/** Importation des composants nécessaires à ce composant */
import OnePost from './OnePost';

function renderAllPosts(props: Object | any): Array<JSX.Element> {
  let allPostsList = props.userDataPosts;
  let processedAllPostsList = [];

  allPostsList.map((post: Object | any, index: number): void => {
    processedAllPostsList.push(
      <OnePost
        currentUserPseudo={props.currentUserPseudo}
        currentUserRole={props.currentUserRole}
        deleteOnePost={props.deleteOnePost}
        key={index}
        post={post}
      />
    );
  });

  return processedAllPostsList;
}

/** Composant AllPosts */
const AllPosts = (props: Object | any): JSX.Element => {
  return (
    <React.Fragment>
      {renderAllPosts(props)}
    </React.Fragment>
  );
}

/** Exportation du composant AllPosts */
export default AllPosts;