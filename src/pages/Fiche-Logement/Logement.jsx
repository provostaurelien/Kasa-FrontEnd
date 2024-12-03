import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import colors from "../../utils/style/colors";
import PropertyContext from "../../Services/PropertyContext";
import Slider from "../../components/Slider/Slider.jsx";
import Collapse from "../../components/Collapse/Collapse.jsx";
import Tag from "../../components/Tag/Tag.jsx";
import Rating from "../../components/Rating/Rating.jsx";

const LogementContainer = styled.div`
  margin: 0px 10% 50px 10%;
  @media (max-width: 652px) {
    margin: 20px 4%;
  }
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  // Gestion de l'organisation de la page via le grid templates areas pour vue mobile et desktop
  grid-template-areas:
    "title host"
    "tags rating"
    "collapses collapses";

  @media (max-width: 652px) {
    grid-gap: 10px;
    grid-template-areas:
      "title title"
      "tags tags"
      "rating host";
  }
`;

const TitleAndLocationContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  grid-area: title;
`;

const TitleLogement = styled.h1`
  font-size: 36px;
  font-weight: medium;
  color: ${colors.primary};
  margin: 0;
  @media (max-width: 652px) {
    font-size: 18px;
  }
`;

const Location = styled.p`
  font-size: 18px;
  margin: 10px 0px 5px;
  @media (max-width: 652px) {
    font-size: 14px;
  }
`;

const Host = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
  grid-area: host;
  @media (max-width: 652px) {
    margin-top: 10px;
  }

  .host-info {
    text-align: right;
    margin-right: 10px;
  }

  p {
    margin: 0;
    font-size: 18px;
    color: ${colors.primary};
    @media (max-width: 652px) {
      font-size: 12px;
    }
  }

  img {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    @media (max-width: 652px) {
      width: 32px;
      height: 32px;
    }
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  grid-area: tags;
`;

const RatingContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  grid-area: rating;
  @media (max-width: 652px) {
    justify-content: flex-start;
    margin-top: 10px;
  }
`;

const CollapseContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 76px;
  grid-area: collapse;

  > div {
    flex: 1;
  }

  @media (max-width: 652px) {
    display: block;
  }
`;

export default function Logement() {
  const { idLogement } = useParams();
  const navigate = useNavigate();
  const { getPropertyById } = useContext(PropertyContext);
  const [logement, setLogement] = useState(null);
  const [loading, setLoading] = useState(true);

  // Gestion de l'appel api
  useEffect(() => {
    setLoading(true);
    getPropertyById(idLogement)
      .then((data) => {
        setLogement(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        navigate("/error");
      });
  }, [idLogement, getPropertyById, navigate]);

  if (loading) return <p>Chargement...</p>;
  // Gestion de la séparation nom et prénom de l'hôte
  const [firstName, lastName] = logement?.host?.name?.split(" ") || [];

  return (
    <LogementContainer>
      {/* Slider */}
      <Slider images={logement?.pictures} style={{ order: 1 }} />

      {/* Grille des éléments (l'ordre est défini élément par élément via le grid-area) */}
      <Container>
        <TitleAndLocationContainer>
          <TitleLogement>{logement?.title}</TitleLogement>
          <Location>{logement?.location}</Location>
        </TitleAndLocationContainer>
        <Host>
          <div className="host-info">
            <p>
              {firstName}
              <br />
              {lastName}
            </p>
          </div>
          <img src={logement?.host?.picture} alt={logement?.host?.name} />
        </Host>
        <TagsContainer>
          {logement?.tags?.map((tag, index) => (
            <Tag key={index} title={tag} />
          ))}
        </TagsContainer>

        <RatingContainer>
          <Rating rating={logement?.rating || 0} />
        </RatingContainer>
      </Container>
      <CollapseContainer>
        <Collapse
          title="Description"
          content={logement?.description || "Aucune description disponible"}
        />
        <Collapse
          title="Équipements"
          content={logement?.equipments || ["Aucun équipement disponible"]}
        />
      </CollapseContainer>
    </LogementContainer>
  );
}
