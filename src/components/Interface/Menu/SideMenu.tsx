/** Importation des modules React */
import * as React from 'react';

/** Importation des composants nécessaires à ce composant */
import MenuNavigation from './MenuNavigation';

/** Composant SideMenu */
const SideMenu = (props: Object | any): JSX.Element => {
  return (
    <div id="side-menu">
      <MenuNavigation
        handleCurrentUserAreaSectionChange={props.handleCurrentUserAreaSectionChange}
        handleOpenMenuForHeader={props.handleOpenMenuForHeader}        
        userData={props.userData}
      />
    </div>
  );
}

/** Exportation du composant SideMenu */
export default SideMenu;