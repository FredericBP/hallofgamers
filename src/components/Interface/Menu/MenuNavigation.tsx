/** Importation des modules React */
import * as React from 'react';

/** Composant MenuNavigation */
const MenuNavigation = (props: Object | any): JSX.Element => {
  return (
    <nav id="menu-navigation">
      <p
        className="userAreaSection"
        onClick={(): void => {
          props.handleCurrentUserAreaSectionChange('Profile', 'ProfileTimeline');
          props.handleOpenMenuForHeader();
        }}>
        Profil
      </p>
      <ul>
        <li
          onClick={(): void => {
            props.handleCurrentUserAreaSectionChange('Profile', 'ProfileTimeline');
            props.handleOpenMenuForHeader();
          }}>
          Fils d'actualité
        </li>
        <li
          onClick={(): void => {
            props.handleCurrentUserAreaSectionChange('Profile', 'ProfileWritePost');
            props.handleOpenMenuForHeader();
          }}>
          Rédiger un post
        </li>
      </ul>
      <p
        className="userAreaSection"
        onClick={(): void => {
          props.handleCurrentUserAreaSectionChange('Friends', 'FriendsList');
          props.handleOpenMenuForHeader();
        }}>
        Amis
      </p>
      <ul>
        <li
          onClick={(): void => {
            props.handleCurrentUserAreaSectionChange('Friends', 'FriendsList');
            props.handleOpenMenuForHeader();
          }}>
          Liste d'amis
        </li>
        <li
          onClick={(): void => {
            props.handleCurrentUserAreaSectionChange('Friends', 'FriendSearch');
            props.handleOpenMenuForHeader();
          }}>
          Rechercher un membre
        </li>
        <li
          onClick={(): void => {
            props.handleCurrentUserAreaSectionChange('Friends', 'FriendRequests');
            props.handleOpenMenuForHeader();
          }}>
          Demandes en attentes
        </li>
      </ul>
      <p
        className="userAreaSection"
        onClick={(): void => {
          props.handleCurrentUserAreaSectionChange('Messages');
          props.handleOpenMenuForHeader();
        }}>
        Messagerie
      </p>
      <p
        className="userAreaSection"
        onClick={(): void => {
          props.handleCurrentUserAreaSectionChange('Community', 'CommunityChat');
          props.handleOpenMenuForHeader();
        }}>
        Communauté
      </p>
      <p
        className="userAreaSection"
        onClick={(): void => {
          props.handleCurrentUserAreaSectionChange('Games');
          props.handleOpenMenuForHeader();
        }}>
        Jeux
      </p>
      <p
        className="userAreaSection"
        onClick={(): void => {
          props.handleCurrentUserAreaSectionChange('Settings');
          props.handleOpenMenuForHeader();
        }}>
        Paramètres
      </p>

      {props.userData.role === 'admin' && (
        <p
          className="userAreaSection"
          onClick={(): void => {
            props.handleCurrentUserAreaSectionChange('AdminSettings', 'MemberSearch');
            props.handleOpenMenuForHeader();
          }}>
          Gestion des comptes
        </p>
      )}
    </nav>
  );
}

/** Exportation du composant MenuNavigation */
export default MenuNavigation;