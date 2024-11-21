import { useEffect, useState, useContext } from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import colors from '../../utils/style/colors';
import PropertyContext from '../../Services/PropertyContext';
import Slider from "../../components/Slider/Slider.jsx";
import Collapse from "../../components/Collapse/Collapse.jsx"
import Tag from "../../components/Tag/Tag.jsx"
import Rating from "../../components/Rating/Rating.jsx"; 

const LogementContainer = styled.div`
  margin: 0px 100px 50px 100px;
`
const TitleLogement = styled.h1`
font-size : 36px;
color : ${colors.primary};
margin : 0;
`
const Location = styled.p`
font-size : 18px;
margin : 5px
`

const Host = styled.div`
  display: flex;
  justify-content: flex-end; /* Positionne l'hôte à droite */
  align-items: center;
  margin: 20px 0;

  .host-info {
    text-align: right; /* Aligne le texte à droite */
    margin-right: 10px;
  }

  p {
    margin: 0;
    font-size : 18px;
    color : ${colors.primary};
  }

  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

const TitleAndLocation = styled.div`
  display: flex;
  flex-direction: column;
`;

const TagsAndRatingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const CollapseContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 76px;
  margin-top: 20px;

  > div {
    flex: 1; /* Chaque collapse occupe le même espace */
  }
`;





export default function Logement() {
  const { idLogement } = useParams(); // Récupérer l'ID du logement
  const navigate = useNavigate();
  const { getPropertyById } = useContext(PropertyContext);
  // Définition des états de l'api
  const [logement, setLogement] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setLoading(true);
    getPropertyById(idLogement)
    //Scénario présence de data
      .then((data) => {
        setLogement(data);
        setLoading(false);
      })
      //Scénario absence de data avec redirection vers la page d'erreur
      .catch(() => {
        setLoading(false);
        // Redirection vers la page d'erreur si une erreur survient
        navigate('/error'); 
      });
  }, [idLogement, getPropertyById, navigate]); // Tableau de dépendance permettantle rechargement des données

  if (loading) return <p>Chargement...</p>;

   // Sépare le nom et le prénom avec un `<br>`
   const [firstName, lastName] = logement?.host?.name?.split(' ') || [];

  return (
    <LogementContainer>
       <Slider images={logement?.pictures } />
       {/* Premier bloc : Titre, Location, Hôte */}
       <HeaderContainer>
        <TitleAndLocation>
          <TitleLogement>{logement?.title}</TitleLogement>
          <Location>{logement?.location}</Location>
        </TitleAndLocation>
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
      </HeaderContainer>

      {/* Deuxième bloc : Tags et Rating */}
      <TagsAndRatingContainer>
        <TagsContainer>
          {logement?.tags?.map((tag, index) => (
            <Tag key={index} title={tag} />
          ))}
        </TagsContainer>
        <Rating rating={logement?.rating || 0} />
      </TagsAndRatingContainer>

      {/* Troisième bloc : Collapses */}
      <CollapseContainer>
        <Collapse
          title="Description"
          content={logement?.description || "Aucune description disponible"}
        />
        <Collapse
          title="Equipements"
          content={logement?.equipments || ["Aucun équipement disponible"]}
        />
      </CollapseContainer>
    </LogementContainer>
  );
}
