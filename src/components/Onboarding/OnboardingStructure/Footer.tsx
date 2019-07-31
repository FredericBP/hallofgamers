/** Importation des modules React */
import * as React from 'react';

/** Composant Footer pour le composant Onboarding */
const Footer = (props: Object | any): JSX.Element => {
  return (
    <footer className="onboarding-page">
      <nav className="footer-menu">
        <ul>
          <li onClick={(): void => props.handleCurrentOnboardingSectionChange('About')}>A propos</li>
          <li>&bull;</li>
          <li onClick={(): void => props.handleCurrentOnboardingSectionChange('LegalNotice')}>Mentions légales</li>
          <li>&bull;</li>
          <li>
            <a href="mailto:postmaster@frederic-debengy.name?subject=Hall of Gamers&body=Que ce soit un bref télégramme ou une longue lettre d'amour, écris-nous ton message ici !">Contact</a>
          </li>
        </ul>
      </nav>
      <p>&copy; 2019 Frédéric DE BENGY &bull; Tous droits réservés</p>
    </footer>
  );
}

/** Exportation du composant Footer pour le composant Onboarding */
export default Footer;