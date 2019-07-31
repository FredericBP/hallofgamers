/** Importation des modules React */
import * as React from 'react';

/** Importation des composants nécessaires à ce composant */
import StandardButton from '../../Interface/Buttons/StandardButton';

/** Importation des images */
const logoHallOfGamers = require('../../../assets/files/logo-hall-of-gamers-dark.png');
const videoGames = require('../../../assets/files/video-games.png');
const boardgames = require('../../../assets/files/boardgames.png');
const rolePlayingGames = require('../../../assets/files/role-playing-games.png');

/** Composant LandingPage */
const LandingPage = (props: Object | any): JSX.Element => {
  return (
    <React.Fragment>
      <div className="title">
        <img src={logoHallOfGamers} alt="Logo Hall of Gamers" />
        <h1>Le réseau social pour rassembler tous les joueurs !</h1>
      </div>

      {/* CALL TO ACTION POUR S'INSCRIRE OU SE CONNECTER SUR LA PAGE D'ACCUEIL */}
      <div className="login-options">
        <StandardButton
          functionToActivateOnClick={(): void => props.handleCurrentOnboardingSectionChange('SignUp')}
          value="Inscription"
        />
        <StandardButton
          functionToActivateOnClick={(): void => props.handleCurrentOnboardingSectionChange('SignIn')}
          value="Connexion"
        />
      </div>

      <div className="features games">
        <h2>Echanger avec d'autres joueurs quelque soit le type de jeux</h2>
        <ul>
          <li>
            <img src={videoGames} alt="Icone jeux vidéo" />
            <span>Jeux vidéo</span>
          </li>
          <li>
            <img src={boardgames} alt="Icone jeux de société" />
            <span>Jeux de société</span>
          </li>
          <li>
            <img src={rolePlayingGames} alt="Icone jeux de rôles" />
            <span>Jeux de rôles</span>
          </li>
        </ul>
      </div>

      <div className="features community">
        <h2>Une communauté qui grandit de jour en jour et qui ne demande que de nouvelles personnes avec qui partager leur passion de jouer !</h2>
        <ul>
          <li>
            <i className="fas fa-comments"></i>
            <span>{props.statisticsForOnboarding.numberOfAllMessagesFromUsers} messages postés jusqu'à présent</span>
          </li>
          <li>
            <span>{props.statisticsForOnboarding.numberOfUsersCurrentlyConnected} membres actuellement connectés</span>
            <i className="fas fa-user-friends"></i>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}

/** Exportation du composant LandingPage */
export default LandingPage;