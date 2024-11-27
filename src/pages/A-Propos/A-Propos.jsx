import styled from "styled-components";
import Banner from "../../components/Banner/Banner.jsx";
import bannerImage from "../../assets/BannerAPropos.png";
import Collapse from "../../components/Collapse/Collapse.jsx";

const AProposContainer = styled.div`
  margin: 0px 100px 50px 100px;
  @media (max-width: 652px) {
    margin: 0px 4% 20px;
  }
`;
const CollapseContainer = styled.div`
  margin: 0 10%;
  & > div {
    margin-bottom: 40px; // Ajustez les marges entre les Collapse
  }
  @media (max-width: 652px) {
    margin: 0;
    & > div {
      margin-bottom: 20px; // Ajustez les marges entre les Collapse
    }
  }
`;

export default function APropos() {
  return (
    <AProposContainer>
      <Banner img={bannerImage} description="Bannière de la page A Propos" />
      <CollapseContainer>
        <Collapse
          title="Fiabilité"
          content="Les annonces postées sur Kasa garantissent une fiabilité totale. Les photos sont conformes aux logements, et toutes les informations sont régulièrement vérifiées par nos équipes."
        />
        <Collapse
          title="Respect"
          content="La bienveillance fait partie des valeurs fondatrices de Kasa. Tout comportement discriminatoire ou de perturbation du voisinage entraînera une exclusion de notre plateforme."
        />
        <Collapse
          title="Service"
          content="La qualité du service est au coeur de notre engagement chez Kasa. Nous veillons à ce que chaque interaction, que ce soit avec nos hôtes ou nos locataires, soit empreinte de respect et de bienveillance."
        />
        <Collapse
          title="Sécurité"
          content="La sécurité est la priorité de Kasa. Aussi bien pour nos hôtes que pour les voyageurs, chaque logement correspond aux critères de sécurité établis par nos services. En laissant une note aussi bien à l'hôte qu'au locataire, cela permet à nos équipes de vérifier que les standards sont bien respectés.  Nous organisons également des ateliers sur la sécurité domestique pour nos hotes."
        />
      </CollapseContainer>
    </AProposContainer>
  );
}
