/** Importation des modules React */
import * as React from 'react';

/** Importation des composants nécessaires à ce composant */
import OneFriend from './OneFriend';

function renderAllFriends(props: Object | any): Array<JSX.Element> {
  let allFriendsList = props.userDataFriends;
  let processedAllFriendsList = [];

  allFriendsList.map((friend: Object | any, index: number): void => {
    processedAllFriendsList.push(
      <OneFriend
        acceptOneFriend={props.acceptOneFriend}
        deleteOneFriend={props.deleteOneFriend}
        friendStatus={props.friendStatus}
        key={index}
        friend={friend}
      />
    );
  });

  return processedAllFriendsList;
}

/** Composant AllFriends */
const AllFriends = (props: Object | any): JSX.Element => {
  return (
    <React.Fragment>
      {renderAllFriends(props)}
    </React.Fragment>
  );
}

/** Exportation du composant AllFriends */
export default AllFriends;