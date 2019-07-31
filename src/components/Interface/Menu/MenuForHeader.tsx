/** Importation des modules React */
import * as React from 'react';

/** Importation des composants nécessaires à ce composant */
import MobileFeaturesOfMenuForHeader from './MobileFeaturesOfMenuForHeader';
import MenuNavigation from './MenuNavigation';

/** Composant MenuForHeader */
const MenuForHeader = (props: Object | any): JSX.Element => {
  return (
    <div id="menu-for-header" className={props.isMenuOpen ? "active" : ""}>
      <MobileFeaturesOfMenuForHeader
        handleCurrentUserAreaSectionChange={props.handleCurrentUserAreaSectionChange}
        handleOpenMenuForHeader={props.handleOpenMenuForHeader}
        logoHallOfGamers={props.logoHallOfGamers}
      />
      <MenuNavigation
        handleCurrentUserAreaSectionChange={props.handleCurrentUserAreaSectionChange}
        handleOpenMenuForHeader={props.handleOpenMenuForHeader}
        userData={props.userData}
      />
    </div>
  );
}

/** Exportation du composant MenuForHeader */
export default MenuForHeader;