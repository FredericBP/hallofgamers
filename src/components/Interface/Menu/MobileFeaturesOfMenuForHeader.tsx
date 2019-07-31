/** Importation des modules React */
import * as React from 'react';

/** Composant MobileFeaturesForMenuFromHeader */
const MobileFeaturesForMenuFromHeader = (props: Object | any): JSX.Element => {
  return (
    <div id="mobile-features-for-menu">
      <img src={props.logoHallOfGamers} alt="Logo Hall of Gamers" onClick={(): void => props.handleCurrentUserAreaSectionChange('Profile', 'ProfileTimeline')} />
      <i className="fas fa-times" onClick={(): void => props.handleOpenMenuForHeader()}></i>
    </div>
  );
}

/** Exportation du composant MobileFeaturesForMenuFromHeader */
export default MobileFeaturesForMenuFromHeader;