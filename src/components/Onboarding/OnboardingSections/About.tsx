/** Importation des modules React */
import * as React from 'react';

/** Composant About */
const About = (props: Object | any): JSX.Element => {
  return (
    <section>
      <h1>A propos de Hall of Gamers</h1>

      <p>Hall of gamers est un réseau social qui s'adresse à tous les joueurs, que ce soient les joueurs de jeux vidéo, de jeux de société ou les jeux de rôles. L'objectif est de proposer aux joueurs un endroit unique où se retrouver pour échanger de leurs dernières découvertes, proposer ou rejoindre des évènements entre eux.</p>
      <p>A terme un véritable système d'organisation d'évènement sera mis en place ainsi que la possibilité pour les membres de constituer leurs propres collections de jeux en indiquant des statuts "jeu possédé", "joué" et "envie d'y jouer", ce qui permettra à un membre de trouver facilement d'autres joueurs qui ont des jeux auxquels il souhaite jouer, ou bien de proposer un évènements pour un jeu qu'il vient d'acheter et qui nécessite d'être nombreux pour y jouer.</p>
      <p>Des extensions pour certains jeux sont également prévus, comme des guides pour les jeux vidéo, des outils de suivis et de calcul de points pour les jeux de société ou encore des guides et un générateur de personnages pour des jeux de rôles.</p>
    </section>
  );
}

/** Exportation du composant About */
export default About;